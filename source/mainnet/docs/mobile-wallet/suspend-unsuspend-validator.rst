.. include:: ../../variables.rst
.. _suspend-unsuspend-validator:

=============================
Suspend/Unsuspend a validator
=============================

A validator can be suspended in two ways:

- **Self-suspension**: You can manually suspend your validator, for example during planned node maintenance.
- **Automatic suspension**: The protocol may suspend your validator if it fails to produce blocks a certain number of times when selected as a round leader.

When a validator is suspended, regardless of the cause:

- The validator stops earning rewards
- Delegators to the validator stop earning rewards
- Delegators are notified about the suspension

Self-suspension
---------------

You can manually suspend your validator when needed, such as during node maintenance, and reactivate it when your node is operational again. This gives you control over your validator's status without risking an automatic suspension due to inactivity.

Automatic suspension
--------------------

Automatic suspension occurs when a validator remains inactive for an extended period, missing multiple opportunities to produce blocks. The inactivity threshold varies based on stake size—larger validators may face suspension within hours, while smaller validators might take several days to reach the threshold.

When a validator becomes inactive, it first enters a "primed for suspension" state. The validator then has until the next snapshot epoch to demonstrate activity by either producing a block or having its signature included in a quorum certificate. If it remains inactive, the suspension takes effect at the following payday.

Suspend a validator
-------------------

.. dropdown:: |cryptox|

.. dropdown:: |bw|

    #. In the dropdown list, select the account for which you want to suspend the validator and click **Earn**.

    #. On the next screen, click **Suspend**.

       .. image:: ../images/browser-wallet/new/update_validation1.png
           :width: 40%

    #. On the next screen, read the information about the consequences of suspending your validator. Click **Continue** to proceed with the suspension or go back if you need to reconsider.

       .. image:: ../images/browser-wallet/new/suspend_validator1.png
           :width: 40%

    #. Review the transaction details for suspending your validator. Note that the suspension will take effect from the next payday. Click **Submit validation** to confirm and send your suspension transaction to the blockchain.

       .. image:: ../images/browser-wallet/new/suspend_validator2.png
           :width: 40%

    #. The wallet displays a confirmation screen with a green checkmark, indicating your validation settings have been successfully updated. You can click **Transaction details** to view more information about the transaction, or **Return to account** to go back to your account overview.

       .. image:: ../images/browser-wallet/new/suspend_validator3.png
           :width: 40%

    After successfully suspending your validator, you'll notice several clear indicators throughout the wallet interface:

    On your account overview screen, a prominent red banner appears at the bottom stating "Your validation has been suspended" with an arrow. This banner serves as both a notification and a shortcut. Additionally, a red dot appears on the **Earn** button, providing a visual indicator that your validator requires attention.

    .. image:: ../images/browser-wallet/new/suspend_validator4.png
           :width: 40%


    In the account list view, suspended validators are marked with a red indicator dot to the left of the account address.

    .. image:: ../images/browser-wallet/new/suspend_validator6.png
           :width: 40%

    When viewing your validator details, a red message clearly states "Your validation has been suspended" along with information that your node is not currently earning rewards.

    .. image:: ../images/browser-wallet/new/suspend_validator5.png
           :width: 40%

    **Important**: The suspension notification banner on your account overview screen will remain visible across your entire wallet experience, even when you have selected different accounts in the dropdown menu. Clicking this banner will immediately take you to the suspended validator's details page, regardless of which account is currently selected or displayed.

    This persistent notification ensures you're always aware of the suspension status and provides quick access to resume validation when you're ready.


Unsuspend a self-suspendet validator
------------------------------------

.. dropdown:: |cryptox|

.. dropdown:: |bw|