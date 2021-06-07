.. _contract-instances:

========================
Smart contract instances
========================

.. todo::

   - Clarify how instances relate to smart contracts relate to modules
     (e.g., right now it says that an instance is a module + state but the
     picture below shows instances as contracts + state).
   - Decide how exactly we should define smart-contract modules (as its own concept
     or as Wasm modules), and whether we should talk about them at all.
   - Decide whether we should have a concrete code example, and whether it should
     be in Wasm or Rust or perhaps pseudocode.
   - Consider having a picture that explains the relationship between modules and instances.

A **smart contract instance** is a smart contract module together with a
specific state and an amount of GTU tokens.
Multiple smart contract instances can be created from the same module.
For example, for an :ref:`auction <auction>` contract, there could be multiple instances, each
one dedicated to bidding for a specific item and with its own participants.

Smart contract instances can be created from a deployed :ref:`smart contract
module<contract-module>` via the ``init`` transaction which invokes the
requested function in the smart contract module. This function can take a
parameter.
Its end result is required to be the initial smart contract state of the
instance.

.. note::

   A smart contract instance is often just called an *instance*.

.. graphviz::
   :align: center
   :caption: Example of smart contract module containing two smart contracts:
             Escrow and Crowdfunding. Each contract has two instances.

   digraph G {
       rankdir="BT"

       subgraph cluster_0 {
           label = "Module";
           labelloc=b;
           node [fillcolor=white, shape=note]
           "Crowdfunding";
           "Escrow";
       }

       subgraph cluster_1 {
           label = "Instances";
           style=dotted;
           node [shape=box, style=rounded]
           House;
           Car;
           Gadget;
           Boardgame;
       }

       House:n -> Escrow;
       Car:n -> Escrow;
       Gadget:n -> Crowdfunding;
       Boardgame:n -> Crowdfunding;
   }

State of a smart contract instance
==================================

The state of a smart contract instance consists of two parts, the user-defined
state and the amount of GTU the contract holds, i.e., its *balance*. When
referring to state we typically mean only the user-defined state. The reason for
treating the GTU amount separately is that GTU can only be spent and
received according to rules of the network, e.g., contracts cannot create
or destroy GTU tokens.

.. _contract-instances-init-on-chain:

Instantiating a smart contract on-chain
=======================================

Every smart contract must contain a function for creating smart contract
instances. Such a function is referred to as the *init function*.

To create a smart contract instance, an account sends a special transaction with
a reference to the deployed smart contract module and the name of the
init function to use for instantiation.

The transaction can also include an amount of GTU, which is added to the balance
of the smart contract instance. A parameter to the function is supplied as part
of the transaction in the form of an array of bytes.

To summarize, the transaction includes:

- Reference to the smart contract module.
- Name of the init function.
- Parameter to the init function.
- Amount of GTU for the instance.

The init function can signal that it does not wish to create a new instance
with those parameters. If the init function accepts the parameters, it sets
up the initial state of the instance and its balance. The instance is given an
address on the chain and the account who sent the transaction becomes the owner
of the instance. If the function rejects, no instance is created and only the
transaction for attempting to create the instance is visible on-chain.

.. seealso::

   See :ref:`initialize-contract` guide for how to initialize a
   contract in practice.

Instance state
==============

Every smart contract instance holds its own state which is represented on-chain
as an array of bytes. The instance uses functions provided by the host
environment to read, write and resize the state.

.. seealso::

   See :ref:`host-functions-state` for a reference of these functions.

Smart contract state is limited in size. Currently the limit on smart contract
state is 16KiB.

.. seealso::

   Check out :ref:`resource-accounting` for more on this.

Interacting with an instance
============================

A smart contract can expose zero or more functions for interacting with an
instance, referred to as *receive functions*.

Just like with init functions, receive functions are triggered using
transactions, which contain some amount of GTU for the contract and an argument
to the function in the form of bytes.

To summarize, a transaction for smart-contract interaction includes:

- Address to smart contract instance.
- Name of the receive function.
- Parameter to the receive function.
- Amount of GTU for the instance.

.. _contract-instance-actions:

Logging events
==============

.. todo::

   Explain what events are and why they are useful.
   Rephrase/clarify "monitor for events".

Events can be logged during the execution of smart contract functions. This is
the case for both init and receive functions. The logs are designed for
off-chain use, so that actors outside of the chain can monitor for events and
react to them. Logs are not accessible to smart contracts, or any other actor on
the chain. Events can be logged using a function supplied by the host
environment.

.. seealso::

   See :ref:`host-functions-log` for the reference of this function.

These event logs are retained by bakers and included in transaction summaries.

Logging an event has an associated cost, similar to the cost of writing to the
contract's state. In most cases it would only make sense to log a few bytes to
reduce cost.

.. _action-descriptions:

Action descriptions
===================

A receive function returns a *description of actions* to be executed by
the host environment on the chain.

The possible actions that a contract can produce are:

- **Accept** is a primitive action that always succeeds.
- **Simple transfer** of GTU from the instance to the specified account.
- **Send**: invoke receive function of the specified smart contract instance,
  and optionally transfer some GTU from the sending instance to the receiving
  instance.

If an action fails to execute, the receive function is reverted, leaving
the state and the balance of the instance unchanged. However,

- the transaction that triggers the (unsuccessful) receive function is still added to the chain, and
- the transaction cost, including the cost of executing the failed action,
  is deducted from the sending account.

Processing multiple action descriptions
---------------------------------------

You can chain action descriptions using the **and** combinator.
An action-description sequence ``A`` **and** ``B``

1) Executes ``A``.
2) If ``A`` succeeds, executes ``B``.
3) If ``B`` fails the whole action sequence fails (and the result of ``A`` is reverted).

Handling errors
---------------

Use the **or** combinator to execute an action in case that a previous action fails.
An action description ``A`` **or** ``B``

1) Executes ``A``.
2) If ``A`` succeeds, stops executing.
3) If ``A`` fails, executes ``B``.

.. graphviz::
   :align: center
   :caption: Example of an action description, which tries to transfer to Alice
             and then Bob, if any of these fails, it will try to transfer to
             Charlie instead.

   digraph G {
       node [color=transparent]
       or1 [label = "Or"];
       and1 [label = "And"];
       transA [label = "Transfer x to Alice"];
       transB [label = "Transfer y to Bob"];
       transC [label = "Transfer z to Charlie"];

       or1 -> and1;
       and1 -> transA;
       and1 -> transB;
       or1 -> transC;
   }

.. seealso::

   See :ref:`host-functions-actions` for a reference of how to create the
   actions.

The whole action tree is executed **atomically**, and either leads to updates
to all the relevant instances and accounts, or, in case of rejection, to payment
for execution, but no other changes. The account which sent the initiating
transaction pays for the execution of the entire tree.
