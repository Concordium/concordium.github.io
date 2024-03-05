.. _coordinator:

=========================
Election coordinator tool
=========================

The coordinator tool is an administrative tool to coordinate the parts of the election that are not done by voters or guardians.

The coordinator of the election is not trusted per se. All the actions it can do can be verified by any other party. The coordinator tool can be mostly run without access to any secrets to verify results of the election. However some commands take "admin keys" where the result of operations can be posted in the contract for everybody to see. If such a result is present in the contract and another user runs the coordinator tool, the tool will check that the result it computed and the one posted in the contract agree.

Build and run
=============

To build the tool make sure you have the repository submodules initialized:

.. code-block:: console

    git submodule update --init --recursive

Build the tool by running:

.. code-block:: console

    cargo build --release

This will produce a single binary election-coordinator in target/release directory.

Commands
========

The tool has the following subcommands. All commands have a ``--help`` option which explains the input and output parameters.

Get the list of initial weights
-------------------------------

Use the ``initial-weights`` command to gather the average amount of CCD on an account in the given period. The intention is that this command is used to produce the initial weights of each account prior to the election starting. The output of this command is a CSV file used in the ``final-weights`` command after the election.

Example

.. code-block:: console

    election-coordinator --node http://localhost:20001 initial-weights  --start 2024-01-01T00:00:00Z --end 2024-01-03T00:00:00Z --out initial-weights.csv

The weights are stored in the initial-weights.csv file.

Create a new election instance
------------------------------

Use the ``new-election`` command to create the necessary files and the contract for a new election. In particular it will:

- create an election manifest based on the inputs

- create election parameters based on the inputs

- create a new smart contract instance.

.. code-block:: console

    election-coordinator new-election --module ../contracts/concordium-governance-committee-election/concordium-out/module.wasm.v1 --threshold 1 --admin ../test-scripts/keys/2yJxX711aDXtit7zMu7PHqUMbtwQ8zm7emaikg24uyZtvLTysj.export --election-start '2024-02-01T00:00:00Z' --election-end '2024-02-07T00:00:00Z' --delegation-string 'This is how you delegate' --manifest-out election-manifest.json --parameters-out election-parameters.json --voters-file initial-weights.csv --guardian 31bTNa42u1zZWag2bknEy7VraeJUozXsJMN1DFjQp7E5YR6a3G --guardian 4PF6BH8bKvM48b8KNYdvGW6Sv3B2nqVRiMnWTj9cvaNHJQeX3D --candidate 'http://localhost:7000/candidate1.json' --candidate 'http://localhost:7000/candidate2.json' --node 'https://grpc.testnet.concordium.com:20000' --base-url https://gcvoting.testnet.concordium.com`

The options are:

``--admin`` is the path to the keys that will be used to create the contract, and serve as the admin

``--module`` is the path to the compiled election smart contract in wasm.v1 format

``--threshold`` is the threshold for the number of guardians needed for decryption of the result of the election

``--election-start`` and ``--election-end`` date and time for election start and end

``--delegation-string`` is the string that will be used to determine vote delegations. This is the string users delegating a vote in a wallet must enter in a transaction memo.

``--voters-file`` is the initial-weights.csv file for the election

``--guardian`` (repeated) is guardian account addresses. At least one is needed.

``--candidate`` (repeated) is a URL to a candidate. The order here matters, since that will be the order of selections in the election. The link is to the candidate metadata. The hash of the metadata will be embedded in the contract.

``--base-url`` the URL where the election server is accessible, e.g., https://gcvoting.testnet.concordium.com

The tool generates three things:

- An election manifest which is output to the location specified by ``--manifest-out``

- Election parameters which are output to the location specified by ``--parameters-out``

- A new smart contract instance which is printed to stderr, for example, ``Deployed new contract instance with address <7838,0> using transaction hash 3b3e61a01fd3ecefddecbe6760c6ba3d951f4d0a8947d63990ffe9219249de27``.

Get the final weights
---------------------

Use the ``final-weights`` command to compute the final weights taking into account the delegation. It takes initial weights in the initial-weights.csv into account and any delegations during the election period, outputting the result to final-weights.csv. The output of this command is used in the tally command.

Example

.. code-block:: console

    election-coordinator --node http://localhost:20001 final-weights --contract '<7795,0>' --initial-weights initial-weights.csv --final-weights final-weights.csv

Tally the votes and register the encrypted tally in the contract
----------------------------------------------------------------

The ``tally`` command uses the final-weights.csv generated above to compute the encrypted tally of the election and optionally post it in the smart contract. This sums up all the votes during the election period and scales them according to the specified weights.

.. code-block:: console

    election-coordinator --node http://localhost:20001 tally --contract '<7795,0>' --final-weights final-weights.csv --admin-keys ../test-scripts/keys/2yJxX711aDXtit7zMu7PHqUMbtwQ8zm7emaikg24uyZtvLTysj.export

The same command without the ``--admin-keys`` option will tally the votes and check that the tally matches what is registered in the contract.

Decrypt the final result
------------------------

Use the ``final-result`` command after the guardians have each decrypted their share of the encrypted tally. This command can be used to combine the shares and post the result in the contract, or if the result is already posted, to check that it matches what you compute.

.. code-block:: console

    election-coordinator  --node http://localhost:20001 final-result --contract '<7795,0>' --admin-keys ../test-scripts/keys/2yJxX711aDXtit7zMu7PHqUMbtwQ8zm7emaikg24uyZtvLTysj.export```

This will look up all the decryption shares provided by the guardians, check that they are valid, and if there are enough of the valid ones, it will decrypt the final result and publish it in the smart contract.

If the ``admin-keys`` are not provided the command will do everything else as with the keys, except it will check if the result in the contract matches or not, and report the result.
