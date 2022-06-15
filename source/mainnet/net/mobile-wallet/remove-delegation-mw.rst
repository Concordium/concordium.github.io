.. _remove-delegation-mw:

================================================
Remove delegation on an account in Mobile Wallet
================================================

.. Note::

   All transfers and transactions cost a fee, including delegation transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees.
   You can see the fee in the transaction log.

#. Go to the **Accounts** screen.

#. Tap on the balance area of the account for which you want to stop delegation or tap **More** |moredetails|.

#. In the hamburger menu |hamburger| tap **Delegation**.

#. You see your current delegation. Tap **Stop delegation**.

   .. image:: ../images/mobile-wallet/delegation-status-mw.jpg
       :width: 25%

#. Review the information in the transaction overview. When you are satisfied, tap **Submit delegation transaction**.

   .. image:: ../images/mobile-wallet/remove-delegation-conf-mw.jpg
      :width: 25%

#. Once the transaction is submitted you see a confirmation screen. Tap **Finish** to complete the action.

   .. image:: ../images/mobile-wallet/remove-delegation-submit-mw.jpg
      :width: 25%

.. Note::

   Removing your stake in any pool results in a longer :ref:`cool-down period<glossary-cool-down-period>`. The delegation amount will be locked during this period and cannot be increased or decreased; you can still change targets or restaking preferences during cool-down. The delegation stop is not effective until the next :ref:`pay day<glossary-pay-day>` after cool-down period ends. During the cool-down period the staked amount continues earning rewards.

.. |hamburger| image:: ../images/hamburger.png
             :alt: Three horizontal lines

.. |moredetails| image:: ../images/more-arrow.png
             :alt: Button with More and double-headed arrow
