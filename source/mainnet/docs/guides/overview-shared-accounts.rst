
.. _overview-shared-accounts:

=======================================================================
Shared accounts with multiple credentials in Desktop Wallet
=======================================================================

In the Desktop Wallet, you have the option of creating shared accounts, also known as multi-signature accounts. This is useful, for example, if your organization wants to allow multiple people to manage an account, or if you’re part of a group of people who want to share an account. In these cases, more credentials must be added to an account.

Credentials
===========

It’s the credentials on an account that determine who’s allowed to sign transactions. An account credential holds signature verification keys, information related to the :term:`Privacy Guardians<Privacy Guardian (PG)>`, and the public :term:`attributes` of the account owner. The credential proves that the account owner has been verified by an :term:`identity provider`, but it doesn’t identify the account owner to the identity provider. However, in the case of a valid request from a government authority via established legal channels, it allows the Privacy Guardians and the identity provider, when they work together, to link the account to the users. For more information, see :ref:`Identity framework on Concordium <reference-identity>`.

Signature threshold
===================

Once you’ve added more credentials on an account, you can also specify the number of signatures that are needed to sign a transaction. This is the signature threshold. For example, three users can have a shared account where two of them are needed to authorize a transaction, or three users can have a shared account where only one of them is needed to authorize a transaction.

Share accounts
==============

The following is an overview of the tasks that are needed to add more credentials to an account with links to more information about each task.

Step 1
------

A user creates the account that's going to be used as a shared account.
See :ref:`Create an account in the Desktop Wallet <create-account>`.

Step 2
------

The account owner shares the account address with the user or users whose credentials are going to be added to the account.

Step 3
------

The users whose credentials are going to be added to the shared account generates a file with credentials that are associated with the account. The user sends the file to the initial account owner. See :ref:`Create a credentials file <create-credentials-file>`

Step 4
------

The initial account owner imports the file and adds the credentials to the account. If needed, the user changes the signature threshold. See :ref:`Add credentials to an account <multi-credentials>`.

.. toctree::
   :hidden:
   :maxdepth: 1

   ../desktop-wallet/create-credentials-file
   ../guides/multi-credentials
   ../desktop-wallet/multisig-simple-transfer
   multisig-transfer
   ../desktop-wallet/sign-transaction
   ../desktop-wallet/proposed-transactions
