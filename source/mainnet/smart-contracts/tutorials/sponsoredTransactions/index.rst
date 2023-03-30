.. include:: ../../../variables.rst
.. _sponsoredTransactions:

.. image:: sponsoredTransactions.png
   :width: 40%
   :align: center
   :alt: An eSealing dApp

=============================
A Sponsored Transactions dApp
=============================

In this tutorial, you are going to get familiar with sponsored transactions,
how to send a transaction from a back-end server to the blockchain, and how to connect your |mw-gen2| via walletConnect to the front-end.

What are sponsored transactions?
================================

Sponsored transactions are a useful tool for third-party service providers to onboard conventional clients/users that
don't want to acquire crypto (such as CCD) from an exchange.
The third-party can have a traditional fiat channel open (off-chain) with the conventional clients/users to charge for its service of
offering to submit transactions on behalf of the user on-chain. The user/client
has to sign its intended transaction in the |bw| (or |mw-gen2| that uses WalletConnect) before
communicating the signature to the third-party back-end (often paying some fees in fiat money). The third-party
service provider has its own wallet funded with some CCD at the back-end to submit the user's transaction on-chain.
The third-party pays the transaction fee to execute the transaction on-chain.

Concordium smart contracts currently have no way to query the corresponding
public key(s) of an account within the smart contract code.
For the time being, Concordium suggests using a `public_key_registry`
that allows only the owner of the contract instance (or the account itself) to register a public key for a given account. You can explore
such a registry in the
`sponsored transaction example <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis3-nft-sponsored-txs/src/lib.rs>`_.
In the above smart contract, once an account has a public key registered, the mapping between the public key and the account can not be
updated anymore.

.. note::
   The Concordium team is working on exposing the public key within the smart
   contract code and this feature is planned to be included in the next protocol update.
   After that protocol update, the `public_key_registry` will not be necessary anymore.

.. toctree::
   :hidden:
   :maxdepth: 1

   Exploring the sponsored Transactions dapp <./sponsoredTransactions_dapp.rst>
   Wallet Connect <./walletConnect.rst>
