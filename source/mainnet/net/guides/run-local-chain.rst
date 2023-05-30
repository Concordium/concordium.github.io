
.. _run-local-chain:

=================
Run a local chain
=================

This guide details how to run your own instance of the Concordium blockchain. This is useful when developing and testing smart contracts. Running your own chain also lets you control various aspects such as the genesis parameters, anonymity revokers, identity providers and foundation accounts.

The chain is run by a network of baker nodes that bake and finalize blocks. In the following minimal example you will set up a network comprised of a single baker node that runs *locally* on your system. Note, however, that the concepts demonstrated here equally apply to any number of baker nodes configured in a LAN or WAN setting.

.. Note::

    Running your own local chain is an advanced process and not applicable for all use cases. Users with little or no blockchain experience should not attempt to run a local chain. If you run into issues while installing, configuring, and running your local chain, contact `Concordium support <http://support.concordium.software>`_.

Prerequisites
=============
You need a working installation of the Concordium Node distribution version 5 or above, instances of which will be used to run the baker node(s), :ref:`genesis block<glossary-genesis-block>` data which specifies your local chain and sets of credentials for baker accounts of the chain. The number of sets of credentials needed will thus depend on the desired number of bakers in the network, which in this example is 1.

Installing the node distribution
--------------------------------
Concordium Node releases exist for Ubuntu, MacOS, Windows, and Docker. See the :ref:`Node Requirements<node-requirements>` section for information on system requirements and detailed instructions on how to obtain, run, and manage a node. To run a baker, you need a Concordium node binary supplied with one of these distributions in your path. The name of the binary will have ``concordium-`` as its prefix but depend on the distribution, so you may have to confer with the installation instructions to figure out the exact name. Upon successful installation of the distribution, verify that the binary exists in your path at the required version:

.. code-block:: console

    $ concordium-node --version
    concordium_node 5.3.2

.. Note::

   The node distributions provide commands for running and managing nodes on :ref:`Mainnet<glossary-mainnet>` and :ref:`Testnet<glossary-testnet>`. Ignore these since you are targeting your own chain and only need the binary.


Generating genesis data and account credentials
-----------------------------------------------
You use the `genesis-creator <https://github.com/Concordium/concordium-misc-tools/tree/main/genesis-creator>`_ tool to generate genesis block data and credentials for the foundation and (initial) baker accounts.

Building the tool
^^^^^^^^^^^^^^^^^

To build the tool you need a working `Rust compiler <https://www.rust-lang.org/tools/install>`_ of version 1.65 or higher. After installing it, verify that `rustc` exists in your path at the required version:

.. code-block:: console

    $ rustc --version
    rustc 1.68.2 (9eb3afe9e 2023-03-27)

.. Note::

    The recommended method to install Rust is through `rustup <https://rustup.rs/>`_. After installing ``rustup``, the Rust toolchain can be installed by issuing ``rustup toolchain install 1.68``.

To build the ``genesis-creator`` tool, do:

.. code-block:: console

    cargo install --git https://github.com/Concordium/concordium-misc-tools.git genesis-creator --locked

This produces the binary ``~/.cargo/bin/genesis-creator`` which is run to generate the genesis data.

Running the tool
^^^^^^^^^^^^^^^^

The ``genesis-creator`` tool uses a TOML configuration file format for specifying parameters from which the genesis data is generated. The TOML file specifies:

* the initial protocol version
* cryptographic parameters
* anonymity revokers
* identity providers
* foundation accounts
* keys for updating the chain
* various parameters for the genesis

Furthermore, it specifies where to save the output that is used to invoke the node binary. Most of these options are of little importance when testing smart contracts and the easiest way to get started is to piggyback off of the example configuration file ``single-baker-example-p5.toml`` found `here <https://raw.githubusercontent.com/Concordium/concordium-misc-tools/9d347761aadd432cbb6211a7d7ba38cdc07f1d11/genesis-creator/examples/single-baker-example-p5.toml>`_. Inspecting the configuration reveals that it specifies an initial protocol version of 5, to output credentials for 1 baker account, 1 foundation account and 100 regular accounts. It specifies the system time at generation for the genesis time and finally specifies 5 seconds as the average time per block.

Further inspection of the tables at the ``accounts`` keys reveals that the baker account has an initial balance of 3.5 * 10^15 microCCD and stake of 3.0 * 10^15 microCCD, the foundation account has an initial balance of 10^16 microCCD and that the regular accounts each have an initial balance of 2.0 * 10^12. You can change the initial stake and balances if desired. The number of credentials produced for each type of account can also be adjusted by setting the values of the ``repeat`` keys to your choosing.

.. Note::

    Note that the staked amount needed to participate in the finalization committee is some fraction of the total amount of existing CCD. The total amount is the sum of the balances of all the baker and foundation accounts specified in the genesis configuration file. In this particular example, the stake is sufficient for baking.

Save the file as ``single-baker-example-p5.toml`` and generate the genesis data:

.. code-block:: console

    $ ~/.cargo/bin/genesis-creator generate --config ./single-baker-example-p5.toml
    Deleting any existing directories.
    Account keys will be generated in ./accounts
    Chain update keys will be generated in ./update-keys
    Identity providers will be generated in ./idps
    Anonymity revokers will be generated in ./ars
    Baker keys will be generated in ./bakers
    Cryptographic parameter will be generated in ./global
    The genesis data will be stored in ./genesis.dat
    The genesis hash will be written to ./genesis_hash
    There are 2 accounts in genesis, 1 of which are bakers.
    Genesis time is set to 2023-05-22 15:08:19.803 UTC.
    Average block time is set to 5000ms.
    DONE

The file ``./genesis.dat`` contains the generated genesis block data and ``./bakers/baker-0-credentials.json`` the generated credentials of the single baker account that was created. You supply these to the node binary to run the baker node. Keys for each generated account is output in the ``./accounts`` directory, and are used when submitting transactions on behalf of the accounts, for instance using the `Concordium Client <concordium-client>`_ command-line tool.


Running the local chain
=======================

Now run the chain by starting the baker node. The node expects the ``genesis.dat`` to be placed in its configuration directory, so first create a working directory for the node data and configuration and copy ``genesis.dat`` to it:

.. code-block:: console

    mkdir localchain-node-0
    cp ./genesis.dat localchain-node-0/

Now run the baker node:

.. code-block:: console

    concordium-node \
      --no-bootstrap= \
      --listen-port 8169 \
      --grpc2-listen-addr 127.0.0.1 \
      --grpc2-listen-port 20100 \
      --data-dir localchain-node-0 \
      --config-dir localchain-node-0 \
      --baker-credentials-file bakers/baker-0-credentials.json

The ``--no-bootstrap`` flag instructs the node to not connect to a bootstrapper node for retrieving peers. It is specified here since no bootstrapper node is configured, and in particular this is not relevant since no other peers partake in the network. The ``--listen-port`` option specifies the port to listen on for incoming peer-to-peer connections from other nodes. The ``--grpc2-listen-port`` specifies the port to listen on for :ref:`Concordium Node gRPC API V2 <grpc2-documentation>` connections. This interface is used to manage and query the node. The ``--data-dir`` and ``--config-dir`` options specify the working directories of the node instance, where its state and configuration are stored. Note that you may specify the same directory for both as in this example. The ``--baker-credentials-file`` option instructs the node to run as the baker specified by the supplied credentials file. In this case, this is your generated baker credentials output from the ``genesis-creator`` tool.

.. Note::

    If more baker credentials are generated, several bakers for each such can be spun up by replacing the arguments specified by the ``--baker-credentials-file``. If there is no bootstrapper node, nodes must be manually instructed to connect to one another by specifying the IP address and port of the other node(s) using the ``--connect-to`` option. Note that node instances using the same network interfaces should each specify different listen ports, and node instances using the same file-system should specify different data and config directories.


Interacting with the local chain
================================

You can now interact with your local chain through the node via the :ref:`Concordium Node gRPC API V2 <grpc2-documentation>` exposed on port 20100 as you would with :ref:`Mainnet<glossary-mainnet>` or :ref:`Testnet<glossary-testnet>` nodes. Concordium provides various :ref:`SDKs and APIs<sdks-apis>` that facilitate this as well as the `Concordium Client <concordium-client>`_ command-line tool. Assuming you have the ``concordium-client`` binary version 5.1.1 or higher in your path, list the accounts using the ``account list`` command:

.. code-block:: console

    $ concordium-client --grpc-ip 127.0.0.1 --grpc-port 20100  account list
    Accounts:
                     Account Address                     Account Names
    --------------------------------------------------------------------
    44pozJMswBY5NQdh2MdHLTRQhmZg828wmBCvVckBgsHc7xhiGY
    4mUMfBFDqFkr3SCQx3k6x8RuWWFyLQHhE2AnJrdk9XtVto8mnK

The two accounts' addresses in the output correspond to those of the generated baker and foundation account specified in the ``genesis-creator`` configuration file. You can verify the balance and stake of the baker by supplying the first of the two account addresses to the ``account show`` command:

.. code-block:: console

    $ concordium-client --grpc-ip 127.0.0.1 --grpc-port 20100 account show 44pozJMswBY5NQdh2MdHLTRQhmZg828wmBCvVckBgsHc7xhiGY
    Local names:
    Address:                44pozJMswBY5NQdh2MdHLTRQhmZg828wmBCvVckBgsHc7xhiGY
    Balance:                1028423448.099901 CCD
    Nonce:                  1
    Encryption public key:  b14cbfe44a02c6b1f78711176d5f437295367aa4f2a8c2551ee10d25a03adc69d61a332a058971919dad7312e1fc94c5b0e23703f7fb0bfa98768a5297110a0aaf14f464d55f23b846453c068af08d48060e3c7be2ba4baa48ef13603a6a5f09

    Baker: #0
     - Staked amount: 528423448.099901 CCD
     - Restake earnings: yes

    Credentials:
    * b0e23703f7fb0bfa98768a5297110a0aaf14f464d55f23b846453c068af08d48060e3c7be2ba4baa48ef13603a6a5f09:
      - Index: 0
      - Expiration: May 2028
      - Type: normal
      - Revealed attributes: none
