.. include:: ../../variables.rst
.. _cryptox-faq:

======================
|cryptox| FAQ
======================

What are the feature and benefits?
----------------------------------

.. dropdown:: What are the features and benefits of the |cryptox|?

    The |cryptox| is the third generation of the Concordium mobile wallets. It offers a comprehensive set of features for interacting with the Concordium blockchain.
    It includes most of the functionality from the previous generations, but also introduces new capabilities like :term:`dApp connectivity`, support for Protocol7 and an improved user interface.

    It offers :ref:`recovery from both backup file and seed phrase<recover-wallet>` and so it supports import of identities and accounts from both Concordium Wallet for Mobile, Concordium Legacy Wallet, and Concordium Wallet for Web.

    |cryptox| is the wallet where ongoing development and new features will be continually introduced. If you want to stay updated, this is the version to use.

.. dropdown:: What is a seed phrase?

    A :term:`seed phrase` is a “master key” that unlocks all of your Concordium accounts. When entered into the wallet in the correct order, the 24 words in the seed phrase will recover all of the private keys you were storing on your original wallet and give access to all :term:`CCDs<ccd>` in the wallet. This means that even if you lose your physical hardware device, you’ll still have access to your blockchain assets. Seed phrases are sometimes referred to as secret recovery phrases, mnemonic phrases, mnemonic seeds, and backup phrases.

.. dropdown:: How is a seed phrase different from private keys?

    :term:`Private keys` allow you to send, spend, and delegate your CCDs.

    Your :term:`seed phrase` gives you access to your wallet and all of the private keys in the wallet. You can think of a wallet as being like a password manager for your accounts. As long as you have your master password (the seed phrase), you have access to all CCDs in the wallet.

.. dropdown:: What happens if I lose my seed phrase?

    If you accidentally throw away the paper your :term:`seed phrase` is written on, forget where you hid it, or do not pass it on to an heir, you no longer have the ability to :ref:`recover your wallet<recover-wallet>` and can lose access to your CCDs. If someone steals your seed phrase, they can access your CCDs. **If you lose your secret recovery phrase you lose access to your CCDs.**

    As long as you have your seed phrase, you have your CCDs. If you break a phone containing your wallet, you haven’t lost your CCDs. You can simply :ref:`enter your seed phrase<recover-wallet>` into a newly downloaded |cryptox|, |mw-gen2| or |bw|.

.. dropdown:: How can I keep my seed phrase secure?

    - Don't take a picture of it; if you save photos to any cloud provider this could potentially expose your :term:`seed phrase` so anyone could access your accounts and funds.
    - Don't keep it with your device. If you lose your device, anyone who finds it could access your accounts and funds.
    - Put it in a safe location. Keep your seed phrase in a safe location that is fireproof and waterproof, and that you will remember and can access relatively easily. There are companies that make devices, such as https://shop.ledger.com/products/the-billfodl that can safely store your seed phrase.
    - Keep multiple physical copies of your seed phrase in safe locations.

.. dropdown:: Do I still need to make backups of my wallet?

    For |cryptox|, |mw-gen2| and |bw| you don't need to make backups. Your :term:`seeed phrase` that you write down is the only way to :ref:`recover your accounts and identities<recover-wallet>`.

    However, if you migrated your wallet from a |mw-gen1| backup file, you'll need to maintain file-based backups of your |cryptox| as well. This is due to potential legacy dependencies that might still exist within your wallet.

.. _wallet-migrate:

.. dropdown:: Can I migrate from |mw-gen1| to |cryptox|?

    Yes. |cryptox| supports both :ref:`seed phrase recovery and file based recovery <recover-wallet>` so you can easily import your |mw-gen1| wallet. You just need your |mw-gen1| backup file and the password you created when exporting it.

.. dropdown:: Can I continue to use the |mw-gen1|? Can I use both the |mw-gen1| and |cryptox| on the same device?

    Yes, currently you can. |cryptox| and |mw-gen1| are separate apps so you can use them simultaneously or continue using only the |mw-gen1|. However, we strongly recommend migrating to |cryptox| as there will be no further updates to |mw-gen1| and eventually it will be shut down.

.. dropdown:: As a validator, what do I need to do to migrate from |mw-gen1| to |cryptox|?

    You only need your backup file and the password you created when exporting the file.

    Then, download |cryptox| and :ref:`recover your wallet<recover-wallet>` with your backup file and password.

    Your validator status and staking pool participation will remain unchanged after the migration. Your rewards will continue to be distributed as usual.

.. dropdown:: If I am awaiting scheduled transfers in an account in |mw-gen1| how should I migrate to |cryptox|?

    Just download |cryptox| and :ref:`recover your wallet<recover-wallet>` with your backup file and password.
    All of your scheduled transfers, along with your accounts and identities, will be transferred to your new |cryptox|.

.. dropdown:: Can I access my wallet on multiple devices with the seed phrase?

    Yes, you can access your wallet concurrently using the same secret recovery phrase with the |cryptox|, |mw-gen2| and |bw|.

    Be aware that any names you have given to identities and accounts are **specific to the device** so they will not appear when you recover the wallet on another device.

    Also note that addresses are specific to the device. Only addresses for your own account are added to the address book on the new device, other addresses must be added manually.

    If you recover a wallet on two devices from the same seed phrase, accounts and identities are synchronized between the two devices at this exact moment.
    New accounts or identities created on the one device will not be accessible on the other until a recovery is manually started from the **More** screen.

.. dropdown:: Can I use my seed phrase to restore my accounts in third-party wallets?

    At the moment Concordium identities and accounts are only supported in Concordium Wallets. However, Concordium expects to provide support for CCD and CIS-2 tokens in third party wallet in the not too distant future.

.. dropdown:: I have a seed phrase from another wallet. Can I use that in my Concordium Wallet?

    Reusing a :term:`seed phrase` in multiple wallets is not recommended as it increases the risk of having all your wallets compromised.
    Concordium recommends that you generate a new seed phrase when setting up a new wallet on Concordium.

.. dropdown:: I have a Concordium Desktop Wallet set up with a LEDGER device and a 24 word seed phrase. Can I use that seed phrase in my |cryptox|?

    Identities and accounts from the Concordium Desktop Wallet cannot be recovered in any of the other Concordium wallets.