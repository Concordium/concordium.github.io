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

    July 31, 2023

        Version 1.1.1 includes bug fixes and an improvement for the upcoming protocol update.

        - Ensured compatibility with the upcoming protocol update (P6)

        - Fixed issue with DTS identities that contain non-ASCII characters.

        - WalletConnect: Display balances in proper CCD format in the account selection view.

    .. dropdown:: Previous releases

        .. dropdown:: |mw-gen2| 1.1.0 - July 17, 2023

            WalletConnect has been implemented in iOS 1.1.0, allowing you to interact with dApps in your |mw-gen2| on your iOS device to sign and submit transactions.

        .. dropdown:: |mw-gen2| 1.0.1 - May 31, 2023

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

    June 27, 2023

    The |mw-gen2| 1.2.0 for Android now includes support to manage fungible and non-fungible tokens. This includes adding, inspecting, and removing tokens.

    Additionally, the following improvements were made:

    - Identity view: Display raw document type when no localized string is matched
    - Fixed a crash when inputting a too large amount as the stake for delegation or baking.

    .. dropdown:: Previous releases

        .. dropdown:: |mw-gen2| 1.1.8 - May 31, 2023

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

        .. dropdown:: |mw-gen2| 1.0.0 - September 26, 2022

            Concordium introduces a new wallet for Android mobile devices: the |mw-gen2|. The |mw-gen2| offers all of the same functionality you know from |mw-gen1|, such as sending and receiving CCDs, delegation, baking, and so on. But the |mw-gen2| uses a secret recovery phrase to generate your private keys, simplifying any restoration of an account should you lose access to the phone/app. This version also supports easy portability of accounts between this and the soon to be released |bw|. You can read about |mw-gen2| and the differences between it and |mw-gen1| in the :ref:`FAQ<mw-gen2-faq>`.

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

    .. dropdown:: Previous releases

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

        .. dropdown:: |bw| 0.7.5 - October 19, 2022

            The |bw| extension for Chrome web browsers is released. It provides basic wallet functionality, such as sending and receiving CCDs. It also has the possibility to connect dApps to a wallet to interact with the Concordium blockchain.

.. _rn-dw:

Desktop Wallet
--------------

    August 4, 2022

    The Concordium Desktop Wallet now supports the Ledger Nano S Plus hardware wallet.

    Fixed an issue on macOS that prevented automatic updates from installing after successfully being downloaded and verified. **This means that macOS users have to download this release manually.**

    .. dropdown:: Previous releases

        .. dropdown:: 1.4.2 - June 21, 2022

            Concordium Desktop Wallet 1.4.2 is a hotfix release specifically for macOS containing the following fixes:

            -   Fixed an issue on macOS where an error popup would show after closing the main application window and opening it again.
            -   Fixed an issue on macOS where identity creation was not possible after closing the main application window and opening it again.

        .. dropdown:: 1.4.1 - June 15, 2022

            Concordium Desktop Wallet 1.4.1 contains functionality to support delegation to baker pools or passive delegation. In addition, the Desktop Wallet has an improved user interface. Note that the delegation functionality will not work until the protocol update occurs on June 23, 2022.

            The Concordium Ledger app 3.0.1 is also released. With the Sirius release, Ledger firmware version 2.0.0 is no longer supported.

            In addition, the following changes were made:

            - When choosing a delegation target a link is now available that forwards the user to the delegation documentation website.
            - Fixed an issue that made it impossible to create a transaction to do passive delegation.
            - Fixed an issue that caused the wallet to crash when inspecting identities with missing date attributes.

        .. dropdown:: 1.3.1 - January 13, 2022

            -   Fixed issue that caused the wallet to crash when inspecting identities with missing date attributes.
            -   Fixed identity issuance with DTS.

        .. dropdown:: 1.3.0 - December 17, 2022

            - Updated the default node configuration to point to concordiumwalletnode.com.
            - In the case of a failed identity, the error details received from the identity provider are now displayed to the user.
            - Added UI flows for baker transactions for single signer accounts.
            - Auxiliary data in an Update Protocol transaction is now optional.
            - Updated terms and conditions.
            - Updated UI to reflect the rename of GTU to CCD, meaning anywhere tokens were referred to as GTU, it now says CCD. The GTU icon has also been replaced with the icon representing CCD.
            - Datetimes are now selected with a date picker from a calendar.
            - Finalized transactions are no longer stored in the local database, but are instead always fetched from the wallet proxy when needed.
            - Failed database migrations errors are now shown correctly to the user.

        .. dropdown:: 1.2.0 - October 6, 2021

            - Added memo functionality to simple, shielded and scheduled transfers.
            - Automatic updates now supported.
            - Added option to recover lost accounts from Ledger devices.
            - The desktop wallet now shows connected node status in side bar.
            - Added an option to change between two account views.
            - Transaction log can now handle more than 100 transactions and filter functionality has been expanded.
            - Failed identities now show more information, including how to contact support.
            - Apple M1 Macs are now supported through Rosetta.
            - It is now possible to view an account address QR-code in "fullscreen" mode.
            - It is now possible to rename accounts and identities.
            - Added an option to add an address book entry while creating a transfer transaction.
            - Added an introductory screen to set up a node connection for first time users.
            - It is now possible to remove a failed identity.
            - The accounts page has been updated to make it clearer that multi credential accounts are not able to use shielded transactions.
            - Transactions in the 'Transfers' list in the account view are now grouped by dates.
            - Various smaller UI updates.
            - Various smaller bug fixes.
            - The desktop wallet is now open source.

        .. dropdown:: 1.1.6 - July 28, 2021

            Fixed an issue where identity creation would fail consistently making it impossible to create new identities.

        .. dropdown:: 1.1.5 - July 27, 2021

            -  General improvements to the user interface, in particular for multi signature transaction flows.
            -  Change of wallet password now enforces the same length restriction as when initially set.
            -  Wallet exports now contain the genesis hash to prevent the import of a wallet from testnet to a mainnet wallet.
            -  Improved messages when waiting for a Ledger device to be connected.
            -  Transaction status is now included in an account report.
            -  Fixed an issue where e.g. a loss of connection could result in a failed identity when it should not.
            -  Security improvements. Node integration was available to the Electron renderer threads which is considered unsafe. This has now been disabled.
            -  Added foundation feature for importing and creating multi signature transactions in bulk.
            -  A number of bug fixes.

.. _rn-mwgen1-ios:

|mw-gen1| for iOS
-----------------

    August 8, 2023

        |mw-gen1| 3.2.1 ensures support for the upcoming protocol version 6.

    .. dropdown:: Previous releases

        .. dropdown:: |mw-gen1| 3.2.0 - May 30, 2023

            In |mw-gen1| for iOS 3.2.0 identity and account creation has been locked in |mw-gen1| for iOS devices. This means that you cannot create new identities or accounts in |mw-gen1| on an iOS device. You can continue to use |mw-gen1|, but if you need to create a new identity or account you must use |mw-gen2|. You can also still recover your wallet from a backup file in |mw-gen1| on an iOS device.

        .. dropdown:: |mw-gen1| 3.1.1 - March 27, 2023

            A message has been added to suggest that users download and configure the new |mw-gen2|. This is to prepare for when account and identity creation will be disabled in |mw-gen1| for iOS. For more information, see the |mw-gen2| :ref:`FAQ<wallet-migrate>`.

        .. dropdown:: |mw-gen1| 3.1.0 - March 7, 2023

            In connection with the release of |mw-gen2| for iOS, the iOS mobile wallet previously known as Concordium Mobile Wallet has been renamed |mw-gen1| 3.1.0.

        .. dropdown:: 3.0.0(53) - June 30, 2022

            Concordium Mobile Wallet for iOS 3.0.0 contains the long-awaited and highly anticipated delegation and baking functionality.

            You can now delegate stake to a baker pool or passive delegation from Mobile Wallet, update delegation, or stop delegation.

            If you have enough stake to become a baker, you can also do that from Mobile Wallet. Additionally, you can open a baker pool, update baker stake and settings, update your baker keys, or stop baking.

        .. dropdown:: 2.0.0(38) - March 21, 2022

            Version 2 of the Concordium Mobile Wallet simplifies the UI, bringing the most common interactions forward.

            The simplified UI involves:

            - Redesigned account cards with Send, Receive and More options.

            - Updated simple and shielded transaction flows:

                - It is now possible to paste recipient addresses directly, without having to add them to the address book first.

                - A “Send all” button has been added.

            - The shielded balance is now found behind a setting on each account. Enabling the setting will show a brief introduction of the shielded balance concept.

            - The introduction flow shown when starting the app for the first time now includes more information on the Concordium identity and initial accounts.

        .. dropdown:: 1.3(34) - February 10, 2022

            Fixed a bug related to import of backup files.

        .. dropdown:: 1.2(33) - February 1, 2022

            - Changed name of export file to ``concordium-backup.concordiumwallet``.
            - Added prompts and dialogs to remind users to back up.

        .. dropdown:: 1.1(27) - December 9, 2021

            - Changed GTU/Ǥ naming to CCD/Ͼ.
            - Support for the new memo functionality in simple, shielded, and scheduled transfers:

                - It is now possible to add memos to simple and shielded transfers.
                - Memos can also be displayed for transfers with a release schedule.

            - Various improvements of the identity issuance flow, account creation and related support options.

            - Added a new dialogue shown when an identity request fails. There is now an option to contact the identity provider directly via an auto-filled e-mail, containing an issuance reference for better personal support, as well as system information of the user for better debugging.
            - Added a small dialogue to remind the user to check for a response on new identity requests.
            - Users will now be notified on successful creation of new accounts inside the app.
            - Various back-end improvements by the identity provider to make their service more robust.
            - Various improvements to make the identity issuance and account creation flow more robust.

            - Various bug fixes.
            - Various smaller textual updates.

        .. dropdown:: Testnet 0.1.52 - October 8, 2020

            New mobile wallets are released after some bug fixes on both iOS and Android.

.. _rn-mwgen1-android:

|mw-gen1| for Android
---------------------

    February 6, 2023

    In version 3.2.0 we changed the text in the "Suggest update" alert to suggest that the user update to the |mw-gen2| so it matches the download button.

    .. dropdown:: Previous releases

        .. dropdown:: 3.0.3 - November 17, 2022

            Identity and account creation has been locked in |mw-gen1| for Android devices. This means that you cannot create new identities or accounts in |mw-gen1| on an Android device. You can continue to use |mw-gen1|, but if you need to create a new identity or account you must use |mw-gen2|. You can also still recover your wallet from a backup file in |mw-gen1| on an Android device.

        .. dropdown:: 3.0.1 - September 26, 2022

            The Concordium Mobile Wallet has been renamed to |mw-gen1| with the release of the |mw-gen2|. If you are creating your first identity, Concordium recommends downloading and using |mw-gen2|.

        .. dropdown:: v3.0.0(100) - June 27, 2022

            Concordium Mobile Wallet 3.0.0 contains the long-awaited and highly anticipated delegation and baking functionality.

            You can now delegate stake to a baker pool or passive delegation from Mobile Wallet, update delegation, or stop delegation.

            If you have enough stake to become a baker, you can also do that from Mobile Wallet. Additionally, you can open a baker pool, update baker stake and settings, update your baker keys, or stop baking.

            This functionality will be available for iOS shortly.

        .. dropdown:: 2.0.0(75) - March 22, 2022

            Version 2 of the Concordium Mobile Wallet simplifies the UI, bringing the most common interactions forward.

            The simplified UI involves:

            - Redesigned account cards with Send, Receive and More options.

            - Updated simple and shielded transaction flows:

                - It is now possible to paste recipient addresses directly, without having to add them to the address book first.

                - A “Send all” button has been added.

            - The shielded balance is now found behind a setting on each account. Enabling the setting will show a brief introduction of the shielded balance concept.

            - The introduction flow shown when starting the app for the first time now includes more information on the Concordium identity and initial accounts.

        .. dropdown:: 1.2.6 - January 25, 2022

            - Changed name of export file to ``concordium-backup.concordiumwallet``.
            - Added prompts and dialogs to remind users to back up.

        .. dropdown:: 1.0.22 - December 17, 2021

            - Changed naming from GTU to CCD.
            - Various bug fixes.

        .. dropdown:: 1.0.16 - November 16, 2021

            -  Support for the new memo functionality in simple, shielded, and scheduled transfers:

                -  It is now possible to add memos to simple and shielded transactions.
                -  Memos can also be displayed for transfers with release schedule.

            -  Various improvements of the identity issuance flow, account creation, and related support options:

                -  Added a new dialogue, which is shown when an identity request fails. There is now an option to contact the identity provider directly via an autofilled e-mail, containing an issuance reference for better personal support as well as system information of the user for better debugging.
                -  Added a small dialogue to remind user to check for response on new identity requests.
                -  User will now be notified on successful creation of new accounts inside the app.
                -  Various back-end improvements by the identity provider to make their service more robust.

            -  Various bug fixes.

            -  Various smaller textual updates.

            -  Mainnet and Testnet versions of the Concordium Mobile Wallet for Android can now both be installed at the same time.

        .. dropdown:: Testnet 0.5.24 - October 8th, 2020

            New mobile wallets are released after some bug fixes on both iOS and Android.

        .. dropdown:: Open Testnet v2 update 1 - July 2, 2020

            An issue was identified in the Concordium ID app for Android. When using an identification document with no expiry date (such as a Swiss driving license) the app will crash upon completion of the ID issuance process. An app update has been issued and is available here (No longer available - See the downloads page downloads for the newest app). The node software is unaffected by this update.

.. _rn-ledger-app:

Concordium LEDGER app
---------------------

    August 10, 2023 - version 4.1.2

        Concordium is pleased to announce support for the Concordium LEDGER app in LEDGER Live. You can install and update the Concordium LEDGER app from LEDGER Live. For details, see :ref:`Install the Concordium LEDGER app<install-ledger>`. In addition, Concordium's LEDGER app now supports the LEDGER Nano X as well as the LEDGER Nano S and LEDGER Nano S Plus.

        The following improvements are also included:

        - Improved a number of user interface flows to require fewer clicks.

        - Amounts are now prefixed with CCD to indicate the unit of the amount.

    .. dropdown:: Previous releases

        .. dropdown:: 3.1.0 - March 31, 2023

            Concordium Ledger App v3.1.0 now supports Ledger Nano S Plus firmware version 1.1.0.

        .. dropdown:: 3.0.1 - June 15, 2022

            The Concordium Ledger app 3.0.1 is released. With the Sirius release, Ledger firmware version 2.0.0 is no longer supported.

        .. dropdown:: 2.0.3 - December 13, 2021

            - Supports Ledger Nano S firmware version 2.1.0.
            - Removed references to GTU in the UI.
            - An acceptance step has been added to the export of private key seeds.

        .. dropdown:: 2.0.1 - October 6, 2021

            - Improved state validation to deny instruction changes in multi command transactions.
            - Support building for the Ledger Nano X.
            - Simplified the UI by updating terminology and stopped displaying details that cannot feasibly be verified by a user.
            - Export of private key seeds has been changed so that either the PRF key can be exported alone, or the PRF key and the IdCredSec are exported in a single command.
            - Added support for transactions with memos.
            - Support for the "Add identity provider" update.
            - Support for the "Add anonymity revoker" update.
            - Improved pagination of account addresses and hexadecimal strings, so that pages are split evenly and consistently.
            - Fixed an issue in the add baker UI, where a response could be sent before signing or declining.

        .. dropdown:: 1.0.2 - July 27, 2021

            -  Scheduled transfer release times are now shown as human readable UTC date time strings.
            -  Fixed a UI bug in remove baker transaction.

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

    .. dropdown:: Previous releases

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

        .. dropdown:: 4.5.0 - October 25, 2022

            Concordium Node 4.5.0 contains the :ref:`updated gRPC API <grpc2-documentation>` which is easier to use than the previous version. It also contains bug fixes and performance and robustness improvements.

            - Node gRPC API v2 is released and enabled in all distributions.
            - The node is now able to recover after crashes which leave only treestate or only blockstate usable.
            - Fix a memory leak that could occur in certain usage scenarios involving smart contracts.

        .. dropdown:: 4.4.4 - October 5, 2022

            Concordium Node 4.4.4 contains performance improvements and bug fixes.

            - Smart contract state is no longer cached on startup and is not cached after finalization. This reduces the node's memory use and startup time.

            - Smart contract modules are no longer retained in memory. Module artifacts are loaded as needed during contract execution. Metadata is cached for a limited number of smart contract modules. By default, the cache will retain metadata for at most 1000 smart contract modules, and this is configurable via the ``--modules-cache-size`` command line argument or by using the ``CONCORDIUM_NODE_CONSENSUS_MODULES_CACHE_SIZE`` environment variable.

            - Speed up and reduce memory overhead during protocol updates. Overhead in memory use during protocol updates should now be less than 20%, and time to process a protocol update should be around 1/3 of the previous release.

            - The node now validates blocks more eagerly and does not relay blocks it cannot fit into the tree, i.e., pending blocks.

            - The ``--download-blocks-from`` option now takes the URL to the catchup ``_index file_``, permitting to only download and import catchup files containing blocks not already present in the database.

            - Partial node database recovery. The node is now able to recover from the most common causes of its database corruption.

            - Fix typo in environment variable ``CONCORDIUM_NODE_PROMETHEUS_LISTEN_ADDRESSS`` (remove trailing `S`).

            - Fix a bug in Ctrl-C signal handling where a node would fail to stop if interrupted early on in the startup if out-of-band catchup was enabled.

        .. dropdown:: 4.3.1 - September 5, 2022

            Concordium Node 4.3.1 introduces a number of performance improvements. The effects of these are that the node on mainnet at the current load will use around 1/4 the memory of the `4.2.3` node. Startup can be up to 50% faster, although exact improvements will be platform dependent.

            - Account records are no longer constantly retained in memory. Instead, a limited number are retained in a cache. The number of cached accounts defaults to 10000 and can be configured by the ``--accounts-cache-size`` command line argument or the ``CONCORDIUM_NODE_CONSENSUS_ACCOUNTS_CACHE_SIZE`` environment variable.
            - Reduce startup time and memory use further by reducing the amount of block data retained in memory. In particular finalized blocks are no longer stored in memory.
            - Optimize node data structures related to accounts. This reduces node memory use and improves performance.
            - The gRPC API now reports correctly when the sender of a transaction did not have enough funds to cover the transaction costs.
            - Remove obsolete and unused option ``--max-expiry-duration``.
            - Remove transaction logging functionality from the node. It is replaced by an external `transaction logger <https://github.com/Concordium/concordium-transaction-logger>`_ service. As a consequence the ``transaction-outcome-logging`` family of command line options are removed from the node.

        .. dropdown:: 4.2.3 for Docker - August 4, 2022

            Some improvements have been made to the Docker node version. The new Docker images (one for Mainnet and one for Testnet) are designed for use with docker-compose or a similar driver. The node also requires a database which must be stored on the host system so that it persists when the Docker container is stopped.

            It is not mandatory but **strongly recommended** for Linux node runners to migrate to the new Docker distribution. The old Docker images will be deprecated and future node versions from 4.3 and upwards will only be provided in the new distribution.

        .. dropdown:: 4.2.3 - August 2, 2022

            Concordium Node 4.2.3 fixes a critical security vulnerability present in all previous 4.* node versions. All node runners **must** upgrade as soon as possible.

            The security advisory detailing the issue and the patch will be released on August 15th.

        .. dropdown:: 4.2.1 - July 4, 2022

            Concordium Node 4.2.1 is a maintenance release, bringing performance improvements and bugfixes. The highlights are:

            - A significant decrease in node startup time. The exact improvements are platform dependent, but startup should be at least 6 times faster on mainnet.
            - A significant decrease in node memory use. On mainnet, a 4.2.1 node should use less than 50% of memory compared to 4.1.1.
            - Reduced CPU use of passive nodes in Windows, Mac, and Linux distributions.

        .. dropdown:: 4.1.1 - June 15, 2022

            Concordium Node 4.1.1 (Sirius) introduces new functionality to support delegation to baker pools or passive delegation, and a new version Smart Contracts.

            Note that when the protocol update happens on June 23, 2022 that the cool-down period for reducing baker stake or stopping baking increases from one week to three weeks. If you reduce your stake or stop baking BEFORE the protocol update takes effect, the cool-down remains one week.

            V1 smart contracts include the following key features:
            - Unlimited contract state size
            - Synchronous contract calls
            - Fallback entrypoints
            - An increased smart contract module size limit of 512kB
            - A number of cryptographic primitives

            Other improvements in this version include:
            - The SendTransaction function exposed via the gRPC interface now provides the caller with detailed error messages.
            - Support for wire-protocol version 0 is dropped, meaning that the node cannot connect to peers that do not support wire-protocol version 1, which is supported since version 1.1.0.
            - The macOS installer has been improved so it no longer overwrites the service files when reinstalling.
            - When using the Mac installer users now can leave one (but not both) of the net configurations empty when they don't want to configure a node for it. On the initial installation, leaving a net configuration empty means that the start/stop app shortcuts and the application support folder for that net won't be installed.
            - Consensus queries have been made more robust by validating input more extensively. This affects all queries whose input was a block or transaction hash. These queries now return an InvalidArgument error.
            - The maximum number of retries for Node Collector has been removed so it will keep querying indefinitely.
            - Nodes can now be stopped during out of band catchup by using the signals ``SIGINT`` and ``SIGTERM``.
            - The ``GetAccountInfo`` endpoint supports querying the account via the account index.
            - Baker pools and stake delegation are implemented for the P4 protocol version.
            - The new gRPC endpoint ``GetBakerList`` retrieves a JSON list of the baker IDs of the bakers registered in a known block. It returns null for an unknown block.
            - The new gRPC endpoint ``GetPoolStatus`` retrieves a status record for a baker pool, or for the set of passive delegators.
            - The bakerStakeThreshold level-2 keys are renamed to poolParameters keys; two additional access structures are defined: cooldownParameters and timeParameters.
            - Smart contract modules are cached on startup from the existing state to improve smart contract execution.

            .. Note::

                Prior to Sirius, the nodes enforced that a transaction could not be deployed until 2 hours before its expiry date. With Sirius, node validation of transactions has been improved and the 2 hour window has been removed.

        .. dropdown:: 3.0.2 - April 21, 2022

            Fixed a security vulnerability in the network layer that could be used to crash the node, causing a denial of service.

        .. dropdown:: 3.0.1 - January 7, 2022

            Fixed a starvation bug in some cases of parallel node queries.

        .. dropdown:: 3.0.0 - December 17, 2021

            - Introduced support for account aliases via protocol P3. Accounts can be queried in ``GetAccountInfo``, ``GetAccountNonFinalizedTransactions``, ``GetNextAccountNonce`` by any alias.
            - ``GetAccountInfo`` object now has an additional field ``accountAddress`` that contains the canonical address of the account.
            - Fixed a bug due to incorrect use of LMDB database environments, where a node would crash if queried at specific times.
            - Faster state queries by avoiding locking the block state file when reading.
            - Fixed a bug caused by shutting down RPC before the node, which caused the node to crash when attempting a graceful shutdown while processing RPC requests.
            - The node now drops all connections on an unrecognized protocol update and refuses to accept new transactions.

        .. dropdown:: 1.1.3 - October 6, 2021

            The Concordium node release v1.1.3 implements a protocol update to add memo functionality for simple, shielded and scheduled transfers.
            This means that node runners **must upgrade** their nodes before the new protocol takes effect on testnet on October 13 at 12:00 CEST, 2021. Old nodes will stop processing new blocks at that point. See `protocol updates <https://github.com/Concordium/concordium-update-proposals>`_ for more details.

            - Added memo functionality for transactions to Protocol
            - Windows support for running a node
            - Mac support for running a node
            - Mac ARM M1 support for running a node
            - Various bug fixes

        .. dropdown:: 1.0.0 - June 9, 2021

            We are proud to announce that version 1 of the Concordium blockchain infrastructure, the “Alpha Centauri” release, is available for download.

            Our Mainnet release has the following main features:

            **Proof of Stake**

            The Concordium Blockchain uses a proof of stake mechanism to ensure resource-efficient operation of the network.

            **Two Layer Consensus Protocol**

            -  Nakamoto-Style Consensus
                Bakers participate in a form of lottery to win the right to append blocks to the chain.

            -  Finality Layer
                Concordium finality layer dynamically ‘checkpoints’ the blockchain using Byzantine agreement to identify and mark common blocks in the chains of honest users as final.

            **Built in IDLayer**

            Account creation is based on a validated identity, but at the same time it provides transactional privacy for users with a mechanism that allows accountability to local regulatory authorities.

            Transactional privacy is further enhanced by support for shielded transfers.

            **Smart Contracts**

            Concordium blockchain has native support for smart contracts on-chain with our core on-chain language WebAssembly (Wasm), a portable well-defined assembly-like language.

            Rust is the first off-chain high level smart contract language.

            **Tokenomics and On-chain Incentivization**

            The Concordium blockchain comprises a set of transactions and economic roles that interact within the economy. An economic role, such as a baker or account holder, is represented by an account on the Concordium platform.

            The flow of CCD between accounts via transactions creates an economy that is designed to incentivize participation in the network and counter dishonest behaviour. It is the objective of the Concordium Foundation to guide the creation of a sustainable economy that rewards participants for their efforts in developing the network.

            **Concordium Node**

            The Concordium node software is available for Linux and available in two different packages:

            -  A distribution package, which provides wrappers for setting up the node in a Docker image.

            -  A Debian package built for Ubuntu 20.04. This package allows for greater customization of the node set up.

            **Mobile Wallet**

            The Mobile Wallet is available for iOS and Android with support for:

            -  identity issuance and management.
            -  account creation and management.
            -  simple and shielded transactions.
            -  platform security protection
            -  export and import to other mobile wallets.
            -  access to the blockchain through a “wallet proxy” operated by Concordium with no need to run a node.

            **Desktop Wallet**

            The Desktop Wallet is available for Windows, macOS, and Linux with support for:

            -  identity issuance and management.
            -  account creation and management.
            -  protection by Ledger Nano S device.
            -  multi signature account set up and management.
            -  multiple transaction types:
            -  Simple
            -  Scheduled
            -  Shielded
            -  Multi-signature
            -  filtering and printing historic transactions
            -  baker management
            -  access to blockchain via a service node, which is usually owned by the user of the Desktop Wallet.

            **Source Code**

            The source code for the Concordium Blockchain is free open source software. You can access our repositories on the `Concordium GitHub organization page <https://github.com/Concordium>`_.

.. _rn-node-testnet:

Testnet
-------

    August 9, 2023

        Concordium Node 6.0.4 contains support for `protocol version 6 <https://github.com/Concordium/concordium-update-proposals/blob/main/updates/P6.txt>`_ with Concordium BFT consensus which will be released August 21, 2023. **Node runners should upgrade to version 6.0.4. before the protocol update to ensure that their nodes do not shut down.**

        Also, gRPC v1 is NOT enabled in any of the node distributions. gRPC v2 should be used. As a consequence of this the configuration option ``no-rpc-server`` and environment variable ``CONCORDIUM_NODE_DISABLE_RPC_SERVER``, as well as default values of ``rpc-server-port`` (``CONCORDIUM_NODE_RPC_SERVER_PORT``) and ``rpc-server-addr`` (``CONCORDIUM_NODE_RPC_SERVER_ADDR``), have been removed. The V1 gRPC server is only started if both of these options are supplied.

        Additional features of this release include:

        - Fixed a network layer bug where initial messages after the handshake could be dropped in some circumstances.

        - Changes in Wasm validation and execution in P6 include:

            - Disallowed globals in initialization sections for V1 contracts in P6.

            - Added support for sign extension instructions in Wasm in P6.

            - Do not count custom sections towards module size when executing contracts.

            - Support new ``invoke`` operations for retrieving account keys and checking signatures.

        - Shut down consensus upon a protocol update updating from protocol version 6.

        - Fixed a bug that causes bakers in genesis to restake their earnings when they should not. This affects genesis data at protocol version P5; P1-P4 genesis data are not affected. This breaks compatibility with chains started with P5 genesis data, where some genesis bakers are not set to restake earnings. Other chains (including mainnet and testnet) are not affected.

        - Changed the ``GetConsensusStatus`` endpoint so that slot duration is only returned in protocol versions 0-5.

            - Endpoint is extended to return current timeout duration, current round, current epoch and trigger block time in protocol version 6.

        - Changed the ``GetBlockInfo`` endpoint:

            - Block slot is only returned in protocol versions 0-5.

            - In protocol version 6, the returned finalized block is the last finalized block until itself is finalized. Then it is itself.

            - Endpoint extended to return block round and epoch in protocol version 6.

        - Changed the ElectionInfo endpoint so that Election difficulty is only returned in protocol versions 0-5.

    .. dropdown:: Previous releases

        .. dropdown:: 5.4.2 - June 7, 2023

            Concordium node version 5.4.2 fixes a bug that caused an extra byte to be added when running ``getModuleSource`` in the V1 GRPC API.

        .. dropdown:: 5.4.1 - June 1, 2023

            Concordium node version 5.4.1 contains the following features and bug fixes:

            - Enable CORS support in grpc-web. This only applies when grpc-web is enabled.

            - Fixed a security issue.

            - Support using block height as block identifiers in gRPC v2 API.

            - Extend gRPC v2 API call ``GetBlockInfo`` with the protocol version of the block.

            - Do not keep a historical list of peers when running as a normal node.

        .. dropdown:: 5.3.2 - April 20, 2023

            - Extended the Prometheus exporter with the following metrics: grpc_request_duration_seconds, grpc_in_flight_requests, consensus_baking_committee, consensus_finalization_committee, consensus_baking_lottery_power, consensus_baked_blocks_total, consensus_finalized_baked_blocks_total, network_soft_banned_peers_total, consensus_non_finalized_transactions and consensus_unsupported_pending_protocol_version. See `docs/prometheus-exporter.md <https://github.com/Concordium/concordium-node/blob/main/docs/prometheus-exporter.md>`_ for more details.

            - Also, in the changelog for the node grpc_request_duration_seconds has been renamed to grpc_request_response_time_seconds to match the what is in the code.

            - Added the following new options:

            - The ``--grpc2-health-min-peers`` (environment variable ``CONCORDIUM_NODE_GRPC2_HEALTH_MIN_PEERS``) triggers the grpc V2 health endpoint to check minimum number of peers.

            - ``--grpc2-invoke-max-energy`` (environment variable ``CONCORDIUM_NODE_GRPC2_INVOKE_MAX_ENERGY``) allows the node runner to control the maximum amount of energy allowed by an InvokeInstance (and the V1 GRPC InvokeContract) call. The behavior of the endpoint is slightly changed as well. The energy is no longer required in the request, and the effective energy used by the call will be min(request.energy, grpc-invoke-max-energy). This differs from the previous behavior where a request would fail if the request either omitted the energy, or supplied an excessive value.

            - Improved the node health check, so that if the node is configured with baker credentials, then it is required to be in the baking committee for it to be considered healthy.

            - Fixed a bug that could cause the node to hang indefinitely during the out-of-band-catchup when the node is a finalizer.

            - Fixed an additional bug in the ``GetAccountInfo`` endpoint in GRPCv2 where the incoming_amounts field of encrypted amounts was not always set correctly.

            - The node collector is migrated to a separate package and now uses the V2 GRPC API. If you already have a node installed, you must update the configuration. For more information, see the Run a node topic that is specific to your node platform: :ref:`Linux<run-a-node>`, :ref:`Ubuntu<run-node-ubuntu-testnet>`, :ref:`Windows<run-node-windows>`, or :ref:`macOS<run-node-macos>`.

        .. dropdown:: 5.2.4 - March 09, 2023

            - The Prometheus metrics exporter has been improved and systematized, making this API stable from this release onwards to monitor your node metrics. The metrics are now `documented <https://github.com/Concordium/concordium-node/blob/main/docs/prometheus-exporter.md>`_ and the node's Prometheus metrics API stability will adhere to SEMVER guidelines.

            - Fixed an issue where the node configuration file (``main.config.json``) was sometimes corrupted.

            - Added an option to disable only the node specific grpc V1 endpoints that can be used to control the node. All the endpoints that are consensus related are kept allowing the node to be used as a gateway to the chain. The mentioned endpoints can be disabled by setting ``CONCORDIUM_NODE_DISABLE_RPC_SERVER_NODE_ENDPOINTS`` or using the flag ``--no-rpc-server-node-endpoints``.

            - Fixed a bug in ``GetAccountInfo`` endpoint in GRPCv2 where ``incoming_amounts`` field of encrypted amounts was not set correctly.

        .. dropdown:: 5.1.3 - January 12, 2023

            Concordium node version 5.1.3 introduces the following new features and improvements:

            - Improvements were made to allow greater concurrency with transaction processing.

            - Blocks are relayed earlier. This decreases the time it takes for the network to become aware of a block.

            - Removed the configuration option ``no_rebroadcast_consensus_validation``. This option (which was used for testing only and was disabled by default) made the node rebroadcast blocks before doing any validation.

            - Changes were made to avoid deadlocks during node shutdown in specific scenarios.

            - The node will now shut down to start if an error occurs in a required service (e.g., grpc server). In particular, the node will shut down if a required service could not be started.

            - Added timeout to downloading out of band catchup files when block indices and catch-up chunk files are specified by an URL. The timeout is controlled by the option ``--download-blocks-timeout`` (environment variable ``CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_TIMEOUT``) and defaults to 5 minutes. Timeout is now five minutes per chunk instead of waiting indefinitely.

            - Removed the ``CONCORDIUM_NODE_PROMETHEUS_SERVER`` environment variable. The prometheus server is now started if ``CONCORDIUM_NODE_PROMETHEUS_LISTEN_PORT`` is set.

        .. dropdown:: 5.0.7 for MacOS - January 4, 2023

            Fixed a bug in the MacOS node that caused an issue with NRG calculation. Concordium recommends that MacOS node runners update their nodes to 5.0.7.

        .. dropdown:: 5.0.6 - November 15, 2022

            Concordium Node 5.0.6 contains support for `protocol version 5 <https://github.com/Concordium/concordium-update-proposals/blob/main/updates/P5.txt>`_ which will be released November 22, 2022. This adds the following features:

            - Support for smart contract upgradability
            - Query the current exchange rates, account balances, and contract balances from a smart contract.
            - Relax restrictions on smart contracts, including:
                - Parameter size limit: 1kiB -> 65535B
                - Return value size limit: 16kiB -> no limit (apart from energy)
                - Number of logs per invocation: 64 -> no limit (apart from energy)
            - A new representation of accounts that is better optimised for common operations.
            - Revised the hashing scheme for transaction outcomes in protocol version 5. In particular, the exact reject reasons are no longer part of the computed hash. Furthermore, the transaction outcomes are being stored in a merkle tree for P5, resulting in faster speed for some queries.

            Additionally, the node update fixes an issue where the catch-up downloader would fail at a protocol update.

        .. dropdown:: 4.5.0 - October 18, 2022

            Concordium Node 4.5.0 contains the :ref:`updated gRPC API <grpc2-documentation>` which is easier to use than the previous version. It also contains bug fixes and performance and robustness improvements.

            - Node gRPC API v2 is released and enabled in all distributions.
            - The node is now able to recover after crashes which leave only treestate or only blockstate usable.
            - Fix a memory leak that could occur in certain usage scenarios involving smart contracts.

        .. dropdown:: 4.4.4 - September 29, 2022

            Concordium Node 4.4.4 contains performance improvements and bug fixes.

            - Smart contract state is no longer cached on startup and is not cached after finalization. This reduces the node's memory use and startup time.

            - Smart contract modules are no longer retained in memory. Module artifacts are loaded as needed during contract execution. Metadata is cached for a limited number of smart contract modules. By default, the cache will retain metadata for at most 1000 smart contract modules, and this is configurable via the ``--modules-cache-size`` command line argument or by using the ``CONCORDIUM_NODE_CONSENSUS_MODULES_CACHE_SIZE`` environment variable.

            - Speed up and reduce memory overhead during protocol updates. Overhead in memory use during protocol updates should now be less than 20%, and time to process a protocol update should be around 1/3 of the previous release.

            - The node now validates blocks more eagerly and does not relay blocks it cannot fit into the tree, i.e., pending blocks.

            - The ``--download-blocks-from`` option now takes the URL to the catchup ``_index file_``, permitting to only download and import catchup files containing blocks not already present in the database.

            - Partial node database recovery. The node is now able to recover from the most common causes of its database corruption.

            - Fix typo in environment variable ``CONCORDIUM_NODE_PROMETHEUS_LISTEN_ADDRESSS`` (remove trailing `S`).

            - Fix a bug in Ctrl-C signal handling where a node would fail to stop if interrupted early on in the startup if out-of-band catchup was enabled.

        .. dropdown:: 4.3.1 - August 29, 2022

            Concordium Node 4.3.1 introduces a number of performance improvements. The effects of these are that the node on mainnet at the current load will use around 1/4 the memory of the `4.2.3` node. Startup can be up to 50% faster, although exact improvements will be platform dependent.

            - Account records are no longer constantly retained in memory. Instead, a limited number are retained in a cache. The number of cached accounts defaults to 10000 and can be configured by the ``--accounts-cache-size`` command line argument or the ``CONCORDIUM_NODE_CONSENSUS_ACCOUNTS_CACHE_SIZE`` environment variable.
            - Reduce startup time and memory use further by reducing the amount of block data retained in memory. In particular finalized blocks are no longer stored in memory.
            - Optimize node data structures related to accounts. This reduces node memory use and improves performance.
            - The gRPC API now reports correctly when the sender of a transaction did not have enough funds to cover the transaction costs.
            - Remove obsolete and unused option ``--max-expiry-duration``.
            - Remove transaction logging functionality from the node. It is replaced by an external `transaction logger <https://github.com/Concordium/concordium-transaction-logger>`_ service. As a consequence the ``transaction-outcome-logging`` family of command line options are removed from the node.

        .. dropdown:: 4.2.3 for Docker - August 4, 2022

            Some improvements have been made to the Docker node version. The new Docker images (one for Mainnet and one for Testnet) are designed for use with docker-compose or a similar driver. The node also requires a database which must be stored on the host system so that it persists when the Docker container is stopped.

            It is not mandatory but **strongly recommended** for Linux node runners to migrate to the new Docker distribution. The old Docker images will be deprecated and future node versions from 4.3 and upwards will only be provided in the new distribution.

        .. dropdown:: 4.2.3 - August 2, 2022

            Concordium Node 4.2.3 fixes a critical security vulnerability present in all previous 4.* node versions. All node runners **must** upgrade as soon as possible.

            The security advisory detailing the issue and the patch will be released on August 15th.

        .. dropdown:: 4.2.1 - June 27, 2022

            Concordium Node 4.2.1 is a maintenance release, bringing performance improvements and bugfixes. The highlights are:

            - A significant decrease in node startup time. The exact improvements are platform dependent, but startup should be at least 6 times faster on mainnet.
            - A significant decrease in node memory use. On mainnet, a 4.2.1 node should use less than 50% of memory compared to 4.1.1.
            - Reduced CPU use of passive nodes in Windows, Mac, and Linux distributions.

        .. dropdown:: 4.1.1 Sirius Testnet reset - June 13, 2022

            Sirius testnet has been reset on June 13, 2022.

            A new version of Concordium Node has been released to fix several critical errors related to delegation.

        .. dropdown:: 4.0.11 - May 16, 2022

            Concordium Node 4.0.11 introduces new functionality to support delegation to baker pools or passive delegation, and a new version Smart Contracts.

            V1 smart contracts includes the following key features:
            - Unlimited contract state size
            - Synchronous contract calls
            - Fallback entrypoints
            - An increased smart contract module size limit of 512kB
            - A number of cryptographic primitives

            Other improvements in this version include:
            - The SendTransaction function exposed via the gRPC interface now provides the caller with detailed error messages.
            - Support for wire-protocol version 0 is dropped, meaning that the node cannot connect to peers that do not support wire-protocol version 1, which is supported since version 1.1.0.
            - The macOS installer has been improved so it no longer overwrites the service files when reinstalling.
            - When using the Mac installer users now can leave one (but not both) of the net configurations empty when they don't want to configure a node for it. On the initial installation, leaving a net configuration empty means that the start/stop app shortcuts and the application support folder for that net won't be installed.
            - Consensus queries have been made more robust by validating input more extensively. This affects all queries whose input was a block or transaction hash. These queries now return an InvalidArgument error.
            - The maximum number of retries for Node Collector has been removed so it will keep querying indefinitely.
            - Nodes can now be stopped during out of band catchup by using the signals ``SIGINT`` and ``SIGTERM``.
            - The ``GetAccountInfo`` endpoint supports querying the account via the account index.
            - Baker pools and stake delegation are implemented for the P4 protocol version.
            - The new gRPC endpoint ``GetBakerList`` retrieves a JSON list of the baker IDs of the bakers registered in a known block. It returns null for an unknown block.
            - The new gRPC endpoint ``GetPoolStatus`` retrieves a status record for a baker pool, or for the set of passive delegators.
            - The bakerStakeThreshold level-2 keys are renamed to poolParameters keys; two additional access structures are defined: cooldownParameters and timeParameters.
            - Smart contract modules are cached on startup from the existing state to improve smart contract execution.

        .. dropdown:: 3.0.2 - April 21, 2022

            Fixed a security vulnerability in the network layer that could be used to crash the node, causing a denial of service.

        .. dropdown:: 3.0.1 - January 3, 2022

            Fixed a starvation bug in some cases of parallel node queries.

        .. dropdown:: 3.0.0 - November 29th 2021

            - Introduced support for account aliases via protocol P3. Accounts can be queried in ``GetAccountInfo``, ``GetAccountNonFinalizedTransactions``, ``GetNextAccountNonce`` by any alias.
            - ``GetAccountInfo`` object now has an additional field ``accountAddress`` that contains the canonical address of the account.
            - Fixed a bug due to incorrect use of LMDB database environments, where a node would crash if queried at specific times.
            - Faster state queries by avoiding locking the block state file when reading.
            - Fixed a bug caused by shutting down RPC before the node, which caused the node to crash when attempting a graceful shutdown while processing RPC requests.
            - The node now drops all connections on an unrecognized protocol update and refuses to accept new transactions.

        .. dropdown:: 1.1.3 - October 6, 2021

            The Concordium node release v1.1.3 is a bugfix release.

            - `Changelog <https://github.com/Concordium/concordium-node/blob/main/CHANGELOG.md#concordium-node-113>`__

        .. dropdown:: 1.1.2 - September 17, 2021

            The Concordium node release v1.1.2 is a bugfix release.

            - `Changelog <https://github.com/Concordium/concordium-node/blob/main/CHANGELOG.md#concordium-node-112>`__

        .. dropdown:: 1.1.1 - September 15, 2021

            The Concordium node release v1.1.1 implements a protocol update to add memo functionality for simple, shielded and scheduled transfers. This means that node runners **must upgrade** their nodes before the new protocol takes effect on testnet on September 22, 2021. Old nodes will stop processing new blocks at that point. See `protocol updates <https://github.com/Concordium/concordium-update-proposals>`_ for more details.

            - Added memo functionality for transactions to Protocol
            - Windows support for running a node
            - Mac support for running a node
            - Mac ARM M1 support for running a node

        .. dropdown:: 1.0.0 - May 12th, 2021

            Updated Open Testnet to match Mainnet features including:

            **Proof of Stake**

            The Concordium Blockchain uses a proof of stake mechanism to ensure resource-efficient operation of the network.

            **Two Layer Consensus Protocol**

            Nakamoto-Style Consensus Bakers participate in a form of lottery to win the right to append blocks to the chain.

            Finality Layer Concordium finality layer dynamically ‘checkpoints’ the blockchain using Byzantine agreement to identify and mark common blocks in the chains of honest users as final.

            **Built in IDLayer**

            Account creation is based on a validated identity, but at the same time it provides transactional privacy for users with a mechanism that allows accountability to local regulatory authorities.

            Transactional privacy is further enhanced by support for shielded transfers.

            **Smart Contracts**

            Concordium blockchain has native support for smart contracts on-chain with our core on-chain language WebAssembly (Wasm), a portable well-defined assembly-like language.

            Rust is the first off-chain high level smart contract language.

            **Tokenomics and On-chain Incentivization**

            The Concordium blockchain comprises a set of transactions and economic roles that interact within the economy. An economic role, such as a baker or account holder, is represented by an account on the Concordium platform.

            The flow of CCD between accounts via transactions creates an economy that is designed to incentivize participation in the network and counter dishonest behaviour. It is the objective of the Concordium Foundation to guide the creation of a sustainable economy that rewards participants for their efforts in developing the network.

            **Concordium Node**

            The Concordium node software is available for Linux and available in two different packages:

            * A distribution package, which provides wrappers for setting up the node in a Docker image.

            * A Debian package built for Ubuntu 20.04. This package allows for greater customization of the node set up.

        .. dropdown:: Open Testnet v4 update 1 - January 14th, 2020

            Fixed an issue in the node, where a parameter update transaction could cause the node to crash on restart.

        .. dropdown:: Open Testnet v4 - January 13th, 2020

            Smart contracts:

            * Smart contracts support on chain
            * Rust supported as off-chain Smart Contract language
            * `Concordium-std <https://crates.io/crates/concordium-std>`_ library added for developing smart contracts in Rust.
            * ``Cargo-concordium`` tool for building and testing smart contracts off-chain
            * Documentation for smart contracts added to developer documentation
            * Smart Contract transactions added to ``concordium-client``


            Tokenomics (to match tokenomics model):

            * Rewards for baking and finalization changed
            * Minting changed
            * Extended the list of adjustable chain parameters
            * Updated `network dashboard block explorer <https://dashboard.testnet.concordium.com/chain>`_ to include new info
            * Amount lock-up transaction with schedule added
            * Staking changed so staked amount is locked
            * Mobile app updated to show staking and amount lockup schedules
            * Delegation removed

            ID layer:

            * Initial account creation added to ID provider process
            * Mobile app updated to support initial account creation

        .. dropdown:: Open Testnet v3 update 2 - October 16th, 2020

            A new Mac version is released after fixing an issue with adding a baker on the dashboard. The downloads page has been updated accordingly. Please download the latest Mac release, then stop your node, reset your data, and restart your node.

        .. dropdown:: Open Testnet v3 - October 6th, 2020

            -  Chain visualization: The connection of blocks has been made more stable to ensure that it progresses smoothly.
            -  iOS Concordium ID app available.
            -  Added import to app. It is now possible to import a file that has previously been exported. This enables moving identities and accounts to other mobile devices and restoring from backup.
            -  µCCD. The smallest unit has been changed from 10-4 to 10-6.
            -  Bulletproofs. The core blockchain has been updated to support use of bulletproofs.
            -  Encrypted(shielded) amounts and transfers: Support for shielded transactions has been added to the core blockchain. Support for sending and receiving shielded amounts are added to the mobile apps and the Concordium client.
            -  Anonymity revocation tool available for anonymity revokers.
            -  Block storage improvements for storing the chain on nodes.

        .. dropdown:: 0.2.13 - June 29, 2020

            Follow our instructions on how to upgrade to Open Testnet v2 from v1.

            The Testnet v2 is the second public release of the Concordium Blockchain. Open Testnet aims at demonstrating the technology behind the Concordium Blockchain. This version is not feature-complete compared to the expected features for the first Mainnet version of the Concordium Blockchain.

            -  Concordium ID, an Android mobile app for accessing identities and accounts
            -  Identity provider integration in Android mobile app

            -  Notabene developer identity issuance flow
            -  Notabene identity issuance flow

            -  Catch-up time improvements

            -  The time needed for new nodes to catch-up has been significantly reduced
            -  Restarting nodes can now choose to start from their local database, removing the need to do a complete catch-up.

            -  Storage requirements improvements

            -  Storage of the chain on nodes has been optimized

            -  Concordium Node and Client Software improvements. Extended in the following areas:

            -  Managing bakers
            -  Account delegation
            -  Module query
            -  Account management

            -  Block explorer added to dashboard
            -  Node dashboard with support for becoming a baker
            -  Improvements to the `Network Dashboard <https://dashboard.testnet.concordium.com>`_

        .. dropdown:: 0.2.4 - April 2, 2020

            The Testnet v1 is the first public release of the Concordium Blockchain. Open Testnet aims at demonstrating the technology behind the Concordium Blockchain. This version is not feature-complete compared to the expected features for the first Mainnet version of the Concordium Blockchain.

            This release contains the following main features:

            -  Node software in a dockerized container featuring:

            -  *Passive node:* A node that participates in the Concordium
                network. It relays messages, provides an API for submitting
                transactions and inspecting the chain, and processes blocks, but
                does not produce any blocks on its own.
            -  *Baker node:* Does everything a passive node does, but in addition
                participates in consensus, producing blocks.
            -  *Finalizer node:* Does everything a baker node does, but in
                addition participates in the finalization part of our consensus.
            -  *Concordium Client:* A command-line interface to the Concordium
                Blockchain. Can send transactions and inspect the state of the
                node and the chain.
            -  Tools for interacting with the container

            -  A demo Web wallet

            -  Creating identities
            -  Creating accounts
            -  Making transfers
            -  Depositing CCD tokens
            -  Exporting identities and accounts

            -  A demo Identity service
            -  A Network `Dashboard <https://dashboard.testnet.concordium.com>`_

            Concordium will be running 19 nodes in Europe for this iteration of the Testnet
            and an additional node in Hong Kong (all running both baker and finalizer).

Tools
=====

.. _rn-client:

Concordium Client
-----------------

    August 9, 2023

        Concordium Client 6.0.1 adds support for the upcoming `protocol version 6 <https://github.com/Concordium/concordium-update-proposals/blob/main/updates/P6.txt>`_ which is planned for release on Testnet August 21, 2023. **Note that this version of Concordium-Client requires at least node version 5.4.**

        - Removed a stray CTrue in output of ``consensus show-chain-parameters``.

        - Added ``raw GetNextUpdateSequenceNumbers`` subcommand.

        - Added node version to the output of ``raw GetNodeInfo``.

        - Print *Block time* instead of *Slot time* in the output of ``block show``.

        - In the output of ``consensus show-parameters``, election difficulty is only printed when present.

    .. dropdown:: Previous releases

        .. dropdown:: 5.2.0 - June 1, 2023

            Concordium Client 5.2.0 contains the following features and bug fixes:

            - Fix a bug in display of ``consensus show-chain-parameters`` output for protocol version 6.

            - Add ``raw GetBlockTransactionEvents`` that prints the list of transaction outcomes in a given block.

        .. dropdown:: 5.1.1 - March 2, 2023

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

        .. dropdown:: 4.2.0 - October 5, 2022

            - Fix handling of ``--no-confirm`` in ``contract init``, ``contract update``, ``module deploy``, and ``register data`` transactions. This flag is now respected.
            - Add support for import of keys from |bw|.
            - Fix some inconsistencies in the display format of CCD amounts.

        .. dropdown:: 4.1.0 - August 24, 2022

            - Fix bug in contract schema parsing caused by endiannes confusion.
            - Add support for smart contract schema V2. V2 schemas offer the same options as V1, but can also include a schema for the error type. This enables `concordium-client` to interact with contracts built using `concordium-std` version 4.

        .. dropdown:: 4.0.4 - August 4, 2022

            The `concordium-client` has been updated to better support the new smart contract v1 schema.

        .. dropdown:: 4.0.3 - June 15, 2022

            Concordium Client 4.0.3 supports version 1 Smart Contracts with the following changes.

            - A ``contract invoke`` command has been added for simulating contracts locally on the node.
            - Module deploy now expects modules with a version prefix. This prefix is added automatically when building with cargo-concordium version >= 2. The flag ``--contract-version`` has been added to support modules without the version prefix.
            - The ``contract update`` command now uses ``--entrypoint`` to specify the function to invoke. This is renamed from the previous ``--func``.
            - When calling ``contract update`` or ``contract invoke`` with a non-existent entrypoint the fallback entrypoint is called if one is specified in the contract.

            Concordium Client 4.0.3 also supports delegation to baker pools or passive delegation, and commands have been added to open baker pools.

            - The commands ``delegator add``, ``delegator configure`` and ``delegator remove`` have been added. Commands to support the baker opening a baker pool have also been added, including ``baker configure``, ``baker update-url`` and ``baker update-delegation-status``.
            - The existing commands ``baker add``, ``baker remove``, ``baker set-key``, ``baker update-restake`` and ``baker update-stake`` have been updated so that in Protocol version < 4, they generate the former P3 transaction, and in Protocol version 4, they generate the relevant ``configure baker`` transaction.
            - Support has been added for the raw queries ``GetPoolStatus`` and ``GetBakerList``.
            - The subcommand ``consensus show-chain-parameters`` has been added to show the chain parameters. This subcommand shows useful information, such as the amount needed to become a baker, bounding caps for baker pools, commission percentages for delegation, exchange rate parameters, and more.

        .. dropdown:: 3.0.4 - December 10, 2021

            - Credentials revealing the newly introduced attribute LEI can be deployed.
            - Renamed GTU token to CCD.
            - Renamed ``send-gtu``, ``send-gtu-scheduled`` and ``send-gtu-encrypted`` to ``send``, ``send-scheduled`` and ``send-shielded``.
            - Renamed ``account encrypt``/``decrypt`` to ``account shield``/``unshield``.
            - Added command for generating aliases of an address.
            - Now shows line breaks, tabs etc. in memo transfers (when it's CBOR encoded string), instead of escaping them as ``\n``, ``\t`` etc.
            - Now displays memo as JSON in a more readable way.
            - Added time units to slot duration and epoch duration in consensus status.
            - Updated the ``register-data`` command to register data as CBOR encoded strings or JSON using the new flags ``--string`` and ``--json``. Raw data can still be registered using the new flag ``--raw``.
            - Added ``raw DisconnectPeer``, a counterpart to the existing ``raw ConnectPeer``.
            - Now warning  the user when trying to add a baker with a stake below the minimum threshold.
            - Improved how contract schemas are shown as JSON:

            - Now displays complex types in arrays correctly.
            - Use angle brackets to indicate placeholders, e.g. ``"<UInt16>"`` instead of ``"UInt16"``.
            - Improved ``module inspect``:

            - Now shows all contracts from a module regardless of whether a schema is included or not.
            - Now shows the receive methods for contracts as well.
            - Now allows sending transactions where the sender is an account alias.

        .. dropdown:: 1.1.1 - October 6, 2021

            Added memo functionality for transactions

.. _rn-cargo:

``cargo-concordium``
--------------------

    May 11, 2023

    For ``cargo-concordium`` 2.8.0 the distribution method for ``cargo-concordium`` has been simplified. Now, once you have installed rustup, you can quickly and easily install ``cargo-concordium`` without downloading a separate package or going through many steps. For more information, see :ref:`Install tools for development<setup-tools>`.

    If you already have ``cargo-concordium`` installed, you may need to remove the existing ``cargo-concordium`` from your PATH to be able to update versions in the future.

    .. dropdown:: Previous releases

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

        .. dropdown:: 2.2.0 - October 12, 2022

            Cargo concordium 2.2.0 introduces the ``init`` subcommand that can initialize a new project and use contract templates to set up an initial project.

        .. dropdown:: 2.1.0 - August 24, 2022

            Use schemas for error values when simulating contracts. In particular support building and testing contracts with `concordium-std` version 4.

        .. dropdown:: 2.0.2 - August 4, 2022

            Cargo concordium has also been updated to better support the new smart contract v1 schema.

.. _rn-vscode-ext:

VSCode extension
----------------

    May 1, 2023

    The VSCode extension has been developed to help developers get started with smart contract development. The extension sets up the editor for development, installs the ``cargo-concordium`` smart contract development tool for all supported platforms, and provides commands in the editor for the essential workflows, such as building and testing smart contracts.

.. _rn-sc-deploy-tool:

Smart contract deploy and initialize tool
-----------------------------------------

    June 28, 2023

    To ease deployment and initialization, you can use the `Smart contract deploy and initialize tool <https://sctools.mainnet.concordium.software/>`__. It works with the |bw| to deploy and initialize smart contracts to Mainnet and Testnet.

.. _rn-ccdscan:

CCDScan
-------

    May 4, 2022

    CCDScan (https://ccdscan.io) is a Concordium blockchain explorer available for Concordium users and explorers.

    CCDScan serves as a search engine for data on the Concordium blockchain and enables users to search for, explore, and analyze relevant on-chain data.
    CCDScan release 1 includes core functionality to scan and gain insights into Concordium blockchain data and lays the foundation for additional value adding features to be included on the site.

    CCDScan release 1 features include:
    - Block list view of the latest block data
    - Block details for each block
    - Transaction list view of the latest transaction data
    - Transaction details for each transaction
    - Account list view of the most recent account data
    - Account details for each account address including related transactions, an account statement, and amount locked in release schedule where relevant
    - Easy search for specific details on blocks, transactions and accounts and bakers
    - Cross-linking between all relevant entities for easy navigation between blocks, transactions, and accounts
    - A dashboard landing page with real-time updates from the Concordium blockchain
    - Core metrics, graphs, and statistics on blocks, transactions, and accounts, including blocks added, block time, finalization time, transactions and accounts created
    - Ability to switch between Mainnet and Testnet data
    - Ability to explore chain parameters and updates to these
    - List of bakers and their stake, including the ability to drill through to the underlying account address

Libraries
=========

.. _rn-sclibraries:

Smart contract Libraries
------------------------

    May 8, 2023

    Smart contract integration testing has been added to test your smart contracts: the `concordium-smart-contract-testing library <https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing>`__ makes it possible to create and run automatic integration tests of smart contracts. This will allow a smart contract developer to write code that runs multiple contracts in a locally-controlled environment, interacts with them, and asserts that the eventual output and state of the contracts are as expected. For more information about how to enable this, see :ref:`Integration test a contract in Rust<integration-test-contract>`.
