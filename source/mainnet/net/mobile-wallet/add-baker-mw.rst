.. _add-baker-mw:

==========================
Add baker in Mobile Wallet
==========================

#. Go to **Accounts**. Tap on the balance area of the account you want to add as a baker account or tap **More** |moredetails|.

#. In the hamburger menu |hamburger| tap **Baking**.

#. After the screens explaining baking, tap **Register baker** on the Baker status screen.

#. Specify the amount that you want to stake. The more you stake, the greater the probability that your account will be chosen to bake the next block.

.. Note::

    There is a minimum amount to stake to become a baker. To find out what the minimum stake is, you can run the :ref:`consensus show-chain-parameters transaction in concordium-client<consensus show-chain-parameters>`.

.. Warning::

   Do not stake all of your funds or you will not have enough to cover transaction fees for unstaking or other transactions.

5. Baker accounts receive a reward when they have baked a block, and the reward is added to the staked amount on the account by default. However, you can change this setting so that the reward is added to the disposable amount instead. Select **Don’t restake** if you'd rather add the rewards to the disposable amount on the account.

6. Choose whether you want to open a :ref:`baker pool<glossary-baker-pool>` or keep it closed. By opening a baker pool, others can delegate stake to your baker, thus increasing the chance that you are selected to bake a block and earn rewards. If you have a baker pool with delegators, the delegators also earn rewards when you bake blocks. Bakers are also paid a commission by the delegators for baking on their behalf. You can choose **Close for delegation** if you do not wish to run a baker pool.

7. If you open a baker pool, you can optionally enter a URL with information about your baker to give delegators more information about your baker pool to help them research baker pools. This information is not shared in the case of a closed baker.

8. You have to export the baker credentials so that you can start the node with the baker keys. Tap **Export baker keys** and navigate to the place on your device where you want to save the file. If you're running Windows make sure that **All Files** is selected in **Save as type**. Give the file a name and the extension .json, and then click **Save** and navigate to the place on your computer where you want to save the file.

.. Warning::

    This is the only time that you can export the credentials. If you're going to transfer the baker keys to someone else, make sure to do so through a secure channel. Generate new keys if you believe the keys have been compromised or lost.

9. Once you have saved the keys, you see an overview screen of the add baker transaction. Review the information then tap **Submit baker transaction**.

10. In the Mobile Wallet, you can see that the transaction has been submitted to the chain. Tap **Finish**. Once the transaction is approved, you see the active baker screen where you have the possibility to update baker settings.

11. You need to import your baker keys file to your node in order to start baking. It is preferable to update them on the node as close to :ref:`pay day<glossary-pay-day>` as possible to prevent the node from being down as a baker for a longer time.

    - :ref:`Windows<baker-windows>`
    - :ref:`macOS<baker-macos>`
    - :ref:`Docker<baking-docker>`
    - :ref:`Ubuntu<baker-ubuntu>`

.. Warning::

    Transactions on the blockchain are permanent. That is, they are irreversible and can't be deleted. Therefore, carefully review that you have selected the right account to add as baker, and that you have entered the correct amount to stake.

.. |hamburger| image:: ../images/hamburger.png
             :alt: Three horizontal lines

.. |moredetails| image:: ../images/more-arrow.png
             :alt: Button with More and double-headed arrow
