.. include:: ../../variables.rst
.. _time-concepts:

=============
Time concepts
=============

Concordium's consensus mechanism relies on organizing time into distinct periods that coordinate network operations and validator activities. The following sections explain the key time-based concepts.

Epochs
======

Epochs form the basic time unit for coordinating validator activity. An epoch defines a period in which the validator set and stakes remain fixed. Epochs have a duration of 1 hour and the duration is fixed at the :term:`genesis block<genesis block>`. Each epoch has a nominal ending, and when a block is finalized after this nominal ending, epoch transition occurs.

Rounds
======

Epochs are subdivided into rounds. In each round either a block is produced by the elected leader and validated by (2/3 of) the other validators, or a timeout is produced if the timeout time is reached before a block and its quorum certificate are produced. In the case of a timeout, a timeout certificate
is produced for the block. The timeout time for the next round may shrink or grow depending on whether a block was finalized or a timeout occurred in the
previous round. Using consensus protocol, a validator has to add the new block after the block from the previous round, unless a timeout occurred in the
previous round, in which case they can add their block to an older round. The list of lottery winners that are elected to be the leader for every round in
that epoch is established at the beginning of the epoch.


Pay day
=======

A pay day is the point at which new CCDs are minted and rewards are distributed to validators and delegators. The stakes of validators and delegators are
updated each pay day (but the changes for each pay day are fixed one epoch before). Pay day is thus when new validators begin producing blocks, and
updates to delegation and validation take effect. Pay day is every 24 hours (i.e., 24 epochs) at approximately 09:00 UTC on Mainnet and approximately 12:00 UTC on Testnet.

Cool-down period
================

In the case of decreasing stake or removing delegation or validation there is a cool-down period of three weeks during which the unstaked funds are
frozen. For example, if you decrease a validator’s stake, the stake will be decreased at the first pay day but the funds will not be released to your
disposable balance until after the cool-down period ends.
