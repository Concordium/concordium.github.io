.. include:: ../../variables.rst
.. _transaction-fees:

================
Transaction Fees
================

Every transaction has a well-defined *fee*, and the fee of each transaction depends on the transaction type. When the transaction is submitted to the chain, the fee is deducted from the sender's account and paid to the Concordium network as a fee for carrying out the transaction. The fee is measured in the unit NRG which corresponds to CCD according to a variable conversion factor (currently 1 NRG = 0.0001 CCD). The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. Read more about conversions between CCD, NRG, and Euros in :ref:`exchange-rates`.

The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees.

You can see the fee in the transaction log.
