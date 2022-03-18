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

==================================
Developing smart contracts in Rust
==================================

On the Concordium blockchain smart contracts are deployed as Wasm modules, but
Wasm is designed primarily as a compilation target and is not convenient to
write by hand.
Instead we can write our smart contracts in the Rust_ programming language, which
has good support for compiling to Wasm.

Smart contracts do not have to be written in Rust.
This is simply the first SDK we provide.
Manually written Wasm, or Wasm compiled from C, C++, AssemblyScript_, and
others, is equally valid on the chain, as long as it adheres to the :ref:`Wasm
limitations we impose <wasm-limitations>`.

.. seealso::

   For more information on the functions described below, see the concordium_std_
   API for writing smart contracts on the Concordium blockchain in Rust.

.. seealso::

   See :ref:`contract-module` for more information about smart contract modules.

A smart contract module is developed in Rust as a library crate, which is then
compiled to Wasm.
To obtain correct exports, the `crate-type` attribute must be set to
``["cdylib", "rlib"]`` in the file ``Cargo.toml``:

.. code-block:: text

   ...
   [lib]
   crate-type = ["cdylib", "rlib"]
   ...

Writing a smart contract using ``concordium_std``
=================================================

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
   fn counter_init<S: HasStateApi>(
       _ctx: &impl HasInitContext,
       _state_builder: &mut StateBuilder<S>,
   ) -> InitResult<State> {
       let state = 0;
       Ok(state)
   }

   #[receive(contract = "counter", name = "increment", mutable)]
   fn contract_receive<A: HasStateApi>(
       ctx: &impl HasReceiveContext,
       host: &mut impl HasHost<State, StateApiType = S>,
   ) -> ReceiveResult<()> {
       ensure!(ctx.sender().matches_account(&ctx.owner()); // Only the owner can increment
       *host.state_mut() += 1;
       Ok(())
   }

There are a number of things to notice:

.. todo::

   - These requirements should be part of a specification that is written up somewhere,
     i.e., not just as part of this example.

- The type of the functions:

  * An init function must be of type ``(&impl HasInitContext, &mut StateBuilder) -> InitResult<MyState>``
    where ``MyState`` is a type that implements the ``Serialize`` [#serialize]_ trait.
  * A receive function is immutable by default and must take a ``S: HasStateApi`` type parameter,
    a ``&impl HasReceiveContext`` and a ``&impl HasHost<MyState, StateApiType = S>`` parameter, and return
    a ``ReceiveResult<MyReturnValue>``, where ``MyReturnValue`` is type that
    implements ``Serialize``.
  * A receive function can be made mutable by adding the ``mutable`` attribute,
    in which case the hos parameter becomes mutable: ``&mut impl
    HasHost<MyState, StateApiType = S>``. The other types and requirements remain
    unchanged as compared to the immutable receive functions.

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
                traits ``Serial`` and ``Deserial``. The ``State*`` types are
                types that utilize the tree structure of the state for efficiency.


Serializable state and parameters
---------------------------------

On-chain, the state of an instance is represented as a `prefix tree
<https://en.wikipedia.org/wiki/Trie>`_, where nodes in the tree can have data in the
form of a byte array.
The instance uses functions provided by the host environment to create, delete,
and find nodes in the tree.
The host also provides functions for reading, writing and resizing the bytearray
held by a particular node in the tree.

In the common case, the complete contract state is stored in the root node of
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
``concordium_std`` crate provides ergonomic types for this purpose, namely |StateBox|_, |StateMap|_, and
|StateSet|_.
Which provide an interface similar to that of a pointer(``Box``), map, and set.
For technical reasons, these three types cannot implement ``Serialize``, but
they *do* implement ``Serial`` and ``DeserialWithState``.
``concordium_std`` also has a macros for deriving these two types for
user-defined structs and enums.

.. code-block:: rust

   use concordium_std::*;

   #[derive(Serial, DeserialWithState)]
   #[concordium(state_parameter = S)]
   struct MyState<S, T> {
       a: StateBox<String, S>,
       b: Vec<T>,
       ...
   }

Parameters to init and receive functions must also implement ``Serialize`` in
the same way.

.. note::

   Strictly speaking we only need to deserialize bytes to our parameter type,
   but it is convenient to be able to serialize types when writing unit tests.

.. _working-with-parameters:

Working with parameters
-----------------------

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
   fn init<S: HasStateApi>(
       _ctx: &impl HasInitContext,
       _state_builder: &mut StateBuilder,
   ) -> InitResult<State> {
       let initial_state = 0;
       Ok(initial_state)
   }

   #[receive(contract = "parameter_example", name = "receive", mutable)]
   fn receive<S: HasStateApi>(
       ctx: &impl HasReceiveContext,
       host: &mut impl HasHost<State, StateApiType = S>,
   ) -> ReceiveResult<()> {
       let parameter: ReceiveParameter = ctx.parameter_cursor().get()?;
       if parameter.should_add {
           *host.state_mut() += parameter.value;
       }
       Ok(())
   }

The receive function above is inefficient in that it deserializes the
``value`` even when it is not needed, i.e., when ``should_add`` is ``false``.

To get more control, and in this case, more efficiency, we can deserialize the
parameter using the `Read`_ trait:

.. code-block:: rust
   :emphasize-lines: 7, 10

   #[receive(contract = "parameter_example", name = "receive_optimized", mutable)]
   fn receive_optimized<S: HasStateApi>(
       ctx: &impl HasReceiveContext,
       host: &mut impl HasHost<State, StateApiType = S>,
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


Building a smart contract module with ``cargo-concordium``
==========================================================

The Rust compiler has good support for compiling to Wasm using the
``wasm32-unknown-unknown`` target.
However, even when compiling with ``--release`` the resulting build includes
large sections of debug information in custom sections, which are not useful for
smart contracts on-chain.

To optimize the build and allow for new features such as embedding schemas, we
recommend using ``cargo-concordium`` to build smart contracts.

.. seealso::

   For instructions on how to build using ``cargo-concordium`` see
   :ref:`compile-module`.

.. todo::

    Add H2 for Testing smart contracts with H3s for Unit tests with stubs and Simulate contract calls

Best practices
==============
.. todo::

     Add H3 for Don't panic, Use trap instead.

Avoid creating black holes
--------------------------

A smart contract is not required to use the amount of CCD send to it, and by
default a smart contract does not define any behavior for emptying the balance
of an instance, in case someone were to send some CCD.
These CCD would then be forever *lost*, and there would be no way to recover
them.

Therefore it is good practice for smart contracts that are not dealing with CCD,
to ensure the sent amount of CCD is zero and reject any invocations which are
not.
Using the ``#[init(...)]`` and ``#[receive(...)]`` macros will help you in this
endeavour, as they will make the function panic if it receives a non-zero amount
of CCD.
To enable receiving CCD for a function, use the |payable|_ attribute in the
macro, i.e.: ``#[init(..., payable)]`` and ``#[receive(..., payable)]``.

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
.. _payable: https://docs.rs/concordium-std-derive/latest/concordium_std_derive/attr.init.html#payable-make-function-accept-an-amount-of-ccd..
.. |payable| replace:: ``payable``
