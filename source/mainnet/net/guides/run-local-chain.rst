.. _run-local-chain:

=================
Run a local chain
=================

This guide details how to run your own instance of the Concordium blockchain. This is useful when developing and testing smart contracts. Running your own chain also lets you control various aspects such as the genesis parameters, anonymity revokers, identity providers and foundation accounts.

The chain is run by a network of baker nodes that bake and finalize blocks. In the following minimal example you will set up a network comprised of a single baker node that runs *locally* on your system. Note, however, that the concepts demonstrated here equally apply to any number of baker nodes configured in a LAN or WAN setting.

.. Note::

   The commands shown in the following are interpreted in a ``bash``-like environment.

Prerequisites
=============
You need a working installation of the Concordium Node distribution version 5 or above, instances of which will be used to run the baker node(s), :ref:`genesis block<glossary-genesis-block>` data which specifies your local chain and sets of credentials for baker accounts of the chain. The number of sets of credentials needed will thus depend on the desired number of bakers in the network, which in this example is 1.

Installing the node distribution
--------------------------------
Concordium Node releases currently exist for Ubuntu, MacOS, Windows and Docker. See the :ref:`Node Requirements<node-requirements>` section for information on system requirements and detailed instructions on how to obtain, run and manage a node. You need the ``concordium-node`` binary supplied with the distributions in your path to run a baker. Upon successful installation of the distribution verify that the the binary is  in your path:

.. code-block:: console

    $ concordium-node --version
    concordium_node 5.3.2

.. Note::

   The node distributions provide commands for running and managing nodes on :ref:`Mainnet<glossary-mainnet>` and :ref:`Testnet<glossary-testnet>`. Ignore these since you are targeting your own chain and only need the binary.


Generating genesis data and account credentials
-----------------------------------------------
You will use the `genesis-creator <https://github.com/Concordium/concordium-misc-tools/tree/main/genesis-creator>`_ tool for generating genesis block data and credentials for the foundation and (initial) baker accounts.

Building the tool
-----------------

To build the tool you need the `Protocol Buffer compiler <https://github.com/protocolbuffers/protobuf#protocol-compiler-installation>`_ binary of version 3.15 or above in your path and a working `Rust compiler <https://www.rust-lang.org/tools/install>`_ installation of version 1.64 or above. After installing both tools, verify that their binaries exist at appropriate versions in your path:

.. code-block:: console

    $ protoc --version
    libprotoc 3.21.12
    $ rustc --version
    rustc 1.68.2 (9eb3afe9e 2023-03-27)

.. Note::

    The recommended method to install Rust is using ``rustup``. After installing ``rustup`` Rust toolchain is then easily be installed by issuing ``rustup toolchain install 1.68``.

To build the ``genesis-creator`` tool, first clone the ``concordium-misc-tools`` repository which contains the source and check out the ``git`` sub-modules in the ``genesis-creator`` directory:

.. code-block:: console

    git clone git@github.com:Concordium/concordium-misc-tools.git
    cd genesis-creator
    git submodule update --init --recursive

The project is then built using ``cargo``:

.. code-block:: console

    cargo build --release

This produces the binary ``./target/release/genesis-creator`` which you run to generate the genesis data.

Running the tool
----------------

The ``genesis-creator`` tool uses a TOML configuration file format for specifying parameters from which the genesis data is generated. The TOML file specifies

* the initial protocol version
* cryptographic parameters
* anonymity revokers
* identity providers
* foundation accounts
* keys for updating the chain
* various parameters for the genesis

It furthermore specifies where to save the output which is used to invoke the node binary. Many of these options are not relevant when testing smart constracts and the easiest way to get started is to piggyback on one of the examples are found in the ``./examples`` folder. In the following, you will use the file ``./examples/genesis5.toml`` and modify it slightly. Inspecting the file reveals that it specifies an initial protocol version of 5, to output credentials for 5 baker accounts, 2 foundation accounts and the genesis time set to the system time at generation. It also specifies 5 seconds as the average time per block. Further inpection of the table at the ``accounts`` key of the file reveals that the bakers each have an initial balance of 10^15 microCCD and a stake of 5 * 10^14 microCCD. Change this section s.t. just one baker credential is produced by setting the value of the ``repeat`` key to 1 as follows:

.. code-block:: toml

    [[accounts]]
    kind = "fresh"
    balance = "1000000000000000"
    stake = "500000000000000"
    template = "baker"
    identityProvider = 0
    numKeys = 1
    threshold = 1
    repeat = 1 # Changed from 5

.. Note::

    Note that the staked amount needed to participate in finalization committee is some fraction of the total amount of existing CCD, defined by the value of the ``capitalBound`` key in the configurations file. The total amount is the sum of the balances of all the baker and foundation accounts specified in the genesis configuration file. In this particular example the stake is sufficient for baking.

Next, generate the genesis data:

.. code-block:: console

    $ ./target/release/genesis-creator generate --config ./examples/genesis5.toml
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

In particular, the files of interest to you are ``./genesis.dat`` containing the genesis block data and ``./bakers/baker-0-credentials.json`` containing the credentials of the single baker account that was created.


Running the chain
=================

Now run the chain by starting a single baker node. The node expects the ``genesis.dat`` to reside in a configuration directory, so first create a working directory for the node data and configuration and copy ``genesis.dat`` to it:

.. code-block:: console

    mkdir localchain-node-0
    cp ./genesis.dat localchain-node-0/

Now run the baker node as follows:

.. code-block:: console

    concordium-node \
      --no-bootstrap= \
      --grpc2-listen-addr 127.0.0.1 \
      --grpc2-listen-port 20001 \
      --data-dir localchain-node-0 \
      --config-dir localchain-node-0 \
      --baker-credentials-file bakers/baker-0-credentials.json

The ``--no-bootstrap`` option lets the node know not to connect to a bootstrapper node for retrieving peers since no peers are in this network so this is not relevant. The ``--grpc2-listen-port`` specifies the port to listen on for Node GRPC V2 API handshakes. We will use this interface to communicate with the node. The ``--data-dir`` and ``--config-dir`` specifies the working directories of the node instance, where its state and configuration is stored. The ``--baker-credentials-file`` instructs the node to run as the baker specified in the supplied credentials file, in this case your generated baker credentials output from the ``genesis-creator`` tool.

.. Note::

    If more baker credentials are generated, more bakers can be spun up by replacing the arguments specified by the ``--baker-credentials-file``, ``--config-dir`` and ``--data-dir`` options accordingly. If there is no bootstrapper node, it will have to be instructed to manually connect to one another by specifying the IP address and port of the other node(s) using the ``--connect-to`` option. Note that nodes running on the same network interfaces must specify a disjoint set of ports.


Interacting with your local chain
=================================

You can now interact with your local chain through the node via the :ref:`Concordium Node gRPC API V2 <grpc2-documentation>` exposed on port 20001, as you would with :ref:`Mainnet<glossary-mainnet>` or :ref:`Testnet<glossary-testnet>`. Concordium provides various :ref:`SDKs and APIs<sdks-apis>` that facilitate this as well as the `Concordium Client <concordium-client>`_ command-line tool. Assuming you have the ``concordium-client`` binary version 5.1.1 or higher in your path, you can list the accounts using the ``account list`` command:

.. Code:: command

    $ concordium-client --grpc-ip 127.0.0.1 --grpc-port 20001  account list
    Accounts:
                     Account Address                     Account Names
    --------------------------------------------------------------------
    44pozJMswBY5NQdh2MdHLTRQhmZg828wmBCvVckBgsHc7xhiGY
    4mUMfBFDqFkr3SCQx3k6x8RuWWFyLQHhE2AnJrdk9XtVto8mnK

The two accounts addresses in the output correspond to those of the generated baker and foundation account specified in the ``genesis-creator`` configuration file. You can verify the balance and stake of the baker by supplying the first of the two account addresses to the ``account show`` command:

.. Code:: command

    $ concordium-client --grpc-ip 127.0.0.1 --grpc-port 20000 account show 44pozJMswBY5NQdh2MdHLTRQhmZg828wmBCvVckBgsHc7xhiGY
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
