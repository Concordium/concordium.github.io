.. _web3id-wallet:
.. include:: ../../variables.rst

=====================
Web3 ID in the |bw|
=====================

Web3 verifiable credentials are available in the |bw|.

Add credentials to the wallet
=============================

When choosing to add verifiable credentials from an issuer, make sure that you *trust* the issuer.

#. Contact the issuer of the credentials using the dApp the issuer provides and provide the information requested by the issuer.

#. The issuer sends a request to your |bw| to issue a verifiable credential. Click **Cancel** to stop the process or click **Add credential** to continue. You will see the verifiable credential as **Pending**.

#. If you continue, this generates a transaction. If you **Reject** the request, the process stops here. If you **Sign & submit** the request, a public key is sent from your wallet to the issuer so that the issuer can put the credential on chain.

Backup credentials
==================

#. Click |hamburger-bw| and select **Verifiable credentials**.

#. Click |actions-bw| and select **Download export file**. This saves the verifiable credentials in a file in your downloads folder.



Revoke credentials
==================

In some cases, the issuer of the verifiable credential may allow you to revoke a credential yourself in your |bw| if you no longer need it.

#. Click |hamburger-bw| and select **Verifiable credentials**.

#. Click on the verifiable credential to revoke.

#. Click ? and select **Revoke**.

Recover credentials
===================

#. Click |hamburger-bw| and select **Verifiable credentials**.

#. Click |actions-bw| and select **Open import window**.

#. 


.. |hamburger-bw| image:: ../images/browser-wallet/hamburger-menu.png
                    :width: 20px
                    :alt: three horizontal lines

.. |actions-bw| image:: ../images/browser-wallet/page-actions.png
                    :width: 20px
                    :alt: three horizontal lines
