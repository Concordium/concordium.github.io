.. _shield-unshield-mw:

=================================
Move GTU between the two balances
=================================

.. contents::
   :local:
   :backlinks: none

Accounts on the Concordium blockchain have two balances, the **Balance** and the **Shielded balance**. You can move funds between these
two balances using either a shield GTU transaction or an unshield GTU transaction.

.. Note::
   The amount contained in the Balance is publicly visible, while the amount on the Shielded balance is encrypted and is only visible for
   the account holder. Moving funds between the balances is also publicly visible, including the amount. Only shielded transfers between
   two different accounts have their amounts encrypted.

Move GTU to the shielded balance
================================

#. Go to the **Accounts** page.

#. Select the account you want to transfer GTU from, and press the **Balance** area of the account card.

#. Press **SHIELD**.

#. Enter the amount you want to move to the shielded balance.

#. Press **Shield amount**.

#. Confirm your choices and press **Shield amount**.

#. Your shielding transaction has now been submitted to the blockchain. Finally, press **Ok, thanks**.

The transaction might take a little while to finalise on the blockchain, and you can follow the status in the transaction log.
Once it has finalized, you can browse to your shielded balance to see the newly shielded amount.

Move GTU to the regular balance
===============================

#. Go to the **Accounts** page.

#. Select the account you want to transfer GTU from, and press the **Shielded balance** area of the account card.

#. Press **UNSHIELD**.

#. Enter the amount you want to move to the regular balance.

#. Press **Unshield amount**.

#. Confirm your choices and press **Unshield amount**.

#. Your shielding transaction has now been submitted to the blockchain. Finally, press **Ok, thanks**.

The transaction might take a little while to finalise on the blockchain, and you can follow the status in the transaction log.
Once it has finalized, you can browse to your shielded balance to see the newly shielded amount.

.. Note::
   All transactions cost a fee, including shielding and unshielding transactions. The fee will always be deducted from the regular
   balance, and you can see the fee in the transaction log.
