.. include:: ../../variables.rst
.. _Rust: https://www.rust-lang.org/
.. _concordium-std: https://docs.rs/concordium-std/latest/concordium_std/index.html
.. |concordium-std| replace:: ``concordium-std``
.. _voting-sc:

=========================
The Voting Smart Contract
=========================

This is the first :ref:`part of a tutorial<voting-dapp>` on smart contract development. In this part you will focus on how to write a smart contract in the Rust_ programming language using the |concordium-std| library.

The `voting smart contract <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/voting>`_ allows for conducting an election with several voting options. When the election is initialized, a deadline is set, after which no more votes may be cast. Only accounts (not other smart contracts) are eligible to vote. Each account can change its selected voting option as often as it desires until the deadline is reached.

.. warning::

   This contract is not meant for production. It is an example to illustrate how to use the standard library and the tooling Concordium provides. There is no claim that the logic of the contract is reasonable or safe. Do not use these contracts as-is for anything other than experimenting.

Preparation
===========

Before you start, make sure to have the necessary tooling to build Rust contracts. The guide :ref:`build-contract` shows you how to do this.

You also need to set up a new smart contract project. Follow the guide :ref:`setup-contract` and return to this point afterwards.

Basic setup
===========

The source code of your smart contract is going to be in the ``src`` directory, which already contains the file ``lib.rs``, assuming you follow the above guide
to set up your project.

In the ``lib.rs`` file, the first line brings everything from the |concordium-std|_ library into scope:

.. code-block:: rust

   use concordium_std::*;

This library contains everything needed to write a smart contract, such as some parameters, functions, and tests. It provides convenient wrappers around some low-level operations making your code more readable, and although it is not strictly necessary to use this, it will save a lot of code for the vast majority of contract developers.

The voting contract should allow for the following operations:

- `initializing` the election.
- `viewing` general information about the election.
- `voting` for one of the options.
- `tallying the votes` for a requested voting option.

A few basic functions are necessary for these operations to work:

- ``init``
- ``view``
- ``vote``
- ``get_votes``

Now, let's examine the code in `the example voting smart contract here <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/voting/src/lib.rs>`_. `Tests <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/voting/tests/tests.rs>`_ are also written along with the contract, but will not be further explained in this tutorial.

The ``ElectionConfig`` data structure defines the configuration of the smart contract and is an input to the ``init`` function. In the example code, it contains a description of the election, the voting options, and the deadline of the election. Voting options is provided as a list of strings, however, it is important to remember that there is a limit to the parameter size (65535 bytes), so the maximum size of the list of voting options is large, but limited. For more information, see :ref:`Contract instance limits<contract-instance-operations>`.

The ``view`` function also returns the ``ElectionConfig`` type, so that users can, for instance, see the available options to vote for.

In the ``vote`` function, the contract specifies who may vote and when (only accounts may vote and only before the deadline). If a contract tries to vote, an error occurs.

.. code-block:: rust

    let acc = match ctx.sender() {
        Address::Account(acc) => acc,
        Address::Contract(_) => return Err(VotingError::ContractVoter),
    };

And if the deadline has passed, an error occurs.

.. code-block:: rust

    ensure!(
        ctx.metadata().slot_time() <= host.state().config.deadline,
        VotingError::VotingFinished
    );

``get_votes`` gets the number of votes for a specific voting option.

``State`` contains the state of the contract which can be mutated when invoking the ``vote`` entrypoint.

Initializing
------------

The election is open from the point in time that this smart contract is initialized until the deadline.

Performance considerations
--------------------------

An important aspect of the voting smart contract to highlight is the way that votes are tallied.

Note the data duplication in the ``State`` struct. Two ``HashMap``\ s are used: one that maps accounts to the option they voted for,
and one that maps voting options to the number of votes it has received. However, if you think about it, only the first ``HashMap``,
the ``ballots`` field is necessary. The tally can of course always be determined by examining the ballots field. This requires looping
over all ballots, counting how many votes exist for a specific option. However, such a loop would be practically unbounded, as it is only
limited by the number of votes. Such a loop could exhaust the energy budget of the smart contract functions, potentially making the smart
contract unusable and vulnerable to a kind of DDoS attack.

Thus, we favor duplicating the data in another ``HashMap`` where the vote count can be retrieved and updated in constant time.

It's important to keep these performance considerations in mind when writing smart contracts. In general, writing smart contracts requires a different methodology than most other usual software development.
Be sure to think carefully and read up on the common issues and security problems that may occur when you develop smart contracts.


In the next part of the tutorial, we will set up a frontend to make it easier to interact with the smart contract.
