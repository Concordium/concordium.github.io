.. include:: ../../variables.rst
.. _IP address: https://en.wikipedia.org/wiki/IP_address
.. _port number: https://en.wikipedia.org/wiki/Port_(computer_networking)
.. _company-identities:

=========================
Company identity creation
=========================

A company identity is for companies that need an identity and accounts on the Concordium blockchain, but don't want that identity to belong to a specific person. Company identities are therefore issued with documents that identify the company and not an individual. Company identities are only relevant for a few companies, such as crypto exchanges.

Company identities can only be created through the |bw| or |cryptox| using Global FinReg as the identity provider. You cannot use the Desktop Wallet for this purpose.

The information below describes how to create a company identity, how to create accounts with a company identity, and how to recover a company identity. If you experience issues, please contact Concordium’s technical support via support@concordium.software.

Request identity
================

To create a company identity using Global FinReg, first :ref:`download <downloads-cryptox>` the |bw| or the |cryptox|, then follow the steps outlined below.

Initiate the request from a Concordium wallet
---------------------------------------------

* Open the |bw| or |cryptox|

* In the main menu, click on **Identities**.

   .. image:: images/wallet-globalfinreg-identities-menu.png
      :alt: Concordium wallet screen showing the Identities option in the main menu

* Click on the plus sign (+) to request a new identity.

   .. image:: images/wallet-globalfinreg-add-identity.png
      :alt: Concordium wallet screen showing the plus sign to add a new identity

* Select **Global FinReg** from the identity provider options. This initiates a request and opens a new webpage on the Global FinReg platform.

   .. image:: images/walllet-globalfinreg-provider-selection.png
      :alt: Concordium wallet screen showing the Global FinReg option selection

Complete verification
---------------------

* Log in to your existing Global FinReg account or sign up for a new account.

* Enter your company's `Legal Entity Identifier (LEI code) <https://www.lei-worldwide.com/what-is-a-legal-entity-identifier.html>`_. Alternatively, you can enter the entity details of the company.

* Upload entity documents from a primary source that are no older than three months. Acceptable documents include:

   * Business registry documents
   * Documents from a financial supervisory authority (FSA)

* Provide information about the company's Ultimate Beneficial Owner (UBO) or Authorized Signatory.

.. note::

   A UBO is generally defined as an individual who holds a minimum of 10-25% (depending on jurisdiction) of capital or voting rights in the underlying entity.

* Verify the UBO or Authorized Signatory through the online verification tool using a passport or driver's license.

Finalize validation and create accounts
---------------------------------------

* Navigate to the account management tab in Global FinReg.

* Review all submitted documents and information for accuracy.

* If all information is correct, click **Approve** to finalize the verification process.

* Upon approval, your wallet ID will be validated and ready for use on the Concordium blockchain.

After completing these steps, you can use your company identity to create accounts on the Concordium blockchain as described in the :ref:`Create account<create-account>` guide.

Identity recovery
=================

Since identities are created directly through the |bw| or |cryptox|, identity recovery is performed through the wallet recovery process.

For detailed instructions on wallet recovery, please refer to the :ref:`recover your wallet <backup-import-recover>` guide.
