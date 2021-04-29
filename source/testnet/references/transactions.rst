.. _Discord: https://discord.com/invite/xWmQ5tp

.. _transactions:

============
Transactions
============

.. contents::
   :local:
   :backlinks: none

A *transaction* is an operation which applies some change to the chain.
Transactions always have one sender :ref:`account<glossary-account>` and are signed using the keys of
this account.

There are several transaction types: The most basic one is a GTU transfer, which
moves tokens from the sender account to another account. Other transaction types
include encrypted transfers, :ref:`adding a baker<become-a-baker>`, and updating keys of accounts
and bakers.

Every transaction has a well-defined *cost*, the value of which depends on the
transaction type as well as the payload in a way that reflects the computational
effort of applying the transaction as closely as possible. When the transaction
is submitted, its cost is deducted from the sender's account and paid to the
network as a fee for carrying out the transaction. Cost is measured in the unit
NRG which corresponds to GTU according to a variable conversion factor
(currently 1 NRG = 0.0001 GTU). Read more about conversions between GTU, NRG, and Euros in :ref:`exchange-rates`.

Once a baker receives a transaction from some client, it performs a few basic
checks to verify that the transaction is eligible for *inclusion* in a :ref:`block<glossary-block>`.
If any of these checks fail, the transaction is ignored. Included transactions
which satisfy all further requirements are considered *successful* and have
their changes applied to the chain. If something doesn't check out (for
instance, the sender attempted to overdraw their account), the transaction is
still included, but recorded as *rejected*. A rejected transaction has no effect
other than deducting its cost from the sender.

Each account has a :ref:`sequence number<glossary-transaction-sequence-number>` associated with it. This number increases
sequentially with each transaction sent from this account and is recorded into
the transaction. Transactions with sequence numbers that don't match the current
one of the account are not considered eligible for inclusion on the chain. This
ensures that transactions are included only once and in a specific order.

Until some block containing a given transaction is :ref:`finalized<glossary-finalization>`, there is no
guarantee that the transaction is permanent.

Transfers (both plain and encrypted) can be performed using the :ref:`Concordium ID<concordium_id>`
mobile app, or the :ref:`concordium-client<concordium_client>` tool. All other transaction types
can only be done through ``concordium-client``.



Concordium ID (mobile wallet)
=============================

Once you create :ref:`an account<reference-id-accounts>` in the :ref:`wallet<guide-account-transactions>`, the **SEND** button brings you
to the screen for doing transfers from the given account. Depending on whether
you are in the public or shielded balance part of the account the transfer will
be a plain transfer, or an encrypted transfer.

Command-line tool
=================

All types of transactions can be performed using :ref:`concordium-client<concordium_client>`. The
different transaction types are performed using specialized subcommands:

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

Each of these commands have a number of parameters specific to them, but share a
common set of flags and configuration to control how they build transactions.
Depending on the exact context, the flags are currently all optional:

-  ``--sender``: Name or address of the transaction's sender account.
   The name is the one used when :ref:`importing the account<managing_accounts>` (assuming that this
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
   it will sign with all keys in the local config. 


In most cases, it should be sufficient to provide only the ``--sender`` option
and use the account by name.

In all cases, the command will display the exact parameters of the transaction
before sending it, and ask the user to confirm that it matches their intent.
Just before the transaction is sent the user is asked for the password to access
the signing keys.

Once a transaction has been submitted, the command will continuously poll and
display its status until it's been :ref:`finalized<glossary-finalization>`.

The commands for transferring GTU (both plain transfers and encrypted transfers)
are described below.

The remaining commands are used to add, remove, and configure bakers. Their
behavior is explained on the guide for :ref:`becoming a baker<become-a-baker>`.

.. note::

   For more information about a command, invoke it with the ``--help`` flag.

Transfer
--------

A transfer is done using the following command:

.. code-block:: console

   $concordium-client transaction send-gtu

Apart from the generic transaction flags above, the parameters are:

-  ``--amount``: Number of GTU tokens to send.
-  ``--receiver``: Name or address of the receiver account.


Example: Transferring 25 GTU from one account to another
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Accounts:

-  A: ``4DY7Kq5vXsNDhEAnj969Fd86g9egi1Htq3YmL2qAU9cXWj2a1y``
-  B: ``3EmnjMy8AY5zoebNaA3HuVx1UShdW8vh9n1YjJztmSc2jN4K3V``

If the accounts have both been imported under these names, the command
to transfer 25 GTU is:

.. code-block:: console

   $concordium-client transaction send-gtu --amount 25 --sender A --receiver B

The output will look similar to the following (in the example we assume that the
sender account A has three transaction signing keys 0, 1, 3).

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

Encrypted transfer
------------------

An encrypted transfer is a transfer from a shielded balance to a shielded
balance of another account. The command is very similar to a plain transfer

.. code-block:: console

   $concordium-client transaction send-gtu-encrypted --sender A --receiver B --amount 8

This command will

-  query the chain for the shielded balance of account A from the
   Concordium network
-  decrypt it
-  query the encryption key of account B from the Concordium network
-  and send the transaction.

The interaction looks as follows.

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
additional flag ``--index.`` This flag, if given, is used to select which
:ref:`incoming encrypted amounts<glossary-incoming-encrypted-amount>` that will be used as input to the transaction.
This is best illustrated on an example. :ref:`Querying an account<query-account-state>` can display the
list of incoming amounts on account. An output could look as follows

.. code-block:: console

   ...
   Encrypted balance:
     Incoming amounts:
       7: 8c0faff6739bffc531c5...
       8: a7620250f8b4307565a8...
       9: a67a39e44765e90987c4...
     Self balance: c0000000000000000000...
   ...

If we were to ``send-gtu-encrypted`` from the account while supplying index 8,
only the encrypted amount ``8c0faff6739bffc531c5...`` and the :ref:`self balance<glossary-self-balance>`
would be used as input of the encrypted transfer.

If the supplied index is out of range ``concordium-client`` will refuse to send
the transaction.

Shield an amount
----------------

The command to shield an amount with ``concordium-client`` is ``account
encrypt``. For example, an interaction to shield 10 GTU on account A looks as
follows.

The command is

.. code-block:: console

   $concordium-client account encrypt --amount 10 --sender A

It supports all of the same additional flags as the transfer transaction, apart
from the ``--receiver`` since transfer from public to encrypted balance is
always on the same account. The output looks as follows

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
account B looks as follows.

The command is

.. code-block:: console

   $concordium-client account decrypt --sender B --amount 7

This will

-  query the state of account B from the Concordium network
-  decrypt the shielded balance and check that it is sufficient
-  send the transaction

This supports the same optional flags as ``encrypt``, with the addition
of ``--index`` which has the same meaning as in the
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

Transfer with schedule
----------------------

The command to send a transfer of GTU that will be released gradually over a
release schedule with ``concordium-client`` is ``transaction send-gtu-scheduled``.
There are two ways of specifying the release schedule, either as regular intervals
or as an explicit schedule at specific timestamps.

When specifying the release schedule with regular intervals, the options ``--amount``
, ``--every``, ``--for`` and ``--starting`` must be provided. For example, sending a transaction from A to B that will:

- release the same amount every day
- for 10 days in a row
- for a total amount of 100 GTU
- starting on the 10th of February 2021 at 12:00:00 UTC

would be done with the following command:

.. code-block:: console

   $concordium-client transaction send-gtu-scheduled --amount 100 --every Day --for 10 --starting 2021-02-10T12:00:00Z --receiver B --sender A

When specifying the release schedule explicitly, the option ``--schedule`` must be used
which takes a comma-separated list of releases in the form of ``<amount> at <date>``. For example,
sending a transaction from A to B that will:

- release 100 on January 1st 2021 at 12:00:00 UTC
- release 150 on February 15th 2021 at 12:00:00 UTC
- release 200 on December 31st 2021 at 12:00:00 UTC

would be done with the following command:

.. code-block:: console

   $concordium-client transaction send-gtu-scheduled --schedule "100 at 2021-01-01T12:00:00Z, 150 at 2021-02-15T12:00:00Z, 200 at 2021-12-31T12:00:00Z" --receiver B --sender A

Querying account information of the receiver account afterwards, will show the
list of releases that are still pending to be released:

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

The amount that is not yet released is also accounted in the ``Balance`` field
so in this case the account owns ``100 GTU`` that don't belong to any pending
release schedule.

Support & Feedback
==================

If you run into any issues or have suggestions, post your question or
feedback on `Discord`_, or contact us at testnet@concordium.com.
