.. include:: ../../variables.rst
.. _transaction-fees:

================
Transaction fees
================

Blockchain users pay a **transaction fee** (also referred to as a payment of :term:`gas`) for each transaction they make. The fee is paid in CCD, and for that purpose, users will need to acquire and hold CCD. Transaction costs are designed to be stable in EUR terms, thereby enabling businesses and other users to predict and plan with fixed predictable EUR costs.

Stable transaction costs
========================

Concordium combines the freely fluctuating value of the CCD with a transaction cost that remains stable versus EUR. This is achieved by fixing the price of a transaction in EUR, then multiplying this by the current CCD/EUR price. So if the value of the CCD goes up, a user needs fewer CCD to pay for transactions, thereby maintaining a stable cost in EUR terms. The technical implementation of the above principle is described in the following.

.. _computing-transaction-costs:

Computing transaction costs
===========================

ENERGY (NRG for short) is the internal unit of measurement for transaction costs. The transaction cost can be broken down into the header cost, which depends on the size of the transaction and number of signatures involved, and the payload cost, which depends on the type of transaction and the resource cost of executing it. Details of how transaction energy costs are calculated are given in :ref:`transaction-costs-details` below.

The calculated ENERGY is converted into a CCD cost by applying a fixed EUR/ENERGY conversion rate and a variable CCD/EUR exchange rate which is adjusted dynamically to ensure that the cost remains stable when measured in EUR. Thus, the GAS payment in CCD terms is calculated by applying the following calculation:

GAS (CCD) = ENERGY  x  (EUR/ENERGY conversion)  x  (CCD/EUR exchange rate)

The CCD/EUR conversion rate required to perform the conversion is supplied using an Oracle that aggregates data from different sources and takes the median of the obtained values. This ensures that if one of the sources provides incorrect data significantly deviating from the other sources, the conversion rate is not affected. Currently, we are using data from `CoinMarketCap <https://coinmarketcap.com/>`_, `CoinGecko <https://www.coingecko.com/>`_, and `Live Coin Watch <https://www.livecoinwatch.com/>`_.

Governance
==========

The idea of our transaction cost system is that costs are stable in EUR. However, the EUR to ENERGY conversion rate may be changed by the Governance Committee in response to significant changes in market conditions or changes in the costs related to processing transactions. Any changes to the EUR cost of transactions will be announced to users and the public with a notice period of no less than 1 month, unless exceptional circumstances occur, thereby enabling users to make necessary adjustments to their use of the blockchain.

.. _transaction-costs-details:

Transaction costs details
=========================

The transaction energy cost is calculated as::

    (energy cost) = (header cost) + (payload cost)

The (header cost) depends on the number of signatures on the transaction (this is typically 1, except in the case of multi-sig accounts) and the size of the transaction::

    (header cost) = 100 x (number of signatures) + 60 + (payload size in bytes)

The constant 60 here is the size in bytes of the transaction header, which is fixed.

The following table shows the details for different payload types. The total cost assumes 1 signature; to account for more, add 100 for each additional signature. All multiplications should be rounded down.

+------------------------+-----------------------+-----------------------+-----------------------+
| Transaction type       | Payload size          | Payload cost          | Total cost (Energy)   |
|                        | (bytes)               | (Energy)              |                       |
+========================+=======================+=======================+=======================+
| Transfer               | 41                    | 300                   | 501                   |
+------------------------+-----------------------+-----------------------+-----------------------+
| Transfer with memo     | 43 + (memo length)    | 300                   | 503 + (memo length)   |
+------------------------+-----------------------+-----------------------+-----------------------+
| Unshield balance       | variable              | 14850                 | 15010 + (payload      |
| (transfer to public)   |                       |                       | size)                 |
+------------------------+-----------------------+-----------------------+-----------------------+
| Transfer with          | 34 + 16 x (number     | 364 x (number         | 194 + 380 x (number   |
| schedule               | of releases)          | of releases)          | of releases)          |
+------------------------+-----------------------+-----------------------+-----------------------+
| Transfer with          | 36 + 16 x (number     | 364 x (number         | 196 + 380 x (number   |
| schedule and memo      | of releases)          | of releases)          | of releases) + (memo  |
|                        |                       |                       | length)               |
+------------------------+-----------------------+-----------------------+-----------------------+
| Register data          | 3 + (data length)     | 300                   | 463 + (data length)   |
+------------------------+-----------------------+-----------------------+-----------------------+
| Deploy module          | 9 + (module size in   | 0.1 x (module         | 169 + 1.1 x (module   |
|                        | bytes)                | size in bytes)        | size in bytes)        |
+------------------------+-----------------------+-----------------------+-----------------------+
| Initialize smart       | 45 + (init name       | 500 + 0.002 x         | 705 + (init name      |
| contract (successful)  | length) + (parameter  | (module size in       | length) + (parameter  |
|                        | length)               | bytes) + 0.001 x      | length) + 0.002 x     |
|                        |                       | (interpreter          | (module size in       |
|                        |                       | energy used) +        | bytes) + 0.001 x      |
|                        |                       | (state size in        | (interpreter energy   |
|                        |                       | bytes)                | used) + (state size   |
|                        |                       |                       | in bytes)             |
+------------------------+-----------------------+-----------------------+-----------------------+
| Update smart           | 29 + (receive name    | variable              | variable              |
| contract (successful)  | length) + (parameter  |                       |                       |
|                        | length)               |                       |                       |
+------------------------+-----------------------+-----------------------+-----------------------+
| Configure validator    | 380 + (metadata       | 4050                  | 4590 + (metadata URL  |
| (all fields)           | URL length)           |                       | length)               |
+------------------------+-----------------------+-----------------------+-----------------------+
| Configure validator    | 379 + (metadata       | 4050                  | 4589 + (metadata URL  |
| (add)                  | URL length)           |                       | length)               |
+------------------------+-----------------------+-----------------------+-----------------------+
| Configure validator    | 11                    | 300                   | 471                   |
| (stake only)           |                       |                       |                       |
+------------------------+-----------------------+-----------------------+-----------------------+
| Configure              | 13                    | 300                   | 473                   |
| delegation (all fields |                       |                       |                       |
| - passive              |                       |                       |                       |
| delegation)            |                       |                       |                       |
+------------------------+-----------------------+-----------------------+-----------------------+
| Configure              | 21                    | 300                   | 481                   |
| delegation             |                       |                       |                       |
| (all fields, validator |                       |                       |                       |
| pool)                  |                       |                       |                       |
+------------------------+-----------------------+-----------------------+-----------------------+
| Update credential      | 51 + 34 x (new        | 500 x (number         | 211 + 500 x (number   |
| keys                   | number of keys)       | of credentials) +     | of credentials) + 134 |
|                        |                       | 100 x (new            | x (new number of      |
|                        |                       | number of keys)       | keys)                 |
+------------------------+-----------------------+-----------------------+-----------------------+
| Update credentials     | variable              | 500 + 500 x           | variable              |
|                        |                       | (number of            |                       |
|                        |                       | existing              |                       |
|                        |                       | credentials) +        |                       |
|                        |                       | [for each new         |                       |
|                        |                       | credential:           |                       |
|                        |                       | 54000 + 100 x         |                       |
|                        |                       | number of keys]       |                       |
+------------------------+-----------------------+-----------------------+-----------------------+

The payload cost for an update smart contract transaction is complex. The cost includes loading contract modules, loading the contract state, storing any updated state, and the interpreter energy cost. As smart contracts may invoke other smart contracts, there are costs for each of these similar to if they were invoked directly by a transaction. Furthermore, invoking host functions may also come with specific costs.


