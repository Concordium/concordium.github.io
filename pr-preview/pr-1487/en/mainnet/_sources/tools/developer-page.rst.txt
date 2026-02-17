.. include:: ../variables.rst
.. _developer-page:

===================
Developer resources
===================

The following developer resources help you get started developing on the Concordium network.

All of our repositories are on `GitHub <https://github.com/Concordium>`__.

.. dropdown:: Standards

    - `Concordium standards and updates <https://proposals.concordium.software/>`_

    - `CIS-0 standard detections <https://proposals.concordium.software/CIS/cis-0.html>`_

    - `CIS-2 token standard <https://proposals.concordium.software/CIS/cis-2.html>`_

    - `CIS-3 sponsored transaction standard <https://proposals.concordium.software/CIS/cis-3.html>`_

.. dropdown:: Nodes

    See :ref:`Node setup<node-requirements>` for information about the requirements to run a node and the available platforms for nodes.

    For testing purposes, a node is available on testnet to use when testing smart contracts and dApps. You can use this node for API calls of chain methods only with gRPC v2 and gRPC web. The address is ``grpc.testnet.concordium.com`` on port 20000 (gRPCv2 and gRPC-web). You can use this node for API calls of *chain methods only*. This node is maintained by Concordium, but Concordium does not guarantee availability. The status of this node is available on the `Testnet status page <https://status.testnet.concordium.software>`__.

.. dropdown:: SDKs and APIs

    The following SDKs and APIs exist for developing on the Concordium network.

    - `Concordium Rust SDK <https://github.com/Concordium/concordium-rust-sdk>`_
    - `Concordium Javascript (Node / Web) SDK <https://github.com/Concordium/concordium-node-sdk-js>`_
    - `Concordium Java SDK <https://github.com/Concordium/concordium-java-sdk>`_
    - `Concordium .NET (C#) SDK <https://github.com/Concordium/concordium-net-sdk>`_
    - `Concordium Rosetta SDK <https://github.com/Concordium/concordium-rosetta>`_
    - `Concordium go SDK <https://github.com/Concordium/concordium-go-sdk>`_

    There is also a :ref:`Concordium gRPC V2 API<grpc2-documentation>`. It is recommended to use the SDKs.

    The following NPM libraries are useful for building web-based dApps:

    - `@concordium/web-sdk <https://www.npmjs.com/package/@concordium/web-sdk>`_ (for interacting with a chain).
    - `@concordium/ccd-js-gen <https://www.npmjs.com/package/@concordium/ccd-js-gen>`_ (for generating smart contract clients in JavaScript).
    - `@concordium/react-components <https://www.npmjs.com/package/@concordium/react-components>`_ (for React projects).
    - `@concordium/wallet-connectors <https://www.npmjs.com/package/@concordium/wallet-connectors>`_ (for connecting to wallets in non-React projects).

.. dropdown:: Smart contracts

    Concordium provides a number of tools to simplify the smart contract creation and deployment process.

    The `VSCode extension <https://marketplace.visualstudio.com/items?itemName=Concordium.concordium-smart-contracts>`__ can help you develop Concordium smart contracts. The extension sets up the editor for development, installs the ``cargo-concordium`` smart contract development tool for all supported platforms, and provides commands in the editor for the essential workflows, such as building and testing smart contracts.

    You can watch a video about how to use the VSCode extension.

    .. raw:: html

        <iframe src="https://www.youtube.com/embed/9qjcsGDeveg?si=zGDkjMAdP5JjRMd8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

    The :ref:`integration testing library<integration-test-contract>` simplifies testing of your smart contracts before deployment.

    The `main library for Smart contract development <https://crates.io/crates/concordium-std>`_ can be found on crates.io.

    To ease deployment and initialization, you can use the `Smart contract deploy and initialize tool <https://sctools.mainnet.concordium.software/>`__. It works with the |bw| to deploy and initialize smart contracts to Mainnet and Testnet.

    The `Typescript smart contract client generator <https://www.npmjs.com/package/@concordium/ccd-js-gen>`_ helps you generate JavaScript or TypeScript clients for the Concordium blockchain.

    See :ref:`Smart contracts <introduction>` for general information about smart contracts.

.. dropdown:: Proofs

    See :ref:`How to create proofs for dApps and services <create-proofs>` for information about how to write statements that interact with Concordium wallets.

    For information about how to create proofs to verify identity for dApps and services see :ref:`Create proofs<create-proofs>`.

    For a complete list of available ID attributes that can be used in proofs, see :ref:`id-attributes-reference`.

    If you want to familiarize yourself with how proofs work and can be constructed as well as test them, you can use the `Concordium Proof Explorer <https://web3id-proof-explorer.testnet.concordium.com/>`__ to create proofs and send them to a |bw| to see how they interact with account credentials and verifiable credentials. The Concordium Proof Explorer works on Testnet. You can use the `Web3Id Issuer Frontend <https://web3id-issuer-frontend.testnet.concordium.com/>`__ to create verifiable credential to test with the proof explorer.

    If you decide that you want to become an issuer of verifiable credentials, see :ref:`Web3 ID issuers<web3id-issuer>` to learn more and access the production ready tools to become an issuer.

.. dropdown:: dApps

    Concordium has a selection of example dApps that you can clone to make your own dApps or for inspiration. Additionally, all of these example dApps are hosted so you can try the functionality on Concordium's testnet.

    - Piggy bank: :ref:`Piggy bank tutorial<piggy-bank>` / `Piggy bank dApp <https://piggybank.testnet.concordium.com>`__
    - wCCD: :ref:`wCCD tutorial<wCCD>` / `wCCD dApp <https://wccd.testnet.concordium.com/>`_
    - Voting: :ref:`Voting tutorial<voting-dapp>` / `Voting dApp <https://voting.testnet.concordium.com/>`_
    - ID2.0: `Backend and Frontend <https://github.com/Concordium/concordium-dapp-examples/tree/main/gallery>`_ / `Gallery dApp <https://gallery.testnet.concordium.com/>`_
    - eSealing: :ref:`eSealing tutorial<eSealing>` / `eSealing dApp <https://esealing.testnet.concordium.com>`_
    - signMessage: `Frontend code <https://github.com/Concordium/concordium-dapp-examples/tree/main/signMessage>`__ / `signMessage dApp <http://signmessage.testnet.concordium.com/>`__

    For a full list of dApp examples and resources, see :ref:`dApp examples<dapp-examples>`.

    Starting a new project on the Concordium blockchain? Have a look at the `dApp starter template <https://github.com/Concordium/concordium-dapp-starter>`__!

.. dropdown:: Block explorers and analytics

    .. _block-explorers:

    The following are links to the block, node, and status explorers.

    **Concordium status pages**

    - `Mainnet status page <https://status.mainnet.concordium.software>`__

    - `Testnet status page <https://status.testnet.concordium.software>`__

    **CCDScan**

    - `CCDScan <https://ccdscan.io>`_

    For information about CCDScan, see :ref:`CCDScan<ccd-scan>`.

    **Grafana® node dashboard**

    For node runners using Grafana, Concordium provides a node performance dashboard using the exposed Prometheus metrics. You can `download it from the Grafana marketplace <https://grafana.com/grafana/dashboards/18983-concordium-node-external/>`__.

    **Transaction logger**

    An external `transaction logger <https://github.com/Concordium/concordium-transaction-logger>`_ service

    **Indexers**

    See :ref:`Indexers<indexers-intro>` for more information.

.. dropdown:: Social media and support

    - `Concordium's official support <https://forum.concordium.com>`_

    - `Telegram <https://t.me/ConcordiumNews>`_

    - `Discord <https://discord.com/invite/GpKGE2hCFx>`_

.. dropdown:: Community resources

    -   `CCDExplorer.io, the community supported, comprehensive Concordium Explorer <https://ccdexplorer.io/>`_

.. toctree::
    :hidden:
    :maxdepth: 2

    sdks-apis
    grpc2

