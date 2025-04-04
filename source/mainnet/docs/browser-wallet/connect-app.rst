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

   #. Tap the scan QR code button in the upper right of the main screen.
   #. When prompted to connect, tap **Allow** to continue using your account with the dApp.

      .. image:: ../images/cryptoX/cryptox-connect-dapps1a.png
            :alt: screen with text boxes for each account
            :width: 50%

   #. After making your purchase in a dApp, confirm the purchase in the |cryptox|. On the sign transaction screen, review the transaction details. Tap **Sign** if you approve the transaction.

      .. image:: ../images/cryptoX/cryptox-connect-dapps2a.png
         :alt: screen with information about session and options to accept or decline
         :width: 50%

   #. When the transaction is submitted, tap **Finish** to return to the main screen.

      .. image:: ../images/cryptoX/cryptox-connect-dapps3a.png
         :alt: screen with information about session and options to accept or decline
         :width: 50%


.. dropdown:: |bw|

   To initiate a request to connect to a dApp within the |bw|:

   #. In the browser, navigate to your dApp's frontend interface and make a connection request to your wallet.

   #. A connection request window opens in your wallet. Review the details and click **Connect** to approve acess for the dApp.

      .. image:: ../images/browser-wallet/new/connect_dApp.png
         :alt: window with a site and Connect text
         :width: 50%


      To view or manage the connection status of your account, click **See list** under *Connected accounts* on the account card.

      .. image:: ../images/browser-wallet/new/see_list.png
         :width: 50%
         :alt: account card

      To disconnect a dApp, find it in the *Connected sites* list and click **Disconnect**.

      .. image:: ../images/browser-wallet/new/disconnect_dApp.png
         :width: 50%
         :alt: account card

.. note::

      If you want to try to connect to a dApp to see how the functionality works, go to https://wccd.testnet.concordium.com/ and connect to it following the steps above. You can then use the dApp to connect to your account and see the behavior.

.. toctree::
   :hidden:

   ../guides/proofs

