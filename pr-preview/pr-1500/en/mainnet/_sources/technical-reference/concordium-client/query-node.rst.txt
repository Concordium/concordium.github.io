
.. _Discord: https://discord.com/invite/xWmQ5tp

.. _testnet-query-node:

===============
Querying a node
===============

The :ref:`concordium-client<concordium-client>` tool supports queries of multiple kinds of state against
a backend node:

-  Account state: List all accounts and display all publicly available
   data of a specific account.
-  Transaction status: Show the status of the transaction identified by
   the given transaction hash.
-  Block state: Display a summary of the contents of a specific block
   and its relation to other blocks on the chain.
-  Consensus state: Show the parameters of the consensus protocol and
   statistics related to production of blocks.
-  Validator queries: Show validator information.

.. _query-account-state:

Account state
=============

List accounts
-------------

.. code-block:: console

   $concordium-client account list [--block BLOCK-HASH]

List the addresses of all accounts on the chain as of a specific block:

-  ``BLOCK-HASH``: Full hash of the block. Defaults to the current best block.

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
can also decrypt the shielded balance (:ref:`deprecated<shielded-balance-feature-deprecation>`).

-  ``ACCOUNT``: Address or local name of the account (if not provided,
   will show the account with the local alias ``"default"``).
-  ``BLOCK``: Full hash of target block. Defaults to the current best block`.
-  ``--shielded``: Show the shielded balance (:ref:`deprecated<shielded-balance-feature-deprecation>`).
-  ``--reveal-shielded``: Show the shielded balance and reveal it
   (:ref:`deprecated<shielded-balance-feature-deprecation>`).

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
-  has :term:`transaction sequence number` ``1``,
-  has ``a820662531d...`` as the key for receiving shielded transfers (:ref:`deprecated<shielded-balance-feature-deprecation>`).
-  has no incoming shielded amount (:ref:`deprecated<shielded-balance-feature-deprecation>`).
-  has a self balance of ``a9d35bf62442aabad72c...`` (:ref:`deprecated<shielded-balance-feature-deprecation>`). By default this
   only shows the first 20 characters of the encrypted amount. With a
   ``--verbose`` flag the full encryption is shown.

Furthermore, the account's credential reveals no attributes from the :term:`identity`
that the account is derived from, and expires at the end of September 2021.

If the flag ``--reveal-shielded`` is provided, each of the shielded amounts
will be decrypted and the decryption shown. Note that for this operation to
succeed, the private decryption key of the account must be available in the
``concordium-client`` configuration. The user is asked for the password for
accessing the decryption key.

.. note::

   Functionalities related to shielding a balance are deprecated in protocol 7 and above.
   No additional shielded balance can be added to an account and no transfer of shielded balance is possible.
   Only unshielding of an already shielded balance is possible and recommended to be done.
   Wallets and command-line tools will continue to display shielded balances and support the
   unshielding flow to recover already shielded funds.

Transaction status
==================

.. code-block:: console

   $concordium-client transaction status TX-HASH

Display the lifecycle state of a :term:`transaction` (pending, committed, finalized,
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

-  ``BLOCK-HASH``: Full hash of the block. Defaults to the current best block.

Example
~~~~~~~

.. code-block:: console

   $concordium-client block show e2a12d06273f5641ea8157e04367eae49a72706aa831aa58b60ee5c062cdd6e2
   Hash:                       e2a12d06273f5641ea8157e04367eae49a72706aa831aa58b60ee5c062cdd6e2
   Parent block:               01aea0ec91fe37cb956aafcd6d0ab7f86cfd0207e5fffc2a87d40657e2c4fa40
   Last finalized block:       dbf61032a23e020dc6793cbf242c8eadcd91586d84873dee4ae92856b29e2b3f
   Finalized:                  yes
   Receive time:               Thu, 3 Aug 2023 11:14:39 UTC
   Arrive time:                Thu, 3 Aug 2023 11:14:39 UTC
   Block time:                 Thu, 3 Aug 2023 11:14:39 UTC
   Height:                     2269771
   Height since last genesis:  396377
   Genesis index:              2
   Validator:                  0
   Transaction count:          1
   Transaction energy cost:    112 NRG
   Transactions size:          284
   Protocol version:           P6
   Round:                      417788
   Epoch:                      2701

See the :ref:`glossary<glossary>` for detailed descriptions of the individual fields.

Consensus state
===============

Inspect consensus parameters
----------------------------

.. code-block:: console

   $concordium-client consensus show-parameters [--include-bakers] [--block BLOCK-HASH]

Show :term:`election parameters<leader election>` for a specific block, optionally including
bakers and their :term:`lottery power`:

-  ``BLOCK-HASH``: Full hash of the block. Defaults to the current best block.
-  ``--include-bakers``: If set, include table of bakers and their
   lottery power. The lottery power is recomputed periodically, so operations
   that affect them do not take effect immediately.

Example
~~~~~~~

.. code-block:: console

   $concordium-client consensus show-parameters --include-bakers
   Election nonce:      17afce44c8eb1a7e0c48ec28bff50df3f43b36e68155f311f5574108564a2b66
   Bakers:
                              Account                       Lottery power  Account Name
         ------------------------------------------------------------------------------
      0: 4fvxZZ225xcEiCkgXTZt3cSReYgbxiMsSoj1UhAbGCsqvVg9N7   17.9465 %
      1: 3p8FSc3KN5pKxRvEdsvJS8VS21KbkRS3x4MnGq1t6omuJXydJQ   17.9646 %
      2: 39zGK3yRxHjgVVnHae2cgZBo6uWtC5Qg8GkmtMjPsJYgDc5pfF   17.9663 %
      3: 353yq84vTgYZcVLpj4Vd5fdgGbMxAUpkktNnDFs1ogzSvDxMiH   17.9389 %
      4: 33PbbH58cQj6CAHfLGy5z3FDKhHtjohQmK3ff63tzXJLWsAm8V   17.9753 %
      48: 4QdCxcP9cApLxA8UGFXiY1HjSPnSkUaeVUERU8BmBdStgnS5Vh   2.9890 %
      54: 4Z28EXyghd7tLbrMntGZxjBypwGxbQdcnexmeWxPaVeyvFC4bk   0.0152 %
      ...


Inspect consensus status
------------------------

.. code-block:: console

   $concordium-client consensus status

Display key blocks along with various statistics related to block production.

-  Key blocks: Genesis, "best", and most recently finalized (and their
   heights).
-  Statistics: Count, time, latency, and period of blocks received,
   arrived/validated, and finalized.

Example
~~~~~~~

.. code-block:: console

   $concordium-client consensus status
   Best block:                  9cd0a5f1dc488b919847e4b3e98aeea567fe80fafd077bacc2901f145f973c6d
   Genesis block:               f97d975f0e92297c51e24c3b0d8fd39dfe8e1b148d993eba6e9389d4083f7a64
   Genesis time:                2022-11-11 12:00:00 UTC
   Epoch duration:              3m 45s
   Last finalized block:        8cbd88385864c629935a7d96bf2c031b92dd17fb37d342f245eb445cd9719753
   Best block height:           2270228
   Last finalized block height: 2270227
   Blocks received count:       395624
   Block last received time:    Thu, 29 Jun 2023 12:29:16 UTC
   Block receive latency:         162 ms (EMA),    49 ms (EMSD)
   Block receive period:         1082 ms (EMA),   834 ms (EMSD)
   Blocks verified count:       395624
   Block last arrived time:     Thu, 29 Jun 2023 12:29:16 UTC
   Block arrive latency:          167 ms (EMA),    49 ms (EMSD)
   Block arrive period:          1082 ms (EMA),   834 ms (EMSD)
   Transactions per block:         0.000 (EMA),    0.003 (EMSD)
   Finalization count:          372903
   Last finalized time:         Thu, 29 Jun 2023 12:29:15 UTC
   Finalization period:          1104 ms (EMA),  1038 ms (EMSD)
   Protocol version:            P6
   Genesis index:               2
   Current era genesis block:   a743879ed3dc9b628fbfe5b20f301e0df60ee539f094fdb796535c54591a3e93
   Current era genesis time:    2023-06-22 11:30:09 UTC
   Current timeout duration:    10s
   Current round:               418265
   Current epoch:               2704
   Trigger block time:          2023-06-29 12:30:09 UTC

EMA and EMSD refer to Exponential Moving Average and Exponential Moving
Standard Deviation, respectively.

ID layer
--------

.. code-block:: console

   $concordium-client identity show (identity-providers|anonymity-revokers) [--block BLOCK]

Display the list of identity providers or :term:`Privacy Guardians<Privacy Guardian (PG)>` at a given block,
defaulting to the best block.

.. _exchange-rates:

Exchange rates
==============

Conversion rates between NRG, CCD, and Euros can fluctuate between blocks. To get a best estimate of the current
exchange rates, query the chain parameters of the best block:

.. code-block:: console

   $concordium-client raw GetBlockChainParameters

You can also add a block hash at the end of the command to query a specific block.

The command returns the information about a the chain parameters in JSON format. The exchange rates are
found in the ``parameters`` section under ``euroPerEnergy`` and ``microGTUPerEuro``:

.. code-block:: console

    ...
    "parameters": {
        ...
        "euroPerEnergy": {
            "denominator": 1 000 000,
            "numerator": 1
        },
        ...
        "microGTUPerEuro": {
            "denominator": 1,
            "numerator": 100 000 000
        }

In this example, conversions between Euros, CCD and NRG are as follows:

- 1 EUR = 100 000 000 microCCD = 100 000 000 / 1 000 000 CCD = 100 CCD
- 1 NRG = 10 :sup:`-6` EUR
- 1 NRG = 10 :sup:`-4` CCD

Conversion changes happen through transactions that update the chain parameters.
If an update transaction has been posted it takes time to take effect. To see
any pending updates to the chain parameters in the best block, run the
following command:

.. code-block:: console

   $concordium-client raw GetBlockPendingUpdates

This prints a JSON list containing any such pending updates. As before you can
also pass a block hash to the command to query a specific block.

Validator queries
=================

Earliest time a validator may be expected to produce a block
------------------------------------------------------------

.. code-block:: console

    $concordium-client validator win-time 1
    Validator 1 is expected to produce a block no sooner than:
    Thu, 26 Oct 2023 07:01:26 UTC  (in 34s 699ms)

Get the projected earliest time at which a particular validator will be required to produce a block.

If the validator is not a validator for the current reward period, this returns a timestamp at the
start of the next reward period. If the validator is a validator for the current reward period, the
earliest win time is projected from the current round forward, assuming that each round after
the last finalized round will take the minimum block time. (If blocks take longer, or timeouts
occur, the actual time may be later, and the reported time in subsequent queries may reflect
this.) At the end of an epoch (or if the validator is not projected to produce a block before the end of the
epoch) the earliest win time for a (current) validator will be projected as the start of the next
epoch.

One can supply the ``--poll`` option in order to continuously receive updates of when
the supplied validator may be expected to produce a block.

This query is only supported from protocol version 6 and onwards.
