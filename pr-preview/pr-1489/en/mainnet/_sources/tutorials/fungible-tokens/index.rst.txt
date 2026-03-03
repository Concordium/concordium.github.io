.. _ft-index:

====================
Mint fungible tokens
====================

In this tutorial, you are going to mint and burn fungible tokens on the Concordium blockchain, send them to multiple accounts, and test the balances. Before starting, you need to understand the CIS-2_ standard.


Concordium Interoperability Standard (CIS-2)
============================================

Unlike some other Layer-1 token standards, CIS-2_ represents more than one type of token with one standard including fungible tokens, non-fungible tokens, semi-fungible tokens, and soulbound tokens. You can read more information about the `implementation of the CIS-2 standard library at this link <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/concordium-cis2/src/lib.rs>`_.

A standard interface for both fungible and non-fungible tokens is implemented in a smart contract. The interface provides functions for transferring token ownership; allowing other addresses to transfer tokens; and querying token balances, operators and token metadata. It allows off-chain applications to track token balances and the location of token metadata using logged events.

.. Attention::

   Before starting the next steps, make sure that you have :ref:`setup the developer environment<setup-env>` with the tools needed.

.. toctree::
   :hidden:
   :maxdepth: 1
   :caption: Fungible token minting

   smart-contract
   mint-xfer

.. _CIS-2: https://proposals.concordium.software/CIS/cis-2.html
