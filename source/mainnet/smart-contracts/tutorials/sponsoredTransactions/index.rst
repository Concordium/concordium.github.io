.. include:: ../../../variables.rst
.. _sponsoredTransactions:

.. image:: sponsoredTransactions.png
   :width: 40%
   :align: center
   :alt: An eSealing dApp

=============================
A Sponsored Transactions dApp
=============================

In this tutorial, you are going to get familiar with how to implement a sponsored transaction mechanism in a smart contract, how to sign messages in a wallet and verify the signature in the smart contract,
how to send a transaction from a backend server to the blockchain, and how to connect your |mw-gen2| via walletConnect to the frontend.

The dApp consists of three components that you will explore as part of this tutorial:

- A `smart contrat` that verifies signatures.

- A `frontend` that requests the user to sign messages.

- A `backend` that sends transactions to the blockchain.

What are sponsored transactions?
================================

It is a mechanism for a sponsor address (third-party) to submit a transaction
to a smart contract on behalf of a sponsoree account (user/client). The user/client
should sign its intended action in the |bw| (or |mw-gen2| that uses WalletConnect) to authorize the third-party to execute a specific action on its behalf.
After the user/client signed its action, the signature is communicated to the third-party. The third-party account (invoker to the smart contract)
pays for the transaction fees and submits the transaction on-chain. The signature is verified in the smart
contract to ensure the action was authorized by the user/client.

What are the use cases of sponsored transactions?
=================================================

Sponsored transactions are a useful tool for third-party service providers to onboard conventional clients/users that
don't want to acquire crypto (such as CCD) from an exchange.
The third-party can have a traditional fiat channel open (off-chain) with the conventional clients/users to charge for its service of
offering to submit transactions on behalf of the user on-chain.The third-party
service provider has its own wallet funded with some CCD at the backend to submit the user's transaction on-chain.
The third-party pays the transaction fee to execute the transaction on-chain.


.. note::
   The `CIS-3 standard <https://proposals.concordium.software/CIS/cis-3.html>`_ formally defines sponsored transactions.

.. toctree::
   :hidden:
   :maxdepth: 1

   Exploring the sponsored Transactions Smart Contract <./sponsoredTransactionsSmartContract.rst>
   Exploring the sponsored Transactions dApp <./sponsoredTransactionsFrontendAndBackend.rst>
   Wallet Connect <./walletConnect.rst>
