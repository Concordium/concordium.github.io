.. include:: ../../variables.rst
.. _mw-gen2-faq:

======================
|mw-gen2| FAQ
======================

.. dropdown:: Why was the |mw-gen2| made?

    The |mw-gen2| was created to simplify the interface for users and to reduce problems with wallet recovery should it be necessary to recover your wallet.

.. dropdown:: What are the features and benefits of the |mw-gen2|?

    Much of the functionality is the same as |mw-gen1| in that you can still send and receive funds, bake, delegate, and so on. But the |mw-gen2| uses a secret recovery phrase that allows you to recover your wallet should you need to replace your phone. That same secret recovery phrase will also allow you to recover the wallet on, for example, the Concordium Wallet for web.

    In |mw-gen2| initial accounts are no longer created automatically when your identity is verified. You must create your first account yourself.

.. dropdown:: What is a secret recovery phrase?

    A secret recovery phrase is a “master key” that unlocks all of your Concordium accounts. These words, when entered into |mw-gen2| in the correct order will recover all of the private keys you were storing on your original wallet and give access to all CCDs in the wallet. This means that even if you lose your physical hardware device, you’ll still have access to your blockchain assets. Secret recovery phrases are sometimes referred to as seed phrases, mnemonic phrases, mnemonic seeds and backup phrases.

.. dropdown:: How is a secret recovery phrase different from private keys?

    Private keys allow you to send, spend, and delegate your CCDs.

    Your secret reovery phrase gives you access to your wallet and all of the private keys in the wallet. You can think of a wallet as being like a password manager for your CCDs. As long as you have your master password (the secret recovery phrase), you have access to all CCDs in the wallet.

    You can read another explanation `here <https://www.ledger.com/academy/private-key-and-seed-phrase-whats-the-difference>`_.

.. dropdown:: What happens if I lose my secret recovery phrase?

    If you accidentally throw away the paper your secret recovery phrase is written on, forget where you hid it, or die without passing it on to an heir, you lose access to your CCDs. If someone steals your secret reovery phrase, they can access your CCDs. **If you lose your secret recovery phrase you lose access to your CCDs.**

    As long as you have your secret recovery phrase, you have your CCDs. If you break a phone containing your wallet, you haven’t lost your CCDs. You can simply enter your secret recovery phrase into a newly downloaded |mw-gen2|.

.. dropdown:: How can I keep my secret recovery phrase secure?

    - Don't take a picture of it; if you save photos to any cloud provider this could potentially expose your secret recovery phrase so anyone could access your accounts and funds.
    - Don't keep it with your device. If you lose your device, anyone who finds it could access your accounts and funds.
    - Put it in a safe location. Keep your secret recovery phrase in a safe location that is fireproof and waterproof, and that you will remember and can access relatively easily. There are companies that make devices, such as https://shop.ledger.com/products/the-billfodl that can safely store your secret recovery phrase.
    - Keep multiple physical copies of your secret recovery phrase in safe locations.

.. dropdown:: Do I still need to make backups of my wallet?

    No. For the |mw-gen2| you do not need to make backups. Your secret recovery phrase that you write down is the only way to recover your accounts and identities.

.. dropdown:: Can I migrate from the |mw-gen1| to the new |mw-gen2|?

    No. Because the way that keys are protected differs between the old and new wallets you cannot simply migrate. If you use the |mw-gen1| but want to use the new one, you should do the following:

    #. Download the |mw-gen2| and set it up so you have a secret recovery phrase, a verified identity, and at least one account.
    #. Open the |mw-gen1| and send your funds from it to your new account(s) in the |mw-gen2|.
    #. Once you are sure that all of your funds have been transferred and you have no incoming transfers, you can delete the |mw-gen1| on your phone. You can also keep the |mw-gen1| and use both wallets since they are separate apps.

.. dropdown:: Can I continue to use the |mw-gen1|? Can I use both the |mw-gen1| and |mw-gen2| on the same device?

    Yes. Because the |mw-gen2| is a separate app, you can continue to use it simultaneously with your |mw-gen1|. You can also choose to continue using only the |mw-gen1|. Just make sure that you continue to make :ref:`backups<export-import>` if you continue using the |mw-gen1|.

.. dropdown:: Can I access my wallet on multiple devices with the secret recovery phrase?

    Yes. At the moment, you can access your wallet using |mw-gen2| and the Browser Extension Wallet (link) if you have a secret recovery phrase. You can recover your wallet in a device that uses either of these. Be aware that any names you have given to identities and accounts are **specific to the device**, so if you have used special names for them, they will not appear when you recover the wallet on another device. You can :ref:`edit the account name<change-mw-acct-name>` and :ref:`edit the identity name<change-mw-id-name>`, if desired. Also, only addresses for your own account are added to the address book. Other addresses cannot be recovered. So you must add those manually.

    It is also important to note that if, for example, you add an account on one wallet that is recovered on two devices in parallel (from the same recovery phrase), nothing is dynamically updated across wallets from the same recovery phrase except balances. To get updates such as a new account or new identity, it is necessary to :ref:`recover<recover-wallet>` from your recovery phrase again.

.. dropdown:: Can I use my secret recovery phrase to restore my accounts in third party wallets?

    At the moment Concordium identities and accounts are only supported in Concordium Wallets.

.. dropdown:: I have a secret recovery phrase from another wallet. Can I use that in my Concordium Wallet?

    Reusing a secret recovery phrase in multiple wallets is not recommended, as it increases the risk of having all your wallets compromised. However, if your secret recovery phrase is a 24 word BIP-39 phrase, you can use that to make a wallet recovery in the Concordium Wallets. The wallet will not recover anything, but it will set your wallet up with the secret recovery phrase, and from there you can request a new identity and accounts.
