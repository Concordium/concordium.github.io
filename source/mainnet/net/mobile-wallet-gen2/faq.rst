.. _mw-gen2-faq:

======================
|mw-gen2| FAQ
======================

.. dropdown:: Why was the |mw-gen2| made?
    The |mw-gen2| was created to simplify the interface for users and to reduce problems with wallet recovery should it be necessary to recover your wallet.

.. dropdown:: What are the features and benefits of the |mw-gen2|?
    Functionality is much the same as the old one
    Can use a secret passphrase to recover wallet.
    Initial accounts no longer created automatically when your identity is verified.

.. dropdown:: What is a secret passphrase?
    A secret passphrase is a recovery phrase, a “master key” that unlocks all of your Concordium accounts. These words, when entered into |mw-gen2| in the correct order will recover all of the private keys you were storing on your original wallet and give access to all CCDs in the wallet. This means that even if you lose your physical hardware device, you’ll still have access to your blockchain assets.

.. dropdown:: How is a secret passphrase different from private keys?
    https://www.ledger.com/academy/private-key-and-seed-phrase-whats-the-difference

    Private keys allow you to send, spend, and delegate your CCDs.

    Your secret passphrase gives you access to your wallet and all of the private keys in the wallet. You can think of a wallet as being like a password manager for your CCDs. As long as you have your master password (the recovery phrase) you have access to all CCDs in the wallet.

.. dropdown:: What happens if I lose my secret passphrase?

    If you accidentally throw away the paper your secret passphrase is written on, forget where you hid it, or die without passing it on to an heir, you lose access to your CCDs. If someone steals your secret passphrase, your CCDs remain safely stored on the blockchain, but you (or your heirs) won’t have any way to access it. **If you lose your secret passphrase you lose access to your CCDs.**

    As long as you have your secret passphrase, you have your CCDs. If you break a phone containing your Mobile Wallet, you haven’t lost your CCDs. You can simply enter your secret passphrase into a newly downloaded Mobile Wallet.

.. dropdown:: How can I keep my secret passphrase secure?
    - Don't take a picture of it; if you save photos to any cloud provider this could potentially expose your secret passphrase so anyone could access your accounts and funds.
    - Don't keep it with your device. If you lose your device, anyone who finds it could access your accounts and funds.
    - Put it in a safe location. Keep your passphrase in a safe location that is fireproof and waterproof, and that you will remember and can access relatively easily. There are companies that make devices, such as https://shop.ledger.com/products/the-billfodl that can safely store your secret passphrase.
    - Keep multiple physical copies of your secret passphrase in safe locations.

.. dropdown:: Do I still need to make backups of my wallet?
    No. For the |mw-gen2| you do not need to make backups. Your secret passphrase that you write down is the only way to recover your accounts and identities.

.. dropdown:: Can I migrate from the |mw-gen1| to the new |mw-gen2|?
    No. Because the way that keys are protected differs between the old and new wallets you cannot simply migrate. If you use the |mw-gen1| but want to use the new one, you should do the following:

    #. Download the |mw-gen2| and set it up so you have a secret passphrase, a verified identity, and at least one account.
    #. Open the |mw-gen1| and send your funds from it to your new account(s) in the |mw-gen2|.
    #. Once you are sure that all of your funds have been transferred and you have no incoming transfers, you can delete the |mw-gen1| on your phone. You can also keep the |mw-gen1| and use both wallets since they are separate apps.

.. dropdown:: Can I continue to use the |mw-gen1|? Can I use both the |mw-gen1| and |mw-gen2| on the same device?
    Yes. Because the |mw-gen2| is a separate app, you can continue to use it simultaneously with your |mw-gen1|. You can also choose to continue using only the |mw-gen1|. Just make sure that you continue to make :ref:`backups<export-import>` if you continue using the |mw-gen1|.