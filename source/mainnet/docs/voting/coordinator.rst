.. _coordinator:
.. include:: ../../variables.rst

=========================
Election coordinator tool
=========================

The coordinator tool is an administrative tool to coordinate the parts of the election that are not done by voters or guardians.

The coordinator of the election is not trusted per se. :ref:`All the actions it can do can be verified by any other party<verify-election-result>`. The coordinator tool can mostly run without access to any secrets to verify election results. However, some commands take ``admin keys`` where the result of operations can be posted in the contract for everybody to see. If such a result is present in the contract and another user runs the coordinator tool, the tool will check that the result it computed and the one posted in the contract agree.

Build and run
=============

To build the election coordinator tool, you need:

* Rust 1.74 or newer
* The repository with initialized submodules

First, initialize the repository submodules:

.. code-block:: console

    git submodule update --init --recursive

Then, build the tool:

.. code-block:: console

    cargo build --release

This will produce a single binary election-coordinator in the target/release directory.

Use the tool
============

The election coordinator tool helps manage the election process through various commands. The key functionality includes:

* Managing voting weights (initial and final calculations)
* Setting up and configuring new elections
* Processing vote tallies
* Handling guardian operations
* Publishing final results

For a complete list of commands, their parameters, and usage examples, see the `coordinator-tool documentation <https://github.com/Concordium/concordium-governance-committee-voting/tree/main/coordinator-tool>`_.
