.. _plt-devnet-connection:

=================
Connect to DevNet
=================

This guide explains how to configure your DevNet Browser Wallet to connect to Concordium's DevNet.

Before you begin
================

.. note::
   To connect to DevNet, you must first have an account on Testnet. This is because the Custom Network option in the wallet only becomes available after you have created at least one account on Testnet. If you don't already have a Testnet account, please `create one following the standard Concordium wallet setup process <https://developer.concordium.software/en/mainnet/net/browser-wallet/setup-browser-wallet.html>`_ before continuing with this guide.

Connect to DevNet
=================

Follow these steps to configure your wallet to connect to DevNet:

1. Open the wallet extension in your browser and click on the menu button

   .. image:: ../setup-guide/Images/wallet-main-menu.png
      :alt: Opening the wallet menu
      :width: 50%

2. Click on **Network**

   .. image:: ../setup-guide/Images/verify-connection.png
      :alt: Opening network options
      :width: 50%

3. Select *Custom Network* (this option will only be available if you already have a Testnet account) and fill in the following connection details:

   - Genesis Hash: ``fb035b994852a9e246e1f48ffd7ab83e6f0ec5fff1f3ced6e5af2373227c2733``
   - Node Address: ``https://grpc.devnet-plt-alpha.concordium.com``
   - Node Port: ``20000``
   - Wallet Proxy: ``https://wallet-proxy.devnet-plt-alpha.concordium.com``
   - CCDScan URL: ``https://devnet-plt-alpha.ccdscan.io``

   .. image:: ../setup-guide/Images/custom-network-connection-details.png
      :alt: Opening the wallet menu
      :width: 50%

4. Verify connection: Once connected, you'll see a lock icon next to "Custom Network" – that means the connection is successful!


