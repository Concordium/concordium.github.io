.. include:: ../../../variables.rst
.. _node-dashboard: http://localhost:8099
.. _Discord: https://discord.com/invite/xWmQ5tp

.. _become-a-validator:

=====================================
Validation with the Concordium Client
=====================================

This guide takes you through the steps involved in upgrading your node to a validator node and managing the node using the Concordium Client.

The process of becoming a validator involves the following:

#. Create an account in a wallet and acquire CCD.
#. Run a node
#. Create a set of validator keys.
#. Register the validator keys with the account.
#. Start the node with the validator keys.

After completing these steps, the validator node will produce blocks. If a produced block is added to the chain, the validator receives a reward.

.. note::

   In this section the name ``validatorAccount`` indicates the name of the account that will be used to register and manage a validator.

Prerequisites
=============
-  :ref:`Run a node <node-requirements>`
-  :ref:`Create an account in a wallet <setup-wallets-lp>`
-  Export a file with the account information
-  :ref:`Install the Concordium Client<concordium-node-and-client-download>`

For general information about validation concepts, see :ref:`baker-concept`.

Start validation
================

.. _import-baker-account:

Import the account
------------------

This section provides a brief description of how to import an account using the Concordium Client.

.. Note::

   You can only import accounts created in the |cryptox| or |bw| into the Concordium Client. That is, you cannot import accounts created in the Desktop Wallet because they are created using a LEDGER device. You get the account information by exporting a JSON file with the account information.

   * To export the private key in |cryptox| and |bw|, see :ref:`Export a private key<export-key>`.

To import an account run:

.. code-block:: console

   $ concordium-client config account import <path/to/exported/file> --name validatorAccount

``concordium-client`` asks for a password to decrypt the exported file and import all accounts. The same password will be used for encrypting the transaction signing keys and the encrypted transfers key.

.. _create-register-baker-keys:

Create and register validator keys
----------------------------------

Each account has a unique validator ID that is used when registering its validator. This ID has to be provided by the network and currently cannot be precomputed. This ID must be given inside the validator keys file to the node so that it can use the validator keys to create blocks. The ``concordium-client`` will automatically fill this field when performing the following operations.

To create a fresh set of keys run:

.. code-block:: console

   $ concordium-client validator generate-keys <keys-file>.json

You can choose an arbitrary name for the ``<keys file>``. To register the keys in the network you need to be :ref:`running a node <node-requirements>` and send a ``validator add`` transaction to the network:

.. code-block:: console

   $ concordium-client validator add MyValidatorKeys.json --sender validatorAccount --stake <amount-to-stake> --open-delegation-for all --delegation-transaction-fee-commission 0.1 --delegation-baking-commission 0.1 --delegation-finalization-commission 1.0 --validator-url https://example.com/validator --validator-credentials-out <concordium-data-dir>/validator-credentials.json


where you replace

- ``MyValidatorKeys.json`` with the name of validator keys file you generated
- ``<amount-to-stake>`` with the CCD amount for the validator's initial stake
- ``MyValidatorURL`` with the URL containing information for your staking pool; can be left as an empty string if you do not want to provide a URL.
- ``<concordium-data-dir>`` with any path of your choice.
- ``validatorAccount`` with the name you've chosen for the account

   .. Note::

      For a node on Docker, the ``<concordium-data-dir>`` must use the following paths:

      * on Linux and macOS: ``~/.local/share/concordium``
      * on Windows: ``%LOCALAPPDATA%\\concordium``.

      Remember to configure your node for validation using this path:

      * :ref:`Import validator keys <import-validator-keys>`

The following arguments are also required for the ``validator add`` transaction:

- ``--open-delegation-for`` sets whether the validator's staking pool is open for delegators. Options are: ``none`` (no delegators will be allowed), ``all`` (any account can delegate), ``existing`` (only existing delegators can delegate).
- ``--validator-url`` is the URL for validator information. The URL should resolve to (JSON-formatted) metadata about the validator.
- ``--out`` can be used to write a validator credential file containing the validator ID (and the supplied keys) to use when starting a validator node.
- ``--delegation-transaction-fee-commission`` specifies the transaction fee commission for the staking pool.
- ``--delegation-block-commission`` specifies the block commission for the staking pool.

.. Note::

   To find the range for the commissions, see the Concordium client :ref:`Show Chain Parameters command<consensus show-chain-parameters>`.

The following arguments are optional. If no selection is made, earnings are restaked automatically.

- ``--restake`` sets that earnings are restaked.
- ``--no-restake`` sets that earnings are not restaked. This flag means that rewards to the staked amount are not added to the validator automatically. Read more about this behavior in the section :ref:`Restake earnings<restake-earnings>`.

.. warning::

   ``concordium-client`` will offer to encrypt the generated ``validator-credentials.json`` file.
   Choose **not** to encrypt it since Concordium does not support easily starting a validator with encrypted validator credentials.
   If this is a firm requirement for you, then you need to run the :ref:`debian package<run-node-ubuntu>` and configure it appropriately.

.. Warning::
   Do not stake all of your funds or you will not have enough funds to cover transaction fees.

To start the node with these validator keys and produce blocks, :ref:`configure the node to use the validator keys<import-validator-keys>`, and **restart** it. The node will automatically start producing blocks when the validator is included in the validators list for the current epoch.

This change is executed immediately, and it will take effect at the next :term:`pay day` after the one in which the transaction for adding the validator was included in a block. If the change is made in the last epoch before pay day, then the change will not occur until the following pay day.


+-------------------------------------------+-----------------------------------------+-----------------+
|                                           | When transaction is included in a block | At next pay day |
+===========================================+=========================================+=================+
| Change is visible by querying the node    |  ✓                                      |                 |
+-------------------------------------------+-----------------------------------------+-----------------+
| Validator included in the validator list  |                                         | ✓               |
+-------------------------------------------+-----------------------------------------+-----------------+


Manage the validator
====================

Check the status of the validator and its lottery power
-------------------------------------------------------

To see if the node is producing blocks, you can check various sources that offer different degrees of precision in the information displayed.

- In the `network dashboard <https://dashboard.mainnet.concordium.software/>`_, the validator ID of the node is shown in the ``Validator`` column.
- Using the ``concordium-client`` you can check the list of current validators and the relative staked amount that they hold, that is, their lottery power. The lottery power determines how likely it is that a given validator will win the lottery and produce a block.

  .. code-block:: console

     $ concordium-client consensus show-parameters --include-validators
     Election nonce:      07fe0e6c73d1fff4ec8ea910ffd42eb58d5a8ecd58d9f871d8f7c71e60faf0b0
     Validators:
                             Account                       Lottery power  Account Name
        ------------------------------------------------------------------------------
     0: 4fvxZZ225xcEiCkgXTZt3cSReYgbxiMsSoj1UhAbGCsqvVg9N7   17.0326 %
     1: 3p8FSc3KN5pKxRvEdsvJS8VS21KbkRS3x4MnGq1t6omuJXydJQ   17.0498 %
     2: 39zGK3yRxHjgVVnHae2cgZBo6uWtC5Qg8GkmtMjPsJYgDc5pfF   17.0514 %
     3: 353yq84vTgYZcVLpj4Vd5fdgGbMxAUpkktNnDFs1ogzSvDxMiH   17.0254 %
     4: 33PbbH58cQj6CAHfLGy5z3FDKhHtjohQmK3ff63tzXJLWsAm8V   17.0600 %
    48: 4QdCxcP9cApLxA8UGFXiY1HjSPnSkUaeVUERU8BmBdStgnS5Vh    2.8368 %
    54: 4Z28EXyghd7tLbrMntGZxjBypwGxbQdcnexmeWxPaVeyvFC4bk    0.0144 %
    99: 3aj3DHzofkuAG7JweHJdhwcuVZePXNrN7JvZLuoTnJgiK1dfYM    0.1418 %
   108: 4PXYJcvLLz7cgdn9UnYhhB35zrMP6azPSoh4oL6Vr9gvSMZDDi    2.8368 %
   223: 3zZPUWS8BMdeCAsGzPiD512mVJS4gDjUWFFsFsbPSWnvHPL2kZ   <0.0001 %

- Using the ``concordium-client`` you can check that the account has registered a validator and the current amount that is staked by that validator.

  .. code-block:: console

     $ concordium-client account show validatorAccount
     ...

     Validator: #22
      - Staked amount: 10.000000 CCD
      - Restake earnings: yes
     ...

- If the staked amount is high enough, and there is a node running with the validator keys loaded, the validator should eventually produce blocks. When this happens, you can see in your wallet that the account is receiving block rewards.

Update the staked amount
------------------------

To update the validator stake run

.. code-block:: console

   $ concordium-client validator update-stake --stake <newAmount> --sender validatorAccount

When the staked amount is modified, the probability that a validator gets elected to produce blocks is also modified.

When a validator adds a stake for the first time or increases the stake, that change is executed on the chain and becomes visible as soon as the transaction is included in a block (can be seen through ``concordium-client account show validatorAccount``) and takes effect at the next :term:`pay day`. If the change is made in the last epoch before pay day, then the change will not occur until the following pay day.

+----------------------------------------+-----------------------------------------+-----------------+
|                                        | When transaction is included in a block | At next pay day |
+========================================+=========================================+=================+
| Change is visible by querying the node | ✓                                       |                 |
+----------------------------------------+-----------------------------------------+-----------------+
| Validator uses the new stake           |                                         | ✓               |
+----------------------------------------+-----------------------------------------+-----------------+

When a validator **decreases the staked amount**, the change requires a 21 day cool-down period to take effect. The change becomes visible on the chain when the transacton is included in a block and takes effect at the next :term:`pay day` after the cool-down period ends. It can be consulted through ``concordium-client account show validatorAccount``:

.. code-block:: console

   $ concordium-client account show validatorAccount
   ...

   Validator: #22
    - Staked amount: 50.000000 CCD to be updated to 20.000000 CCD at epoch 261  (2020-12-24 12:56:26 UTC)
    - Restake earnings: yes

   ...

+------------------------------------------+-----------------------------------------+-------------------------------+
|                                          | When transaction is included in a block | First pay day after cool-down |
+==========================================+=========================================+===============================+
| Change is visible by querying the node   | ✓                                       |                               |
+------------------------------------------+-----------------------------------------+-------------------------------+
| Validator uses the new stake             |                                         | ✓                             |
+------------------------------------------+-----------------------------------------+-------------------------------+
| Stake can be increased, decreased again  |                                         | ✓                             |
| or validator can be stopped              |                                         |                               |
+------------------------------------------+-----------------------------------------+-------------------------------+

.. note::

   In the Mainnet, the cool-down duration for reducing validator stake is set to 21 days. This value can be checked as follows:

   .. code-block:: console

      $ concordium-client consensus show-chain-parameters
      ...
            + pool owner cooldown duration: 21d
      ...

.. warning::

   The staked amount is *locked*. That is, you can't transfer it or use it for payment. You should take this into account and consider staking an amount that will not be needed in the short term. In particular, to deregister a validator or to modify the staked amount you need to own some non-staked CCD to cover the transaction costs.

.. _restake-earnings:

Restake the earnings
----------------------

When participating as a validator in the network and producing blocks, the account receives rewards for each produced block. These rewards are automatically added to the staked amount by default.

You can choose to modify this behavior and instead receive the rewards in the account balance without staking them automatically. You can change this switch through ``concordium-client``:

.. code-block:: console

   $ concordium-client validator update-restake False --sender validatorAccount
   $ concordium-client validator update-restake True --sender validatorAccount

Changes to the restake flag will take effect immediately; however, the changes start affecting lottery power in the next :term:`pay day`. If the change is made in the last epoch before pay day, then the change will not occur until the following pay day. The current value of the switch can be seen in the account information which you can query using ``concordium-client``:

.. code-block:: console

   $ concordium-client account show validatorAccount
   ...

   Validator: #22
    - Staked amount: 50.000000 CCD
    - Restake earnings: yes

   ...


+-----------------------------------------------+-----------------------------------------+------------+
|                                               | When transaction is included in a block | At pay day |
+===============================================+=========================================+============+
| Change is visible by querying the node        | ✓                                       |            |
+-----------------------------------------------+-----------------------------------------+------------+
| Earnings will [not] be restaked automatically | ✓                                       |            |
+-----------------------------------------------+-----------------------------------------+------------+
| If restaking automatically, the gained        |                                         | ✓          |
| stake affects the lottery power               |                                         |            |
+-----------------------------------------------+-----------------------------------------+------------+

When the validator is registered, it will automatically restake the earnings, but you can change this by providing the ``--no-restake`` flag to the ``validator add`` command as shown in the following:

.. code-block:: console

   $ concordium-client validator add validator-keys.json --sender validatorAccount --stake <amount-to-stake> --validator-credentials-out validator-credentials.json --no-restake

Update validator keys
---------------------

If it is necessary to update your validator keys, you need to first generate new validator keys. To create a fresh set of keys run:

.. code-block:: console

   $ concordium-client validator generate-keys <keys-file>.json

You can choose an arbitrary name for the ``keys file``.

Then run the transaction:

.. code-block:: console

   $ concordium-client validator set-key <keys-file>.json --sender <account> --out <concordium-data-dir>/validator-credentials.json

``--sender`` is the name or address of the transaction's sender account. The name is the one that's used when you :ref:`import the account<concordium-client-import-accounts-keys>` (assuming that this
was done). It defaults to the account name "default".

If you want to keep the ``validator-credentials.json`` output file in the same location as your other Concordium files, you can omit ``<concordium-data-dir>/``.

To start the node with these validator keys and produce blocks you need to restart the node.

Configure a validator
=====================

Use ``validator configure`` to configure a validator and open a staking pool. The following is an example of how ``configure validator`` might be used:

.. code-block:: console

   $ concordium-client validator configure --sender "acc1" --stake 500001 --open-delegation-for existing --delegation-transaction-fee-commission 0.1 --delegation-block-reward-commission 0.1 --validator-url https://example.com/validator --keys-in MyBakerKeys.json --keys-out <concordium-data-dir>/validator-credentials.json

Configure validator has the following optional arguments:

- ``--sender`` is the name or address of the validator account.
- ``--stake`` is an amount of CCD that is the intended equity capital of the validator
- ``--restake`` sets that earnings are restaked.
- ``--no-restake`` sets that earnings are not restaked.
- ``--open-delegation-for`` sets whether the staking pool is open for delegators. Options are: ``none`` (no delegators will be allowed), ``all`` (any account can delegate), ``existing`` (only existing delegators can delegate).
- ``--validator-url`` is the URL for validator information. The URL should resolve to (JSON-formatted) metadata about the validator.
- ``--keys-in`` specifies the name of the file containing the validator keys.
- ``--keys-out`` can be used to write a validator credential file containing the validator ID (and the supplied keys) to use when starting a validator node. Replace ``<concordium-data-dir>`` with any path of your choice.
- ``--delegation-transaction-fee-commission`` specifies the transaction fee commission for the staking pool.
- ``--delegation-block-reward-commission`` specifies the block commission for the staking pool.

.. Note::

   To find the range for the commissions, see the Concordium client :ref:`Show Chain Parameters command<consensus show-chain-parameters>`.

Remove a validator
==================

The controlling account can choose to de-register its validator on the chain. To do
so you have to execute:

.. code-block:: console

   $ concordium-client validator remove --sender validatorAccount

This removes the validator from the list of validators and unlocks the staked amount on the validator so that it can be transferred or moved freely. When removing the validator, the change has the same timeline as decreasing
the staked amount. The change requires a 21 day cool-down period to take effect. The change becomes visible on the chain when the transaction is included in a block and takes effect at the next :term:`pay day` after the cool-down ends. You can check when the change will take effect by querying the account information:

.. code-block:: console

   $ concordium-client account show validatorAccount
   ...

   Validator #22 to be removed at epoch 275 (2020-12-24 13:56:26 UTC)
    - Staked amount: 20.000000 CCD
    - Restake earnings: yes

   ...

.. warning::

   Decreasing the staked amount and stopping validation can't be done simultaneously. During the cool-down period produced by decreasing the staked amount, validation can't be stopped and vice versa.
