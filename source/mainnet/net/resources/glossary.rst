.. _whitepaper: https://assets-global.website-files.com/6172c154c6a83e2a4713d1af/61cc25e0b3273f28f6a75dba_Concordium-White-Paper-June2021.pdf
.. _ElGamal: https://en.wikipedia.org/wiki/ElGamal_encryption
.. _ciphertexts: https://en.wikipedia.org/wiki/Ciphertext

.. _glossary:

============================
Glossary of Concordium Terms
============================

See also our `whitepaper`_ for more details on the terms described
below.

.. _glossary-account:

Account
=======

An addressable store of funds on the blockchain. An account is associated with
one or more *account keys* that can be used to authorize transactions
originating from the account, as well as with an :ref:`encryption key<glossary-encryption-key>` that can be
used to send shielded transfers to the account. An account is also associated
with the account holder's :ref:`identity<glossary-identity>`, although this association is encrypted
for anonymity. This anonymity can only be revoked by :ref:`anonymity revokers<glossary-anonymity-revoker>`, in
cooperation with the account's :ref:`identity provider<glossary-identity-provider>`.

.. _glossary-alias:

Alias
=====

A kind of sub-account structure that can be created. An account owner can create different aliases for different uses to keep track of transfers and assign them meaning. Each account has 16777216 addresses, namely a so-called canonical account address together with matching account aliases. The canonical account address is derived when an account is created on chain. The other 16 million addresses with matching initial 29 bytes are referred to as account aliases for the same account. Thus, accounts can be referred to by any address whose initial 29 bytes match.

.. _glossary-anonymity-revoker:

Anonymity revoker
=================

An authority who has power to know the identity of a participant. The anonymity revokers and :ref:`identity provider<glossary-identity-provider>` can work together to determine the owner of an account and determine which accounts belong to the same owner. (They should only do so when legally obliged to, such as by a court order.) Anonymity revocation is a two-stage process, requiring cooperation of multiple parties.

.. _glossary-attribute:

Attributes
==========

User data, such as date of birth or country of residence, that is associated
with a user :ref:`identity<glossary-identity>`. Users can choose which attributes should be revealed in
each of their accounts.

.. _glossary-baker:

Baker
=====

A node that participates in the production of :ref:`blocks<glossary-block>`, referred to as
*baking*.

.. _glossary-baker-pool:

Baker pool
==========

A baker and delegators that collectively pool their stake to participate in the consensus protocol and earn rewards. The baker runs a baker node on behalf of the baker pool to bake (and possibly finalize) blocks using the collective stake of the pool to determine its lottery power. Rewards are accrued to the pool each time the baker produces a block. Each pay day, the accrued rewards are distributed to the pool's participants in proportion to their relative stakes in the pool, with the baker (the pool owner) receiving an additional commission from the delegators' rewards.

.. _glossary-best-block:

Best block
==========

Last block on the :ref:`best chain<glossary-best-chain>`.

.. _glossary-best-chain:

Best chain
==========

The chain a :ref:`baker<glossary-baker>` will build upon when making a new block. The best chain
selection procedure is determined by the consensus protocol. In particular, the
best chain has the most :ref:`finalized<glossary-finalization>` blocks, and the most blocks after the last
finalized block.

.. _glossary-block:

Block
=====

The basic unit of the blockchain, which is produced by a :ref:`baker<glossary-baker>`. A block
contains a (possibly empty) list of :ref:`transaction<glossary-transaction>`, and has a pointer to a
previous block (with the exception of the :ref:`genesis block<glossary-genesis-block>`). A block and its
predecessors form a chain, and the sequence of transactions they contain form a
ledger. Each block has a :ref:`slot time<glossary-slot>` that records when it was baked. A block
also contains information relating to consensus, for instance establishing which
baker created the block, and that the baker was entitled to do so.

.. _glossary-branch:

Branch
======

A chain of blocks that has split from the main chain. All branches have the potential to become
the main chain. The Chain selection rule determines which branch is the best chain.

.. _glossary-catch-up:

Catch-up
========

The mechanism by which a node receive messages that may have been missed, for
instance because the node was offline when it was sent.

.. _glossary-ccd:

CCD
===

CCD is the currency of the Concordium blockchain. CCD can be used for multiple
purposes:

-  as a form of payment between users via transactions,
-  as a payment for executing smart contracts,
-  as a store of value,
-  as a reward for honest behaviour (e.g. :ref:`baking<glossary-baker>` or :ref:`finalizing<glossary-finalization>`
   blocks on top of the longest chain), to incentivize blockchain users.

The smallest subdivision of CCD is the µCCD (micro CCD), with 1 CCD = 1,000,000
µCCD. This means that CCD amounts are given with up to six decimal places of
precision.

.. _glossary-ccdscan:

CCDScan
=======

CCDScan effectively serves as a search engine for data on the Concordium blockchain and enables users to search for, explore, and analyze relevant on-chain data. Often used to research bakers and pools before deciding to delegate funds to a particular pool.

.. _glossary-chain:

Chain
=====

A sequence of :ref:`blocks<glossary-block>`, starting from the :ref:`genesis block<glossary-genesis-block>`, in which each
successive block points to the predecessor. There may be multiple valid chains,
and the :ref:`consensus<glossary-consensus>` protocol establishes which chain is authoritative.

.. _glossary-chain-selection-rule:

Chain selection rule
====================

A rule that selects the best chain based on the following criteria:

- chain with the most finalized blocks
- longest chain
- which last block has the earliest slot in the chains
- which last block has the largest block luck in the chains
- which last block has the largest hash in the chains.

.. _glossary-concordium-client:

Concordium client
=================

A command-line tool that ships with the Concordium distribution.
It is designed as a low-level interface to the Concordium blockchain. It cannot be used to create identities, but it can :ref:`import accounts<concordium-client-import-accounts-keys>` exported from the mobile wallets. Once an account has been imported, Concordium client can be used to do CCD transfers from the account and other :ref:`transaction<transactions>` types supported by the Concordium blockchain.

.. _glossary-consensus:

Consensus
=========

The process by which nodes agree which :ref:`transaction<glossary-transaction>` have occurred and in what
order. This consists of :ref:`baking<glossary-baker>` and :ref:`finalization<glossary-finalization>`.

.. _glossary-cool-down-period:

Cool-down period
================

A period of time during which a transaction is frozen. Examples of when cool-down periods apply include removing a baker and updating stake. The length of a cool-down period varies between transactions.

.. _glossary-credential:

Credential
==========

A certificate derived from the :ref:`glossary-identity-object` that proves that
the owner has been verified by an identity provider. The key feature of the
credential is that it **does not** identify the owner to the identity provider,
nor to any other single entity, however it contains enough information to allow
anonymity revokers in concert with the identity provider to find the owner.

.. _glossary-credential-holder:

Credential holder
=================

The user holding a credential. An account is owned by one or more credential holders.

.. _glossary-cryptographic-proof:

Cryptographic proof
===================

A method by which one party (the prover) can prove to another party (the verifier) that a given statement is true while the prover avoids conveying any additional information apart from the fact that the statement is indeed true. This is known as a zero-knowledge proof.

.. _glossary-decryption-key:

Decryption key
==============

Dual to :ref:`encryption key<glossary-encryption-key>`. In contrast to the encryption key, which is public,
this key is only known to the account holder.

.. _glossary-delegate:

Delegator
==========

An account that contributes stake to a baker pool, or to passive delegation.
When an account becomes a delegator, the delegated amount of CCD is locked so that it cannot be spent or transferred while it is delegated.
Delegators earn rewards, minus a commission to the baker, in proportion to their delegated stake.

.. _glossary-encryption-key:

Encryption key
==============

An `ElGamal`_ public key associated to an account which is used to encrypt all
:ref:`shielded amounts<glossary-shielded-amount>` on the account.

.. _glossary-epoch:

Epoch
=====

A time period consisting of multiple :ref:`slots<glossary-slot>`. An epoch is one hour on testnet and mainnet. At the start of each epoch, a :ref:`leadership election nonce<glossary-leader-election>` is computed based on the block nonces of the previous epoch.
The leadership election nonce is valid for the duration of the epoch.

.. _glossary-finalization:

Finalization
============

The process by which a block is marked to be "finalized", i.e. part of the
authoritative :ref:`chain<glossary-chain>`. Transactions that are part of finalized blocks are considered authoritative. New blocks can be only added following the last finalized block. The finalization process is conducted periodically by the bakers with :ref:`staked amount<glossary-staked-amount>` at least 0.1% of the total amount of existing CCD.

.. _glossary-genesis-block:

Genesis Block
=============

The first :ref:`block<glossary-block>` in a :ref:`chain<glossary-chain>`. The genesis block establishes the starting state of the chain, before any transactions have occurred.

.. _glossary-identity:

Identity
========

Before opening an account on the Concordium Platform, one's real-world identity
must be verified and recorded by an :ref:`identity provider<glossary-identity-provider>`. A user’s identity is
anonymous on-chain, however this anonymity can be revoked and their real-world
identity revealed in response to a valid request from a government authority.

.. _glossary-identity-issuer:

Identity Issuer
===============

See :ref:`identity provider<glossary-identity-provider>`.

.. _glossary-identity-object:

Identity Object
===============

An object issued by the :ref:`glossary-identity-provider` to the user which
allows the user to prove to third parties that their real life identity has been
verified by a trusted third party.

.. _glossary-identity-provider:

Identity Provider
=================

A person or organization that performs off-chain identification of users. Users
are required to obtain an identity object from an identity provider in order to
open an account on the Concordium Platform.


.. _glossary-initial-account:

Initial Account
===============

An intial account is an account submitted to the chain by the identity provider
during the process of requesting a new identity. The initial account can
perform all of the same actions as a regular account, however the real-life
identity of the initial-account owner is known by the identity provider
who submitted it to the chain. In contrast, the real-life identity of the
owner of a regular account can only be ascertained by anonymity revokers working
in concert with the identity provider.

Initial accounts are only relevant for Desktop Wallet and |mw-gen2|.

.. _glossary-leader-election:

Leader Election
===============

To check whether a given :ref:`baker<glossary-baker>` has won in a given :ref:`slot<glossary-slot>`, the baker uses the
slot number and the *leadership election nonce* to compute a value *r*. The
leadership election nonce is a random value that is periodically updated to
prevent parties from predicting too far into the future when they will win. A
baker wins if the value *r* is below a certain threshold, which depends on the
baker’s :ref:`lottery power<glossary-lottery-power>` and a common difficulty parameter *f*. The :ref:`winning
probability<glossary-winning-probability>` is roughly proportional to the baker's stake, and higher
difficulty parameters decrease the winning probability for all parties.

.. _glossary-lottery-power:

Lottery Power
=============

A baker's lottery power is its relative stake and is therefore proportional to
the :ref:`staked amount<glossary-staked-amount>` of that baker. The lottery power is updated each
:ref:`epoch<glossary-epoch>`, and is based on the stake distribution at the end of the epoch before
last. (This delay ensures that the stake distribution is determined before the
randomness that fixes the bakers for the epoch: otherwise, stakeholders might
redistribute their stake to luckier bakers, which undermines the security of the
system.) :ref:`Delegation<glossary-delegate>` affects the lottery power of the baker by increasing their stake, thus increasing the odds of that baker being chosen to bake a block.

.. _glossary-mainnet:

Mainnet
=======

The main Concordium network which is expected to launch in early 2021. The
mainnet will receive periodic upgrades, but in contrast to the :ref:`testnet<glossary-testnet>`, it
will never be reset, and accounts created on the mainnet will remain
indefinitely.

.. _glossary-node:

Node
====

A participant in the Concordium network. Nodes receive blocks and transactions,
and track the current state of the blockchain. A :ref:`baker node<glossary-baker>` has cryptographic
keys that enable it to take part in baking and :ref:`finalization<glossary-finalization>`. A node without
these keys is referred to as a *passive node*.

.. _glossary-nonce:

Nonce
=====

May refer to:

-  *Block Nonce*: a randomized value included by the :ref:`baker<glossary-baker>` in each
   :ref:`block<glossary-block>`, and used to determine the leadership election nonce.
-  *Leadership Election Nonce*: a randomized value that is updated each
   :ref:`epoch<glossary-epoch>` that is used to seed the :ref:`leader election<glossary-leader-election>` process.
-  :ref:`Transaction sequence number<glossary-transaction-sequence-number>` (same as account sequence number)

.. _glossary-off-chain:

Off-chain
=========

Refers to activities outside of the Concordium blockchain. Some on-chain actions
need preliminary actions off-chain, for example to create an account on the
Concordium blockchain the user must first work with an identity provider, e.g.,
via their website or mobile application, to obtain a specific digital
certificate. We refer to this certificate as the **identity**.

.. _glossary-on-chain:

On-chain
========

Refers to an an event or activity that is propagated through the Concordium
network and recorded on the Concordium blockchain. The recording can be explicit
or implicit as part of the consensus protocol. An example of the former is a
transaction such as a CCD transfer, an example of the latter are the rewards
given out to, e.g., bakers.

.. _glossary-pay-day:

Pay day
=======

A pay day is the point at which new CCDs are minted and rewards to bakers and delegators are distributed. The stakes of bakers and delegators are updated each pay day (but the changes for each pay day are fixed one epoch before). Pay day is thus when updates to delegation and baking take effect, such as increasing stake, restaking preferences, adding delegation. In the case of decreasing stake or removing delegation or baking, there is a longer cool-down period, after which the change is executed at the **next pay day after the cool-down period ends**. The cool-down period is 2 weeks for delegators and 3 weeks for bakers. Pay day is every 24 hours at 08:00 UTC on Mainnet.

.. _glossary-passive-delegation:

Passive delegation
==================

A form of delegation where a delegator's stake is effectively distributed among all baker pools. It is not associated with a specific baker. Delegators earn lower rewards when delegating to passive delegation than when delegating to a specific baker pool. However, passive delegation is not affected by poor performance of a single baker.

.. _glossary-shielded-amount:

Shielded amount
================

An amount of :ref:`CCD<glossary-CCD>` that is encrypted with the public key of an account. Only
the owner of the secret key can determine how many CCDs are contained in the
encryption.

.. _glossary-shielded-balance:

Shielded balance
================

The part of the balance of an :ref:`account<glossary-account>` that only the owner of the account can
see. This is achieved by encrypting transfers to an account with the account's
:ref:`encryption key<glossary-encryption-key>`. Every participant of the Concordium network can see the
`ciphertexts`_ of all the transfers, however they provide no information on how
many CCDs were transferred. The receiver of the transfer can use their secret
key to decrypt the ciphertexts, and seeing how many CCDs they have received.

For technical reasons the shielded balance of the account consists of two parts,
the "self balance" and the "incoming shielded amounts".

.. _glossary-self-balance:

Self balance
^^^^^^^^^^^^

This is a single shielded amount that is updated each time the account performs
a shielded transfer, :ref:`shielding<glossary-shielding>`, or :ref:`unshielding<glossary-unshielding>`. Only the account itself
can update this value.

.. _glossary-incoming-shielded-amount:

Incoming shielded amount
^^^^^^^^^^^^^^^^^^^^^^^^^

This is a list of shielded amounts that is extended each time an account
receives an shielded transfer. When the account makes a shielded transfer it
can use a number of shielded amounts from this list as inputs to the transfer.

.. _glossary-shielded-transfer:

Shielded transfer
=================

Transfer from :ref:`shielded balance<glossary-shielded-balance>` of an account
to a :ref:`shielded balance<glossary-shielded-balance>` of another account.
The amount that is transferred is only visible to the sender and the receiver.

.. _glossary-shielding:

Shielding
=========

The action of transferring a part of the public balance to the :ref:`shielded balance<glossary-shielded-balance>`.

.. _glossary-slot:

Slot
====

In the blockchain, time is divided into equally sized units called *slots*. On
the testnet the duration of slot is one second. In every slot, each baker checks
locally whether they won the lottery, which entitles the winner to bake a block
in that slot. Zero, one, or multiple bakers can win the lottery. The probability
of these different events is controlled by the difficulty parameter *f*. For
example, with difficulty 0.5 on average every second slot will have a lottery
winner.

.. _glossary-staked-amount:

Staked Amount
=============

:ref:`Bakers<glossary-baker>` can have part of the balance of their account staked. The amount that is
staked remains locked while staked and cannot be transferred or moved in any
way. The staked amount is proportional to the :ref:`lottery power<glossary-lottery-power>` of a baker.

:ref:`Delegators<glossary-delegate>` can delegate stake to a baker pool or passive delegation. This affects the staked amount of the baker and thus their lottery power.

.. _glossary-testnet:

Testnet
=======

A test network run by Concordium to test its protocols and software. There can
be several test networks in existence at the same time. All the features are
tested on the testnet before they are released on the :ref:`mainnet<glossary-mainnet>`.

.. _glossary-transaction:

Transaction
===========

An atomic operation that defines a change of state in the ledger, such as
transferring funds from one account to another. A transaction typically has a
sender account and a :ref:`transaction sequence number<glossary-transaction-sequence-number>`, and incurs a fee. The
sender account must sign the transaction to authorize it. (The exception to this
is a credential deployment transaction that creates a new account, which does
not have a sender account.)

.. _glossary-transfer-memo:

Transfer Memo
=============

Additional data that a user can provide when making a transfer, a shielded transfer or a transfer with schedule.
The data will appear on chain as a bytestring. It is expected to be CBOR encoded and can therefore represent strings,
numbers and JSON values, but this is not enforced.

.. _glossary-transfer-with-schedule:

Transfer with schedule
======================

A special kind of transfer of CCD that makes the CCD amount available to the
receiver only in a limited way until a specified point in time. The point in
time is specified as part of a transfer. The CCD are immediately owned by the
receiver account, and the transfer cannot be revoked, but the receiver cannot
spend the CCD until the specified time.

.. _glossary-transaction-sequence-number:

Transaction Sequence Number
===========================

A sequence number that orders :ref:`transaction<glossary-transaction>` on a given :ref:`account<glossary-account>`. In a
ledger, all transactions for an account must be ordered with consecutive
transaction sequence numbers, starting from 1. Transaction sequence numbers
ensure that a transaction cannot be repeated in the ledger, and that the
transactions occur in the order intended by the sender account holder.

.. _glossary-unshielding:

Unshielding
===========

The action of transferring a part of the :ref:`shielded balance<glossary-shielded-balance>` to the public
balance.

.. _glossary-user-identity-certificate:

User identity certificate
=========================

Issued to the individual or entity once their real-world identity has been verified and recorded by an Identity Provider. You cannot use the Concordium Platform without a User Identity Certificate.
The user identity certificate includes attributes such as name, age, and nationality. When the Identity Provider has validated the attributes, it issues a user identity certificate, which is basically the Identity Provider’s signature over some cryptographic keys of the user and the validated personal attributes. Unlike usual public key certificates such as X.509 certificates, the user identity certificate is private to the user; it is not submitted to the chain. Note that the Identity Provider also stores some information, but this is only used for a possible, subsequent investigation of the user’s activities (i.e. anonymity revocation). The Identity Provider is not involved in any subsequent use of the user identity certificate. The user identity certificate is signed using the Pointcheval-Sanders signature scheme.

.. _glossary-wallet:

Wallet
======

A wallet is an app that allows cryptocurrency users to store and retrieve their digital assets, and manage identities and accounts. Concordium has two wallet types.

The Desktop Wallet
^^^^^^^^^^^^^^^^^^

The Desktop Wallet is a digital wallet that enables you to create and manage your Concordium identities, credentials, and accounts from your desktop and to create transactions such as sending CCD, adding a baker, and exporting and importing account information.

The Mobile Wallet
^^^^^^^^^^^^^^^^^

The Mobile Wallet is a digital smartphone wallet that enables you to create and manage your Concordium identities and accounts, to create simple and shielded transactions, and to export and import your accounts and identities.

.. _glossary-winning-probability:

Winning probability
===================

The winning probability is the probability that a baker wins in a given slot.
The probability is :math:`1-(1-f)^α`, where :math:`f` is the difficulty parameter and :math:`α` is
the :ref:`lottery power<glossary-lottery-power>`.
