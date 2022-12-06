.. include:: ../../variables.rst
.. _connect-app-bw:

===================================
Connect dApps to the |bw|
===================================

You can connect the |bw| to a dApp that has a front-end interface. You can initiate the request from within the |bw| or the dApp can initiate a connection request that you must confirm.

To initiate a request to connect to a dApp within the |bw|:

#. In the browser navigate to your dApp's front end interface.

#. Go to the **Accounts** page.

#. Click |gear|.

#. Click **Connected Sites**.

#. Your site appears in the list. Click **Connect**.

   .. image:: ../images/browser-wallet/connect-site.png
            :width: 25%

The status of the account changes to *Connected*. If you need to disconnect, click **Disconnect** to disconnect the account from the dApp.

.. toctree::
   :hidden:

   ../guides/proofs

.. note::

   If you want to try to connect to a dApp to see how the functionality works, go to https://wccd.testnet.concordium.com/ and connect to it following the steps above. You can then use the dApp to connect to your account and see the behavior.

.. |gear| image:: ../images/browser-wallet/account-settings.png
             :alt: gear wheel
             :width: 50px
