.. include:: ../../variables.rst
.. _browser-wallet-faq:

==================
|bw| FAQ
==================

.. dropdown:: Why was the |bw| made?

    The |bw| was created as a tool for developers to connect `dApps <https://en.wikipedia.org/wiki/Decentralized_application>`__ to the Concordium blockchain and interact with it, and for users who are using dApps. It provides a simplified interface for users and introduces a :ref:`secret recovery phrase<glossary-secret-recovery-phrase>`, which simplifies any restoration of an account should you lose access to the phone/app. Also, this version supports easy portability of accounts between this and the |mw-gen2|.

.. dropdown:: What are the features and benefits of the |bw|?

    Some of the functionality is the same as other Concordium wallets in that you can still send and receive funds. But the |bw| uses a :ref:`secret recovery phrase<glossary-secret-recovery-phrase>` that allows you to recover your wallet should you need to replace your device. That same secret recovery phrase will also allow you to recover the wallet on, for example, |mw-gen2|.

    In |bw| initial accounts are no longer created by the Identity Verification company when your identity is verified, ensuring complete privacy of all your accounts. Going forward you create all accounts yourself in your Concordium Wallet.

.. dropdown:: What is a secret recovery phrase?

    A :ref:`secret recovery phrase<glossary-secret-recovery-phrase>` is a “master key” that unlocks all of your Concordium accounts. When entered into the wallet in the correct order, the 24 words in the recovery phrase will recover all of the private keys you were storing on your original wallet and give access to all CCDs in the wallet. This means that even if you lose your physical hardware device, you’ll still have access to your blockchain assets. Secret recovery phrases are sometimes referred to as seed phrases, mnemonic phrases, mnemonic seeds and backup phrases.

.. dropdown:: How is a secret recovery phrase different from private keys?

    Private keys allow you to send, spend, and delegate your CCDs.

    Your :ref:`secret recovery phrase<glossary-secret-recovery-phrase>` gives you access to your wallet and all of the private keys in the wallet. You can think of a wallet as being like a password manager for your accounts. As long as you have your master password (the secret recovery phrase), you have access to all CCDs in the wallet.

.. dropdown:: What happens if I lose my secret recovery phrase?

    If you accidentally throw away the paper your secret recovery phrase is written on, forget where you hid it, or do not pass it on to an heir, you no longer have the ability to recover your wallet and can lose access to your CCDs. If someone steals your secret recovery phrase, they can access your CCDs. **If you lose your secret recovery phrase you lose access to your CCDs.**

    As long as you have your secret recovery phrase, you have your CCDs. If you break a device containing your wallet, you haven’t lost your CCDs. You can simply :ref:`enter your secret recovery phrase<recover-wallet>` into a newly downloaded |mw-gen2| or |bw|.

.. dropdown:: How can I keep my secret recovery phrase secure?

    - Don't take a picture of it; if you save photos to any cloud provider this could potentially expose your :ref:`secret recovery phrase<glossary-secret-recovery-phrase>` so anyone could access your accounts and funds.
    - Don't keep it with your device. If you lose your device, anyone who finds it could access your accounts and funds.
    - Put it in a safe location. Keep your secret recovery phrase in a safe location that is fireproof and waterproof, and that you will remember and can access relatively easily. There are companies that make devices, such as https://shop.ledger.com/products/the-billfodl that can safely store your secret recovery phrase.
    - Keep multiple physical copies of your secret recovery phrase in safe locations.

.. dropdown:: Do I still need to make backups of my wallet?

    No. For the |bw| you do not need to make backups. Your :ref:`secret recovery phrase<glossary-secret-recovery-phrase>` that you write down is the only way to recover your accounts and identities.

.. dropdown:: Can I migrate from the |mw-gen1| to the |bw|?

    No. Because the way that keys are protected differs between the old and new wallets you cannot simply migrate. If you use the |mw-gen1| but want to use the |bw|, you should do the following:

    #. Download the |bw| and set it up so you have a :ref:`secret recovery phrase<glossary-secret-recovery-phrase>`, a verified identity, and at least one account.
    #. Open the |mw-gen1| and send your funds from it to your new account(s) in the |bw|.
    #. Once you are sure that all of your funds have been transferred and you have no incoming transfers, you can delete the |mw-gen1| on your phone. You can also keep the |mw-gen1| and use both wallets. Just make sure that you continue to make :ref:`backups<export-import>` if you continue using the |mw-gen1|.

    Identity and account creation is disabled in |mw-gen1|.

.. dropdown:: Can I access my wallet on multiple devices with the secret recovery phrase?

    Yes, you can access your wallet using |mw-gen2| and |bw|. You can :ref:`recover<recover-wallet>` your wallet in a device that uses either of these. Be aware that any names you have given to identities and accounts are **specific to the device**, so if you have used special names for them, they will not appear when you recover the wallet on another device. You can edit the account name and edit the identity name, if desired.

    It is also important to note that if, for example, you add an account on one wallet that is recovered on two devices in parallel (from the same recovery phrase), nothing is dynamically updated across wallets from the same recovery phrase except balances. To get updates such as a new account or new identity, it is necessary to :ref:`recover<recover-wallet>` from your recovery phrase again; however you do not need to enter the recovery phrase again as the wallet will remember it.

.. dropdown:: Can I use my secret recovery phrase to restore my accounts in third party wallets?

    At the moment Concordium identities and accounts are only supported in Concordium Wallets. However, Concordium expects to provide support for CCD and CIS-2 tokens in third party wallet in the not too distant future.

.. dropdown:: I have a secret recovery phrase from another wallet. Can I use that in my Concordium Wallet?

    Reusing a :ref:`secret recovery phrase<glossary-secret-recovery-phrase>` in multiple wallets is not recommended, as it increases the risk of having all your wallets compromised. Concordium recommends that you generate a new recovery phrase when setting up a new wallet on Concordium. For advanced users who understand the risks involved it is possible to reuse a 24 word recovery phase from another wallet with Concordium through the wallet recovery process. The wallet will not recover anything if you reuse your secret recovery phrase from another wallet, but it will set your wallet up with the secret recovery phrase, and from there you can request a new identity and accounts.

.. dropdown:: I have a Concordium Desktop Wallet set up with a LEDGER device and a 24 word secret recovery phrase. Can I use that recovery phrase in my |bw|?

    Identities and accounts from the Concordium Desktop Wallet cannot be recovered in the |bw|. It is also not recommended to use secret recovery phrases from cold wallets in “hot wallets” like the |bw|, as that defeats the purpose of having the :ref:`secret recovery phrase<glossary-secret-recovery-phrase>` in a cold wallet, like the LEDGER devices.

.. dropdown:: Can I migrate from the another wallet to the |bw|?

    No. Because the way that keys are protected differs between the earlier |mw-gen1|, and |bw| and |mw-gen2|, you cannot simply migrate. You can, however, send money from one of the earlier wallets to accounts in your |bw|.

    You can have your wallet running concurrently on both |bw| and |mw-gen2|.

.. dropdown:: Can I access the same accounts on different devices?

    If you are using |bw| and the |mw-gen2|, you can because the |mw-gen2| also uses the :ref:`secret recovery phrase<glossary-secret-recovery-phrase>`. You would simply enter your :ref:`recovery phrase<recover-wallet>` into the wallet to see the same identities and accounts on both. Note that the account and identity names are specific to the device and are not the same between devices.

.. dropdown:: What do I do if I forget my passcode on the |bw|?

    If you forget your passcode for your installed |bw|, you will need to :ref:`remove the extension in your internet browswer and reinstall it<setup-browser-wallet>`, choosing the option to :ref:`recover<recover-wallet>` your wallet. Use your :ref:`secret recovery phrase<glossary-secret-recovery-phrase>` to recover the wallet.
