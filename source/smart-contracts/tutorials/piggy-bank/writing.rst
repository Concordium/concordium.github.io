.. _Rust: https://www.rust-lang.org/
.. _Serialize: https://docs.rs/concordium-std/latest/concordium_std/trait.Serialize.html
.. |Serialize| replace:: ``Serialize``
.. _concordium-std: https://docs.rs/concordium-std/latest/concordium_std/index.html
.. |concordium-std| replace:: ``concordium-std``
.. _`procedural macro for deriving`: https://docs.rs/concordium-std/latest/concordium_std/derive.Serialize.html
.. _init: https://docs.rs/concordium-std/latest/concordium_std/attr.init.html
.. |init| replace:: ``#[init]``
.. _receive: https://docs.rs/concordium-std/latest/concordium_std/attr.receive.html
.. |receive| replace:: ``#[receive]``
.. _HasActions: https://docs.rs/concordium-std/latest/concordium_std/trait.HasAction.html
.. |HasActions| replace:: ``HasActions``
.. _bail: https://docs.rs/concordium-std/latest/concordium_std/macro.bail.html
.. |bail| replace:: ``bail!``
.. _ensure: https://docs.rs/concordium-std/latest/concordium_std/macro.ensure.html
.. |ensure| replace:: ``ensure!``
.. _matches_account: https://docs.rs/concordium-std/latest/concordium_std/enum.Address.html#method.matches_account
.. |matches_account| replace:: ``matches_account``
.. _self_balance: https://docs.rs/concordium-std/latest/concordium_std/trait.HasReceiveContext.html#tymethod.self_balance
.. |self_balance| replace:: ``self_balance``

.. _piggy-bank-writing:

=====================================
Writing the piggy bank smart contract
=====================================

This is the first :ref:`part of a tutorial<piggy-bank>` on smart contract
development. In this part we will focus on how to write a smart contract in the
Rust_ programming language using the |concordium-std| library.

.. warning::

   The reader is assumed to have basic knowledge of what a blockchain and smart
   contract is, and some experience with Rust_.

.. contents::
   :local:
   :backlinks: None

.. todo::

   Link the repo with the final code.

Preparation
===========

Before we start, make sure to have the necessary tooling for building Rust
contracts.
The guide :ref:`setup-tools` will show you how to do this.
Also, make sure to have a text editor for writing Rust.

We also need to set up a new smart contract project.
Follow the guide :ref:`setup-contract` and return to this point afterwards.

We are now ready for writing a smart contract for the Concordium blockchain!

Bringing in the standard library
================================

The source code of our smart contract is going to be in the ``src`` directory,
which already contains the file ``lib.rs``, assuming you follow the above guide
to set up your project.
Open ``src/lib.rs`` in your editor and you'll see some code for writing tests,
which you can delete for now. We will come back to tests later in this tutorial.

.. todo::

   Link the test section of this tutorial.

First, we bring everything from the |concordium-std|_ library into scope,
by adding the line:

.. code-block:: rust

   use concordium_std::*;

This library contains everything needed for writing our smart contract. It
provides convenient wrappers around some low-level operations making our code
more readable, and although it is not strictly necessary to use this, it will
save a lot of code for the vast majority of contract developers.

Piggy bank contract
===================

The contract we are going to build in this tutorial is going to act as a classic
piggy bank. Everyone should be able to put money in the form of GTU into it, but only the owner
can smash it and retrieve the GTU inside. Once the piggy bank has been
smashed, it should not be possible to add GTU to it.

.. todo::

   Add image of piggy bank.

The piggy-bank smart contract is going to contain a function for setting up a
new piggy bank and two functions for updating a piggy bank; one is for everyone
to use for inserting GTU, the other is for the owner to smash the piggy bank and
prevent further interaction.

Specifying the state
====================

To implement a piggy bank we need to keep track of the amount of GTU it holds,
and we need to know whether it has been smashed. The blockchain will take care
of the first task for us since the chain keeps track of the balance of each smart-contract
instance. Therefore, we only need to maintain whether the piggy bank has been smashed,
which we do as part of the smart-contract *state*.

In Rust we represent this state as an enum, with a variant for the piggy bank
being intact and one for it being smashed:

.. code-block:: rust

   enum PiggyBankState {
       Intact,
       Smashed,
   }

Since the state of our smart contract is going to be stored on the blockchain,
we need to specify how the contract state should be serialized.
When using the |concordium-std|_ library, this all boils down to our type
for the contract state having to implement the |Serialize|_ trait exposed by
|concordium-std|_.

Luckily the library already contains implementations for most of the primitives
and standard types in Rust_, and a `procedural macro for deriving`_
|Serialize|_ for most cases of enums and structs:

.. code-block:: rust

   #[derive(Serialize)]
   enum PiggyBankState {
       Intact,
       Smashed,
   }

Later in this tutorial, we will also need to check the state for equality, so we also
derive the trait implementation for ``PartialEq`` and ``Eq``:

.. code-block:: rust

   #[derive(Serialize, PartialEq, Eq, Debug)]
   enum PiggyBankState {
       Intact,
       Smashed,
   }


Setting up a piggy bank
=======================

Time to write the function for setting up a new piggy bank, which in turn means
specifying the init function for a smart contract.
A smart contract must specify an init function, which is called when new
instances of the contract are created, and is used to set up the initial state of
the contract instance.

.. note::

   A Rust_ developer could compare init functions with the convention of
   having a ``new`` function for types, and the smart contract as the type.

   If you have experience with object-oriented programming, it might help to
   think of a smart contract as a *class*, the init function as a
   *constructor* and smart contract instances as *objects*.

In the case of the piggy bank; the initial state should be set to ``Intact``.


The ``#[init]`` macro
-------------------------

In Rust_ an init function can be specified as a regular function that is annotated
with a procedural macro from |concordium-std| called |init|_.
This allows us to create a new piggy bank as follows:

.. code-block:: rust

   #[init(contract = "PiggyBank")]
   fn piggy_init(_ctx: &impl HasInitContext) -> InitResult<PiggyBankState> {
       Ok(PiggyBankState::Intact)
   }

The macro saves you the details of setting up the function as an external
function and serializing the state to bytes. The macro also provides an interface for
accessing information about the context of the smart-contract call.

The init function requires a name for the smart contract, which we choose to be
``"PiggyBank"``. The name [#valid-name]_ is used as part of the exported
function, and is how we distinguish this smart contract from other smart
contracts in our module.

.. code-block:: rust

   #[init(contract = "PiggyBank")]

The init function takes a single argument, ``ctx: &impl HasInitContext``,
which is a zero-sized struct with a number of getter functions for accessing
information about the current context, such as the account that invoked this contract, the
supplied arguments and information about the state of the blockchain.

The return type of our function is ``InitResult<PiggyBankState>``, which is an
alias for ``Result<PiggyBankState, Reject>``. The returned state is serialized
and set as the initial state of the smart contract.

Initializing our piggy bank state to be ``Intact`` is then straightforward:

.. code-block:: rust

   Ok(PiggyBankState::Intact)

A more complex smart contract would take a parameter, and check during
initialization that everything is set up as expected, but more about this
later.

.. [#valid-name] The contract name is only allowed to consist of ASCII alphanumeric or
   punctuation characters, and is not allowed to contain the ``.`` symbol.

Define interaction with piggy banks
===================================

We have now defined how instances of our smart contract are created, and the
smart contract is in principle a valid contract.
However, we would also like to define how to interact with instances of our
contract.
Specifically how to add GTU to it and how to smash a piggy bank.

A smart contract can expose zero or more functions for interacting with an
instance.
These functions are called receive functions, and can read and
write to the state of the instance, read the state of the blockchain and
return a description of actions to be executed on-chain.

.. note::

   For a Rust_ developer, receive functions are like methods with
   a mutable reference to `self`.

   A continuation of the analogy to object-oriented programming:
   receive functions correspond to object methods.

The ``#[receive(...)]`` macro
-----------------------------

In Rust, receive functions can be specified using the procedural macro
|receive|_, which, like |init|_, is used to annotate a function and sets up an
external function and supplies us with an interface for accessing the context.
But, unlike the |init|_ macro, the function for |receive|_ is also supplied with
a mutable reference to the current state of the instance:

.. code-block:: rust

   #[receive(contract = "MyContract", name = "some_interaction")]
   fn some_receive<A: HasActions>(
       ctx: &impl HasReceiveContext,
       state: &mut MyContractState,
   ) -> ReceiveResult<A> {
      todo!("Implement")
   }

The ``contract`` attribute supplies the name of the contract to the macro.
This name should match the name in the corresponding attribute in |init|_
(``"PiggyBank"`` in our case). It also requires a name to identify this
particular receive function using ``name``. The name and contract attributes
each have to be unique within a smart contract module.

The return type of the function is ``ReceiveResult<A>``, which is an alias for
``Result<A, Reject>``.
Here, ``A`` implements |HasActions|, which exposes functions for creating
various :ref:`actions<action-descriptions>`.

In this contract we will use the **Accept** and **Simple Transfer** actions.

Inserting GTU
-------------

The first interaction we will specify for our piggy bank is how to insert GTU into it.
We start with defining a receive function as:

.. code-block:: rust

   #[receive(contract = "PiggyBank", name = "insert")]
   fn piggy_insert<A: HasActions>(
       _ctx: &impl HasReceiveContext,
       state: &mut PiggyBankState,
   ) -> ReceiveResult<A> {
       todo!("Implement")
   }

Here, we make sure that the contract name matches the one we use for the |init|_ macro,
and we name the receive function ``insert``.
The function will not need to use the ``_ctx`` context, so by convention, we
prefix the argument with ``_``.

In the function body we have to make sure that the piggy bank is still intact: the
smart contract should reject any messages if the piggy bank is smashed:

.. code-block:: rust

   if *state == PiggyBankState::Smashed {
      return Err(Reject {});
   }

Since returning early is a common pattern when writing smart contracts and in
Rust_ in general, |concordium-std| exposes a |bail|_ macro:

.. code-block:: rust

   if *state == PiggyBankState::Smashed {
      bail!();
   }

Furthermore, we can use the |ensure|_ macro for returning early depending on a condition:

.. code-block:: rust

   ensure!(*state == PiggyBankState::Intact);

From this line, we will know that the state of the piggy bank is intact and all
we have left to do is accept the incoming amount of GTU.
The GTU balance is maintained by the blockchain, so there is no need for us to
maintain this in our contract. The contract just needs to produce the **Accept** action
using the generic ``A`` (more on that below):

.. code-block:: rust

   Ok(A::accept())

So far we have the following definition of the receive function:

.. code-block:: rust

   #[receive(contract = "PiggyBank", name = "insert")]
   fn piggy_insert<A: HasActions>(
       _ctx: &impl HasReceiveContext,
       state: &mut PiggyBankState,
   ) -> ReceiveResult<A> {
       ensure!(*state == PiggyBankState::Intact);
       Ok(A::accept())
   }

Our definition of how to add GTU to the piggy bank is almost done, but one important detail is
missing.
If we were to send GTU to the current smart contract, the transaction
would be rejected. This is a safety feature of |concordium-std|,
which, by default, prevents init and receive functions
from accepting GTU.

The reason for rejecting GTU by default is to reduce the risk of creating a smart
contract that accepts GTU without retrieving it: any GTU passed to such a contract
would be *inaccessible forever*.

To be able to accept GTU, we have to add the ``payable`` attribute to the |receive| macro.
Now the function is required to
take an extra argument ``amount: Amount``, which represents the amount that is passed to the receive
function.

.. code-block:: rust
   :emphasize-lines: 1, 4

   #[receive(contract = "PiggyBank", name = "insert", payable)]
   fn piggy_insert<A: HasActions>(
       _ctx: &impl HasReceiveContext,
       _amount: Amount,
       state: &mut PiggyBankState,
   ) -> ReceiveResult<A> {
       ensure!(*state == PiggyBankState::Intact);
       Ok(A::accept())
   }

As mentioned above, since the blockchain is maintaining the balance of our smart contract, we
do not have to do that ourselves, and the ``amount`` is not used by our contract.

.. note::

   The ``payable`` attribute also exists for the |init| macro.

Smashing a piggy bank
---------------------

Now that we can insert GTU into a piggy bank, we are only left to define how to
smash one.
Just to recap, we only want the owner of the piggy bank (smart contract
instance) to be able to call this and only if the piggy bank has not already
been smashed.
It should set its state to be smashed and transfer all of its GTU to the owner.

Again we use the |receive|_ macro to define the smash function:

.. code-block:: rust

   #[receive(contract = "PiggyBank", name = "smash")]
   fn piggy_smash<A: HasActions>(
       ctx: &impl HasReceiveContext,
       state: &mut PiggyBankState,
   ) -> ReceiveResult<A> {
       todo!("Implement")
   }

We ensure that the contract name matches the one of our smart contract and we choose
to name this function ``smash``.

To access the contract owner, we use a getter function exposed by the context
``ctx``:

.. code-block:: rust

   let owner = ctx.owner();

This returns the account address of the contract instance owner, i.e. the
account that created the smart contract instance by invoking the
init function.

Similarly, the context has a getter function to access the sender of the current
message that triggered this receive function:

.. code-block:: rust

   let sender = ctx.sender();

Since both accounts and smart-contract instances are capable of sending messages,
``sender`` is of the  ``Address`` type, which is either an account
address or a contract instance address.

To compare the ``sender`` with ``owner`` we can use the |matches_account|_
function defined on the ``sender``, which will only return true if the sender is
an account address that is equal to the owner:

.. code-block:: rust

   ensure!(sender.matches_account(&owner));

Next we ensure that the state of the piggy bank is ``Intact``, just like previously:

.. code-block:: rust

   ensure!(*state == PiggyBankState::Intact);

At this point we know, the piggy bank is still intact and the sender is the
owner, meaning we now get to the smashing part:

.. code-block:: rust

   *state = PiggyBankState::Smashed

Since the state is a mutable reference, we can simply mutate it to be
``Smashed``, preventing anyone from inserting any more GTU.

Lastly we need to empty the piggy bank. To do that, we transfer all the GTU
of the smart-contract instance to an account.

To transfer GTU from a smart contract instance we create an
action for a simple transfer, again using the generic ``A``.
To construct a simple transfer we need to provide the address of the receiving
account and the amount to be transferred.
In our case the receiver is the owner of the piggy bank and the amount is the
entire balance of the piggy bank.

The context has a getter function for reading
the current balance of the smart contract instance, which is called
|self_balance|_:

.. code-block:: rust

   let balance = ctx.self_balance();

We already have a variable with the address of the contract owner, so we can
construct and return the action for a simple transfer:

.. code-block:: rust

   Ok(A::simple_transfer(&owner, balance))

The final definition of our "smash" receive function is then:

.. code-block:: rust

   #[receive(contract = "PiggyBank", name = "smash")]
   fn piggy_smash<A: HasActions>(
       ctx: &impl HasReceiveContext,
       state: &mut PiggyBankState,
   ) -> ReceiveResult<A> {
       let owner = ctx.owner();
       let sender = ctx.sender();
       ensure!(sender.matches_account(&owner));
       ensure!(*state == PiggyBankState::Intact);

       *state = PiggyBankState::Smashed;

       let balance = ctx.self_balance();
       Ok(A::simple_transfer(&owner, balance))
   }

.. .. note::
   Since a blockchain is a decentralized system, one might think we have to
   worry about the usual problems when dealing with mutable state. Problems
   such as race conditions, but the semantics of smart contracts require the
   execution to be atomic, in order to reach consensus.

We now have all the parts for our piggy bank smart contract. Before we move on
to testing it, we check that it builds by running:

.. code-block:: console

   $cargo concordium build

This should succeed if everything is set up correctly. Otherwise, compare your
code with the one found here_.

.. _here: https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/piggy-bank/part1/src/lib.rs
