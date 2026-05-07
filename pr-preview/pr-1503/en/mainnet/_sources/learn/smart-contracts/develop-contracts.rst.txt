.. Should answer:
    - Why write a smart contract using rust?
    - What are the pieces needed to write a smart contract in rust?
        - State
            - Serialized
            - Schema
        - Init
        - Receive
    - What sort of testing is possible
    - Best practices?
        - Ensure 0 amount
        - Don't panic
        - Avoid heavy calculations

.. _writing-smart-contracts:

==========
Using Rust
==========

On the Concordium blockchain smart contracts are deployed as Wasm modules, but
Wasm is designed primarily as a compilation target and is not convenient to
write by hand.
Instead you can write your smart contracts in the Rust_ programming language, which
has good support for compiling to Wasm.

Smart contracts do not have to be written in Rust.
This is simply the first SDK provided.
Manually written Wasm, or Wasm compiled from C, C++, AssemblyScript_, and
others, is equally valid on the chain, as long as it adheres to the :ref:`Wasm
limitations Concordium imposes <wasm-limitations>`.

.. seealso::

   For more information on the functions described below, see the concordium_std_
   API for writing smart contracts on the Concordium blockchain in Rust.

.. seealso::

   See :ref:`contract-module` for more information about smart contract modules.

A smart contract module is developed in Rust as a library crate, which is then
compiled to Wasm.
To obtain correct exports, the `crate-type` attribute must be set to
``["cdylib", "rlib"]`` in the ``Cargo.toml`` file:

.. code-block:: text

   ...
   [lib]
   crate-type = ["cdylib", "rlib"]
   ...

Write a smart contract using ``concordium_std``
===============================================

It is recommended to use the ``concordium_std`` crate, which provides a
more Rust-like experience for developing smart contract modules and calling
host functions.

The crate enables writing init and receive functions as simple Rust
functions annotated with ``#[init(...)]`` and ``#[receive(...)]``, respectively.

Here is an example of a smart contract that implements a counter:

.. code-block:: rust

   use concordium_std::*;

   type State = u32;

   #[init(contract = "counter")]
   fn counter_init(
       _ctx: &InitContext,
       _state_builder: &mut StateBuilder,
   ) -> InitResult<State> {
       let state = 0;
       Ok(state)
   }

   #[receive(contract = "counter", name = "increment", mutable)]
   fn contract_receive(
       ctx: &ReceiveContext,
       host: &mut Host<State>,
   ) -> ReceiveResult<()> {
       ensure!(ctx.sender().matches_account(&ctx.owner())); // Only the owner can increment
       *host.state_mut() += 1;
       Ok(())
   }

There are a number of things to notice:

.. todo::

   - These requirements should be part of a specification that is written up somewhere,
     i.e., not just as part of this example.

- The type of the functions:

  * An init function must be of type ``(&InitContext, &mut StateBuilder) -> InitResult<MyState>``
    where ``MyState`` is a type that implements the ``Serialize`` [#serialize]_ trait.
  * A receive function, which, by default, cannot mutate the state, must take a ``&ReceiveContext``,
    and a ``&Host<MyState>`` parameter, and return a ``ReceiveResult<MyReturnValue>``, where ``MyReturnValue``
    is type that implements ``Serialize``.
  * A receive function can be allowed to mutate the state by adding the
    ``mutable`` attribute, in which case the host parameter becomes mutable: ``&mut Host<MyState>``.
    The other types and requirements remain unchanged as compared to the immutable receive functions.

- The annotation ``#[init(contract = "counter")]`` marks the function it is
  applied to as the init function of the contract named ``counter``.
  Concretely, this means that behind the scenes this macro generates an exported
  function with the required signature and name ``init_counter``.

- ``#[receive(contract = "counter", name = "increment", mutable)]`` deserializes and
  supplies the state to be manipulated directly.
  Behind the scenes this annotation also generates an exported function with name
  ``counter.increment`` that has the required signature, and does all of the
  boilerplate of deserializing the state into the required type ``State``.
  Mutable receive functions also serialize and save the state once the function finishes.
  This means that you should only use the ``mutable`` attribute if it is
  necessary. Otherwise, the state will appear as having mutated and you will
  also pay for the cost of saving and serializing the state.

.. note::

   Note that deserialization is not without cost, and in some cases the
   user might want more fine-grained control over the use of host functions.
   For such use cases the annotations support a ``low_level`` option, which has
   less overhead, but requires more from the user.

.. todo::

   - Describe low-level
   - Introduce the concept of host functions before using them in the note above

.. [#serialize] If the state contains one or more of the types |StateBox|_,
                |StateMap|_, or |StateSet|_, it should implement ``Serial``
                and ``DeserialWithState`` instead. The difference is the
                deserialization, where ``Serialize`` is a combination of the
                traits ``Serial`` and ``Deserial``.
                ``State*`` types are essentially pointers to data stored in
                state, and when serialized, only the pointer is written, while
                the values are stored in the state. To load
                the values again, the state context is needed, hence the ``DeserialWithState``.

.. note::

   There is also the option of building a contract using ``no_std``. For more information, read :ref:`no-std`

.. _serialize-state-and-parameters:

Serializable state and parameters
---------------------------------

On-chain, the state of an instance is represented as a `prefix tree
<https://en.wikipedia.org/wiki/Trie>`_, where nodes in the tree can have data in the
form of a byte array.
The instance uses functions provided by the host environment to create, delete,
and find nodes in the tree.
The host also provides functions for reading, writing, and resizing the byte array
held by a particular node in the tree.

For simple contracts, the complete contract state is stored in the root node of
the state tree. For this to work, the state must implement the
``Serialize`` trait which contains (de-)serialization functions.
The ``concordium_std`` crate includes this trait and implementations for most
types in the Rust standard library.
It also includes macros for deriving the trait for user-defined structs and
enums.

.. code-block:: rust

   use concordium_std::*;

   #[derive(Serialize)]
   struct MyState {
       ...
   }

For contracts that maintain a large state, it is often beneficial to split the
state into multiple nodes in the state tree.
``concordium_std`` crate provides ergonomic types for this purpose, namely |StateMap|_ and
|StateSet|_.
Which provide an interface similar to that of a map and set.
These types cannot implement ``Serialize``, but they *do* implement ``Serial``
and ``DeserialWithState`` [#serialize]_.
``concordium_std`` also has a macros for deriving these two types for
user-defined structs and enums.

.. code-block:: rust

   use concordium_std::*;

   #[derive(Serial, DeserialWithState)]
   #[concordium(state_parameter = S)]
   struct MyState<S = StateApi, T> {
       a: StateBox<String, S>,
       b: Vec<T>,
       ...
   }

Parameters to init and receive functions must implement ``Serialize``, whereas
the state must implement ``Serialize`` *or* ``Serial + DeserialWithState``.

.. note::

   Strictly speaking you only need to deserialize bytes to your parameter type,
   but it is convenient to be able to serialize types when writing tests.

.. _working-with-parameters:

Work with parameters
--------------------

Parameters to the init and receive functions are represented as byte arrays.
While the byte arrays can be used directly, they can also be deserialized into
structured data.

The simplest way to deserialize a parameter is through the `get()`_ function of
the `Get`_ trait.

As an example, see the following contract in which the parameter
``ReceiveParameter`` is deserialized on the highlighted line:

.. code-block:: rust
   :emphasize-lines: 25

   use concordium_std::*;

   type State = u32;

   #[derive(Serialize)]
   struct ReceiveParameter{
       should_add: bool,
       value: u32,
   }

   #[init(contract = "parameter_example")]
   fn init(
       _ctx: &InitContext,
       _state_builder: &mut StateBuilder,
   ) -> InitResult<State> {
       let initial_state = 0;
       Ok(initial_state)
   }

   #[receive(contract = "parameter_example", name = "receive", mutable)]
   fn receive(
       ctx: &ReceiveContext,
       host: &mut Host<State>,
   ) -> ReceiveResult<()> {
       let parameter: ReceiveParameter = ctx.parameter_cursor().get()?;
       if parameter.should_add {
           *host.state_mut() += parameter.value;
       }
       Ok(())
   }

The receive function above is inefficient in that it deserializes the
``value`` even when it is not needed, i.e., when ``should_add`` is ``false``.

To get more control, and in this case, more efficiency, you can deserialize the
parameter using the `Read`_ trait:

.. code-block:: rust
   :emphasize-lines: 7, 10

   #[receive(contract = "parameter_example", name = "receive_optimized", mutable)]
   fn receive_optimized(
       ctx: &ReceiveContext,
       host: &mut Host<State>,
   ) -> ReceiveResult<()> {
       let mut cursor = ctx.parameter_cursor();
       let should_add: bool = cursor.read_u8()? != 0;
       if should_add {
           // Only decode the value if it is needed.
           let value: u32 = cursor.read_u32()?;
           *host.state_mut() += value;
       }
       Ok(())
   }

Notice that the ``value`` is only deserialized if ``should_add`` is
``true``.
While the gain in efficiency is minimal in this example, it could have an
substantial impact for more complex examples.

Parameters have a size limit of 65535B. There is no return value size limit (apart from energy).

Work with queries
-----------------

Queries can be called from smart contracts to query an account balance, contract balance,
or the current exchange rates.

.. dropdown:: Query an account balance

    To query account balances, the following are available:

    .. code-block:: rust

        // Query the balance of an account.
        let account_balance = host.account_balance(account_address)?;

    Assuming the account exists, this returns the public balance of an account, the currently staked balance, and balance locked in release schedules.
    Any amount received during the transaction until the point of querying is reflected in the balance.

    When sending a smart contract update transaction, the invoker provides a max energy cost for the execution.
    CCD equivalent to the max energy cost is reserved on the invoker account during the execution of the contract.
    Because of this, querying the balance of the invoker will result in the current account balance minus the
    amount of CCD reserved to cover the max energy cost as well as the amount included in the transaction.

    Some part of the balance might be used for staking or/and is locked in releases by scheduled transfers.
    Which makes the amount unavailable for transferring.
    All of this information can be accessed as:

    .. code-block:: rust

        // The amount which is available for transfers.
        let available_balance = account_balance.available();
        // The staked amount.
        let staked_balance = account_balance.staked();
        // The amount locked in scheduled transfers.
        let locked_balance = account_balance.locked();
        // The total public balance, i.e. including staked and locked_balance.
        let total_balance = account_balance.total();

.. dropdown:: Query a contract balance

    To query the current balance of a contract, the following is available:

    .. code-block:: rust

        let contract_balance = host.contract_balance(address)?;

    Assuming the contract exists, this returns the current amount held by the contract.
    Any amount transferred or received during the same transaction until the point of querying
    is reflected in the balance.

    .. note::

        Although it is valid for a contract to query its own balance, it is cheaper to use ``host.self_balance()``.

.. dropdown:: Query exchange rates

    To query exchange rates, the following are available:

    .. code-block:: rust

        let exchange_rates = host.exchange_rates();

    The result contains the exchange rates currently used by the chain.
    These are the micro CCD per Euro rate and the Euro per NRG rate.

    .. code-block:: rust

        let micro_ccd_per_euro = exchange_rates.micro_ccd_per_euro();
        let euro_per_energy = exchange_rates.euro_per_energy();

    Each rate is a ratio of two 64-bit unsigned integers.

Build a smart contract module with ``cargo-concordium``
=======================================================

The Rust compiler has good support for compiling to Wasm using the
``wasm32-unknown-unknown`` target.
However, even when compiling with ``--release`` the resulting build includes
large sections of debug information in custom sections, which are not useful for
smart contracts on-chain.

To optimize the build and allow for new features such as embedding schemas, Concordium
recommends using ``cargo-concordium`` to build smart contracts.

.. seealso::

   For instructions on how to build using ``cargo-concordium`` see
   :ref:`compile-module`.

.. todo::

    Add H2 for Testing smart contracts with H3s for Unit tests with stubs and Simulate contract calls

.. todo::

     Add H3 for Don't panic, Use trap instead.

Avoid creating black holes
==========================

A smart contract is not required to use the amount of CCD send to it, and by
default a smart contract does not define any behavior for emptying the balance
of an instance, in case someone were to send some CCD.
These CCD would then be forever *lost*, and there would be no way to recover
them.

Therefore it is good practice for smart contracts that are not dealing with CCD,
to ensure the sent amount of CCD is zero and reject any invocations which are
not.
Using the ``#[init(...)]`` and ``#[receive(...)]`` macros will help you in this
endeavor, as they will cause functions to return a ``NotPayble`` error if
they receive a non-zero amount of CCD.
To enable receiving CCD for a function, use the |payable|_ attribute in the
macro, e.g.: ``#[init(..., payable)]`` and ``#[receive(..., payable)]``.

.. todo::

    Add H3 for Move heavy calculations off-chain


.. _Rust: https://www.rust-lang.org/
.. _Cargo: https://doc.rust-lang.org/cargo/
.. _AssemblyScript: https://github.com/AssemblyScript
.. _get(): https://docs.rs/concordium-std/latest/concordium_std/trait.Get.html#tymethod.get
.. _Get: https://docs.rs/concordium-std/latest/concordium_std/trait.Get.html
.. _Read: https://docs.rs/concordium-std/latest/concordium_std/trait.Read.html
.. _concordium_std: https://docs.rs/concordium-std/latest/concordium_std/
.. _StateBox: https://docs.rs/concordium-std/latest/concordium_std/struct.StateBox.html
.. |StateBox| replace:: ``StateBox``
.. _StateMap: https://docs.rs/concordium-std/latest/concordium_std/struct.StateMap.html
.. |StateMap| replace:: ``StateMap``
.. _StateSet: https://docs.rs/concordium-std/latest/concordium_std/struct.StateSet.html
.. |StateSet| replace:: ``StateSet``
.. _payable: https://docs.rs/concordium-std/latest/concordium_std/attr.receive.html#payable-make-function-accept-an-amount-of-ccd
.. |payable| replace:: ``payable``
