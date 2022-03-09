.. _create-account-mw:

==============================================
Create a new account with an existing identity
==============================================

.. contents::
   :local:
   :backlinks: none

When you created your :ref:`identity<glossary-identity>`, it came with an :ref:`initial accounts<glossary-initial-account>`. The initial account is a special account that the :ref:`identity provider<glossary-identity-provider>` submits
to the chain. When you already have an identity, you can submit more :ref:`accounts<glossary-account>` to the chain with that identity yourself.

To learn more about identities and accounts, see :ref:`Identities <reference-id-accounts>` and :ref:`Accounts <managing_accounts>`.

Read the following or watch the video to learn how to create a new account.

.. raw:: html

   <iframe width="560" height="315" src="https://www.youtube.com/embed/gtDXnuoMOes" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

|

Create a new account
====================

#. Go to the **Accounts** page.

#. Tap the **+** in the upper right corner.

   .. image:: ../images/mobile-wallet/MW13.png
      :width: 25%

#. Enter a name for your new account. Tap **Next**.

   .. image:: ../images/mobile-wallet/MW15.png
      :width: 25%

#. Tap the identity you want to use to create the account.

   .. image:: ../images/mobile-wallet/MW16.png
      :width: 25%

#. You now have the option to reveal some attributes publicly on the account. Unless you have a good reason to do so, it is recommended not to reveal any attributes.

   - If you want to reveal some attributes, tap **Reveal account attributes**, select the attributes you want to reveal, and then tap **Submit account**.
   - If you don’t want to reveal any attributes, tap **Submit account**.

      .. image:: ../images/mobile-wallet/MW17.png
         :width: 25%

#. Finally, tap **Ok, thanks**.

   .. image:: ../images/mobile-wallet/MW19.png
      :width: 25%

Your new account is now visible on the Accounts page. It might take a little while for it to finalize on the chain.

.. Warning::
   **Backup is essential. If you lose your mobile phone or need to restore your mobile phone and you don't have a backup from the Mobile Wallet, you can't access your wallet and your CCDs are permanently inaccessible.**
   **Concordium does not take any responsibility if you lose access to your accounts. Concordium strongly advise you to complete a backup every time you create an account and store the backup file in a secure place - preferably offline.**
   For more information, see :ref:`Make a backup of identities and accounts in Mobile Wallet<export-import-mw>`.

.. Note::
   To access the **Balance** of the new account, tap the Balance area on the account card or tap |moredetails|.

.. |moredetails| image:: ../images/more-arrow.png
             :alt: Button with More and double-headed arrow

