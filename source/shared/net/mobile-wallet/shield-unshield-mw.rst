.. _shield-unshield-mw:

=======================
Shield and unshield CCD
=======================

.. contents::
   :local:
   :backlinks: none

Accounts on the Concordium blockchain have two balances, the **Balance** and the :ref:`shielded balance <glossary-shielded-balance>`. You can move funds between these
two balances using either a :ref:`shield CCD transaction<glossary-shielding>` or an :ref:`unshield CCD transaction<glossary-unshielding>`.

.. Warning::
   Do not shield all of your funds or you will not have enough funds to cover transaction fees for unshielding or sending them.

.. Note::
   The amount contained in the Balance is publicly visible, while the amount on the Shielded balance is encrypted and is only visible for
   the account holder. Moving funds between the balances is also publicly visible, including the amount. Only shielded transfers between
   two different accounts have their amounts encrypted.

Move CCD to the shielded balance
================================

#. Go to the **Accounts** page.

#. Tap the **Balance** area of the account you want to transfer CCD from or tap |moredetails|.

   - If the **Shield** button and **Shielded balanace** tab are not visible, tap the |hamburger| menu in the upper right corner. Tap **Show shielded balance on account name**.

#. Now the totals area contains tabs for both **Balance** and **Shielded Balance** and a **Shield** button.

      .. image:: ../images/mobile-wallet/MW32.png
         :width: 25%

#. Tap **Shield**.

#. Enter the amount you want to move to the shielded balance.

      .. image:: ../images/mobile-wallet/MW33.png
         :width: 25%

#. Confirm your choices and tap **Shield amount**.

      .. image:: ../images/mobile-wallet/MW35.png
         :width: 25%

#. Your shielding transaction has now been submitted to the blockchain. Tap **Finish**.

      .. image:: ../images/mobile-wallet/MW76.png
         :width: 25%

The transaction might take a little while to finalize on the blockchain, and you can follow the status in the transaction log.
Once it has been finalized, you can browse to your shielded balance to see the newly shielded amount.

Move CCD to the regular balance
===============================

#. Go to the **Accounts** page.

#. Tap the account you want to unshield CCD on or tap |moredetails| on the account card.

#. If the Shielded balance is already shown, press the Shielded balance tab.

   - If the **Shield** button and **Shielded balanace** tab are not visible, tap the |hamburger| menu in the upper right corner. Tap **Show shielded balance on account name**.

#. Now the totals area contains tabs for both **Balance** and **Shielded Balance** and an **Unhield** button.

#. Tap **UNSHIELD**.

   .. image:: ../images/mobile-wallet/MW47.png
      :width: 25%

#. Enter the amount you want to move to the regular balance.

   .. image:: ../images/mobile-wallet/MW48.png
      :width: 25%

#. Tap **Unshield amount**.

   .. image:: ../images/mobile-wallet/MW49.png
      :width: 25%

#. Confirm your choices and tap **Unshield amount**.

   .. image:: ../images/mobile-wallet/MW50.png
      :width: 25%

#. Your shielding transaction has now been submitted to the blockchain. Tap **Finish**.

   .. image:: ../images/mobile-wallet/MW51.png
      :width: 25%

The transaction might take a little while to finalize on the blockchain, and you can follow the status in the transaction log.
Once it has been finalized, you can browse to your shielded balance to see the newly shielded amount.

.. Note::

   All transfers and transactions cost a fee, including shielding and unshielding transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees.
   You can see the fee in the transaction log.

.. Note::

   You can hide the shielded balance when finished to prevent accidental shielding. In the Account page tap the |hamburger| menu and tap **Hide shielded balance for account name**. This removes the shielded balance tab and the Shield button from the accounts view. Note that the shielded balance still exists on the account, it is just not shown in the interface.

.. |hamburger| image:: ../images/hamburger.png
             :alt: Three horizontal lines

.. |moredetails| image:: ../images/more-arrow.png
             :alt: Button with More and double-headed arrow
