.. _shield-unshield-mw:

=================================
Move CCD between the two balances
=================================

.. contents::
   :local:
   :backlinks: none

Accounts on the Concordium blockchain have two balances, the **Balance** and the **Shielded balance**. You can move funds between these
two balances using either a shield CCD transaction or an unshield CCD transaction.

.. Warning::
   Do not shield all of your funds or you will not have enough funds to cover transaction fees for unshielding or sending them.

.. Note::
   The amount contained in the Balance is publicly visible, while the amount on the Shielded balance is encrypted and is only visible for
   the account holder. Moving funds between the balances is also publicly visible, including the amount. Only shielded transfers between
   two different accounts have their amounts encrypted.

Move CCD to the shielded balance
================================

#. Go to the **Accounts** page.

#. Tap the account you want to transfer CCD from, and tap the **Balance** area of the account card.

#. Tap **SHIELD**.

#. Enter the amount you want to move to the shielded balance.

#. Tap **Shield amount**.

#. Confirm your choices and Tap **Shield amount**.

#. Your shielding transaction has now been submitted to the blockchain. Finally, tap **Ok, thanks**.

The transaction might take a little while to finalize on the blockchain, and you can follow the status in the transaction log.
Once it has been finalized, you can browse to your shielded balance to see the newly shielded amount.

Move CCD to the regular balance
===============================

#. Go to the **Accounts** page.

#. Tap the account you want to transfer CCD from, and tap the **Shielded balance** area of the account card.

#. Tap **UNSHIELD**.

#. Enter the amount you want to move to the regular balance.

#. Tap **Unshield amount**.

#. Confirm your choices and tap **Unshield amount**.

#. Your shielding transaction has now been submitted to the blockchain. Finally, tap **Ok, thanks**.

The transaction might take a little while to finalize on the blockchain, and you can follow the status in the transaction log.
Once it has been finalized, you can browse to your shielded balance to see the newly shielded amount.

.. Note::

   All transfers and transactions cost a fee, including shielding and unshielding transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees.
   You can see the fee in the transaction log.
