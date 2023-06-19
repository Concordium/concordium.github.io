.. include:: ../../variables.rst
.. _release-notes:

=============
Release notes
=============

.. Note::

   Subscribe to the `Mainnet status page <https://status.mainnet.concordium.software/>`_ or `Testnet status page <https://status.testnet.concordium.software/>`_ and the `release information on Discourse <https://support.concordium.software/c/releases/9>`_ to stay informed about updates and changes that may affect you as a node runner, including node software releases and protocol updates.

   To subscribe to updates on the Mainnet or Testnet status page click **Subscribe** to get all updates or click **Get updates** to choose to get all updates or only updates for specific products.

Wallets
=======

.. _rn-mwgen2-ios:

|mw-gen2| for iOS
-----------------

    May 31, 2023

    |mw-gen2| for iOS 1.0.1 contains the following:

    - The prompt to review the terms and conditions has been updated, and it now points to a link where you can read the newest version of the terms and conditions before accepting. Additionally, a new prompt will be shown in the wallet if the terms and conditions are updated, so it no longer happens only after updating the application.

    - Also, a minor change was made to support integration with eID verifiers.

    - Fixed a crash caused by a change implemented by identity provider Notabene where the user is asked for access to the microphone, and if denied, crashed the app. Microphone access is required by the identity provider for proof-of-life.

    - The |mw-gen2| for iOS now requires iOS 15 as the minimum version.

    .. dropdown:: |mw-gen2| 1.0.0 - March 7, 2023

        Concordium introduces a new wallet for iOS mobile devices: the |mw-gen2|. The |mw-gen2| offers all of the same functionality you know from |mw-gen1|, such as sending and receiving CCDs, delegation, baking, and so on. But the |mw-gen2| uses a secret recovery phrase to generate your private keys, simplifying any restoration of an account should you lose access to the phone/app. This version also supports easy portability of accounts between this and the |bw|. You can read about |mw-gen2| and the differences between it and |mw-gen1| in the :ref:`FAQ<mw-gen2-faq>`.

        In connection with this new wallet, the iOS mobile wallet previously known as Concordium Mobile Wallet has been renamed |mw-gen1| 3.1.0.

.. _rn-mwgen2-android:

|mw-gen2| for Android
---------------------

    May 31, 2023

    |mw-gen2| for Android 1.1.8 contains the following:

    - The prompt to review the terms and conditions has been updated, and it now points to a link where you can read the newest version of the terms and conditions before accepting. Additionally, a new prompt will be shown in the wallet if the terms and conditions are updated, so it no longer happens only after updating the application.

    - A minor change to the identity user interface was made to support integration with eID verifiers.

    .. dropdown:: |mw-gen2| 1.1.7 - May 1, 2023

        - Corrected the message that appeared when stopping baking or delegation. Previously, the message shown when stopping baking stated that the cool-down period was 14 days, but it is 21. This is now correct. The message shown when stopping delegation stated that the cool-down period was 0 days, but it is 14. This is also now correct.

        - Upon update to version 1.1.7 or on installation of version 1.1.7, data that was in SharedPreferences will be moved to EncryptedSharedPreferences to enhance security.

    .. dropdown:: |mw-gen2| 1.1.6 - March 21, 2023

        The wallet has been updated so that it is able to sign/send a contract update transaction successfully when it receives the schema as a string, as an object with the field “type”: “module”, or as an object with the field “type”: “parameter”.

    .. dropdown:: |mw-gen2| 1.1.5 - February 27, 2023

        A potential security risk was discovered with the storage of the secret recovery phrase on Android phones. The patch changes the way that the secret recovery phrase is stored in the Android app, and it’s applied automatically once you login to the updated version (1.1.5) on your Android phone. Your secret recovery phrase does not change. We recommend all Android users to update their Concordium Wallet app to the latest version right away. The Concordium Wallet for iOS, desktop, and browser extensions are not affected by this issue.

    .. dropdown:: |mw-gen2| 1.1.4 - January 26, 2023

        - Fix incorrect display of transactions proposed by dApps using WalletConnect.

        - Fix incorrect NRG calculation performed by the wallet, which could lead to failed transactions.

.. _rn-bw:

|bw|
-------------------------

    May 30, 2023

    |bw| 1.0.6 contains fixes for the following issues:

    - The About page link to the terms and conditions pointed to the wrong URL. It now uses the value retrieved from the wallet proxy, or the correct default to the unified terms and conditions page.

    - Fixed an empty recovery displaying an error instead of informing the user that nothing was found.

    - Fixed an issue where the transaction list view would show the Request CCD button while loading the initial batch of transactions.

    - Fixed an issue so the first call of the gRPC client no longer always fails.

    - Fixed an issue so the first call of the gRPC client after changing network uses the correct network.

    - Added a missing translation for the Request CCD button.

    - ``deployModule`` transactions are now supported in the ``sendTransaction`` endpoint of the wallet-api.

    - In the display of a `deployModule` transaction, the previously titled module hash is now titled module reference.

    - Display of a `deployModule` transaction includes a copy button for the module reference.

    - Updated web-sdk to fix incorrect estimated cost for `deployModule` transaction.

    - Added text that a transaction has been submitted.

    - Messages when confirming baker/delegation transactions no longer appear after the transaction has been submitted.

    .. dropdown:: |bw| 1.0.4 - May 8, 2023

        Baking and delegation are now available in the |bw|.

        Additionally, the following improvements have been added:

        - gRPC-web is now used instead of json-RPC.

        - The initial view in the manage token flow now retains the token page header, doesn't collapse account balances, and the error messages for looking up a contract have been improved.

        - Fixed handling of UpdateAccountKey transactions from wallet-proxy.

        - Fixed `chainChanged` event to correctly propagate to all (not just whitelisted) dapps listening for events through the wallet API.

        - When changing the selected chain internally in the wallet, dapps now receive `accountChanged` event if an account on the new network has the dApp whitelisted, or `accountDisconnected` event if no account on the new network has the dApp whitelisted.

        - SendTransaction now validates that an account has sufficient funds before sending a transaction (requested though the API).

        - Added support for eID identity document types.

        - Improved readability of events in transaction details.

        - In the manage page for adding CIS-2 tokens, the contract index is now always initially empty.

        - Incorrect navigation flow on the "earn" page when switching between accounts.

        - Issues with the expansion of the account balance details view when navigating through different flows.

        - Recovery no longer assigns duplicate names to identities when new identities are visited earlier than existing ones during the recovery process.

        - AddCIS2Tokens through API now adds tokens to the given account, instead of the currently selected one.

        - Missing translations for some identity attributes.

        - Removed double unit on CCD in token overview.

        - A bug that caused an identity to not be recovered if there was a rejected one present in the same index.

    .. dropdown:: |bw| 0.9.11 - March 29, 2023

        - Fixed a bug where conversion of parameters from JSON to binary did not work for schemas with signed integers when attempting to convert negative values.

        - Fixed a bug that prevented users from sending larger amounts of bridged tokens.

        - The sign_message wallet API now supports signing arbitrary data.

    .. dropdown:: |bw| 0.9.8 - March 02, 2023

        The following issues are fixed in |bw| 0.9.8:

        - Corrected an issue where incorrect CIS-2 token metadata URL serialization for tokens with checksums caused those to be unable to be added.
        - Init contract transaction now displays as "Contract initialization".
        - Update contract transaction now displays as "Contract update".
        - addCIS2Tokens now returns the list of added tokens without an internal wrapper.

    .. dropdown:: |bw| 0.9.6 - January 9, 2023

        SendTransaction for smart contract transactions can receive schemas that are for the specific parameter.

    .. dropdown:: |bw| 0.9.5 - December 21, 2022

        Minor bugfixes for the |bw|, including adding a missing background color on ID proof cards, fixing an issue where the transaction list did not update automatically, and a minor adjustment to how proof of age is calculated.

    .. dropdown:: |bw| 0.9.4 - December 16, 2022

        The |bw| introduces ID2.0 functionality whereby a dApp or service can use zero knowledge proofs to request proof from a wallet for certain attributes without revealing anything beyond the truth of the statement. It is also possible for a dApp or Service to request that the wallet user reveal attributes.

    .. dropdown:: |bw| 0.8.5 - December 6, 2022

        The |bw| now includes support to manage fungible and non-fungible tokens. This includes adding, inspecting, and removing tokens.

.. _rn-dw:

Desktop Wallet
--------------

.. _rn-mwgen1-ios:

|mw-gen1| for iOS
-----------------

    May 30, 2023

    In |mw-gen1| for iOS 3.2.0 identity and account creation has been locked in |mw-gen1| for iOS devices. This means that you cannot create new identities or accounts in |mw-gen1| on an iOS device. You can continue to use |mw-gen1|, but if you need to create a new identity or account you must use |mw-gen2|. You can also still recover your wallet from a backup file in |mw-gen1| on an iOS device.

    .. dropdown:: |mw-gen1| for iOS 3.1.1 - March 27, 2023

        A message has been added to suggest that users download and configure the new |mw-gen2|. This is to prepare for when account and identity creation will be disabled in |mw-gen1| for iOS. For more information, see the |mw-gen2| :ref:`FAQ<wallet-migrate>`.

    .. dropdown:: |mw-gen1| 3.1.0 - March 7, 2023

        In connection with the release of |mw-gen2| for iOS, the iOS mobile wallet previously known as Concordium Mobile Wallet has been renamed |mw-gen1| 3.1.0.

.. _rn-mwgen1-android:

|mw-gen1| for Android
---------------------

    February 6, 2023

    In version 3.2.0 we changed the text in the "Suggest update" alert to suggest that the user update to the |mw-gen2| so it matches the download button.

.. _rn-ledger-app:

Concordium Ledger app
---------------------

    March 31, 2023

    Concordium Ledger App v3.1.0 now supports Ledger Nano S Plus firmware version 1.1.0.

Nodes
=====

.. _rn-node-mainnet:

Mainnet
-------

    .. _542-mainnet:

    June 14, 2023

    Concordium node version 5.4.2 contains the following features and bug fixes:

    - Enable CORS support in grpc-web. This only applies when grpc-web is enabled.

    - Fixed a security issue.

    - Support using block height as block identifiers in gRPC v2 API.

    - Extend gRPC v2 API call ``GetBlockInfo`` with the protocol version of the block.

    - Do not keep a historical list of peers when running as a normal node.

    - Fixed a bug that caused an extra byte to be added when running ``getModuleSource`` in the V1 GRPC API.

    .. dropdown:: 5.3.2 - April 27, 2023

        .. _532-mainnet:

        - Extended the Prometheus exporter with the following metrics: grpc_request_duration_seconds, grpc_in_flight_requests, consensus_baking_committee, consensus_finalization_committee, consensus_baking_lottery_power, consensus_baked_blocks_total, consensus_finalized_baked_blocks_total, network_soft_banned_peers_total, consensus_non_finalized_transactions and consensus_unsupported_pending_protocol_version. See `docs/prometheus-exporter.md <https://github.com/Concordium/concordium-node/blob/main/docs/prometheus-exporter.md>`_ for more details.

        - Also, in the changelog for the node grpc_request_duration_seconds has been renamed to grpc_request_response_time_seconds to match the what is in the code.

        - Added the following new options:

            - The ``--grpc2-health-min-peers`` (environment variable ``CONCORDIUM_NODE_GRPC2_HEALTH_MIN_PEERS``) triggers the grpc V2 health endpoint to check minimum number of peers.

            - ``--grpc2-invoke-max-energy`` (environment variable ``CONCORDIUM_NODE_GRPC2_INVOKE_MAX_ENERGY``) allows the node runner to control the maximum amount of energy allowed by an InvokeInstance (and the V1 GRPC InvokeContract) call. The behavior of the endpoint is slightly changed as well. The energy is no longer required in the request, and the effective energy used by the call will be min(request.energy, grpc-invoke-max-energy). This differs from the previous behavior where a request would fail if the request either omitted the energy, or supplied an excessive value.

        - Improved the node health check, so that if the node is configured with baker credentials, then it is required to be in the baking committee for it to be considered healthy.

        - Fixed a bug that could cause the node to hang indefinitely during the out-of-band-catchup when the node is a finalizer.

        - Fixed an additional bug in the ``GetAccountInfo`` endpoint in GRPCv2 where the incoming_amounts field of encrypted amounts was not always set correctly.

        - The node collector is migrated to a separate package and now uses the V2 GRPC API. If you already have a node installed, you must update the configuration. For more information, see the Run a node topic that is specific to your node platform: :ref:`Linux<run-a-node>`, :ref:`Ubuntu<run-node-ubuntu>`, :ref:`Windows<run-node-windows>`, or :ref:`macOS<run-node-macos>`.

    .. dropdown:: 5.2.4 - March 16, 2023

        - The Prometheus metrics exporter has been improved and systematized, making this API stable from this release onwards to monitor your node metrics. The metrics are now `documented <https://github.com/Concordium/concordium-node/blob/main/docs/prometheus-exporter.md>`_ and the node's Prometheus metrics API stability will adhere to SEMVER guidelines.

        - Fixed an issue where the node configuration file (``main.config.json``) was sometimes corrupted.

        - Added an option to disable only the node specific grpc V1 endpoints that can be used to control the node. All the endpoints that are consensus related are kept allowing the node to be used as a gateway to the chain. The mentioned endpoints can be disabled by setting ``CONCORDIUM_NODE_DISABLE_RPC_SERVER_NODE_ENDPOINTS`` or using the flag ``--no-rpc-server-node-endpoints``.

        - Fixed a bug in ``GetAccountInfo`` endpoint in GRPCv2 where ``incoming_amounts`` field of encrypted amounts was not set correctly.

    .. dropdown:: 5.1.3 - January 19, 2023

        Concordium node version 5.1.3 introduces the following new features and improvements:

        - Improvements were made to allow greater concurrency with transaction processing.

        - Blocks are relayed earlier. This decreases the time it takes for the network to become aware of a block.

        - Removed the configuration option ``no_rebroadcast_consensus_validation``. This option (which was used for testing only and was disabled by default) made the node rebroadcast blocks before doing any validation.

        - Changes were made to avoid deadlocks during node shutdown in specific scenarios.

        - The node will now shut down to start if an error occurs in a required service (e.g., grpc server). In particular, the node will shut down if a required service could not be started.

        - Added timeout to downloading out of band catchup files when block indices and catch-up chunk files are specified by an URL. The timeout is controlled by the option ``--download-blocks-timeout`` (environment variable ``CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_TIMEOUT``) and defaults to 5 minutes. Timeout is now five minutes per chunk instead of waiting indefinitely.

        - Removed the ``CONCORDIUM_NODE_PROMETHEUS_SERVER`` environment variable. The prometheus server is now started if ``CONCORDIUM_NODE_PROMETHEUS_LISTEN_PORT`` is set.

    .. dropdown:: 5.0.7 for MacOS - January 4, 2023

        Fix a bug in the MacOS node that caused an issue with NRG calculation. Concordium recommends that MacOS node runners update their nodes to 5.0.7.

    .. dropdown:: 5.0.6 - November 29, 2022

        Concordium Node 5.0.6 contains support for `protocol version 5 <https://github.com/Concordium/concordium-update-proposals/blob/main/updates/P5.txt>`_ which will be released on Mainnet on December 13, 2022. This adds the following features:

        - Support for smart contract upgradability
        - Query the current exchange rates, account balances, and contract balances from a smart contract.
        - Relax restrictions on smart contracts, including:
            - Parameter size limit: 1kiB -> 65535B
            - Return value size limit: 16kiB -> no limit (apart from energy)
            - Number of logs per invocation: 64 -> no limit (apart from energy)
        - A new representation of accounts that is better optimised for common operations.
        - Revised the hashing scheme for transaction outcomes in protocol version 5. In particular, the exact reject reasons are no longer part of the computed hash. Furthermore, the transaction outcomes are being stored in a merkle tree for P5, resulting in faster speed for some queries.

        Additionally, the node update fixes an issue where the catch-up downloader would fail at a protocol update.

.. _rn-node-testnet:

Testnet
-------

Tools
=====

.. _rn-client:

Concordium Client
-----------------

    June 1, 2023

    Concordium Client 5.2.0 contains the following features and bug fixes:

    - Fix a bug in display of ``consensus show-chain-parameters`` output for protocol version 6.

    - Add ``raw GetBlockTransactionEvents`` that prints the list of transaction outcomes in a given block.

    .. dropdown:: 5.1.1 - March 16, 2023

        Concordium Client has been migrated to use version 2 of the node gRPC API.

        - Since the node serves the V2 gRPC API on port 20000 by default, the default value of the `--grpc-port` option has been updated to reflect this.

        - Some `raw` commands have been removed and new `raw` commands have been added. For detailed information, see the `Concordium Client changelog <https://github.com/Concordium/concordium-client/blob/main/ChangeLog.md#510>`__.

        - General improvements to error message information and phrasing.

        - The `--grpc-authentication-token` option has been removed.

    .. dropdown:: 5.0.2 - December 14, 2022

        Receive function parameters are now displayed as JSON in transaction status whenever they could be succesfully parsed by a smart contract schema embedded in the module or supplied by the user using the ``--schema`` option.

    .. dropdown:: 5.0.1 - November 21, 2022

        Concordium Client 5.0.1 adds support for the upcoming `protocol version 5 <https://github.com/Concordium/concordium-update-proposals/blob/main/updates/P5.txt>`_ which is planned for release on Testnet November 22, 2022.
        It also adds a ``--secure`` flag to enable connecting to gRPC using TLS. All commands that query the node support this.

        Additionally, it supports contract schema V3. V3 schemas offer the same options as V2, but also optionally includes a schema for contract events. `transaction status` now displays contract events, and a schema can be provided with `--schema`, which will be used to parse the contract events. By default events are parsed with the schema embedded in the contract, if present. This enables ``concordium-client`` to interact with contracts and schemas using `concordium-std` version 5. There is also improved formatting of `transaction status` output using contract schemas if they are available for displaying contract events, and output function parameters are shown as hex strings in `transaction status`.

.. _rn-cargo:

``cargo-concordium``
--------------------

    May 11, 2023

    For ``cargo-concordium`` 2.8.0 the distribution method for ``cargo-concordium`` has been simplified. Now, once you have installed rustup, you can quickly and easily install ``cargo-concordium`` without downloading a separate package or going through many steps. For more information, see :ref:`Install tools for development<setup-tools>`.

    If you already have ``cargo-concordium`` installed, you may need to remove the existing ``cargo-concordium`` from your PATH to be able to update versions in the future.

    .. dropdown:: 2.7.1 - April 12, 2023

        - Fixed a bug where conversion of parameters from JSON to binary did not work for schemas with signed integers when attempting to convert negative values.

        - Support calling `cargo concordium build` and `cargo concordium test` from any project subdirectory.

    .. dropdown:: 2.7.0 - January 30, 2023

        Added base64 commands for schemas in ``cargo concordium``. These allow the schema to be output in the base64 format that is currently supported in the |bw|.

    .. dropdown:: 2.6.0 - January 19, 2023

        Added the ability to output the schema in JSON format which can be more suitable for use in dApps.

    .. dropdown:: 2.5.0 - December 14, 2022

        - Add support for sampling random numbers for randomized testing with `cargo concordium test`.

        - Add support for providing a seed to initialize a random generator to `cargo-concordium`. The generator can be used for randomized testing. Command format: `cargo concordium test --seed 1234567890`. The provided seed value is a `u64` number. If the seed is not provided, a random one will be sampled.

    .. dropdown:: 2.4.0- November 21, 2022

        Cargo concordium 2.4.0 contains support for the upcoming `protocol version 5 <https://github.com/Concordium/concordium-update-proposals/blob/main/updates/P5.txt>`_ which is planned for release on Testnet November 22, 2022. This includes the following new features:

        - Build and test contracts using new protocol 5 features, such as upgradability and chain queries.
        - Support for relaxed smart contract resource restrictions in ``cargo concordium run``.
        - ``cargo concordium build`` now checks contracts with respect to protocol version 5 semantics.

.. _rn-vscode-ext:

VSCode extension
----------------

    May 1, 2023

    The VSCode extension has been developed to help developers get started with smart contract development. The extension sets up the editor for development, installs the ``cargo-concordium`` smart contract development tool for all supported platforms, and provides commands in the editor for the essential workflows, such as building and testing smart contracts.

.. _rn-ccdscan:

CCDScan
-------

Libraries
=========

.. _rn-sclibraries:

Smart contract Libraries
------------------------

    May 8, 2023

    Smart contract integration testing has been added to test your smart contracts: the `concordium-smart-contract-testing library <https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing>`__ makes it possible to create and run automatic integration tests of smart contracts. This will allow a smart contract developer to write code that runs multiple contracts in a locally-controlled environment, interacts with them, and asserts that the eventual output and state of the contracts are as expected. For more information about how to enable this, see :ref:`Integration test a contract in Rust<integration-test-contract>`.
