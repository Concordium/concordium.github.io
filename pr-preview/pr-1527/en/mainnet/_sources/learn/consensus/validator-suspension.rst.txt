.. include:: ../../variables.rst
.. _validator-suspension:

====================
Validator suspension
====================

A validator may be suspended if it remains inactive and fails to produce blocks when selected as a round leader. This mechanism, introduced in Protocol 8, helps maintain the blockchain’s performance and reliability by excluding inactive validators.

A validator faces suspension if it reaches a threshold of missed rounds. The size of a validator’s stake affects how long the validator’s node has to be inactive before reaching the threshold:

* High-stake validators may reach the suspension threshold within hours due to their frequent selection as round leaders.
* Low-stake validators may take several days to reach the threshold due to fewer opportunities to produce blocks.

When a validator misses multiple blocks in succession and reaches the inactivity threshold by a payday, it becomes *primed for suspension*. The validator then has until the next snapshot epoch to demonstrate activity by either:

* Producing a block
* Having their signature included in a :term:`Quorum Certificate<Quorum certificate>`

If the validator remains inactive through the snapshot epoch, the suspension takes effect at the following payday epoch.

.. note::

   A high-stake validator could face suspension after approximately 23 hours of inactivity, while low-stake validators typically require a longer period of inactivity before reaching the threshold.


A suspended validator:

* Can resume validation through a manual transaction
* Incurs no specific penalties beyond the suspension period
* Maintains its delegators unless the delegators choose to update their delegation

.. note::

   The protocol includes safeguards to prevent more than one-third of the total stake from being suspended simultaneously as this would halt the blockchain. This suspension mechanism protects against accidental or careless inactivity but does not protect against malicious behavior.



