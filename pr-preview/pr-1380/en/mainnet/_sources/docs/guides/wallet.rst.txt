.. _web3id-wallet:
.. include:: ../../variables.rst

.. meta::
    :description lang=en:
        Web3 ID allows you to add and use verifiable credentials in the wallet for interactions with services that require verification.

=====================
Web3 ID in the |bw|
=====================

Web3 :term:`verifiable credentials<verifiable credential>` are available in the |bw|. They might have any of the following states:

- Pending: the verifiable credential is in the process of being issued
- Active: the verifiable credential is issued and valid
- Revoked: the verifiable credential is no longer valid because the holder or issuer has canceled it
- Not activated: the verifiable credential is issued but is not yet active because its *valid from date* has not passed, e.g. a concert ticket
- Expired: the verifiable credential is past the *valid until date*, e.g. a concert ticket

Add verifiable credentials to the wallet
========================================

When choosing to add verifiable credentials from an issuer, make sure that you *trust* the issuer to whom you are revealing information about yourself.

#. Contact the issuer of the verifiable credentials using the dApp the issuer provides and provide the information requested by the issuer.

#. The issuer sends a request to your |bw| to issue a verifiable credential. Click **Cancel** to stop the process or click **Add credential** to continue. You will see the verifiable credential as **Pending**.

    .. image:: ../../docs/images/browser-wallet/add-web3id-credential.png
        :alt: window with pending credential and option buttons
        :width: 50%

To see the details of the verifiable credential:

#. Click |hamburger-bw| and select **Verifiable credentials**.

#. Click on the verifiable credential card.

#. Click |actions-bw| and select **Details**.

    .. image:: ../../docs/images/browser-wallet/vc-details.png
        :alt: window with card showing details of the verifiable credential
        :width: 50%

Backup verifiable credentials
=============================

#. Click |hamburger-bw| and select **Verifiable credentials**.

#. Click |actions-bw| and select **Download export file**. This saves the verifiable credentials in a file called *web3IdCredentials.export* in your downloads folder by default.

Revoke verifiable credentials
=============================

In some cases, the issuer of the verifiable credential may allow you to revoke a credential yourself in your |bw| if you no longer need it.

#. Click |hamburger-bw| and select **Verifiable credentials**.

#. Click on the verifiable credential card to revoke.

#. Click |actions-bw| and select **Revoke**.

#. Review the transaction information and click **Send**.

Recover verifiable credentials
==============================

#. Click |hamburger-bw| and select **Verifiable credentials**.

#. Click |actions-bw| and select **Open import window**.

#. Click **Select file to import**. Navigate to the location that the *web3IdCredentials.export* file is located and select the file.

    .. image:: ../../docs/images/browser-wallet/vc-import.png
        :alt: window with button to navigate to import file location
        :width: 50%

#. The verifiable credentials that could be imported from the file are added to the wallet.

Use verifiable credentials
==========================

In cases where a verifier asks to prove your verifiable credentials, you are asked to generate a :term:`verifiable presentation` in the |bw| to prove or reveal information. Proofs or revealing information can be:

- Only verifiable credentials
- Only account credentials
- A mix of verifiable and account credentials

You can choose which account (and thus identity) and/or verifiable credential to use to prove/reveal the requested attributes.

It is important to understand the difference between a proof request and a reveal request. For more information, see :ref:`Proofs and revealing information<secret-proofs>`.

In the case below, the proof from the verifier is a mixed proof that requests you reveal the degree name and you prove that were born within a date range. This is a mixed proof because it asks you to reveal and prove information, and also because it asks to prove/reveal information from your verifiable credential and your account credential. Because your date of birth is not in the date range that statement cannot be proven and your only option is to reject the request. You never see the reveal request because you do not meet the requirement from the other part of the proof.

.. image:: ../../docs/images/browser-wallet/proof-not-proved.png
    :alt: window with button to reject proof request
    :width: 50%

Another example of a mixed proof includes a request to prove information from your verifiable credential and from your identity. The first screen is requesting you prove information from your verifiable credential. Click **Continue**.

.. image:: ../../docs/images/browser-wallet/vc-mixed-proof-1.png
    :alt: window with verifiable credential proof and continue button
    :width: 50%

The second screen is requesting you prove information from your account credential. You can choose which account (and thus identity) you want to use for the proof. Click **Approve** if you agree to prove the information. Click |reject| to reject the proof request.

.. image:: ../../docs/images/browser-wallet/vc-mixed-proof-2.png
    :alt: window with account credential proof and approve button
    :width: 50%

These are just a few examples of how you might see proof requests in the |bw|, but the possibilities for what a verifier might request are limitless for verifiable credentials. The identity provider issued attributes that can be revealed from :term:`account credentials<account credential>` are:

- First name
- Last name
- Sex
- Date of birth
- Country of residence
- Country of nationality
- ID document type
- ID document number
- ID document issuer
- ID valid from
- ID valid to
- National ID number
- Tax ID number



.. |hamburger-bw| image:: ../../docs/images/browser-wallet/hamburger-menu.png
    :width: 20px
    :alt: three horizontal lines

.. |actions-bw| image:: ../../docs/images/browser-wallet/page-actions.png
                    :width: 20px
                    :alt: three horizontal lines

.. |reject| image:: ../../docs/images/browser-wallet/vc-reject-proof-button.png
                    :width: 20px
                    :alt: white x on red background
