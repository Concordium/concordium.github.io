.. _Discord: https://discord.com/invite/xWmQ5tp
.. include:: ../variables.rst
.. _transactions-old:

==============================
Concordium Client transactions
==============================

You can perform all types of transactions with the :ref:`concordium-client<concordium-client>`. To do so, you use specialized subcommands.

.. Note::

  Concordium Foundation offers external developers access to a testnet node, which can be reached using ``--grpc-ip grpc.testnet.concordium.com`` and ``--grpc-port 20000``. Since the node is configured to use TLS, the ``--secure`` flag is required when running commands. For instance, to check the consensus status, you can query the Concordium testnet node as follows:

  .. code-block:: text

      $concordium-client consensus status --grpc-port 20000 --grpc-ip grpc.testnet.concordium.com --secure

.. Note::

  If you are querying your own testnet node, be sure to use ``--grpc-port 20001`` flag (unless you changed it from defaults). Let's assume that the node you are querying is running on testnet and is located on the local network at ``192.168.0.10``. In this case, to query the account status, use the command:

  .. code-block:: text

      $concordium-client account show 48XGRnvQoG92T1AwETvW5pnJ1aRSPMKsWtGdKhTqyiNZzMk3Qn --grpc-ip 192.168.0.10 --grpc-port 20001

.. Note::

   All transfers and transactions cost a fee. The fee is based on the set :ref:`NRG <computing-transaction-costs>` for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees.
   You can see the fee in the transaction log.

Transaction commands
====================


+-------------------------------------+-------------------------------------------------+
| Command                             | Description                                     |
+=====================================+=================================================+
| ``transaction send``                | Transfer CCD tokens                             |
+-------------------------------------+-------------------------------------------------+
| ``transaction send-scheduled``      | Make a transfer that will be released           |
|                                     | gradually                                       |
+-------------------------------------+-------------------------------------------------+
| ``validator add``                   | Add a new validator. For more information, see  |
|                                     | :ref:`become-a-validator`.                      |
+-------------------------------------+-------------------------------------------------+
| ``validator remove``                | Remove a validator. For more information, see   |
|                                     | :ref:`become-a-validator`.                      |
+-------------------------------------+-------------------------------------------------+
| ``validator update-stake``          | Update the staked amount of a validator. For    |
|                                     | more information, see :ref:`become-a-validator`.|
+-------------------------------------+-------------------------------------------------+
| ``validator update-restake``        | Update the restaking switch of a validator. For |
|                                     | more information, see :ref:`become-a-validator`.|
+-------------------------------------+-------------------------------------------------+
| ``validator set-key``               | Update the keys of a validator. For more        |
|                                     | information, see :ref:`become-a-validator`.     |
+-------------------------------------+-------------------------------------------------+
| ``account update-keys``             | Update credentials keys for a specific          |
|                                     | credential                                      |
+-------------------------------------+-------------------------------------------------+
| ``account unshield``                | Transfer part of the shielded balance to the    |
|                                     | public balance                                  |
+-------------------------------------+-------------------------------------------------+
| ``account show``                    | Show account information.                       |
|                                     | :ref:`See below for specific                    |
|                                     | information<account-commands>`.                 |
+-------------------------------------+-------------------------------------------------+
| ``identity show``                   | Show identity information.                      |
|                                     | :ref:`See below for specific                    |
|                                     | information<identity-commands>`.                |
+-------------------------------------+-------------------------------------------------+
| ``delegator configure``             | Add, configure, and remove                      |
|                                     | delegation. :ref:`See below for                 |
|                                     | information<delegation-commands>`.              |
+-------------------------------------+-------------------------------------------------+
| ``consensus show-chain-parameters`` | Show chain parameters.                          |
|                                     | :ref:`See below for specific                    |
|                                     | information<consensus show-chain-parameters>`.  |
+-------------------------------------+-------------------------------------------------+

Each of these commands have a number of parameters specific to them, but share a common set of flags and configuration to control how they build transactions.

Depending on the exact context, all flags are currently optional:

-  ``--sender``: Name or address of the transaction's sender account.
   The name is the one that's used when you :ref:`import the account<managing_accounts>` (assuming that this
   was done). Defaults to the account name "default".

-  ``--keys``: A number of sign/verify key-pairs associated with the
   account, used to sign the transaction. The format is shown in the example
   below. Should be omitted if the account has been imported.

-  ``--expiration``: Expiration time of the transaction given as a Unix
   epoch or duration string (e.g. ``5m`` for 5 minutes). Defaults to ``10m`` (10
   minutes).

-  ``--energy``: Maximum amount of NRG to be spent on the transaction.
   With the currently supported transaction types, the default value is always
   the exact amount of energy needed.

-  ``--nonce`` : Sequence number to use for the transaction. This is
   fetched automatically and should only be specified in special cases.

-  ``--signers`` : Specification of which credential holders of the sender account that should sign the transaction, and which of their keys that should be used to sign. Example: ``--signers 0:1,0:2,3:0,3:1`` specifies that credential holder 0 signs with keys 1 and 2, while credential holder
   3 signs with keys 0 and 1. If the sender account is imported to the client, and ``--signers`` is not provided,
   ``concordium-client`` will sign with all keys in the local configuration of the account.

In most cases, you only need to provide the ``--sender`` option and use the account by name.

In all cases, the command displays the exact parameters of the transaction
before sending it, and you're asked to confirm that it matches your intent.
Just before the transaction is sent, you're asked for the password to access
the signing keys.

Once a transaction has been submitted, the command will continuously poll and display its status until it's been finalized.

.. _account-commands:

Commands for showing account information
========================================

.. _account-seqno:

Account sequence number
-----------------------

Each account on the Concordium blockchain has a :term:`sequence number<transaction sequence number>` and each
transaction signed by the account must have a sequence number. For a transaction
to be considered valid its sequence number must be the next available one for
the account. The sequence number is maintained by all the validators in order to
validate transactions.

The sequence number can be looked up from an up to date node by running

.. code-block:: console

   $concordium-client account show [ACCOUNT]

where ``[ACCOUNT]`` is an optional argument that is either an address of an
account or the name of an account chosen when importing the account. If no
address is provided, ``concordium-client`` will use the account name
``default``.

The |mw-gen2| and |mw-gen1| keep track of the sequence number and assign the correct one when sending transactions.
``concordium-client`` tracks the sequence number automatically, but it can
also be set manually via the option ``--nonce``.

.. _account-aliases:

Account aliases
---------------

In protocol versions 1 and 2 accounts and account addresses have a one-to-one relationship. In protocol version 3 each account has 16777216 addresses, namely a so-called canonical account address together with
matching account :term:`aliases<alias>`. The canonical account address is derived when an account is created on chain. The other 16 million addresses with matching initial 29 bytes are referred to as account aliases for
the same account. Thus, accounts can be referred to by any address whose initial 29 bytes match.

This allows each account to have aliases for different uses and creates a kind of sub-account structure. An account owner can give out different aliases for different uses to keep track of transfers and assign them meaning.

Each account still has one total account balance. Hence, transfers to and from aliases of an account add to and subtract from that total account balance, respectively. Transfers between different aliases of the same account do not change the balance of the account, apart from cost. Rewards are always received on the account's canonical address.

To show aliases, enter:

.. code-block:: console

   $concordium-client account show-alias 3ofwYFAkgV59BsHqzmiWyRmmKRB5ZzrPfbmx5nup24cE53jNX5 --alias 17

This generates the output:

.. code-block:: console

   The requested alias for address 3ofwYFAkgV59BsHqzmiWyRmmKRB5ZzrPfbmx5nup24cE53jNX5 is 3ofwYFAkgV59BsHqzmiWyRmmKRB5ZzrPfbmx5nuou5Z2vaESRt

.. _identity-commands:

Commands for showing identity information
=========================================

.. identity-providers:

To show the identity providers authorized by Concordium and a URL, enter:

.. code-block:: console

   $concordium-client identity show identity-providers

To show the Privacy Guardians, enter:

.. code-block:: console

   $concordium-client identity show anonymity-revokers

Commands for transferring CCD
=============================

The commands for transferring CCD
are described in the following table.

The add, remove, and configure validators commands are described in the topic :ref:`becoming a validator using the Concordium Client<become-a-validator>`.

.. note::

   To see more information about a command, invoke it with the ``--help`` flag.

Transfer CCD
------------

Use the following command for transfers:

.. code-block:: console

   $concordium-client transaction send

Apart from the generic transaction flags above, the parameters are:

-  ``--amount``: number of CCD tokens to send.
-  ``--receiver``: name or address of the receiver account.

The following flags are for adding a :term:`transfer memo` to the transfer.

-  ``--memo``: optional flag for providing a transfer memo as a string. The string will be CBOR encoded and included in the memo.
-  ``--memo-json``: optional flag for providing a transfer memo as a JSON file. The JSON contents of the file will be CBOR encoded and included in the memo.
-  ``--memo-raw``: optional flag for providing a transfer memo as is. The contents of the file will be included in the memo as is without any additional encoding.


Example: Transferring 25 CCD from one account to another
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Accounts:

-  A: ``4DY7Kq5vXsNDhEAnj969Fd86g9egi1Htq3YmL2qAU9cXWj2a1y``
-  B: ``3EmnjMy8AY5zoebNaA3HuVx1UShdW8vh9n1YjJztmSc2jN4K3V``

If the accounts have both been imported under these names, the command
to transfer 25 CCD is:

.. code-block:: console

   $concordium-client transaction send --amount 25 --sender A --receiver B

The output will look similar to the following. Note that this example assumes that the
sender account A has three transaction signing keys 0, 1, and 3.

.. code-block:: console

   Sending 25.000000 CCD from '4DY7Kq5vXsNDhEAnj969Fd86g9egi1Htq3YmL2qAU9cXWj2a1y' (A) to '3EmnjMy8AY5zoebNaA3HuVx1UShdW8vh9n1YjJztmSc2jN4K3V' (B).
   Allowing up to 165 NRG to be spent as transaction fee.
   Transaction expires at Sun,  4 Oct 2020 11:13:55 UTC.
   Confirm [yN]: y
   Enter password for signing key with index 0: ...
   Enter password for signing key with index 1: ...
   Enter password for signing key with index 3: ...
   Transaction '7c484aecbc9dce654956cae1a6f9315679f62afe091d74f865f3602bc8003fbd' sent to the validator.
   Waiting for the transaction to be committed and finalized.
   You may skip this step by interrupting the command using Ctrl-C (pass flag '--no-wait' to do this by default).
   The transaction will still get processed and may be queried using
     'transaction status 7c484aecbc9dce654956cae1a6f9315679f62afe091d74f865f3602bc8003fbd'.
   [13:05:23] Waiting for the transaction to be committed.....
   Transaction is finalized into block e6912910ccf11a23413771eba395e1655fc86519759a2ce03439be9d5290292a with status "success" and cost 0.011200 CCD (112 NRG).
   [13:05:27] Waiting for the transaction to be finalized...
   [13:05:27] Transaction finalized.

Unshield an amount
------------------

.. note::

  Functionalities related to shielding a balance are deprecated in protocol 7 and above.
  No additional shielded balance can be added to an account and no transfer of shielded balance is possible.
  Only unshielding of an already shielded balance is possible and recommended to be done.
  Wallets and command-line tools will continue to display shielded balances and support the
  unshielding flow to recover already shielded funds.

The command to unshield an amount with ``concordium-client`` is
``account unshield``. For example, an interaction to unshield 7 CCD on
account B looks like the following:

The command is:

.. code-block:: console

   $concordium-client account unshield --sender B --amount 7

This

-  queries the state of account B from the Concordium network.
-  decrypts the shielded balance and checks that there is sufficient funds.
-  sends the transaction.

This command has all of the additional options of ``send``, as well as an
additional flag ``--index.`` If given, this flag is used to select which
incoming shielded amounts that will be used as input to the transaction.

.. code-block:: console

   Using default energy amount of 16171 NRG.
   Enter password for decrypting the secret encryption key:
   Transferring 7.000000 CCD from shielded to public balance of account '47JNHkJZo9ShomDypbiSJzdGN7FNxo8MwtUFsPa49KGvejf7Wh' (B).
   Allowing up to 16171 NRG to be spent as transaction fee.
   Transaction expires at Sun,  4 Oct 2020 11:44:07 UTC.
   Confirm [yN]: y
   Enter password for signing key with index 0: ...
   Enter password for signing key with index 1: ...
   Transaction 'b240ed919767b89a03984e71a0c39cff52f3374ab2b1721e489c02dc3fb1e691' sent to the validator.
   Waiting for the transaction to be committed and finalized.
   You may skip this step by interrupting the command using Ctrl-C (pass flag '--no-wait' to do this by default).
   The transaction will still get processed and may be queried using
     'transaction status b240ed919767b89a03984e71a0c39cff52f3374ab2b1721e489c02dc3fb1e691'.
   [13:34:16] Waiting for the transaction to be committed....
   Transaction is finalized into block e71a495c47734968214ac22e918f508949b02351b9f188d9b657b648927cf1ab with status "success" and cost 1.611800 CCD (16118 NRG).
   [13:34:18] Waiting for the transaction to be finalized...
   [13:34:18] Transaction finalized.

.. _transfer-with-a-schedule:

Transfer CCD with a schedule
-----------------------------

The command to transfer CCD that will be released gradually according to a
release schedule with ``concordium-client`` is ``transaction send-scheduled``.
There are two ways of specifying the release schedule, either at regular intervals or as an explicit schedule.

-  Use a regular interval schedule to release an equal amount of CCD to a recipient at regular intervals.

-  Use an explicit schedule if you want the intervals between releases to be of different lengths, or if you want to be able to release different amounts of CCD to the recipient at each interval.

When you specify a release schedule with regular intervals, you must provide the options ``--amount``
, ``--every``, ``--for`` and ``--starting``. For example, to send a transaction from A to B that:

- releases the same amount every day
- for 10 days in a row
- for a total amount of 100 CCD
- starting on the 10th of February 2021 at 12:00:00 UTC

use the following command:

.. code-block:: console

   $concordium-client transaction send-scheduled --amount 100 --every Day --for 10 --starting 2021-02-10T12:00:00Z --receiver B --sender A

When you specify an explicit release schedule, you must use the option ``--schedule``, which takes a comma-separated list of releases in the form of ``<amount> at <date>``. For example, to send a transaction from A to B that:

- releases 100 on January 1st 2022 at 12:00:00 UTC
- releases 150 on February 15th 2022 at 12:00:00 UTC
- releases 200 on December 31st 2022 at 12:00:00 UTC

Use the following command:

.. code-block:: console

   $concordium-client transaction send-scheduled --schedule "100 at 2021-01-01T12:00:00Z, 150 at 2021-02-15T12:00:00Z, 200 at 2021-12-31T12:00:00Z" --receiver B --sender A

If you query the account information of the recipient account afterwards, it will show the list of releases that are still pending to be released:

.. code-block:: console

   $concordium-client account show B
   Local name:            B
   Address:               3WbgGP2iE21HyrBg5kL429ZXWu2dNDXzzjZ7qwu9neop2bSCRJ
   Balance:               550.000000 CCD
   Release schedule:      total 450.000000 CCD
      Fri, 1 Jan 2021 12:00:00 UTC:                100.000000 CCD scheduled by the transactions: bab4a6309e9c0fab00cacf31e5de21ff1fed525a2d0b69e033e356b1cfae99eb.
      Mon, 15 Feb 2021 12:00:00 UTC:               150.000000 CCD scheduled by the transactions: bab4a6309e9c0fab00cacf31e5de21ff1fed525a2d0b69e033e356b1cfae99eb.
      Fri, 31 Dec 2021 12:00:00 UTC:               200.000000 CCD scheduled by the transactions: bab4a6309e9c0fab00cacf31e5de21ff1fed525a2d0b69e033e356b1cfae99eb.
   Nonce:                 1
   ...

The amount that is not yet released is also included in the ``Balance`` field
so in this case the account owns ``100 CCD`` that don't belong to any pending
release schedule.

.. _delegation-commands:

Commands for delegation
=======================

Add delegation
--------------

The command to add delegation on an account with ``concordium-client`` is
``delegator add``. For example, an interaction to add delegation on an account looks like the following:

The command is:

.. code-block:: console

   $concordium-client delegator add --sender EXAMPLEACCT --stake 5000 --target 12345

The command has the following required arguments:

- ``--sender`` is the account from which you want to stake.
- ``--stake`` is an amount of CCD you intend to delegate
- ``--target`` is either the staking pool ID or ``Passive``.

The command has the following optional argument:

- ``--no-restake`` can be set if you do not want to restake earnings.

Configure or change delegation
------------------------------

The command to configure or change delegation on an account with ``concordium-client`` is
``delegator configure``. The command has the same arguments as ``delegator add`` but the all arguments are optional for ``delegator configure``. You can specify ``--restake`` or ``--no-restake`` for ``delegator configure``. If it's specified, it can change whether or not earnings are restaked; if neither is specified, then it won't be changed. If an argument is not specified, then no change is made.

Stop delegation
---------------

The command to remove delegation on an account with ``concordium-client`` is
``delegator remove``. It is recommended to specify the ``--sender`` account where delegation should be removed. No other arguments are available.

Consensus commands
==================

.. _consensus show-chain-parameters:

Show chain parameters
---------------------

Use the consensus command ``show-chain-parameters`` to show a number of parameters for the last known block or a specific block.

.. code-block:: console

   $concordium-client consensus show-chain-parameters

To see the chain parameters for a specific block use the ``--block`` flag to specify the block hash.

The output is:

.. code-block:: console

# Parameters related to staking pools:
  + minimum equity capital: 500000.000000 CCD
  + maximum fraction of total stake a pool is allowed to hold: 5.0e-2
  + maximum factor a pool may stake relative to the validator's stake: 6 % 1
  + pool owner cooldown duration: 7d
  + allowed range for finalization commission: [1.0, 1.0]
  + allowed range for block reward commission: [0.0, 1.0]
  + allowed range for transaction commission: [0.0, 1.0]

# Passive delegation parameters:
  + finalization commission: 1.0
  + block reward commission: 0.25
  + transaction commission: 0.25

# Parameters related to delegators:
  + delegator cooldown duration: 7d

# Exchange rate parameters:
  + EUR per CCD rate (approx): 0.0039
  + EUR per Energy rate: 1 / 50000 (approx 2.0e-5)
  + microCCD per EUR rate: 9309295728319683584 / 36703199911 (approx 2.5363716926299047e8)

# Parameters that affect rewards distribution:
  + mint amount per reward period: 107459782e-12
  + mint distribution:
     * block reward: 0.9
     * finalization reward: 0.0
  + transaction fee distribution:
     * validator: 0.45
     * GAS account: 0.45
  + GAS account distribution:
     * producing a block: 0.25
     * adding a finalization proof: N/A
     * adding a credential deployment: 2.0e-2
     * adding a chain update: 5.0e-3

# Time parameters:
  + reward period length: 24 epochs

# Consensus parameters:
  + Timeout parameters:
     * base timeout: 10000 ms.
     * timeout increase: 6 / 5 (approx 1.2)
     * timeout decrease: 3 / 4 (approx 0.75)
  + minimum time between blocks: 2000 ms.
  + block energy limit: 3000000

# Finalization committee parameters:
  + minimum finalizers: 40
  + maximum finalizers: 1000
  + finalizer relative stake threshold: 5.0e-5

# Validator score parameters:
  + maximum missed rounds: 10

# Other parameters:
  + foundation account index: 13
  + maximum credential deployments per block: 10

.. list-table::
   :widths: 25 25 50
   :header-rows: 1

   * - Parameter section
     - Parameter
     - Description
   * - Parameters related to staking pools
     - Minimum equity capital
     - The minimum amount of CCD to stake to become a validator.
   * -
     - maximum fraction of total stake a pool is allowed hold
     - The maximum percent of total stake any single staking pool can have.
   * -
     - maximum factor a pool may stake relative to the validators's stake
     - A staking pool's stake consists of the validators's own equity capital, and delegated capital. This factor determines the maximum stake a staking pool may have relative to the equity capital. Any delegated stake above this threshold does not count.
   * -
     - pool owner cooldown duration
     - The amount of time the pool owner needs to wait before changes are effective when either decreasing stake or removing the pool. Note that changes are effective on the first pay day after the cool-down period has expired.
   * -
     - allowed range for finalization commission
     - The allowed range of finalization commissions validators may select when creating or updating pools.
   * -
     - allowed range for block commission
     - The allowed range of block commissions validators may select when creating or updating pools.
   * -
     - allowed range for transaction commission
     - The allowed range of transaction commissions validators may select when creating or updating pools.
   * - Passive delegation parameters
     - finalization commission
     - The percentage of finalization rewards retained by the passive delegation, i.e., not given out to delegators.
   * -
     - block commission
     - The percentage of block rewards retained by the passive delegation, i.e., not given out to delegators.
   * -
     - transaction commission
     - The percentage of transaction rewards retained by the passive delegation, i.e., not given out to delegators.
   * - Parameters related to delegators
     - delegator cooldown duration
     - The amount of time of delegator must wait before changes are effective when decreasing or removing stake, or changing pools.
   * - Exchange rate parameters
     - EUR per CCD rate (approx)
     - The approximate exchange rate for the EUR to CCD exchange rate.
   * -
     - EUR per Energy rate
     - The Euro per energy exchange rate.
   * -
     - microCCD per EUR related
     - The microCCD per Euro exchange rate.
   * - Parameters that affect rewards distribution
     - mint amount per reward period
     - The percentage increase in amount of CCD per payday.
   * -
     - mint distribution: block reward
     - The fraction of newly minted CCD that goes towards block rewards.
   * -
     - transaction fee distribution: validator
     - The fraction of block transaction fees allocated to the validator.
   * -
     - transaction fee distribution: GAS account
     - The fraction of block transaction fees allocated to the GAS account.
   * -
     - GAS rewards: producing a block
     - The fraction of the GAS account that is allocated to the validator for producing a block.
   * -
     - GAS rewards: adding a finalization proof
     - The fraction of the GAS account that is allocated to the validator for including a finalization proof in a block.
   * -
     - GAS rewards: adding a credential deployment
     - The fraction of the GAS account that is allocated to the validator for including an account creation transaction in a block.
   * -
     - Gas rewards: adding a chain update
     - The fraction of the GAS account that is allocated to the validator for including an update transaction in a block.
   * - Time parameters
     - reward period length
     - The length of the reward period. All rewards are handed out at the end of each reward period.
   * - Consensus parameters
     - Timeout parameters: base timeout
     - Time in milliseconds before timeout.
   * -
     - Timeout parameters: timeout increase
     - Factor by which base timeout increases in next round if no quorum certificate is produced after a round with a timeout certificate.
   * -
     - Timeout parameters: timout decrease
     - Factor by which base timeout decreases in next round if a quorum certificate is produced after a round with timeout certificate.
   * -
     - minimum time between blocks
     - minimum time in milliseconds between block creation
   * -
     - block energy limit
     - Maximum amount of energy consumed by block
   * - Finalization committee parameters
     - minimum finalizers
     - Minimum number of finalizers that make up the committee
   * -
     - maximum finalizers
     - Maximum number of finalizers that make up the committee
   * -
     - finalizer relative stake threshold
     - The fraction of stake required to be part of the finalization committee
   * - Other parameters
     - foundation account index
     - An index of the designated foundation reward account. The foundation account receives the foundation tax.
   * -
     - maximum credential deployments per block
     - The maximum amount of accounts that can be created in a block.
