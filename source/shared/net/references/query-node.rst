
.. _Discord: https://discord.com/invite/xWmQ5tp

.. _testnet-query-node:

===============
Querying a node
===============

.. contents::
   :local:
   :backlinks: none

The :ref:`concordium-client<concordium_client>` tool supports queries of multiple kinds of state against
a backend node:

-  Account state: List all accounts and display all publicly available
   data of a specific account.
-  Transaction status: Show the status of the transaction identified by
   the given transaction hash.
-  Block state: Display a summary of the contents of a specific block
   and its relation to other blocks on the chain.
-  Consensus state: Show the parameters of the consensus protocol and
   statistics related to baking and finalization of blocks.


.. _query-account-state:

Account state
=============

List accounts
-------------

.. code-block:: console

   $concordium-client account list [--block BLOCK-HASH]

List the addresses of all accounts on the chain as of a specific block:

-  ``BLOCK-HASH``: Full hash of the block. Defaults to the current :ref:`glossary-best-block`.

Example
~~~~~~~

.. code-block:: console

   $concordium-client account list
   2zgcMk7heVZKaaBfPtxVqmvE3GnrrP7N2nFGHoiC6X9nZT9TaG
   33MT5V7LAzbjfRS537nqq9AqHb4ALymQWwYhriE3kcYr8qsDoS
   3GqF3FQPxyxUChnBcwsC5jmY4kqWyi6R8dNXHk88GYqCPKaLGP
   ...

Inspect specific account
------------------------

.. code-block:: console

   $concordium-client account show [ACCOUNT] [--block BLOCK] [--encrypted] [--decrypt-encrypted]

Display all publicly available information of a specific account as of a
specific block. For accounts for which secret keys are available this command
can also decrypt the shielded balance.

-  ``ACCOUNT``: Address or local name of the account (if not provided,
   will show the account with the local alias ``"default"``).
-  ``BLOCK``: Full hash of target block. Defaults to the current :ref:`glossary-best-block`.
-  ``--shielded``: Show the :ref:`glossary-shielded-balance` (explained below).
-  ``--reveal-shielded``: Show the shielded balance and reveal it
   (explained below).

Example
~~~~~~~

.. code-block:: console

   $concordium-client account show my-account --shielded
   Local name:            my-account
   Address:               2zgcMk7heVZKaaBfPtxVqmvE3GnrrP7N2nFGHoiC6X9nZT9TaG
   Amount:                1026.000000 CCD
   Nonce:                 1
   Encryption public key: a820662531d0aac70b3a80dd8a249aa692436097d06da005aec7c56aad17997ec8331d1e4050fd8dced2b92f06277bd5acf72a731dc9fdac7f37c93a7be919d2bfe3fe7a19731b0f764f5cb2d0c1e7aad6f17eb378fb306f27408c9e7ea966d9

   Shielded balance:
     Incoming amounts: []
     Self balance: a9d35bf62442aabad72c...

   Credentials:
   * 88d28b6922c4e63fab6b34f0a4ae42d33817102f96d5da20fab7d0a449b92399aef395a87dc587aa799cd202fcb75c90:
     - Expiration: Sep 2021
     - Revealed attributes: none

The output shows that the account with the local name ``my-account``

-  has address ``2zgcMk7heVZKaaBfPtxVqmvE3GnrrP7N2nFGHoiC6X9nZT9TaG``,
-  has a balance of 1026 CCD,
-  has :ref:`glossary-transaction-sequence-number` ``1``,
-  has ``a820662531d...`` as the key for receiving shielded transfers.
-  has no :ref:`glossary-incoming-shielded-amount`.
-  has a :ref:`glossary-self-balance` of ``a9d35bf62442aabad72c...``. By default this
   only shows the first 20 characters of the encrypted amount. With a
   ``--verbose`` flag the full encryption is shown.

Furthermore, the account's credential reveals no attributes from the :ref:`glossary-identity`
that the account is derived from, and expires at the end of September 2021.

If the flag ``--reveal-shielded`` is provided, each of the shielded amounts
will be decrypted and the decryption shown. Note that for this operation to
succeed, the private decryption key of the account must be available in the
``concordium-client`` configuration. The user is asked for the password for
accessing the decryption key.

Transaction status
==================

.. code-block:: console

   $concordium-client transaction status TX-HASH

Display the lifecycle state of a :ref:`glossary-transaction` (pending, committed, finalized,
or absent).

If the transaction is committed or finalized, the status (success or rejected)
and execution cost is included as well.

Example
-------

.. code-block:: console

   $concordium-client transaction status 0fda6e284f9cd4429c6f76fd1bf6179aad4fa1bb218fe5ec8ad33916bf84a833
   Transaction is finalized into block e2a12d06273f5641ea8157e04367eae49a72706aa831aa58b60ee5c062cdd6e2 with status "success" and cost 0.011200 CCD (112 NRG).

Block state
===========

Inspect specific block
----------------------

.. code-block:: console

   $concordium-client block show [BLOCK-HASH]

Display information about a specific block. Note that some fields (e.g. slot
time) are objective (i.e. all nodes participating in the Concordium network will
agree on these) while others (e.g. arrival time) are specific to the local node:

-  ``BLOCK-HASH``: Full hash of the block. Defaults to the current :ref:`glossary-best-block`.

Example
~~~~~~~

.. code-block:: console

   $concordium-client block show e2a12d06273f5641ea8157e04367eae49a72706aa831aa58b60ee5c062cdd6e2
   Hash:                       e2a12d06273f5641ea8157e04367eae49a72706aa831aa58b60ee5c062cdd6e2
   Parent block:               01aea0ec91fe37cb956aafcd6d0ab7f86cfd0207e5fffc2a87d40657e2c4fa40
   Last finalized block:       dbf61032a23e020dc6793cbf242c8eadcd91586d84873dee4ae92856b29e2b3f
   Finalized:                  yes
   Receive time:               Thu, 17 Sep 2020 11:14:39 UTC
   Arrive time:                Thu, 17 Sep 2020 11:14:39 UTC
   Slot:                       117506438
   Slot time:                  Thu, 17 Sep 2020 11:14:39 UTC
   Baker:                      0
   Transaction count:          1
   Transaction energy cost:    112 NRG
   Transactions size:          284

See the :ref:`glossary<glossary>` for detailed descriptions of the individual fields.

Consensus state
===============

Inspect consensus parameters
----------------------------

.. code-block:: console

   $concordium-client consensus show-parameters [--include-bakers] [--block BLOCK-HASH]

Show :ref:`election parameters<glossary-leader-election>` for a specific block, optionally including
bakers and their :ref:`glossary-lottery-power`:

-  ``BLOCK-HASH``: Full hash of the block. Defaults to the current :ref:`glossary-best-block`.
-  ``--include-bakers``: If set, include table of bakers and their
   lottery power. The lottery power is recomputed periodically, so operations
   that affect them do not take effect immediately.

Example
~~~~~~~

.. code-block:: console

   $concordium-client consensus show-parameters --include-bakers
   Election nonce:      17afce44c8eb1a7e0c48ec28bff50df3f43b36e68155f311f5574108564a2b66
   Bakers:
                                Account                       Lottery power
           ----------------------------------------------------------------
        0: 3hq851UoXyWz1cVAiTBYBHS9k5QX7YAF8aNgaKatztcLvoyepp   20.0531 %
        1: 3mdmNou9ejMmaJ3oDGoWYfbhC6uUdd1kBSNBZBrKG6XPvRLEFJ   19.9866 %
        2: 39wyk3ExyYnZXqmA83uoVwT3wiBdLbpCrU7hdRtWsJp8sF8kwL   19.9866 %
        3: 4RCEGvpa3vi8U4V4jqciq8TB7ErqJH42nBGnKvarscrK8PrE2S   19.9872 %
        4: 4pZN572izXS2jSNuGQ1nFg5ggvZZXsghFJMERzDqTNnJZkLyvX   19.9866 %
        ...


Inspect consensus status
------------------------

.. code-block:: console

   $concordium-client consensus status

Display key blocks along with various statistics related to block production and
finalization.

-  Key blocks: Genesis, "best", and most recently finalized (and their
   heights).
-  Statistics: Count, time, latency, and period of blocks received,
   arrived/validated, and finalized.

Example
~~~~~~~

.. code-block:: console

   $concordium-client consensus status
   Best block:                  7f9641fd4dfc1ffca2ef187fdddff375bb975764d66d68744574b893b61a8338
   Genesis block:               1c647ab5e7ff63b28926f5eed88a9d49b130942a54d791abfa79b4cc0c98acd0
   Genesis time:                Wed, 18 Mar 2020 14:57:45 UTC
   Slot duration:               100
   Epoch duration:              3600000
   Last finalized block:        183e50fb2700716bd6f194f62fbd4b142a657b4bbd6d83bb64093463960ba4f3
   Best block height:           154
   Last finalized block height: 153
   Blocks received count:       128
   Block last received time:    Wed, 18 Mar 2020 14:57:45 UTC
   Block receive latency:          60 ms (EMA),    39 ms (EMSD)
   Block receive period:         7812 ms (EMA),  9086 ms (EMSD)
   Blocks verified count:       171
   Block last arrived time:     Wed, 18 Mar 2020 14:57:45 UTC
   Block arrive latency:           61 ms (EMA),    60 ms (EMSD)
   Block arrive period:          5029 ms (EMA),  6388 ms (EMSD)
   Transactions per block:          0 ms (EMA),     3 ms (EMSD)
   Finalization count:          51
   Last finalized time:         Wed, 18 Mar 2020 14:57:50 UTC
   Finalization period:         17434 ms (EMA), 11541 ms (EMSD)

EMA and EMSD refer to Exponential Moving Average and Exponential Moving
Standard Deviation, respectively.

ID layer
--------

.. code-block:: console

   $concordium-client identity show (identity-providers|anonymity-revokers) [--block BLOCK]

Display the list of identity providers or anonymity revokers at a given block,
defaulting to the :ref:`best block<glossary-best-block>`.

.. _exchange-rates:

Exchange rates
==============

Conversion rates between NRG, CCD, and Euros can fluctuate between blocks. To get a best estimate of the current
exchange rates, query the chain parameters of the :ref:`best block<glossary-best-block>`:

.. code-block:: console

   $concordium-client raw GetBlockSummary

You can also add a block hash at the end of the command to query a specific block.

The command returns the information about a block in JSON format. The exchange rates are
in the ``chainParameters`` section under ``microCCDPerEuro`` and ``euroPerEnergy``:

.. code-block:: console

    ...
    "chainParameters": {
        ...
        "microCCDPerEuro": {
            "denominator": 1,
            "numerator": 100 000 000
        },
        ...
        "euroPerEnergy": {
            "denominator": 1 000 000,
            "numerator": 1
        }

In this example, conversions between Euros, CCD and NRG are as follows:

- 1 EUR = 100 000 000 microCCD = 100 000 000 / 1 000 000 CCD = 100 CCD
- 1 NRG = 10 :sup:`-6` EUR
- 1 NRG = 10 :sup:`-4` CCD

Conversion changes happen through transactions that update the chain parameters.
If an update transaction has been posted it will take time to take effect. You can see
whether updates to the chain parameters are being processed by looking for attributes
that are prefixed with ``pending`` in the result of the above query.


