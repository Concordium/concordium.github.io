.. _concordia:
.. include:: ../../../variables.rst

.. meta::
    :description lang=en:
        Concordia is an example Web3 ID solution that allows you to transfer trust between Telegram and Discord.

=========
Concordia
=========

Concordia is an example solution built on Web3 ID. It allows you to transfer trust between Telegram and Discord. Using verifiable credentials in the |bw|, you can prove ownership of accounts on Telegram and Discord. This is done by allowing users to link their accounts and, optionally, real name. You can also ``/check`` and ``/verify`` other users in Telegram and Discord. In other words, if you know John Doe in one platform, you can also trust him in the other platform using his verifiable credentials.

To issue credentials and perform verification that these are your credentials, you can use the Concordia Social media verifier. The Concordia Social media verifier performs all the steps needed for you to allow transfer of trust of your user between platforms.

`Concordia social media verifier on Mainnet <https://concordia.mainnet.concordium.software/>`_

`Concordia social media verifier on Testnet <https://concordia.testnet.concordium.com/>`_

To get started, log in with your social media account to get verifiable credentials for your accounts (e.g. one for Discord, one for Telegram) in the **Issue credentials** drop-down.

In the **Verification** drop-down, you prove ownership of the social media accounts for the verifiable credentials you added to your |bw|.

The Concordia Social media verifier provides links to check that your verification was completed successfully in the **Check verification** drop-down.

If you want to remove your verification, click **Remove verification** in the Concordia Social media verifier and select the social media platform for which you hold credentials in the wallet. For example, if you want to remove verification with verifiable credentials issued for Telegram then you would select Telegram.

Note that after verification was removed, it is not possible to prove ownership over Telegram or Discord accounts unless the process of verification is done again.

Concordium's bots
=================

To verify that you are using the real Concordium bots configured in our channels, use this reference:

Telegram - Mainnet - @ConcordiaWeb3IDBot

Discord- Mainnet - Concordia#0667
You can use `this link for Discord <https://discord.com/api/oauth2/authorize?client_id=1149262289619402842&permissions=3072&scope=bot+applications.commands>`__ to invite this bot to your server.

There is an example of independent issuers with the user interface that can be used to issue verifiable credentials for the account that is owned on the social media network. After verifiable credentials are issued, they can be used to prove ownership of social media accounts and transfer trust between them by using Concordia social media verifier on `Testnet <https://concordia.testnet.concordium.com/>`__ or `Mainnet <https://concordia.mainnet.concordium.software/>`__.

On Mainnet, use the links below:

`Telegram issuer on Mainnet <https://telegram-web3id.mainnet.concordium.software/>`_

`Discord issuer on Mainnet <https://discord-web3id.mainnet.concordium.software/>`_
