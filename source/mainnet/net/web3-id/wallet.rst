.. _web3id-wallet:
.. include:: ../../variables.rst

=====================
Web3 ID in the |bw|
=====================

Web3 :ref:`verifiable credentials<glossary-verifiable-credential>` are available in the |bw|.

Add verifiable credentials to the wallet
========================================

When choosing to add verifiable credentials from an issuer, make sure that you *trust* the issuer.

#. Contact the issuer of the verifiable credentials using the dApp the issuer provides and provide the information requested by the issuer.

#. The issuer sends a request to your |bw| to issue a verifiable credential. Click **Cancel** to stop the process or click **Add credential** to continue. You will see the verifiable credential as **Pending**.

    .. image:: ../images/browser-wallet/add-web3id-credential.png
        :alt: window with pending credential and option buttons
        :width: 50%

#. If you click **Add credential**, this generates a transaction. If you **Reject** the request, the process stops here. If you **Sign & submit** the request, a public key is sent from your wallet to the issuer so that the issuer can put the verifiable credential on chain.

        .. image:: ../images/browser-wallet/add-web3id-credential-sign.png
            :alt: window with transaction details and option buttons
            :width: 50%

Backup verifiable credentials
=============================

#. Click |hamburger-bw| and select **Verifiable credentials**.

#. Click |actions-bw| and select **Download export file**. This saves the verifiable credentials in a file in your downloads folder by default.

Revoke verifiable credentials
=============================

In some cases, the issuer of the verifiable credential may allow you to revoke a credential yourself in your |bw| if you no longer need it.

#. Click |hamburger-bw| and select **Verifiable credentials**.

#. Click on the verifiable credential to revoke.

#. Click ? and select **Revoke**.

Recover verifiable credentials
==============================

#. Click |hamburger-bw| and select **Verifiable credentials**.

#. Click |actions-bw| and select **Open import window**.

#. Navigate to the location that the **web3IdCredentials.export** file is located and select the file.

Use verifiable credentials
==========================

In cases where a verifier asks to prove your verifiable credentials, you are asked to prove or reveal information in the |bw|. Proofs or revealing information can be:

- Only verifiable credentials
- Only account credentials
- A mix of verifiable and account credentials

You can choose which account (and thus identity) and/or verifiable credential to use to prove/reveal the requested attributes.

For more information, see :ref:`Proofs and revealing information<secret-proofs>`.

.. |hamburger-bw| image:: ../images/browser-wallet/hamburger-menu.png
                    :width: 20px
                    :alt: three horizontal lines

.. |actions-bw| image:: ../images/browser-wallet/page-actions.png
                    :width: 20px
                    :alt: three horizontal lines
