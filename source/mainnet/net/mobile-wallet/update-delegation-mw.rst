
.. _update-delegation-mw:

================================================
Update delegation on an account in Mobile Wallet
================================================

You can update individual configuration settings of your delegation or change all of them as needed. Most changes, except reducing stake, are effective from the next :ref:`pay day<glossary-pay-day>`.

.. Note::

   Any changes made in the last epoch before the upcoming pay day are applied not in the upcoming pay day but the pay day after that.

Before delegating stake to a baker pool, it is important to research the pool. You can only have one delegation per account. If you wish to delegate CCD to multiple open pools, you can have multiple accounts and transfer CCD to those accounts to delegate.

.. Note::

   All transfers and transactions cost a fee, including delegation transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees.
   You can see the fee in the transaction log.

#. Go to the **Accounts** screen.

#. Tap on the balance area of the account for which you want to update delegation or tap **More** |moredetails|.

#. In the hamburger menu |hamburger| tap **Delegation**.

#. You see your current delegation. Tap **Update current delegation**.

#. If you want to delegate to a specific pool tap **Baker pool** and enter the Baker ID of the pool owner you want to switch the delegation to. If you want to delegate to passive delegation, tap **Passive delegation**. Tap **Continue**.

#. You can see your balance available to delegate at the top of screen and the amount of your current delegation. If you want to change the amount enter that in the **Enter the Amount you want to delegate** field. And tap **Yes, restake** to restake any rewards or tap **No, don't restake** if you don’t want to restake rewards. If you do not restake, rewards are deposited to your disposable balance. Tap **Continue**.

#. Review the information in the transaction overview. When you are satisfied, tap **Submit delegation transaction**.

#. Once the transaction is submitted you see a confirmation screen. Tap **Finish** to complete the action.

Once the transaction is finalized, the delegation update is effective from the next pay day for most transactions, except reducing your stake.

.. Note::

   Reducing your stake in any pool results in a longer :ref:`cool-down period<glossary-cool-down-period>`. The delegation amount will be locked during this period and no changes can be made to the amount. The reduction in stake is not effective until the first pay day after the cool-down period ends. During the cool-down period the staked amount continues earning rewards.

.. |hamburger| image:: ../images/hamburger.png
             :alt: Three horizontal lines

.. |moredetails| image:: ../images/more-arrow.png
             :alt: Button with More and double-headed arrow
