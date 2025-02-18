.. include:: ../../variables.rst
.. _connect-app-bw:

===================================
Connect dApps to wallets
===================================

You can connect |cryptox| and |bw| to a `dApp <https://en.wikipedia.org/wiki/Decentralized_application>`__ that has a frontend interface so that you can pay for services.
Connection can be made by either scanning a QR code or from a link to the dApp service.
Then, the dApp can initiate a request that you can confirm from within the wallet.

.. dropdown:: |cryptox|

   To connect your |cryptox| to a dApp:

   #. Tap the scan QR code button in the Accounts overview |scan-qr-overview|.
   #. On the next screen, you can choose the account you want to use. Tap **Allow** to continue using your account with the dApp.

      .. image:: ../images/cryptoX/cryptoX-connect-dapps1.png
            :alt: screen with text boxes for each account
            :width: 50%

   #. After making your purchase in a dApp, confirm the purchase in the |cryptox|. On the sign transaction screen review the transaction details. Tap **Sign** if you approve the transaction.

      .. image:: ../images/cryptoX/cryptoX-connect-dapps2.png
         :alt: screen with information about session and options to accept or decline
         :width: 50%

   #. When the transaction is submitted, tap **Finish** to teturn to the account screen.

      .. image:: ../images/cryptoX/cryptox-connect-dapps3.png
         :alt: screen with information about session and options to accept or decline
         :width: 50%


.. dropdown:: |bw|

   To initiate a request to connect to a dApp within the |bw|:

   #. In the browser navigate to your dApp's frontend interface.

   #. Go to the **Accounts** page.

   #. Click |gear|.

   #. Click **Connected Sites**.

   #. Your site appears in the list. Click **Connect**.

      .. image:: ../images/browser-wallet/connect-site.png
               :width: 50%
               :alt: window with a site and Connect text

   The status of the account changes to *Connected*. If you need to disconnect, click **Disconnect** to disconnect the account from the dApp.

.. note::

      If you want to try to connect to a dApp to see how the functionality works, go to https://wccd.testnet.concordium.com/ and connect to it following the steps above. You can then use the dApp to connect to your account and see the behavior.

.. toctree::
   :hidden:

   ../guides/proofs


.. |scan-qr-acct| image:: ../images/scan-qr-acct.png
             :alt: qr code scanner symbol on blue background
             :width: 50px
.. |scan-qr-overview| image:: ../images/scan-qr-overview.png
                    :alt: qr code scanner symbol
                    :width: 50px
.. |gear| image:: ../images/browser-wallet/account-settings.png
             :alt: gear wheel
             :width: 50px
