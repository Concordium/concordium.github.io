.. _Discord: https://discord.com/invite/xWmQ5tp

.. _transactions:

==============================
Concordium Client transactions
==============================

.. contents::
   :local:
   :backlinks: none


You can perform all types of transactions with the :ref:`concordium-client<concordium_client>`. To do so, you use specialized subcommands. For an introduction to transactions, see :ref:`Transactions overview <transactions-overview>`.

Transaction commands
====================

+-------------------------------+-------------------------------------+
| Command                       | Description                         |
+===============================+=====================================+
| ``transaction send-gtu``      | Transfer GTU tokens                 |
+-------------------------------+-------------------------------------+
| ``transaction                 | Transfer GTU tokens between shielded|
| send-gtu-encrypted``          | balances                            |
+-------------------------------+-------------------------------------+
| ``transaction                 | Make a transfer that will be        |
| send-gtu-scheduled``          | released gradually                  |
+-------------------------------+-------------------------------------+
| ``baker add``                 | Add a new baker                     |
+-------------------------------+-------------------------------------+
| ``baker remove``              | Remove a baker                      |
+-------------------------------+-------------------------------------+
| ``baker update-stake``        | Update the staked amount of a baker |
+-------------------------------+-------------------------------------+
| ``baker update-restake``      | Update the restaking switch of a    |
|                               | baker                               |
+-------------------------------+-------------------------------------+
| ``baker set-key``             | Update the keys of a baker          |
+-------------------------------+-------------------------------------+
| ``account update-keys``       | Update credentials keys for a       |
|                               | specific credential                 |
+-------------------------------+-------------------------------------+
| ``account encrypt``           | Transfer part of the public balance |
|                               | to shielded balance                 |
+-------------------------------+-------------------------------------+
| ``account decrypt``           | Transfer part of the shielded       |
|                               | balance to public balance           |
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

Commands for transferring GTU
=============================

The commands for transferring GTU (both plain transfers and encrypted transfers)
are described in the following table.

The add, remove, and configure bakers commands are described in the topic :ref:`becoming a baker using the Concordium Client<become-a-baker>`.

.. note::

   To see more information about a command, invoke it with the ``--help`` flag.

Transfer GTU
------------

Use the following command for transfers:

.. code-block:: console

   $concordium-client transaction send-gtu

Apart from the generic transaction flags above, the parameters are:

-  ``--amount``: number of GTU tokens to send.
-  ``--receiver``: name or address of the receiver account.

The following flags are for adding a :ref:`transfer memo<glossary-transfer-memo>` to the transfer.

-  ``--memo``: optional flag for providing a transfer memo as a string. The string will be CBOR encoded and included in the memo.
-  ``--memo-json``: optional flag for providing a transfer memo as a JSON file. The JSON will be CBOR encoded and appear on chain as a bytestring representing the provided JSON.
-  ``--memo-raw``: optional flag for providing a transfer memo as file with raw bytes. The raw bytes will go directly on chain.


Example: Transferring 25 GTU from one account to another
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Accounts:

-  A: ``4DY7Kq5vXsNDhEAnj969Fd86g9egi1Htq3YmL2qAU9cXWj2a1y``
-  B: ``3EmnjMy8AY5zoebNaA3HuVx1UShdW8vh9n1YjJztmSc2jN4K3V``

If the accounts have both been imported under these names, the command
to transfer 25 GTU is:

.. code-block:: console

   $concordium-client transaction send-gtu --amount 25 --sender A --receiver B

The output will look similar to the following. Note that in this example, we assume that the
sender account A has three transaction signing keys 0, 1, and 3.

.. code-block:: console

   Sending 25.000000 GTU from '4DY7Kq5vXsNDhEAnj969Fd86g9egi1Htq3YmL2qAU9cXWj2a1y' (A) to '3EmnjMy8AY5zoebNaA3HuVx1UShdW8vh9n1YjJztmSc2jN4K3V' (B).
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
   Transaction is finalized into block e6912910ccf11a23413771eba395e1655fc86519759a2ce03439be9d5290292a with status "success" and cost 0.011200 GTU (112 NRG).
   [13:05:27] Waiting for the transaction to be finalized...
   [13:05:27] Transaction finalized.

Make a shielded transfer
------------------------

A shielded transfer is a transfer from a shielded balance to a shielded
balance of another account. The command is very similar to a standard  transfer.

.. code-block:: console

   $concordium-client transaction send-gtu-encrypted --sender A --receiver B --amount 8

This command does the following:

-  queries the chain for the shielded balance of account A from the
   Concordium network.
-  decrypts it.
-  queries the encryption key of account B from the Concordium network
-  sends the transaction.

The interaction looks like the following:

.. code-block:: console

   $concordium-client transaction send-gtu-encrypted --sender A --receiver B --amount 8
   Using default energy amount of 30176 NRG.
   Enter password for decrypting the secret encryption key: ...
   Transferring 8.000000 GTU from encrypted balance of account '4s9jugBpiZuDKNJu9PGAj57JseAze8fGaGJC2y3HmtCbBeTLAJ' (A) to '47JNHkJZo9ShomDypbiSJzdGN7FNxo8MwtUFsPa49KGvejf7Wh' (B).
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
   Transaction is finalized into block 552c32da51ca67a6579c1c151ee67440ade5a44f9ca69e13a4a042e7fcc1ee4c with status "success" and cost 3.012300 GTU (30123 NRG).
   [13:20:46] Waiting for the transaction to be finalized...
   [13:20:46] Transaction finalized.

This command has all of the additional options of ``send-gtu``, as well as an
additional flag ``--index.`` If given, this flag is used to select which
:ref:`incoming encrypted amounts<glossary-incoming-encrypted-amount>` that will be used as input to the transaction.

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

If you want to ``send-gtu-encrypted`` from the account while supplying index 8,
only the encrypted amount ``8c0faff6739bffc531c5...`` and the :ref:`self balance<glossary-self-balance>`
will be used as input of the encrypted transfer.

If the supplied index is out of range ``concordium-client`` will refuse to send
the transaction.

Shield an amount
----------------

The command to shield an amount with ``concordium-client`` is ``account
encrypt``. For example, an interaction to shield 10 GTU on account A looks like the following

The command is:

.. code-block:: console

   $concordium-client account encrypt --amount 10 --sender A

The command supports all of the same additional flags as the transfer transaction, except the ``--receiver`` since a transfer from a public to a shielded balance is always on the same account. The output looks like the following:

.. code-block:: console

   Using default energy amount of 265 NRG.
   Transferring 10.000000 GTU from public to encrypted balance of account '4s9jugBpiZuDKNJu9PGAj57JseAze8fGaGJC2y3HmtCbBeTLAJ' (A).
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
   Transaction is finalized into block c12e7772190d1361dc7d59a1cc873906436742e726d12213cb599eb48b97bd2c with status "success" and cost 0.021200 GTU (212 NRG).
   [13:15:14] Waiting for the transaction to be finalized...
   [13:15:14] Transaction finalized.

Unshield an amount
------------------

The command to unshield an amount with ``concordium-client`` is
``account decrypt``. For example, an interaction to unshield 7 GTU on
account B looks like the following:

The command is:

.. code-block:: console

   $concordium-client account decrypt --sender B --amount 7

This

-  queries the state of account B from the Concordium network.
-  decrypts the shielded balance and checks that there is sufficient funds.
-  sends the transaction.

The command supports the same optional flags as ``encrypt`` with the addition
of ``--index``, which has the same meaning as in the
``send-gtu-encrypted`` command.

.. code-block:: console

   Using default energy amount of 16171 NRG.
   Enter password for decrypting the secret encryption key:
   Transferring 7.000000 GTU from encrypted to public balance of account '47JNHkJZo9ShomDypbiSJzdGN7FNxo8MwtUFsPa49KGvejf7Wh' (B).
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
   Transaction is finalized into block e71a495c47734968214ac22e918f508949b02351b9f188d9b657b648927cf1ab with status "success" and cost 1.611800 GTU (16118 NRG).
   [13:34:18] Waiting for the transaction to be finalized...
   [13:34:18] Transaction finalized.

.. _transfer-with-a-schedule:

Transfer GTU with a  schedule
-----------------------------

The command to transfer GTU that will be released gradually according to a
release schedule with ``concordium-client`` is ``transaction send-gtu-scheduled``.
There are two ways of specifying the release schedule, either at regular intervals or as an explicit schedule.

-  Use a regular interval schedule to release an equal amount of GTU to a recipient at regular intervals.

-  Use an explicit schedule if you want the intervals between releases to be of different lengths, or if you want to be able to release different amounts of GTU to the recipient at each interval.

When you specify a release schedule with regular intervals, you must provide the options ``--amount``
, ``--every``, ``--for`` and ``--starting``. For example, to send a transaction from A to B that:

- releases the same amount every day
- for 10 days in a row
- for a total amount of 100 GTU
- starting on the 10th of February 2021 at 12:00:00 UTC

use the following command:

.. code-block:: console

   $concordium-client transaction send-gtu-scheduled --amount 100 --every Day --for 10 --starting 2021-02-10T12:00:00Z --receiver B --sender A

When you specify an explicit release schedule, you must use the option ``--schedule``, which takes a comma-separated list of releases in the form of ``<amount> at <date>``. For example, to send a transaction from A to B that:

- releases 100 on January 1st 2022 at 12:00:00 UTC
- releases 150 on February 15th 2022 at 12:00:00 UTC
- releases 200 on December 31st 2022 at 12:00:00 UTC

Use the following command:

.. code-block:: console

   $concordium-client transaction send-gtu-scheduled --schedule "100 at 2021-01-01T12:00:00Z, 150 at 2021-02-15T12:00:00Z, 200 at 2021-12-31T12:00:00Z" --receiver B --sender A

If you query the account information of the recipient account afterwards, it will show the list of releases that are still pending to be released:

.. code-block:: console

   $concordium-client account show B
   Local name:            B
   Address:               3WbgGP2iE21HyrBg5kL429ZXWu2dNDXzzjZ7qwu9neop2bSCRJ
   Balance:               550.000000 GTU
   Release schedule:      total 450.000000 GTU
      Fri, 1 Jan 2021 12:00:00 UTC:                100.000000 GTU scheduled by the transactions: bab4a6309e9c0fab00cacf31e5de21ff1fed525a2d0b69e033e356b1cfae99eb.
      Mon, 15 Feb 2021 12:00:00 UTC:               150.000000 GTU scheduled by the transactions: bab4a6309e9c0fab00cacf31e5de21ff1fed525a2d0b69e033e356b1cfae99eb.
      Fri, 31 Dec 2021 12:00:00 UTC:               200.000000 GTU scheduled by the transactions: bab4a6309e9c0fab00cacf31e5de21ff1fed525a2d0b69e033e356b1cfae99eb.
   Nonce:                 1
   ...

The amount that is not yet released is also included in the ``Balance`` field
so in this case the account owns ``100 GTU`` that don't belong to any pending
release schedule.
