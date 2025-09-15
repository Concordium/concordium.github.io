
.. _run-local-chain:

=================
Run a local chain
=================

.. Note::

    Running your own local chain is an advanced process and not applicable for all use cases. Users with little or no blockchain experience should not attempt to run a local chain. If you run into issues while installing, configuring, and running your local chain, contact `Concordium support <http://support.concordium.software>`_.

This guide details how to run your own instance of the Concordium blockchain. This is useful when developing and testing smart contracts. Running your own chain also lets you control various aspects, such as the genesis parameters, :term:`Privacy Guardians<Privacy Guardian (PG)>`, identity providers, and foundation accounts.

The chain is run by a network of validator nodes that produce blocks. In the following minimal example you will set up a network comprised of a single validator node that runs *locally* on your system and *does not connect to mainnet or testnet*. Note, however, that the concepts demonstrated here equally apply to any number of validator nodes configured in a LAN or WAN setting.


Prerequisites
=============
You will either need a working installation of the :ref:`Concordium Node distribution<node-downloads>` or `Docker <https://www.docker.com/>`_, instances of which will be used to run the validator node(s). You will need :term:`genesis block` data, which defines your local chain and sets of credentials for validator accounts of the chain. The number of sets of validator credentials needed thus depends on the desired number of validators in the network, which in this example is one.

Install the node distribution
-----------------------------
Concordium Node releases exist for Ubuntu, macOS, Windows and Docker. See the :ref:`Node Requirements<node-requirements>` section for information on system requirements and detailed instructions on how to obtain, run, and manage a node. To run a validator, you either need a Concordium node binary supplied with your appropriate distribution in your path or a working Docker installation. This depends on whether you want to run the Node binary directly on your host or as a Docker instance. The details below assume the former, but if you want to run a Docker instance, you can skip to the next section.

The name of the binary has ``concordium-`` as its prefix but depends on the distribution, so you may have to confer with the installation instructions to figure out the exact name. Upon successful installation of the distribution, verify that the binary exists in your path at the required version:

.. code-block:: console

    $ concordium-node --version # name depends on distribution
    concordium_node 6.1.7

.. Note::

   The node distributions provide commands for running and managing nodes on :term:`Mainnet` and :term:`Testnet`. Ignore these since you are targeting your own chain and only need the binary.


Generate genesis data and account credentials
---------------------------------------------

Use the `genesis-creator <https://github.com/Concordium/concordium-misc-tools/tree/main/genesis-creator>`_ tool to generate genesis block data and credentials for the foundation and (initial) validator accounts.

Build the tool
^^^^^^^^^^^^^^

To build the tool you need a working `Rust compiler <https://www.rust-lang.org/tools/install>`_ with version 1.65 or higher. After installing it, verify that ``rustc`` exists in your path at the required version:

.. code-block:: console

    $ rustc --version
    rustc 1.68.2 (9eb3afe9e 2023-03-27)

.. Note::

    The recommended method to install Rust is through `rustup <https://rustup.rs/>`_. After installing ``rustup``, the Rust toolchain can be installed by issuing ``rustup toolchain install 1.68``.

To build the ``genesis-creator`` tool, run:

.. code-block:: console

    CARGO_NET_GIT_FETCH_WITH_CLI=true \
    cargo install \
      --git https://github.com/Concordium/concordium-misc-tools.git genesis-creator \
      --locked

This produces the binary ``~/.cargo/bin/genesis-creator`` which is run to generate the genesis data.

Run the tool
^^^^^^^^^^^^

The ``genesis-creator`` tool uses a TOML configuration file format for specifying parameters from which the genesis data is generated. The TOML file specifies:

* the initial protocol version
* cryptographic parameters
* anonymity revokers (:term:`Privacy Guardians<Privacy Guardian (PG)>`)
* identity providers
* foundation accounts
* keys for updating the chain
* various parameters for the genesis

Furthermore, it specifies where to save the output that is used to invoke the node binary. Most of these options are of little importance when testing smart contracts and the easiest way to get started is to piggyback off of the example configuration file ``single-baker-example-p6.toml`` found `here <https://raw.githubusercontent.com/Concordium/concordium-misc-tools/main/genesis-creator/examples/single-baker-example-p6.toml>`_. Inspecting the configuration reveals that it specifies an initial protocol version of 6 to output credentials for 1 validator account, 1 foundation account, and 100 regular accounts. It specifies the system time at generation for the genesis time, and finally, specifies 2 seconds as the minimum time per block.

.. note::

   Validators were previously called *bakers*, and remnants of the old name are still present in our tools. Whenever you read *baker*, think *validator*.

Further inspection of the tables at the ``accounts`` keys reveals that the validator account has an initial balance of 3.5 * 10^15 microCCD and stake of 3.0 * 10^15 microCCD, the foundation account has an initial balance of 10^16 microCCD, and the regular accounts each have an initial balance of 2.0 * 10^12. You can change the initial stake and balances if desired. The number of accounts produced of each type can also be adjusted by setting the values of the ``repeat`` keys to your choosing.

.. Note::

    The staked amount needed for a validator to participate in the finalization committee is some fraction of the total amount of existing CCD set in the configuration. The total amount is the sum of the balances of all the validator and foundation accounts specified in the genesis configuration file. In this particular example, the stake is sufficient for producing blocks.

Save the file as ``single-baker-example-p6.toml`` and generate the genesis data:

.. code-block:: console

    $ ~/.cargo/bin/genesis-creator generate --config ./single-baker-example-p6.toml
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

The file ``./genesis.dat`` contains the generated genesis block data and ``./bakers/baker-0-credentials.json`` the generated credentials of the single validator account that was created. You supply these to the node binary to run the validator node. Keys for each generated account is output in the ``./accounts`` directory and are used when submitting transactions on behalf of the accounts, for instance using the `Concordium Client <concordium-client>`_ command-line tool.

Run the local chain
===================

Your local chain will be run as a single validator node. The node uses a data and configuration directory to store its local state and configuration. In the following you will use the same directory for both. Create it and copy ``genesis.dat`` to it:

.. code-block:: console

    mkdir local-0
    cp genesis.dat local-0/

Run the chain from a distribution binary
----------------------------------------

If you wish to run the validator node as a Docker instance, skip to the next section. Otherwise, the validator can be run from the appropriate node distribution binary directly on your host system:

.. code-block:: console

    concordium-node \
      --no-bootstrap=true \
      --listen-port 8169 \
      --grpc2-listen-addr 127.0.0.1 \
      --grpc2-listen-port 20100 \
      --data-dir local-0 \
      --config-dir local-0 \
      --baker-credentials-file bakers/baker-0-credentials.json

The ``--no-bootstrap`` flag instructs the node to not connect to a bootstrapper node for retrieving peers. It is specified here since no bootstrapper node is configured, and in particular this is not relevant since no other peers partake in the network. The ``--listen-port`` option specifies the port to listen on for incoming peer-to-peer connections from other nodes. The ``--grpc2-listen-port`` specifies the port to listen on for :ref:`Concordium Node gRPC API V2 <grpc2-documentation>` connections. This interface is used to manage and query the node. The ``--data-dir`` and ``--config-dir`` options specify the working directories of the node instance where its state and configuration are stored. Note that you may specify the same directory for both as in this example. The ``--baker-credentials-file`` option instructs the node to run as the validator specified by the supplied credentials file. In this case, this is your generated validator credentials output from the ``genesis-creator`` tool.

.. Note::

    If more validator credentials are generated, a validator can be started for each credential by replacing the arguments specified by the ``--baker-credentials-file``. If there is no bootstrapper node, nodes must be manually instructed to connect to one another by specifying the IP address and port of the other node(s) using ``--connect-to $IP:$PORT``. Note that node instances using the same network interfaces should each specify different listen ports, and node instances using the same file system should specify different data and config directories.

Run the chain as a Docker instance
----------------------------------

If you ran the validator node by invoking the node binary directly on your host, skip this section. To run the validator node as a Docker instance, first save the following ``docker-compose.yml`` file to the working directory:

.. code-block:: yaml

    # This is an example configuration for running a local node
    services:
        local-node:
            container_name: local-node
            image: concordium/mainnet-node:latest
            platform: linux/amd64
            pull_policy: always
            environment:
            # Validator credentials file
            - CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE=/mnt/baker-0-credentials.json
            # General node configuration data and config directories (it's OK if they
            # are the same). This should match the volume mount below. If the location
            # of the mount inside the container is changed, then these should be
            # changed accordingly as well.
            - CONCORDIUM_NODE_DATA_DIR=/mnt/data
            - CONCORDIUM_NODE_CONFIG_DIR=/mnt/data
            # The port on which the node will listen for incoming connections. This is a
            # port inside the container. It is mapped to an external port by the port
            # mapping in the `ports` section below. If the internal and external ports
            # are going to be different then you should also set
            # `CONCORDIUM_NODE_EXTERNAL_PORT` variable to what the external port value is.
            - CONCORDIUM_NODE_LISTEN_PORT=8169
            # Address of the V2 GRPC server.
            - CONCORDIUM_NODE_GRPC2_LISTEN_ADDRESS=0.0.0.0
            # And its port.
            - CONCORDIUM_NODE_GRPC2_LISTEN_PORT=20100
            # Do not bootstrap via DNS.
            - CONCORDIUM_NODE_CONNECTION_NO_BOOTSTRAP_DNS=true
            entrypoint: ["/concordium-node"]
            # Exposed ports. The ports the node listens on inside the container (defined
            # by `CONCORDIUM_NODE_LISTEN_PORT` and `CONCORDIUM_NODE_GRPC2_LISTEN_PORT`)
            # should match what is defined here. When running multiple nodes the
            # external ports should be changed so as not to conflict.
            ports:
            - "8169:8169"
            - "20100:20100"
            volumes:
            # The node's database should be stored in a persistent volume so that it
            # survives container restart. In this case we map the **host** directory
            # ./local-0 to be used as the node's database directory.
            - ./local-0/:/mnt/data:Z
            - ./bakers/baker-0-credentials.json:/mnt/baker-0-credentials.json:Z

Pay attention to the host directory mappings specified by the ``volumes`` key. The values work in this particular example, but in general depend on the location of the ``genesis-creator`` output. Now run the validator node as a Docker instance:

.. code-block:: console

    docker compose up

.. Note::

    Note that you may have to specify ``platform: linux/amd64`` in ``docker-compose.yml`` depending on your host architecture. This is particularly relevant when your host architecture is ARM-based.

Interact with the local chain
=============================

You can now interact with your local chain through the node via the :ref:`Concordium Node gRPC API V2 <grpc2-documentation>` exposed on port 20100 as you would with :term:`Mainnet` or :term:`Testnet` nodes. Concordium provides various :ref:`SDKs and APIs<sdks-apis>` that facilitate this as well as the `Concordium Client <concordium-client>`_ command-line tool. Assuming you have the ``concordium-client`` binary version 5.1.1 or higher in your path, list the accounts using the ``account list`` command:

.. code-block:: console

    $ concordium-client --grpc-ip 127.0.0.1 --grpc-port 20100 account list
    Accounts:
                     Account Address                     Account Names
    --------------------------------------------------------------------
    44pozJMswBY5NQdh2MdHLTRQhmZg828wmBCvVckBgsHc7xhiGY
    4mUMfBFDqFkr3SCQx3k6x8RuWWFyLQHhE2AnJrdk9XtVto8mnK

The two accounts' addresses in the output correspond to those of the generated validator and foundation account specified in the ``genesis-creator`` configuration file. You can verify the balance and stake of the validator by supplying the first of the two account addresses to the ``account show`` command:

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
