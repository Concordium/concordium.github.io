.. include:: ../../variables.rst
.. _developer-page:

===================
Developer resources
===================

The following developer resources help you get started developing on the Concordium network.

Official resources
==================

- See :ref:`Node setup<node-requirements>` for information about the requirements to run a node and the available platforms for nodes.

- See :ref:`SDKs and APIs<sdks-apis>` for links to SDKs and APIs for development

- See :ref:`Smart contracts <introduction>` for general information about smart contracts

    - `Smart contract libraries <https://crates.io/crates/concordium-std>`_

    - To ease deployment and initialization, you can use the `Smart contract deploy and initialize tool <https://sctools.mainnet.concordium.software/>`__ instead of the process below. It works with the |bw| to deploy and initialize smart contracts to Mainnet and Testnet.

- `GitHub <https://github.com/Concordium>`_

- `Concordium standards and updates <https://proposals.concordium.software/>`_

    - `CIS-0 standard detections <https://proposals.concordium.software/CIS/cis-0.html>`_

    -  Applicable for Smart contracts v1:

        - `CIS-2 token standard <https://proposals.concordium.software/CIS/cis-2.html>`_

        - `CIS-3 sponsored transaction standard <https://proposals.concordium.software/CIS/cis-3.html>`_

- See :ref:`How to create proofs for dApps and services <create-proofs>` for information about how to write statements that interact with Concordium wallets.

- For information about how to create proofs to verify identity for dApps and services see :ref:`Create proofs<create-proofs>`.

- See :ref:`dApp examples<dapp-examples>` for a list of dApp examples and their resources.

- For testing purposes, a node is available on testnet to use when testing smart contracts and dApps. You can use this node for API calls of chain methods only with GRPC v1, gRPC v2, and gRPC web. The address is node.testnet.concordium.com on port 10000 (GRPCv1) and port 20000 (gRPCv2 and gRPC-web). This node is maintained by Concordium, but Concordium does not guarantee availability. The status of this node is available on the `Testnet status page <https://status.testnet.concordium.software>`__.

- The `VSCode extension <https://marketplace.visualstudio.com/items?itemName=Concordium.concordium-smart-contracts>`__ can help you develop Concordium smart contracts. The extension sets up the editor for development, installs the ``cargo-concordium`` smart contract development tool for all supported platforms, and provides commands in the editor for the essential workflows, such as building and testing smart contracts.

- An external `transaction logger <https://github.com/Concordium/concordium-transaction-logger>`_ service

Concordium Proof Explorer
-------------------------

If you want to familiarize yourself with how proofs work and can be constructed, you can use the `Concordium Proof Explorer <https://web3id-proof-explorer.testnet.concordium.com/>`__ to create proofs and send them to a |bw| to see how they interact with account credentials and verifiable credentials. The Concordium Proof Explorer works on Testnet. You can use the `Web3Id Issuer Front End <https://web3id-issuer-frontend.testnet.concordium.com/>`__ to create verifiable credential to test with the proof explorer.

.. _example-dapps:

Example dApps
-------------

Concordium has a selection of example dApps that you can clone to make your own dApps or for inspiration. Additionally, all of these example dApps are hosted so you can try the functionality on Concordium's testnet.

    - Piggy bank: :ref:`Piggy bank tutorial<piggy-bank>` / `Piggy bank dApp <https://piggybank.testnet.concordium.com>`__
    - wCCD: :ref:`wCCD tutorial<wCCD>` / `wCCD dApp <https://wccd.testnet.concordium.com/>`_
    - Voting: :ref:`Voting tutorial<voting-dapp>` / `Voting dApp <https://voting.testnet.concordium.com/>`_
    - ID2.0: :ref:`Create proofs tutorial<gallery>` / `Gallery dApp <https://gallery.testnet.concordium.com/>`_
    - eSealing: :ref:`eSealing tutorial<eSealing>` / `eSealing dApp <https://esealing.testnet.concordium.com>`_
    - signMessage: `Front end code <https://github.com/Concordium/concordium-dapp-examples/tree/main/signMessage>`__ / `signMessage dApp <http://signmessage.testnet.concordium.com/>`__

.. _block-explorers:

Block explorers
---------------

The following are links to the block, node, and status explorers.

Concordium block explorers
^^^^^^^^^^^^^^^^^^^^^^^^^^

For a description of the information available on the pages, see :ref:`Dashboards and Status pages <dashboards>`.

    - `Mainnet block explorer <https://dashboard.mainnet.concordium.software>`_

    - `Testnet block explorer <https://dashboard.testnet.concordium.com>`_

Concordium status pages
^^^^^^^^^^^^^^^^^^^^^^^

    - `Mainnet status page <https://status.mainnet.concordium.software>`_

    - `Testnet status page <https://status.testnet.concordium.software>`__

CCDScan
^^^^^^^

For information about CCDScan, see :ref:`CCDScan<ccd-scan>`.

    - `CCDScan <https://ccdscan.io>`_

Grafana® node dashboard
^^^^^^^^^^^^^^^^^^^^^^^

For node runners using Grafana, Concordium provides a node performance dashboard using the exposed Prometheus metrics. You can `download it from the Grafana marketplace <https://grafana.com/grafana/dashboards/18983-concordium-node-external/>`__.

Social media and support
------------------------

- `Discourse <https://support.concordium.software/>`_

- `Telegram <https://t.me/concordium_official>`_

- `Discord <https://discord.com/invite/xWmQ5tp>`_

Community resources
===================

-   `Block explorer built by a user in the Netherlands <https://concordium-explorer.nl/>`_

.. toctree::
    :hidden:
    :maxdepth: 2

    sdks-apis
    dapp-examples
    ../resources/dashboards
    ../references/developer-tools
    ../references/grpc2
    ../references/grpc
