.. include:: ../../variables.rst
.. _export-import:

====================================================
Make a backup of identities, accounts, and addresses
====================================================

.. Note::


    |bw| uses a seed phrase to recover the wallet. Therefore, backup and import features are not available.

    |cryptox| supports both file-based backups and seed phrase recovery.

    For more information, see :ref:`Recover your wallet<recover-wallet>`.

To make sure that you have a backup of your accounts, identities, and addresses, Concordium strongly recommends that if you are using Desktop Wallet, you export the data to a file you can store in a safe location. The backup will ensure that you can recover your accounts, identities, and addresses if your Wallet database becomes damaged or if, for some reason, you can't access the Wallet.

.. Warning::
   You are solely responsible for keeping your assets secure. You must never share your private keys, PIN codes, passwords, recovery phrases, LEDGER devices, or mobile devices with anyone.

A backup is only necessary when creating new accounts, not every time a transaction is executed. Think of your account like a safe: it contains assets. If you lose the key, you cannot get into the safe unless you have a copy of the key. Your backup is your copy of the safe key.

You can make a backup from Desktop Wallet.

How to proceed
==============

Upgrade
-------

Concordium is continuously improving the security and reliability of its products, so it is vital to ensure that your wallet is upgraded to the latest version available. To check which version of your Concordium Wallet is currently available, refer to the :ref:`release notes<release-notes>`.

Final Notes
===========

If the wallet does not have the keys for some accounts and you have previously made a wallet backup using the export functionality, uninstall and reinstall Desktop Wallet or |cryptox|. You can then import your wallet backup into the new wallet.

If the wallet does not have the keys from some accounts and you do not have a backup of the keys on an exported file, these accounts cannot be used. Therefore, you should ensure that you never ask anyone to transfer CCD to such accounts. Instead, go through a new identification process and generate new accounts that can be used in the future. And remember to export a new backup of the account keys each time you have generated a new account in the app.

Keep previous backup files until you have verified that your latest backup is working properly.


How to back up and import
=========================

.. _desktop-wallet-recover:

.. dropdown:: Desktop Wallet

    Because the Desktop Wallet uses a LEDGER device to sign all transactions, you can more easily recover your wallet and accounts if anything happens to your Desktop Wallet or you cannot access it. To access your Desktop Wallet, you use the backup file that you create in combination with your LEDGER device.

    If you lose the backup file with your accounts, you can use the Desktop Wallet in combination with your LEDGER device to recover those accounts. You only have to perform a recovery if you have lost the backup of your accounts and identities. If you still have the backup file, you can import the accounts back into the Desktop Wallet.

    If you’ve lost your LEDGER device or the device has stopped working, you can restore the keys in another LEDGER device by restoring it from the recovery phrase used for the original device. As long as you have your recovery phrase available, you can recover your wallet and accounts.

    To actually access the recovered accounts, you still need the LEDGER device that was used to set up the accounts, or a new LEDGER device that's been restored from the same recovery phrase.

    .. dropdown:: Export

        #.  Go to **Export/Import**.

        #.  Select **Export**.

        #.  Create a password that contains at least 6 characters. You'll need the password to import the file into the Desktop Wallet so keep it safe.

        #.  Navigate to the location on your computer where you want to save the file. If you're on Windows, make sure that **All Files** is selected in **Save as type**. Give the file a name and the extension .json, and then click **Save**. Once the export is complete, Concordium recommends that you store the file in a safe location that is different from where you store the Desktop Wallet database.

    .. dropdown:: Import

        #.  Go to **Export/Import**.

        #.  Select **Import** and navigate to the location on your computer where you saved the file, and then select **Open**.

        #. Enter the password of the import. If the import is successful, you can see all the imported identities, accounts, and addresses in the right pane.

    .. dropdown:: Recover accounts without a backup file

        .. _account-recovery:

        If, for some reason, you've lost one or more of your accounts in the Desktop Wallet, and you've also lost the backup file, you can use the LEDGER device to recover those accounts.

        You only have to perform a recovery if you have lost the backup of your accounts and identities. If you still have the backup file, you can import the accounts back into the Desktop Wallet.

        If you've lost your LEDGER device or the device has stopped working, you can restore the keys in another LEDGER device by by restoring it from the recovery phrase used for the original device. To learn more about the recovery phrase of a LEDGER device, see LEDGER's documentation: `What is a recovery phrase <https://www.ledger.com/academy/crypto/what-is-a-recovery-phrase/>`_ .


        **How the recovery process works**

        When you create a new identity in the Desktop Wallet, a number on the LEDGER device is associated with the identity. This is called the identity index and there can be more identity indices on a LEDGER device. These indices are used sequentially, so the first identity created from a LEDGER device uses index *0*, the next uses index *1*, and so on.

        The LEDGER device stores data about the credentials that belong to an identity. The keys you use to sign account transactions are all attached to credentials. It’s the credentials on an account that determine who’s allowed to sign transactions. To learn more about identities, see :ref:`Identities and accounts <reference-id-accounts>`.

        Lost identities can't be recovered because the identity object is not stored on the LEDGER device. However, you can go through each index on the LEDGER device where the data to create credentials are stored and use this information to regain access to the accounts related to a given identity.

        For each identity index, the recovery process uses the LEDGER device to calculate the IDs of the credentials, which also have sequential indices. The wallet then checks on the blockchain whether the credentials have been deployed, and which account each credential is attached to. These accounts are then added to the Desktop Wallet along with the deployed credentials.

        If all your identity issuances were successful, you can stop the recovery when you encounter an unused index. However, if one of your identity issuance processes failed, this might have caused an index to be skipped. Therefore, you must determine yourself when the recovery is completed.

        The recovery also creates placeholders for the missing identities to indicate that the index has already been used. However, the information used to create new accounts and credentials on a missing identity can't be recovered because it doesn't exist on the blockchain. That's why you can't create new accounts using these placeholders. Instead, you can request a new identity from an identity provider.

        The names of the accounts and the notes on the credentials are also not recoverable because they are only saved locally.

        **Incomplete backups**

        If you have :ref:`imported <export-import>` accounts from a backup file and you know there are accounts missing on one or more identities, you can go through the recovery process to recover the missing accounts.

        **How to recover accounts**

        #. In the **Desktop Wallet**, go to **Settings**, and then select **Recover existing accounts**.

        #. Familiarize yourself with the recovery information, and then select **Continue**.

        #. Connect the LEDGER device to the computer if you haven't done so already, and then select **Submit**.

        #. In the Desktop Wallet, there's a message saying *Please allow recovering credentials*. The LEDGER device says *Recover credentials*. In the right pane, you can see the indices that are found, and the accounts, if any, associated with each index.

        #. When you consider the recovery complete, select **Stop recovery, I found all my accounts**. You then see an overview of all the recovered accounts. If you don't think the recovery is complete, you can go back and continue the recovery process.

        #. To view the recovered accounts, go to **Accounts**. A recovered account doesn't have the name you originally gave it. Instead the name consists of the first eight digits of the account address. Furthermore, because the identities are not recovered, the accounts show the index number that's associated with the identity and not the identity itself.

        #. To view placeholders for identities, go to **Identities**. Here you can see placeholders for the missing identities. These placeholders show the index numbers that have been used. You can't use the placeholders to create new accounts.

.. _mobile-wallet-recover:


.. dropdown:: |bw|

    You cannot back up |bw| to a file. It uses a seed phrase to :ref:`recover your accounts, identities, and private keys<recover-wallet>`.

    You also can't import a back-up file into the |bw|.


    If you need to export your private key to use in Concordium Client (for example, to work with smart contracts or to set up a validator node), see :ref:`Export a private key<export-key>`.

.. dropdown:: |cryptox|

   |cryptox| supports both file-based backups and seed phrase recovery.

   If you have set up your wallet with a seed phrase, you will need this for recovering your wallet.
   You can :ref:`view the seed phrase in Wallet Settings<show-seed-phrase>` if you need to write it down again.

   If you have set up your wallet from an imported back-up file, you will have the functionality for :ref:`exporting and importing back-up files<import-export-file>`.

   See both recovery from seed phrase and recovery from back-up file under :ref:`Recover your wallet<recover-wallet>`.

.. |morepage| image:: ../images/more-ellipsis.png
             :alt: Three dots button

.. |wallet-settings| image:: ../images/settings.png
                        :alt: gear wheel
                        :width: 40px
