.. include:: ../../../variables.rst

.. _validation-with-wallets:

==================================
Validation with Concordium wallets
==================================


To become a validator in the Concordium network, you need to run a node, generate validator keys, and then import these keys to the node. Validator keys generation is possible with the Concordium wallets as well as with the ``Concordium-client``; however, the process differs between them. The overviews below give a brief description of the process.

.. Attention::

   Before proceeding, read :ref:`Validator management<baker-pool>` for information about best practices for validators.

.. Note::

   To check the minimum required amount of CCD (currently 500000) to become a validator, see :ref:`consensus show-chain-parameters`.

.. Note::

   Before adding a validator, you need to make sure your node is running and fully synchronized with the chain. Otherwise, if you add a validator before launching a node, your validator may be automatically suspended due to missing block production. To familiarize yourself with the process of suspending validators, check out this article: :ref:`Suspend or unsuspend validators <suspend-unsuspend-validator>`.

Validation with |bw| and |cryptox|
----------------------------------

This overview describes the recommended scenario for running a node and becoming a validator on the Concordium blockchain when using all wallets aside from the Desktop Wallet

.. dropdown:: Step 1: Set up the node

   For validation you must be running a node on the Concordium blockchain. Synchronization of the node takes some time, depending on the performance of your hardware and the length of the chain. Before generating keys, you need to make sure that your node is fully synchronized. You can run a node :ref:`on Windows<run-node-windows>`, :ref:`on macOS<run-node-macos>`, :ref:`on Ubuntu<run-node-ubuntu>` or using :ref:`Docker<run-a-node>`. You can also have a third-party run a node on your behalf.

.. dropdown:: Step 2: Set up the Wallet

   The |bw| is available for chromium browsers. For instructions about download and setup, see :ref:`setup-browser-wallet`.

   The |cryptox| is available for iOS and Android devices. For instructions about download and setup of |cryptox|, see :ref:`setup-concordium-wallet`.

.. dropdown:: Step 3: Set up an identity and account

   Once you've installed the Wallet, you must set up an identity and an account.
   For instructions, see :ref:`create-initial-account` and :ref:`create-account`.

.. dropdown:: Step 4: Add validation to an account

   Configure validation for an account. For instructions, see :ref:`add-baker-mw`.

.. dropdown:: Step 5: Register validator keys

   The last step is to configure the running node with the validator keys so the node can start producing blocks. You can also choose to have a third-party node runner run a node for you if you do not want to run the node yourself; in this case you will need to provide your validator keys to the node runner in a secure manner.

   - :ref:`Import validator keys <import-validator-keys>`

For information about how to update your validator or stop validating, see :ref:`Change validation options<update-baker-mw>`.

Validation with Desktop Wallet
------------------------------

This overview describes the recommended scenario for running a node and becoming a validator on the Concordium blockchain using Desktop Wallet in combination with a LEDGER device to generate validator keys.

.. dropdown:: Step 1: Set up the node

   The Desktop Wallet must be connected to a running node on the Concordium blockchain. You can run a node :ref:`on Windows<run-node-windows>`, :ref:`on macOS<run-node-macos>`, :ref:`on Ubuntu<run-node-ubuntu>` or using :ref:`Docker<run-a-node>`. You can also choose to have a third-party node runner run a node for you if you do not want to run the node yourself.

.. dropdown:: Step 2: Set up the LEDGER device

   The Desktop Wallet requires that you store your keys on a LEDGER device. This is to ensure that your private account keys are kept secure. To be able to use the LEDGER device with the Desktop Wallet, you must install the Concordium LEDGER App on the hardware wallet. See :ref:`Install the Ledger App guide<install-ledger>`.

.. dropdown:: Step 3: Set up the Concordium Desktop Wallet

   You'll need to install and set up the Desktop Wallet to create and manage identities and accounts and add a validator. See :ref:`Set up the Desktop Wallet<overview-desktop>`.

.. dropdown:: Step 4: Set up an identity and an initial account

   Once you've installed the Desktop Wallet, you must set up an identity and an initial account. You may want to create a separate account to use as a validator account, since the Identity Provider knows the user who submits the initial account to the chain. See :ref:`Create an identity and an initial account in the Desktop Wallet <create-initial-account>` and :ref:`Create an account in the Desktop Wallet<create-account>`.

.. dropdown:: Step 5: Add a validator in the Desktop Wallet

   You're now ready to add a validator in the Desktop Wallet and generate validator keys. This process varies depending on whether you need one or more signatures before you can submit the transaction to the chain. See :ref:`Add a validator account in the Desktop Wallet <add-baker-mw>`.

.. dropdown:: Step 6: Configure the node with the validator keys

   The last step is to configure the running node with the validator keys so the node can start producing blocks. If you have a third-party node runner run a node for you, you will need to provide your validator keys to the node runner in a secure manner.

   - :ref:`Import validator keys <import-validator-keys>`

For information about how to update your validator or stop validation, see :ref:`Change validator options<update-baker-mw>`.

Validation with ``Concordium-client``
-------------------------------------

For information about configuring and managing validation in ``Concordium-client``, see :ref:`Validation with the Concordium Client<become-a-validator>`.

Next steps
==========

- Read the information about :ref:`validation management<baker-pool>`.
- If you are interested in a staking pool, read the :ref:`Delegation FAQ<delegation-faq-old>`.
- You can then :ref:`update validator settings <update-baker-mw>` as needed to manage your validator.

