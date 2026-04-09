.. _verify-election-result:
.. include:: ../../variables.rst

======================
Verify election result
======================

To verify that the result of an election is correctly computed as a third party, it is possible to execute a sequence of commands using the ``election-coordinator`` tool.

In general, all the commands listed require specification of the concordium node and contract address to target:

- The ``--node`` argument for all commands should specify the address of a node on the network the election exists on.

- The ``--contract`` argument for all commands should specify the contract address of the election you want to verify.

Commands
========

The tool has the following subcommands. All commands have a ``--help`` option which explains the input and output parameters.

Verify the list of initial weights
----------------------------------

Use the ``initial-weights verify`` command to gather the average amount of CCD on an account in the given period. The intention is that this command is used to produce the initial weights of each account prior to the election starting and verify these against the weights registered in the contract. The output of this command is a CSV file used in the ``final-weights`` command after the election.

Example

.. code-block:: console

    election-coordinator --node https://grpc.testnet.concordium.com:20000 initial-weights --out . verify --contract "<8836,0>"

The weights are stored in the initial-weights.csv file, and the corresponding parameters used to compute them are stored in initial-weights-params.json file in the current path directory.

Get the final weights
---------------------

Use the ``final-weights`` command to compute the final weights taking into account the delegation. It takes initial weights in the initial-weights.csv into account and any delegations during the election period, outputting the result to final-weights.csv. The output of this command is used in the tally command.

Example

.. code-block:: console

    election-coordinator --node https://grpc.testnet.concordium.com:20000 final-weights --contract "<8836,0>" --initial-weights initial-weights.csv --final-weights final-weights.csv

Verify the encrypted tally registered in the contract
-----------------------------------------------------

The ``tally`` command uses the final-weights.csv generated above to compute the encrypted tally of the election and optionally posts it in the smart contract. This sums up all the votes during the election period and scales them according to the specified weights.

.. code-block:: console

    election-coordinator --node https://grpc.testnet.concordium.com:20000 tally --contract "<8836,0>" --final-weights final-weights.csv

Verify the election result
--------------------------

Use the ``final-result`` command after the guardians have each decrypted their share of the encrypted tally. This command will be used to combine the shares and check that it matches what you compute.

.. code-block:: console

    election-coordinator --node https://grpc.testnet.concordium.com:20000 final-result --contract "<8836,0>"

This will look up all the decryption shares provided by the guardians, check that they are valid, and if there are enough of the valid ones, it will decrypt the final result and publish it in the smart contract.
