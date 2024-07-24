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
.. _bail: https://docs.rs/concordium-std/latest/concordium_std/macro.bail.html
.. |bail| replace:: ``bail!``
.. _ensure: https://docs.rs/concordium-std/latest/concordium_std/macro.ensure.html
.. |ensure| replace:: ``ensure!``
.. _matches_account: https://docs.rs/concordium-std/latest/concordium_std/enum.Address.html#method.matches_account
.. |matches_account| replace:: ``matches_account``
.. _self_balance: https://docs.rs/concordium-std/latest/concordium_std/struct.ExternHost.html#tymethod.self_balance
.. |self_balance| replace:: ``self_balance``
.. _invoke_transfer: https://docs.rs/concordium-std/latest/concordium_std/struct.ExternHost.html#tymethod.invoke_transfer
.. |invoke_transfer| replace:: ``invoke_transfer``
.. _mutable: https://docs.rs/concordium-std-derive/latest/concordium_std_derive/attr.receive.html#mutable-function-can-mutate-the-state
.. |mutable| replace:: ``mutable``

.. _piggy-bank-writing:

=====================================
Writing the piggy bank smart contract
=====================================

This is the first :ref:`part of a tutorial<piggy-bank>` on smart contract
development. In this part you will focus on how to write a smart contract in the
Rust_ programming language using the |concordium-std| library.

Preparation
===========

Set up a new smart contract project by following the guide :ref:`setup-contract` and return to this point afterwards.

Bring in the standard library
=============================

The source code of your smart contract is going to be in the ``src`` directory,
which already contains a ``lib.rs`` file, assuming you follow the above guide
to set up your project.

The smart contract template also includes some example tests under the ``tests`` directory,
which you can delete for now. You will come back to tests later in this tutorial.

In ``lib.rs``, start by bringing everything from the |concordium-std|_ library into scope
by adding the line:

.. code-block:: rust

   use concordium_std::*;

This library contains everything needed to write a smart contract. It
provides convenient wrappers around some low-level operations making your code
more readable, and although it is not strictly necessary to use this, it will
save a lot of code for the vast majority of contract developers.

Piggy bank contract
===================

The contract you are going to build in this tutorial is going to act as a classic
piggy bank. Everyone should be able to put money in the form of CCD into it, but only the owner
can smash it and retrieve the CCD inside. Once the piggy bank has been
smashed, it should not be possible to add CCD to it.

The piggy-bank smart contract is going to contain a function for setting up a
new piggy bank and two functions for updating a piggy bank; one is for everyone
to use for inserting CCD, the other is for the owner to smash the piggy bank and
prevent further interaction. It will also contain a method for everyone to view
the current state and balance of the piggy bank.

Specifying the state
====================

To implement a piggy bank you need to keep track of the amount of CCD it holds,
and you need to know whether it has been smashed. The blockchain will take care
of the first task for you since the chain keeps track of the balance of each smart-contract
instance. Therefore, you only need to maintain whether the piggy bank has been smashed,
which you do as part of the smart contract *state*.

In Rust you represent this state as an enum with a variant for the piggy bank
being intact and one for it being smashed:

.. code-block:: rust

   enum PiggyBankState {
       Intact,
       Smashed,
   }

Since the state of your smart contract is going to be stored on the blockchain,
you need to specify how the contract state should be serialized.
When using the |concordium-std|_ library, this all boils down to your type
for the contract state having to implement the |Serialize|_ [#s]_ trait exposed by
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

Later in this tutorial, you will also need to check the state for equality and
return a copy of the state, so you also derive the trait implementation for
``PartialEq``, ``Eq``, ``Clone``, and ``Copy``:

.. code-block:: rust

   #[derive(Serialize, PartialEq, Eq, Debug, Clone, Copy)]
   enum PiggyBankState {
       Intact,
       Smashed,
   }

.. [#s] In certain cases, the ``Serial`` and ``DeserialWithState``
        traits are needed instead of ``Serialize``. See
        :ref:`serialize-state-and-parameters` for more information.

Set up a piggy bank
===================

Now you will write the function to set up a new piggy bank, which in turn means
specifying the init function for a smart contract.
A smart contract must specify an init function, which is called when new
instances of the contract are created, and is used to set up the initial state of
the contract instance.

.. note::

   A Rust_ developer could compare init functions with the convention of
   having a ``new`` function for types, and the smart contract as the type.

   If you have experience with object-oriented programming, it might help to
   think of a smart contract as a *class*, the init function as a
   *constructor*, and smart contract instances as *objects*.

In the case of the piggy bank; the initial state should be set to ``Intact``.


The ``#[init]`` macro
---------------------

In Rust_ an init function can be specified as a regular function that is annotated
with a procedural macro from |concordium-std| called |init|_.
This allows you to create a new piggy bank as follows:

.. code-block:: rust

   #[init(contract = "PiggyBank")]
   fn piggy_init(
       _ctx: &InitContext,
       _state_builder: &mut StateBuilder,
   ) -> InitResult<PiggyBankState> {
       Ok(PiggyBankState::Intact)
   }

The macro saves you the details of setting up the function as an external
function and serializing the state to bytes. The macro also provides an interface for
accessing information about the context of the smart-contract call.

The init function requires a name for the smart contract, in this case
``"PiggyBank"``. The name [#valid-name]_ is used as part of the exported
function, and is how you distinguish this smart contract from other smart
contracts in your module.

.. code-block:: rust

   #[init(contract = "PiggyBank")]

The init function takes two arguments:

- ``ctx: &InitContext``, which is a struct with a number of
  getter functions for accessing information about the current context, such as
  the account that invoked this contract, the supplied arguments, and information about the state of the blockchain
- ``state_builder: &mut StateBuilder``, which has functions for creating
  sets, maps, and boxes that effectively utilize the way contract state is
  stored on the chain.

The return type of the function is ``InitResult<PiggyBankState>``, which is an
alias for ``Result<PiggyBankState, Reject>``. The returned state is serialized
and set as the initial state of the smart contract.

Initializing the piggy bank state to be ``Intact`` is then straightforward:

.. code-block:: rust

   Ok(PiggyBankState::Intact)

A more complex smart contract would take a parameter and check during
initialization that everything is set up as expected. This will be described later.

.. [#valid-name] The **contract name** is only allowed to consist of ASCII alphanumeric or
   punctuation characters, and is not allowed to contain the ``.`` symbol. The **function name** is only allowed to consist of ASCII alphanumeric or punctuation characters. The **function name** together with **contract name** must not exceed 99 characters.

Define interaction with piggy banks
===================================

You have now defined how instances of your smart contract are created, and the
smart contract is in principle a valid contract.
However, you would also like to define how to interact with instances of your
contract, specifically how to add CCD to it and how to smash a piggy bank.

A smart contract can expose zero or more functions for interacting with an
instance.
These functions are called receive functions.
They can access the state of the instance and the blockchain and perform
actions, such as transferring CCD to an account or invoking another contract instance.
Receive functions are immutable/readonly by default, which means that they
cannot mutate the state.
You will look at mutable receive methods when it's time to implement smashing the piggy bank.

.. note::

   For a Rust_ developer, receive functions are like methods with
   a reference to `self`. The reference is immutable by default, and mutable for
   mutable receive functions.

   A continuation of the analogy to object-oriented programming:
   receive functions correspond to object methods.

The ``#[receive(...)]`` macro
-----------------------------

In Rust, receive functions can be specified using the procedural macro
|receive|_, which, like |init|_, is used to annotate a function and sets up an
external function and supplies you with an interface for accessing the context.
But, unlike the |init|_ macro, the function for |receive|_ is supplied with
a reference to the host (through which you can access the state of the instance):

.. code-block:: rust

   #[receive(contract = "MyContract", name = "some_interaction")]
   fn some_receive(
       ctx: &ReceiveContext,
       host: &Host<MyState>,
   ) -> ReceiveResult<MyReturnValue> {
       todo!()
   }

The ``contract`` attribute supplies the name of the contract to the macro.
This name should match the name in the corresponding attribute in |init|_
(``"PiggyBank"`` in our case). It also requires a name to identify this
particular receive function using ``name``. The name and contract attributes
each have to be unique within a smart contract module.

The return type of the function is ``ReceiveResult<MyReturnValue>``, which is an alias for
``Result<MyReturnValue, Reject>``.
You will learn more about return values when implementing a view function for
the piggy bank.

Inserting CCD
-------------

The first interaction you will specify for your piggy bank is how to insert CCD into it.
You start by defining a receive function as:

.. code-block:: rust

   #[receive(contract = "PiggyBank", name = "insert")]
   fn piggy_insert(
       _ctx: &ReceiveContext,
       host: &Host<PiggyBankState>,
   ) -> ReceiveResult<()> {
       todo!()
   }

Make sure that the contract name matches the one you use for the |init|_ macro,
and name the receive function ``insert``.
The function will not need to use the ``ctx`` context, so by convention, you
prefix the argument with ``_``.

In the function body you have to make sure that the piggy bank is still intact: the
smart contract should reject any messages if the piggy bank is smashed:

.. code-block:: rust

   if *host.state() == PiggyBankState::Smashed {
      return Err(Reject::default());
   }

Since returning early is a common pattern when writing smart contracts, and in
Rust_ in general, |concordium-std| exposes a |bail|_ macro:

.. code-block:: rust

   if *host.state() == PiggyBankState::Smashed {
      bail!();
   }

Furthermore, you can use the |ensure|_ macro for returning early depending on a condition:

.. code-block:: rust

   ensure!(*host.state() == PiggyBankState::Intact);

From this line, you will know that the state of the piggy bank is intact and all
you have left to do is accept the incoming amount of CCD.
The CCD balance is maintained by the blockchain, so there is no need for you to
maintain this in your contract. The contract just needs to produce an empty return value:

.. code-block:: rust

   Ok(())

So far you have the following definition of the receive function:

.. code-block:: rust

   #[receive(contract = "PiggyBank", name = "insert")]
   fn piggy_insert(
       _ctx: &ReceiveContext,
       host: &Host<PiggyBankState>,
   ) -> ReceiveResult<()> {
       ensure!(*host.state() == PiggyBankState::Intact);
       Ok(())
   }

The definition of how to add CCD to the piggy bank is almost done, but one important detail is
missing.
If you were to send CCD to the current smart contract, the transaction
would be rejected. This is a safety feature of |concordium-std|,
which, by default, prevents init and receive functions
from accepting CCD.

The reason for rejecting CCD by default is to reduce the risk of creating a smart
contract that accepts CCD without the ability to retrieve it again; any CCD passed to such a contract
would be *inaccessible forever*.

To be able to accept CCD, you have to add the ``payable`` attribute to the |receive| macro.
Now the function is required to
take an extra argument ``amount: Amount``, which represents the amount that is passed to the receive
function.

.. code-block:: rust
   :emphasize-lines: 1, 5

   #[receive(contract = "PiggyBank", name = "insert", payable)]
   fn piggy_insert(
       _ctx: &ReceiveContext,
       host: &Host<PiggyBankState>,
       _amount: Amount,
   ) -> ReceiveResult<()> {
       ensure!(*host.state() == PiggyBankState::Intact);
       Ok(())
   }

As mentioned above, since the blockchain is maintaining the balance of our smart contract, you
do not have to do that yourself, and the ``amount`` is not used by your contract.

.. note::

   The ``payable`` attribute also exists for the |init| macro.

.. _smashing-the-piggy-bank-writing:

Smashing a piggy bank
---------------------

Now that you can insert CCD into a piggy bank, you also need to define how to
smash one.
Remember, you only want the owner of the piggy bank (smart contract
instance) to be able to smash it and only if it isn't already smashed.
It should set its state to be smashed and transfer all of its CCD to the owner.

Again you use the |receive|_ macro to define the smash function:

.. code-block:: rust

   #[receive(contract = "PiggyBank", name = "smash")]
   fn piggy_smash(
       ctx: &ReceiveContext,
       host: &Host<PiggyBankState>,
   ) -> ReceiveResult<()> {
       todo!()
   }

Ensure that the contract name matches the one of your smart contract and name this function ``smash``.

To access the contract owner, use a getter function exposed by the context
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

To compare the ``sender`` with ``owner`` you can use the |matches_account|_
function defined on the ``sender``, which will only return true if the sender is
an account address that is equal to the owner:

.. code-block:: rust

   ensure!(sender.matches_account(&owner));

Next, ensure that the state of the piggy bank is ``Intact``, just like previously:

.. code-block:: rust

   ensure!(*host.state() == PiggyBankState::Intact);

At this point you know the piggy bank is still intact and the sender is the
owner, meaning you now get to the smashing part.
But there is one problem.
The state is immutable, so you first need to make the receive function mutable by
adding the |mutable|_ attribute to the |receive|_ macro.

.. code-block:: rust
   :emphasize-lines: 1, 4

   #[receive(contract = "PiggyBank", name = "smash", mutable)]
   fn piggy_smash(
       ctx: &ReceiveContext,
       host: &mut Host<PiggyBankState>,
   ) -> ReceiveResult<()> {
       let owner = ctx.owner();
       let sender = ctx.sender();
       ensure!(sender.matches_account(&owner));
       ensure!(*host.state() == PiggyBankState::Intact);

       todo!()
   }

This gives you a mutable reference to the ``host``, through which you can access
the mutable state with the ``state_mut`` function. You then set the state to
``Smashed``, preventing further insertions of CCD:

.. code-block:: rust

   *host.state_mut() = PiggyBankState::Smashed;

Lastly, you need to empty the piggy bank. To do that, transfer all the CCD
of the smart-contract instance to an account.

To transfer CCD from a smart contract instance you use the |invoke_transfer|_
method on the ``host``. For this, you need to provide the address of the receiving
account and the amount to transfer.
In this case the receiver is the owner of the piggy bank and the amount is the
entire balance of the piggy bank.

The ``host`` has a getter function for reading
the current balance of the smart contract instance, which is called
|self_balance|_:

.. code-block:: rust

   let balance = host.self_balance();

You already have a variable with the address of the contract owner, so you can
use that to invoke the transfer:

.. code-block:: rust

   Ok(host.invoke_transfer(&owner, balance)?)

A transfer can fail in two ways, either your contract has insufficient funds, or
the receiver account does not exist. Neither can occur in this contract. This is
because it tries to transfer its own balance, and because a contract always has
a valid owner. The code propagates the error out with the ``?``, which will
become useful when testing the contract.

The final definition of the "smash" receive function is then:

.. code-block:: rust

   #[receive(contract = "PiggyBank", name = "smash", mutable)]
   fn piggy_smash(
       ctx: &ReceiveContext,
       host: &mut Host<PiggyBankState>,
   ) -> ReceiveResult<()> {
       let owner = ctx.owner();
       let sender = ctx.sender();
       ensure!(sender.matches_account(&owner));
       ensure!(*host.state() == PiggyBankState::Intact);

       *host.state_mut() = PiggyBankState::Smashed;

       let balance = host.self_balance();
       Ok(host.invoke_transfer(&owner, balance)?)
   }

.. .. note::
   Since a blockchain is a decentralized system, you might think you have to
   worry about the usual problems when dealing with mutable state. Problems
   such as race conditions, but the semantics of smart contracts require the
   execution to be atomic in order to reach consensus.

Viewing the state
-----------------

Now that you can smash and insert CCD into a piggy bank, you can add a way to
check the current state and balance of the piggy bank.
This is what the return values of receive methods are for:

.. code-block:: rust
   :emphasize-lines: 5, 8

   #[receive(contract = "PiggyBank", name = "view")]
   fn piggy_view(
       _ctx: &ReceiveContext,
       host: &Host<PiggyBankState>,
   ) -> ReceiveResult<(PiggyBankState, Amount)> {
       let current_state = *host.state();
       let current_balance = host.self_balance();
       Ok((current_state, current_balance))
   }

The ``piggy_view`` method gets a copy of the state and the balance and returns
it as a tuple of type ``(PiggyBankState, Amount)``, which is also specified in
the return type.

A more complex smart contract might have multiple view functions that return
different parts of the state or return a value computed from the state.

.. note::

   To view return values of a contract instance on the chain, see the guide :ref:`invoke-instance`.

.. _cargo-concordium-build:

You now have all the parts for your piggy bank smart contract. Before you start testing it, check that it builds by running:

.. code-block:: console

   $cargo concordium build

This should succeed if everything is set up correctly. Otherwise, compare your
code with the one found here_.

.. _here: https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/piggy-bank/part1/src/lib.rs

To continue with the tutorial click :ref:`here<piggy-bank-testing>`.
