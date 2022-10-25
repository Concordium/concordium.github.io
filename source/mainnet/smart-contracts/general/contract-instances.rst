.. _contract-instances:

========================
Smart contract instances
========================

A **smart contract instance** is a smart contract module together with a
specific state and an amount of CCD tokens.
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
state and the amount of CCD the contract holds, i.e., its *balance*. When
referring to state we typically mean only the user-defined state. The reason for
treating the CCD amount separately is that CCD can only be spent and
received according to rules of the network, e.g., contracts cannot create
or destroy CCD tokens.

.. _contract-instances-init-on-chain:

Instantiating a smart contract on-chain
=======================================

Every smart contract must contain a function for creating smart contract
instances. Such a function is referred to as the *init function*.

To create a smart contract instance, an account sends a special transaction with
a reference to the deployed smart contract module and the name of the
init function to use for instantiation.

The transaction can also include an amount of CCD, which is added to the balance
of the smart contract instance. A parameter to the function is supplied as part
of the transaction in the form of an array of bytes.

To summarize, the transaction includes:

- Reference to the smart contract module.
- Name of the init function.
- Parameter to the init function.
- Amount of CCD for the instance.

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
as a `prefix tree <https://en.wikipedia.org/wiki/Trie>`_, where nodes in the
tree can have data in the form of a byte array.
The instance uses functions provided by the host environment to create, delete,
and find nodes in the tree.
The host also provides functions for reading, writing, and resizing the byte array
held by a particular node in the tree.

.. seealso::

   See :ref:`host-functions-state` for a reference of these functions.

Interacting with an instance
============================

A smart contract can expose zero or more functions for interacting with an
instance, referred to as *receive functions*.

Just like with init functions, receive functions are triggered using
transactions, which contain some amount of CCD for the contract and an argument
to the function in the form of bytes.

To summarize, a transaction for smart-contract interaction includes:

- Address to smart contract instance.
- Name of the receive function.
- Parameter to the receive function.
- Amount of CCD for the instance.

Logging events
==============

Events can be logged during the execution of smart contract functions. This is
the case for both init and receive functions. The logs are designed for
off-chain use, so that actors outside of the chain can monitor the events and
react to them. Logs are not accessible to smart contracts, or any other actor on
the chain. Events can be logged using a function supplied by the host
environment.

.. seealso::

   See :ref:`host-functions-log` for the reference of this function.

These event logs are retained by bakers and included in transaction summaries.

Logging an event has an associated cost, similar to the cost of writing to the
contract's state. In most cases it would only make sense to log a few bytes to
reduce cost.

.. _contract-instance-operations:

Invoking operations
===================

A receive function can use the host environment to invoke two types of
operations during its execution.
The possible operations that a contract can perform are:

- **invoke_transfer**: transfer CCD from the instance to the specified *account*.
- **invoke_contract**: invoke receive function of the specified smart contract instance,
  and optionally transfer some CCD from the sending instance to the receiving
  instance.

If an operations fails, it returns an error, which the instance can choose to
handle, and the state and balance of the instance remain unchanged.
The account which sent the initiating transaction pays for the execution of the
entire receive function, including the cost of failed operations.

.. _contract-instance-upgradeability:

Upgradeability
==============

A V1 smart contract instance can choose to upgrade its module to a new V1 smart contract
module using the **upgrade** host function.
The host function takes a reference to a deployed smart contract module to use for
the upgraded instance and can only be called from a receive function.
The host function returns whether the upgrade succeeded, allowing the instance
to decide the next step. If the upgrade is successful any new invocations of the
upgraded instance uses the smart contract code in the new module.

.. warning::

   Upgrading a smart contract can be used to change the behavior completely,
   therefore it is important to carefully restrict access to any endpoint
   triggering a smart contract upgrade.

.. graphviz::
   :align: center
   :caption: Example of a smart contract instance 'Car' upgrading to a new module.

   digraph G {
       rankdir="BT"

       subgraph cluster_0 {
           label = "My module v1";
           labelloc=b;
           node [fillcolor=white, shape=note]
           escrow;
       }

       subgraph cluster_2 {
           label = "My module v2";
           labelloc=b;
           node [fillcolor=white, shape=note]
           escrow2;
       }

       subgraph cluster_1 {
           label = "Instances";
           style=dotted;
           node [shape=box, style=rounded]
           House;
           Car;
       }

       escrow[label="Escrow"]
       escrow2[label="Escrow"]

       House:n -> escrow;
       Car:n -> escrow [style=dashed, arrowhead=onormal];
       Car:n -> escrow2 [style=bold];
   }

Failing to upgrade
------------------

A smart contract instance can fail to upgrade for one of the following reasons:

- The new module does not exist.
- The new module does not contain a smart contract with a name matching the instance being upgraded.
- The new module is a smart contract module version 0.

Immutability
------------

Only the smart contract itself can trigger an upgrade of its module, meaning that smart contracts
are immutable, when they do not contain any code for triggering an upgrade.

Migration
---------

Triggering a smart contract instance upgrade changes the smart contract module starting from the next
invocation, meaning the execution will continue after the point of calling upgrade.
Since any new invocation of this instance uses the new smart contract module, the instance
can invoke itself and run code of the new module in the same transaction containing the upgrade.
This is useful for triggering a migration function in the new smart contract module and reject the
upgrade if the migration fails.

.. seealso::

   See :ref:`guide-upgradable-contract` for a guide of how to make a Rust smart contract
   upgradeable.
