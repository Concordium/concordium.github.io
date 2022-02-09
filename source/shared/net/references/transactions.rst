.. _Discord: https://discord.com/invite/xWmQ5tp

.. _transactions:

==============================
Concordium Client transactions
==============================

.. contents::
   :local:
   :backlinks: none


You can perform all types of transactions with the :ref:`concordium-client<concordium_client>`. To do so, you use specialized subcommands. For an introduction to transactions, see :ref:`Transactions overview <transactions-overview>`.

.. Note::
   All transfers and transactions cost a fee. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees.
   You can see the fee in the transaction log.

Transaction commands
====================

+-------------------------------+-------------------------------------+
| Command                       | Description                         |
+===============================+=====================================+
| ``transaction send``          | Transfer CCD tokens                 |
+-------------------------------+-------------------------------------+
| ``transaction                 | Transfer CCD tokens between shielded|
| send-shielded``               | balances                            |
+-------------------------------+-------------------------------------+
| ``transaction                 | Make a transfer that will be        |
| send-scheduled``              | released gradually                  |
+-------------------------------+-------------------------------------+
| ``baker add``                 | Add a new baker. For more           |
|                               | information, see                    |
|                               | :ref:`become-a-baker`.              |
+-------------------------------+-------------------------------------+
| ``baker remove``              | Remove a baker. For more            |
|                               | information, see                    |
|                               | :ref:`become-a-baker`.              |
+-------------------------------+-------------------------------------+
| ``baker update-stake``        | Update the staked amount of a baker.|
|                               | For more information, see           |
|                               | :ref:`become-a-baker`.              |
+-------------------------------+-------------------------------------+
| ``baker update-restake``      | Update the restaking switch of a    |
|                               | baker.                              |
|                               | For more information, see           |
|                               | :ref:`become-a-baker`.              |
+-------------------------------+-------------------------------------+
| ``baker set-key``             | Update the keys of a baker.         |
|                               | For more information, see           |
|                               | :ref:`become-a-baker`.              |
+-------------------------------+-------------------------------------+
| ``account update-keys``       | Update credentials keys for a       |
|                               | specific credential                 |
+-------------------------------+-------------------------------------+
| ``account shield``            | Transfer part of the public balance |
|                               | to shielded balance                 |
+-------------------------------+-------------------------------------+
| ``account unshield``          | Transfer part of the shielded       |
|                               | balance to public balance           |
+-------------------------------+-------------------------------------+
| ``account show``              | Show account information.           |
|                               | :ref:`See below for specific        |
|                               | information<account-commands>`.     |
+-------------------------------+-------------------------------------+
| ``identity show``             | Show identity information.          |
|                               | :ref:`See below for specific        |
|                               | information<identity-commands>`.    |
+-------------------------------+-------------------------------------+

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

In most cases, you only need to provide the ``--sender`` option
and use the account by name.

In all cases, the command displays the exact parameters of the transaction
before sending it, and you're asked to confirm that it matches your intent.
Just before the transaction is sent, you're asked for the password to access
the signing keys.

Once a transaction has been submitted, the command will continuously poll and
display its status until it's been :ref:`finalized<glossary-finalization>`.

.. _account-commands:

Commands for showing account information
========================================

.. _account-seqno:

Account sequence number
-----------------------

Each account on the Concordium blockchain has a :ref:`sequence number<glossary-transaction-sequence-number>` and each
transaction signed by the account must have a sequence number. For a transaction
to be considered valid its sequence number must be the next available one for
the account. The sequence number is maintained by all the bakers in order to
validate transactions.

The sequence number can be looked up from an up to date node by running

.. code-block:: console

   $concordium-client account show [ACCOUNT]

where ``[ACCOUNT]`` is an optional argument that is either an address of an
account or the name of an account chosen when importing the account. If no
address is provided, ``concordium-client`` will use the account name
``default``.

The Mobile Wallet keeps track of the sequence number and assigns the correct one when sending transactions.
``concordium-client`` tracks the sequence number automatically, but it can
also be set manually via the option ``--nonce``.

.. _account-aliases:

Account aliases
---------------

In protocol versions 1 and 2 accounts and account addresses have a one-to-one relationship. In protocol version 3 each account has 16777216 addresses, namely a so-called canonical account address together with
matching account aliases. The canonical account address is derived when an account is created on chain. The other 16 million addresses with matching initial 29 bytes are referred to as account aliases for
the same account. Thus, accounts can be referred to by any address whose initial 29 bytes match.

This allows each account to have aliases for different uses and creates a kind of sub-account structure. An account owner can give out different aliases for different uses to keep track of transfers and assign them meaning.

Each account still has one total account balance. Hence, transfers to and from aliases of an account add to and subtract from that total account balance, respectively. Transfers between different aliases of the same account do not change the balance of the account, apart from cost. Finalization, block, and baking rewards are always received on the account's canonical address.

To show aliases, enter:

.. code-block:: console

   $ concordium-client account show-alias 3ofwYFAkgV59BsHqzmiWyRmmKRB5ZzrPfbmx5nup24cE53jNX5 --alias 17

This generates the output:

.. code-block:: console

   The requested alias for address 3ofwYFAkgV59BsHqzmiWyRmmKRB5ZzrPfbmx5nup24cE53jNX5 is 3ofwYFAkgV59BsHqzmiWyRmmKRB5ZzrPfbmx5nuou5Z2vaESRt.

.. _identity-commands:

Commands for showing identity information
=========================================

.. identity-providers:

To show the identity providers authorized by Concordium and a URL, enter:

.. code-block:: console

   $concordium-client identity show identity-providers

To show the anonymity revokers, enter:

.. code-block:: console

   $concordium-client identity show anonymity-revokers

Commands for transferring CCD
=============================

The commands for transferring CCD (both plain transfers and shielded transfers)
are described in the following table.

The add, remove, and configure bakers commands are described in the topic :ref:`becoming a baker using the Concordium Client<become-a-baker>`.

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

The following flags are for adding a :ref:`transfer memo<glossary-transfer-memo>` to the transfer.

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

The output will look similar to the following. Note that in this example, we assume that the
sender account A has three transaction signing keys 0, 1, and 3.

.. code-block:: console

   Sending 25.000000 CCD from '4DY7Kq5vXsNDhEAnj969Fd86g9egi1Htq3YmL2qAU9cXWj2a1y' (A) to '3EmnjMy8AY5zoebNaA3HuVx1UShdW8vh9n1YjJztmSc2jN4K3V' (B).
   Allowing up to 165 NRG to be spent as transaction fee.
   Transaction expires at Sun,  4 Oct 2020 11:13:55 UTC.
   Confirm [yN]: y
   Enter password for signing key with index 0: ...
   Enter password for signing key with index 1: ...
   Enter password for signing key with index 3: ...
   Transaction '7c484aecbc9dce654956cae1a6f9315679f62afe091d74f865f3602bc8003fbd' sent to the baker.
   Waiting for the transaction to be committed and finalized.
   You may skip this step by interrupting the command using Ctrl-C (pass flag '--no-wait' to do this by default).
   The transaction will still get processed and may be queried using
     'transaction status 7c484aecbc9dce654956cae1a6f9315679f62afe091d74f865f3602bc8003fbd'.
   [13:05:23] Waiting for the transaction to be committed.....
   Transaction is finalized into block e6912910ccf11a23413771eba395e1655fc86519759a2ce03439be9d5290292a with status "success" and cost 0.011200 CCD (112 NRG).
   [13:05:27] Waiting for the transaction to be finalized...
   [13:05:27] Transaction finalized.

Make a shielded transfer
------------------------

A shielded transfer is a transfer from a shielded balance to a shielded
balance of another account. The command is very similar to a standard  transfer.

.. code-block:: console

   $concordium-client transaction send-shielded --sender A --receiver B --amount 8

This command does the following:

-  queries the chain for the shielded balance of account A from the
   Concordium network.
-  decrypts it.
-  queries the encryption key of account B from the Concordium network
-  sends the transaction.

The interaction looks like the following:

.. code-block:: console

   $concordium-client transaction send-shielded --sender A --receiver B --amount 8
   Using default energy amount of 30176 NRG.
   Enter password for decrypting the secret encryption key: ...
   Transferring 8.000000 CCD from shielded balance of account '4s9jugBpiZuDKNJu9PGAj57JseAze8fGaGJC2y3HmtCbBeTLAJ' (A) to '47JNHkJZo9ShomDypbiSJzdGN7FNxo8MwtUFsPa49KGvejf7Wh' (B).
   Allowing up to 30176 NRG to be spent as transaction fee.
   Transaction expires at Sun,  4 Oct 2020 11:28:47 UTC.
   Confirm [yN]: y
   Enter password for signing key with index 0: ...
   Enter password for signing key with index 1: ...
   Enter password for signing key with index 3: ...
   Transaction 'af220cdeb5c092847de25e4681515d7d318a98223fc4d1dc9c65bda9f2060b19' sent to the baker.
   Waiting for the transaction to be committed and finalized.
   You may skip this step by interrupting the command using Ctrl-C (pass flag '--no-wait' to do this by default).
   The transaction will still get processed and may be queried using
     'transaction status af220cdeb5c092847de25e4681515d7d318a98223fc4d1dc9c65bda9f2060b19'.
   [13:20:24] Waiting for the transaction to be committed..............
   Transaction is finalized into block 552c32da51ca67a6579c1c151ee67440ade5a44f9ca69e13a4a042e7fcc1ee4c with status "success" and cost 3.012300 CCD (30123 NRG).
   [13:20:46] Waiting for the transaction to be finalized...
   [13:20:46] Transaction finalized.

This command has all of the additional options of ``send``, as well as an
additional flag ``--index.`` If given, this flag is used to select which
:ref:`incoming shielded amounts<glossary-incoming-shielded-amount>` that will be used as input to the transaction.

This is illustrated with the following example. :ref:`Querying an account<query-account-state>` can display the
list of incoming amounts on account. An output could look like this:

.. code-block:: console

   ...
   Encrypted balance:
     Incoming amounts:
       7: 8c0faff6739bffc531c5...
       8: a7620250f8b4307565a8...
       9: a67a39e44765e90987c4...
     Self balance: c0000000000000000000...
   ...

If you want to ``send-shielded`` from the account while supplying index 8,
only the shielded amount ``8c0faff6739bffc531c5...`` and the :ref:`self balance<glossary-self-balance>`
will be used as input of the shielded transfer.

If the supplied index is out of range ``concordium-client`` will refuse to send
the transaction.

Shield an amount
----------------

The command to shield an amount with ``concordium-client`` is ``account
shield``. For example, an interaction to shield 10 CCD on account A looks like the following

The command is:

.. code-block:: console

   $concordium-client account shield --amount 10 --sender A

The command supports all of the same additional flags as the transfer transaction, except the ``--receiver`` since a transfer from a public to a shielded balance is always on the same account. The output looks like the following:

.. code-block:: console

   Using default energy amount of 265 NRG.
   Transferring 10.000000 CCD from public to shielded balance of account '4s9jugBpiZuDKNJu9PGAj57JseAze8fGaGJC2y3HmtCbBeTLAJ' (A).
   Allowing up to 265 NRG to be spent as transaction fee.
   Transaction expires at Sun,  4 Oct 2020 11:25:02 UTC.
   Confirm [yN]: y
   Enter password for signing key with index 0: ...
   Enter password for signing key with index 1: ...
   Enter password for signing key with index 3: ...
   Transaction '9a74be8f99e26dfa0c269725205fb63d447c357ea61b8e6e4df8230059ba22f5' sent to the baker.
   Waiting for the transaction to be committed and finalized.
   You may skip this step by interrupting the command using Ctrl-C (pass flag '--no-wait' to do this by default).
   The transaction will still get processed and may be queried using
     'transaction status 9a74be8f99e26dfa0c269725205fb63d447c357ea61b8e6e4df8230059ba22f5'.
   [13:15:10] Waiting for the transaction to be committed.....
   Transaction is finalized into block c12e7772190d1361dc7d59a1cc873906436742e726d12213cb599eb48b97bd2c with status "success" and cost 0.021200 CCD (212 NRG).
   [13:15:14] Waiting for the transaction to be finalized...
   [13:15:14] Transaction finalized.

Unshield an amount
------------------

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

The command supports the same optional flags as ``shield`` with the addition
of ``--index``, which has the same meaning as in the
``send-shielded`` command.

.. code-block:: console

   Using default energy amount of 16171 NRG.
   Enter password for decrypting the secret encryption key:
   Transferring 7.000000 CCD from shielded to public balance of account '47JNHkJZo9ShomDypbiSJzdGN7FNxo8MwtUFsPa49KGvejf7Wh' (B).
   Allowing up to 16171 NRG to be spent as transaction fee.
   Transaction expires at Sun,  4 Oct 2020 11:44:07 UTC.
   Confirm [yN]: y
   Enter password for signing key with index 0: ...
   Enter password for signing key with index 1: ...
   Transaction 'b240ed919767b89a03984e71a0c39cff52f3374ab2b1721e489c02dc3fb1e691' sent to the baker.
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
