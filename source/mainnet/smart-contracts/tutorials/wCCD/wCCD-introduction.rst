.. _wCCD-introduction:

=====================================
Understanding the wCCD token protocol
=====================================

Introduction
------------

The native currency on the Concordium blockchain is CCD. When other tokens are
built on the Concordium blockchain, they often apply the recommended CIS-2
token standard. This has the advantage that other dApps (decentralized apps)
can rely on some basic rules on how to correctly interact with the CIS-2
tokens and on some basic rules on what events and data the apps can be retrieved from the CIS-2 tokens.
Unfortunately, the native currency CCD has a special intention in the Concordium
blockchain network and does not comply with the CIS-2 token standard.

Implementing two interfaces (one for CCD and another for CIS-2 tokens)
within the same smart contract can be cumbersome for developers and adds
complexity. We need a process that converts CCD into a token that is CIS-2
compliant so dApps can interact with it easily. For example, decentralized
exchanges depend on the wCCD token because the wCCD token allows you to trade
your CCD for other CIS-2 tokens seamlessly.

Wrapping CCD refers to the process of converting the native currency CCD into
a CIS-2 compliant token (wCCD) at a 1:1 ratio by sending CCD to the wCCD smart
contract and getting wCCD in return. Unwrapping CCD refers to the opposite process of converting the CIS-2
compliant wCCD token at a 1:1 ratio back to the native currency CCD by sending
wCCD to the wCCD smart contract and getting CCD in return.

wCCD is a token minted(created) by the wCCD smart contract when you call the ``wrap`` function.
wCCD is burned(destroyed) by the wCCD smart contract when you call the ``unwrap`` function.
The circulating supply of the wCCD token is backed 1:1
by the CCD balance on the wCCD smart contract.


Protocol contract addresses
---------------------------

The Concordium foundation maintains the canonical wCCD smart contract protocol and promotes its
usage to create a coherent overall smart contract ecosystem on the Concordium blockchain.

The canonical wCCD smart contract protocol following the CIS-2 standard is deployed on ``testnet`` at the following addresses:

``ProxyAddress (Testnet)`` = ContractAddress { index: 652, subindex: 0 }

``ImplementationAddress (Testnet)`` = ContractAddress { index: 651, subindex: 0 }

``StateAddress (Testnet)`` = ContractAddress { index: 650, subindex: 0 }


The canonical wCCD smart contract protocol following the CIS-2 standard is deployed on ``mainnet`` at the following addresses:

``ProxyAddress (Mainnet)`` = coming soon

``ImplementationAddress (Mainnet)`` = coming soon

``StateAddress (Mainnet)`` = coming soon

The ``proxy`` smart contract is the entry point for all your interactions with the protocol.
It holds the CCD funds and logs events.

You have read all information to begin interacting with the protocol on testnet now.
Before you start, make sure you have access to a testnet node, installed the ``concordium-client``,
created an account in the mobile wallet app that is funded with some CCD, and imported the keys to that account
into the ``concordium-client`` configuration. If you haven't completed any of the above steps please go back to
the piggy bank tutorial :ref:`part 3 <piggy-bank-preparing>`
or :ref:`part 4 <piggy-bank-deploying>` that will guide you through these setup steps.

To continue with the tutorial click :ref:`here<wCCD-interacting>`.
