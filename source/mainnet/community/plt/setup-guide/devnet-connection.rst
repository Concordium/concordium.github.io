.. _plt-devnet-connection:

Connect to DevNet
=================

This guide explains how to configure your DevNet Browser Wallet to connect to Concordium's DevNet environment and how to create an identity and account for working with Protocol Layer Tokens (PLTs).

Before you begin
----------------

.. note::
   To connect to DevNet, you must first have an account on Testnet. This is because the Custom Network option in the wallet only becomes available after you have created at least one account on Testnet. If you don't already have a Testnet account, please `create one following the standard Concordium wallet setup process <https://developer.concordium.software/en/mainnet/net/browser-wallet/setup-browser-wallet.html>`_ before continuing with this guide.

Connect to DevNet
-----------------

Follow these steps to configure your wallet to connect to DevNet:

1. Open the wallet extension in your browser.

   .. image:: images/wallet-main-menu.png
      :alt: Opening the wallet menu
      :width: 50%

2. Go to *Custom Network* option in the wallet (this option will only be available if you already have a Testnet account).
3. Fill in the following connection details:

   - Genesis Hash: ``fb035b994852a9e246e1f48ffd7ab83e6f0ec5fff1f3ced6e5af2373227c2733``
   - Node Address: ``https://grpc.devnet-plt-alpha.concordium.com``
   - Node Port: ``20000``
   - Wallet Proxy: ``https://wallet-proxy.devnet-plt-alpha.concordium.com``
   - CCDScan URL: ``https://devnet-plt-alpha.ccdscan.io`` (can be left blank - It will be supported in the next releases)

   .. image:: images/custom-network-connection-details.png
      :alt: Opening the wallet menu
      :width: 50%

4. Verify connection: Once connected, you'll see a lock icon next to "Custom Network" – that means the connection is successful!

Create your DevNet Identity
---------------------------

After connecting to DevNet, follow these steps to create your identity:

1. In the wallet, go to *Identities*
2. Press **+** to add a new identity
3. Choose **identity provider**: Select **Generated IP 0**
4. Complete identity verification:

   - You'll be redirected to a Testnet-style ID page
   - Use the following credentials:
     - Username: ``devnet-plt-alpha``
     - Password: ``peachy2025``

5. Complete the identity registration process
6. Return to the wallet when finished

Create your DevNet Account
--------------------------

Once you have created your identity, you can create an account:

1. Go to *Accounts* in the wallet
2. Press **+** to create a new account
3. Select your new identity that you just created
4. Create a new account

After completing these steps, you are now connected to DevNet with a working account and ready for the next step: requesting test CCD for transactions.

Next steps
----------

After connecting to DevNet and creating an identity and account, your next step is to :doc:`request test CCD <request-ccd>` needed for transactions.


