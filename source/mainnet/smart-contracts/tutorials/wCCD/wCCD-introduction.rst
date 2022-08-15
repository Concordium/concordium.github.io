.. _wCCD-introduction:

=====================================
Understanding the wCCD token protocol
=====================================

The native currency on the Concordium blockchain is CCD. When other tokens are
built on the Concordium blockchain, they often use the recommended ``CIS-2``
token standard. This has the advantage that other dApps (decentralized apps)
can rely on some basic rules on how to interact with the ``CIS-2``
tokens and on some basic rules on how the apps can retrieve events and data from the ``CIS-2`` tokens.
The native currency CCD has a special intention in the Concordium
blockchain network and does not comply with the ``CIS-2`` token standard.

.. note::

    The `CIS-2 standard <https://proposals.concordium.software/CIS/cis-2.html>`_
    can represent fungible and non-fungible tokens.
    It combines the Ethereum ``ERC20`` and ``ERC721`` standards with some modifications.
    The `CIS-2 library <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/concordium-cis2/src/lib.rs>`_
    is meant to be imported by ``CIS-2`` tokens.
    Please explore the four ``CIS-2`` token standard implementation examples in the Concordium
    smart contract repo:

    - `wccd <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-wccd/src/lib.rs>`_
    - `upgradable wccd <https://github.com/Concordium/concordium-rust-smart-contracts/pull/128>`_
    - `nft <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-nft/src/lib.rs>`_
    - `multi <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-multi/src/lib.rs>`_


Implementing two interfaces (one for CCD and another for ``CIS-2`` tokens)
within the same smart contract can be cumbersome for developers and adds
complexity. We need a process that converts CCD into a token (named wCCD) that is ``CIS-2``
compliant so dApps can interact with it easily. For example, decentralized
exchanges depend on the wCCD token because the wCCD token allows you to trade
your CCD for other ``CIS-2`` tokens seamlessly.

Wrapping CCD refers to the process of converting the native currency CCD into
a ``CIS-2`` compliant token (wCCD) at a 1:1 ratio by sending CCD to the wCCD smart
contract and getting wCCD in return.
You send some CCD to the ``wrap`` function in the wCCD smart contract and it mints the same amount of
wCCD tokens to your specified receiver address.
wCCD is a token minted(created) by the wCCD smart contract when you invoke the ``wrap`` function.

Unwrapping CCD refers to the opposite process of converting the ``CIS-2``
compliant wCCD token at a 1:1 ratio back to the native currency CCD by burning the
wCCD token in the wCCD smart contract and getting CCD in return.
You invoke the ``unwrap`` function in the wCCD smart contract with the amount of wCCD that you want to burn
and the wCCD smart contract sends the same amount in CCD back to your specified address while burning your wCCD tokens.
wCCD is burned(destroyed) by the wCCD smart contract when you invoke the ``unwrap`` function.

The circulating supply of the wCCD token is backed 1:1
by the CCD balance on the wCCD smart contract.

Protocol contract addresses
---------------------------

The Concordium foundation maintains the canonical wCCD smart contract protocol and promotes its
usage to create a coherent overall smart contract ecosystem on the Concordium blockchain.

.. note::

    The below testnet addresses are an early version of the wCCD contract protocol.
    They will be updated when the protocol is finalized and some minor changes can be expected.

The canonical wCCD smart contract protocol following the ``CIS-2`` standard is deployed on ``testnet`` at the following addresses:

``ProxyAddress (Testnet)`` = ContractAddress { index: 652, subindex: 0 }

``ImplementationAddress (Testnet)`` = ContractAddress { index: 651, subindex: 0 }

``StateAddress (Testnet)`` = ContractAddress { index: 650, subindex: 0 }


The canonical wCCD smart contract protocol following the ``CIS-2`` standard is deployed on ``mainnet`` at the following addresses:

.. note::

    Deployment on mainnet will follow once a partner has been chosen to manage the deployment.

``ProxyAddress (Mainnet)`` = coming soon

``ImplementationAddress (Mainnet)`` = coming soon

``StateAddress (Mainnet)`` = coming soon

The ``proxy`` smart contract is the entry point for all your interactions with the protocol.
It holds the CCD funds and logs events.

You have read all information to begin interacting with the protocol on testnet now.
To continue with the tutorial click :ref:`here<wCCD-interacting>`.
