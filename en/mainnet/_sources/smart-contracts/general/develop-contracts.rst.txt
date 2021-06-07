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

On the concordium blockchain smart contracts are deployed as Wasm modules, but
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
``["cdylib", "rlib"]`` in the manifest file:

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
   fn counter_init(
       _ctx: &impl HasInitContext,
   ) -> InitResult<State> {
       let state = 0;
       Ok(state)
   }

   #[receive(contract = "counter", name = "increment")]
   fn contract_receive<A: HasActions>(
       ctx: &impl HasReceiveContext,
       state: &mut State,
   ) -> ReceiveResult<A> {
       ensure!(ctx.sender().matches_account(&ctx.owner()); // Only the owner can increment
       *state += 1;
       Ok(A::accept())
   }

There are a number of things to notice:

.. todo::

   - Write up the requirements in an easier to read way (e.g., split up paragraphs into sub-bullets).
   - These requirements should be part of a specification that is written up somewhere,
     i.e., not just as part of this example.

- The type of the functions:

  * An init function must be of type ``&impl HasInitContext -> InitResult<MyState>``
    where ``MyState`` is a type that implements the ``Serialize`` trait.
  * A receive function must take a ``A: HasActions`` type parameter,
    a ``&impl HasReceiveContext`` and a ``&mut MyState`` parameter, and return
    a ``ReceiveResult<A>``.

- The annotation ``#[init(contract = "counter")]`` marks the function it is
  applied to as the init function of the contract named ``counter``.
  Concretely, this means that behind the scenes this macro generates an exported
  function with the required signature and name ``init_counter``.

- ``#[receive(contract = "counter", name = "increment")]`` deserializes and
  supplies the state to be manipulated directly.
  Behind the scenes this annotation also generates an exported function with name
  ``counter.increment`` that has the required signature, and does all of the
  boilerplate of deserializing the state into the required type ``State``.

.. note::

   Note that deserialization is not without cost, and in some cases the
   user might want more fine-grained control over the use of host functions.
   For such use cases the annotations support a ``low_level`` option, which has
   less overhead, but requires more from the user.

.. todo::

   - Describe low-level
   - Introduce the concept of host functions before using them in the note above


Serializable state and parameters
---------------------------------

.. todo:: Clarify what it means that the state is exposed similarly to ``File``;
   preferably, without referring to ``File``.

On-chain, the state of an instance is represented as a byte array and exposed
in a similar interface as the ``File`` interface of the Rust standard library.

This can be done using the ``Serialize`` trait which contains (de-)serialization
functions.

The ``concordium_std`` crate includes this trait and implementations for
most types in the Rust standard library.
It also includes macros for deriving the trait for user-defined structs and
enums.

.. code-block:: rust

   use concordium_std::*;

   #[derive(Serialize)]
   struct MyState {
       ...
   }

The same is necessary for parameters to init and receive functions.

.. note::

   Strictly speaking we only need to deserialize bytes to our parameter type,
   but it is convenient to be able to serialize types when writing unit tests.

.. _working-with-parameters:

Working with parameters
-----------------------

Parameters to the init and receive functions are, like the instance
state, represented as byte arrays.
While the byte arrays can be used directly, they can also be deserialized into
structured data.

The simplest way to deserialize a parameter is through the `get()`_ function of
the `Get`_ trait.

As an example, see the following contract in which the parameter
``ReceiveParameter`` is deserialized on the highlighted line:

.. code-block:: rust
   :emphasize-lines: 24

   use concordium_std::*;

   type State = u32;

   #[derive(Serialize)]
   struct ReceiveParameter{
       should_add: bool,
       value: u32,
   }

   #[init(contract = "parameter_example")]
   fn init(
       _ctx: &impl HasInitContext,
   ) -> InitResult<State> {
       let initial_state = 0;
       Ok(initial_state)
   }

   #[receive(contract = "parameter_example", name = "receive")]
   fn receive<A: HasActions>(
       ctx: &impl HasReceiveContext,
       state: &mut State,
   ) -> ReceiveResult<A> {
       let parameter: ReceiveParameter = ctx.parameter_cursor().get()?;
       if parameter.should_add {
           *state += parameter.value;
       }
       Ok(A::accept())
   }

The receive function above is inefficient in that it deserializes the
``value`` even when it is not needed, i.e., when ``should_add`` is ``false``.

To get more control, and in this case, more efficiency, we can deserialize the
parameter using the `Read`_ trait:

.. code-block:: rust
   :emphasize-lines: 7, 10

   #[receive(contract = "parameter_example", name = "receive_optimized")]
   fn receive_optimized<A: HasActions>(
       ctx: &impl HasReceiveContext,
       state: &mut State,
   ) -> ReceiveResult<A> {
       let mut cursor = ctx.parameter_cursor();
       let should_add: bool = cursor.read_u8()? != 0;
       if should_add {
           // Only decode the value if it is needed.
           let value: u32 = cursor.read_u32()?;
           *state += value;
       }
       Ok(A::accept())
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


Testing smart contracts
=======================

Unit tests with stubs
---------------------

Simulate contract calls
-----------------------

Best practices
==============

Don't panic
-----------

.. todo::

   Use trap instead.

Avoid creating black holes
--------------------------

A smart contract is not required to use the amount of GTU send to it, and by
default a smart contract does not define any behavior for emptying the balance
of an instance, in case someone were to send some GTU.
These GTU would then be forever *lost*, and there would be no way to recover
them.

Therefore it is good practice for smart contracts that are not dealing with GTU,
to ensure the sent amount of GTU is zero and reject any invocations which are
not.

Move heavy calculations off-chain
---------------------------------


.. _Rust: https://www.rust-lang.org/
.. _Cargo: https://doc.rust-lang.org/cargo/
.. _AssemblyScript: https://github.com/AssemblyScript
.. _get(): https://docs.rs/concordium-std/latest/concordium_std/trait.Get.html#tymethod.get
.. _Get: https://docs.rs/concordium-std/latest/concordium_std/trait.Get.html
.. _Read: https://docs.rs/concordium-std/latest/concordium_std/trait.Read.html
.. _concordium_std: https://docs.rs/concordium-std/latest/concordium_std/
