.. include:: ../../../variables.rst
.. _Rust: https://www.rust-lang.org/
.. _concordium-std: https://docs.rs/concordium-std/latest/concordium_std/index.html
.. |concordium-std| replace:: ``concordium-std``
.. _voting-sc:

=========================
The voting smart contract
=========================

This is the first :ref:`part of a tutorial<voting-dapp>` on smart contract development. In this part you will focus on how to write a smart contract in the Rust_ programming language using the |concordium-std| library.

The `voting smart contract <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/voting>`_ allows for conducting an election with several voting options. An `end_time` is set when the election is initialized. Only accounts are eligible to vote. Each account can change its selected voting option as often as it desires until the `end_time` is reached. No voting is possible after the `end_time`.

.. warning::

   This contract is not meant for production. It is an example to illustrate how to use the standard library and the tooling Concordium provides. There is no claim that the logic of the contract is reasonable or safe. Do not use these contracts as-is for anything other then experimenting.

Preparation
===========

Before you start, make sure to have the necessary tooling to build Rust contracts. The guide :ref:`setup-tools` shows you how to do this. Also, make sure to have a text editor for writing Rust.

You also need to set up a new smart contract project. Follow the guide :ref:`setup-contract` and return to this point afterwards.

You are now ready to write a smart contract for the Concordium blockchain!

Bring in the standard library
=============================

The source code of your smart contract is going to be in the ``src`` directory, which already contains the file ``lib.rs``, assuming you follow the above guide
to set up your project.

Open ``src/lib.rs`` in your editor and you'll see some code for :ref:`writing tests<piggy-bank-testing>`,
which you can delete for now. You will come back to tests later in this tutorial.

First, bring everything from the |concordium-std|_ library into scope by adding the line:

.. code-block:: rust

   use concordium_std::*;

This library contains everything needed to write a smart contract. It provides convenient wrappers around some low-level operations making your code more readable, and although it is not strictly necessary to use this, it will save a lot of code for the vast majority of contract developers.

Operations
==========

The example voting contract allows for:

- `initializing` the election;
- `vote` for one of the voting options;
- `getNumberOfVotes` for a requested voting option;
- `view` general information about the election.

.. Note::

    Vec<VotingOption> (among other variables) is an input parameter to the `init` function. Since there is a limit to the parameter size (65535 Bytes), the size of the Vec<VotingOption> is limited. For more information, see :ref:`Contract instance limits<contract-instance-operations>`.

Basic setup
------------

The example contract uses the ``concordium-std``. It contains some parameters, functions, and tests.

Parameters
^^^^^^^^^^

``InitParameter`` is called by the init function. In this example, it contains a description of the election, the voting options, and the end time of the election. Voting options is provided as a vector, however, it is important to remember that there is a limit to the parameter size (65535 bytes), so the size of ``Vec<VotingOption>`` is limited.

``VotingView`` is the return value for the view function.

``State<S: HasStateApi>``

Functions
^^^^^^^^^

A few basic functions are necessary for voting to work.

- init
- view
- vote
- get_votes

The vote and get_votes functions are unique in this example.

In the vote function, the contract specifies who may vote and when (accounts and before the end time). If a contract tries to vote, an error occurs.

.. code-block:: console

    let acc = match ctx.sender() {
        Address::Account(acc) => acc,
        Address::Contract(_) => return Err(VotingError::ContractVoter),
    };

And if the end time has passed, an error occurs.

.. code-block:: console

    ensure!(ctx.metadata().slot_time() <= host.state().end_time, VotingError::VotingFinished);


Tests
^^^^^

The tests from the ``concordium-std`` are included.

Initializing
------------

The election is open from the point in time that this smart contract is initialized until the `end_time`.
