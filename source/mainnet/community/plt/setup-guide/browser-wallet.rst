.. _plt-browser-wallet:

Browser Wallet setup for DevNet
===============================

This guide explains how to download and install the custom DevNet Browser Wallet, which is required for connecting to Concordium's DevNet environment and working with Protocol Layer Tokens (PLTs).

About the DevNet Browser Wallet
-------------------------------

The DevNet Browser Wallet is a special edition of the Concordium Browser Wallet that supports connections to custom networks, including DevNet. This version is required as the standard Browser Wallet only connects to Mainnet and Testnet.

Download and installation
-------------------------

Follow these steps to install the custom DevNet Browser Wallet:

1. **Download the DevNet Browser Wallet**

   Download `Browser Wallet v2.2.1 <https://distribution.concordium.software/devnet/concordium-browser-wallet-2.2.1.zip>`_, the custom version that allows connection to DevNet.

   .. note::
      This feature will be incorporated into the standard Browser Wallet in future versions, but currently requires this special edition.

2. **Unzip the downloaded file**

   Extract the contents of the zip file to a location on your computer.

3. **Add to Chrome browser**

   a. In Chrome, navigate to *Extensions* → *Manage Extensions*
   b. Enable Developer Mode using the toggle in the top-right corner
   c. Click **Load Unpacked** and select the unzipped folder containing the wallet files

4. **Verify installation**

   After successful installation, the Concordium Browser Wallet icon will appear in your browser's extension toolbar.

Next steps
----------

After installing the DevNet Browser Wallet, your next steps are:

1. :doc:`Connect to DevNet <devnet-connection>` by configuring your wallet with the correct network parameters
2. Create an identity and account on DevNet
3. :doc:`Request test CCD <request-ccd>` for transactions

.. note::
   Before connecting to DevNet, you need to create an account on Testnet to unlock the network selection functionality in the wallet. After that, you can access the Custom Network option to connect to DevNet.
