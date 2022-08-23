.. _browser-wallet-faq:

==================
Browser Wallet FAQ
==================

.. dropdown:: Why was the Browser Wallet made?

    created to simplify the interface for users and to reduce problems with wallet recovery should it be necessary to recover your wallet.

.. dropdown:: What are the features and benefits of the Browser Wallet?

    Functionality is much the same as the old one
    Can use a secret passphrase to recover wallet.
    Initial accounts no longer created automatically when your identity is verified.

.. dropdown:: What is a secret recovery phrase?

    A secret recovery phrase is a “master key” that unlocks all of your Concordium accounts. These words, when entered into Browser Wallet in the correct order will recover all of the private keys you were storing on your original wallet and give access to all CCDs in the wallet. This means that even if you lose your physical hardware device, you’ll still have access to your blockchain assets.

.. dropdown:: How is a secret recovery phrase different from private keys?

    https://www.ledger.com/academy/private-key-and-seed-phrase-whats-the-difference

    Private keys allow you to send, spend, and delegate your CCDs.

    Your secret recovery phrase gives you access to your wallet and all of the private keys in the wallet. You can think of a wallet as being like a password manager for your CCDs. As long as you have your master password (the recovery phrase) you have access to all CCDs in the wallet.

.. dropdown:: What happens if I lose my secret recovery phrase?

    If you accidentally throw away the paper your secret recovery phrase is written on, forget where you hid it, or die without passing it on to an heir, you lose access to your CCDs. If someone steals your secret passphrase, your CCDs remain safely stored on the blockchain, but you (or your heirs) won’t have any way to access it. **If you lose your secret passphrase you lose access to your CCDs.**

    As long as you have your secret passphrase, you have your CCDs. If you break a device containing your wallet, you haven’t lost your CCDs. You can simply enter your secret recovery phrase into a newly downloaded wallet.

.. dropdown:: How can I keep my secret recovery phrase secure?

    - Don't take a picture of it; if you save photos to any cloud provider this could potentially expose your secret recovery phrase so anyone could access your accounts and funds.
    - Don't keep it with your device. If you lose your device, anyone who finds it could access your accounts and funds.
    - Put it in a safe location. Keep your secret recovery phrase in a safe location that is fireproof and waterproof, and that you will remember and can access relatively easily. There are companies that make devices, such as https://shop.ledger.com/products/the-billfodl that can safely store your secret recovery phrase.
    - Keep multiple physical copies of your secret recovery phrase in safe locations.

.. dropdown:: Do I still need to make backups of my wallet?

    No. For the Browser Wallet you do not need to make backups. Your secret recovery phrase that you write down is the only way to recover your accounts and identities.

.. dropdown:: Can I migrate from the another wallet to the Browser Wallet?

    No. Because the way that keys are protected differs between the earlier wallets and Browser wallet you cannot simply migrate. You can, however, send money from one of the earlier wallets to accounts in your Browser Wallet.

.. dropdown:: Can I access the same accounts on different devices?

    If you are using Browser Wallet and the upcoming release of the Mobile Wallet, yes because the |mw-gen2| also uses the secret recovery phrase. You would simply enter your recovery phrase into the wallet to see the same identities and accounts on both. Note that the names are specific to the device and are not the same between devices.
