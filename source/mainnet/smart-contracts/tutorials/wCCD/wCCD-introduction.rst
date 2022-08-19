.. _wCCD-introduction:

=====================================
Understanding the wCCD token protocol
=====================================

The native currency on the Concordium blockchain is CCD. When other tokens are
built on the Concordium blockchain, they often use the recommended ``CIS-2``
token standard. This has the advantage that other dApps (decentralized apps)
can rely on some basic rules for how to interact with the ``CIS-2``
tokens and on some basic rules for how the apps can retrieve events and data from the ``CIS-2`` tokens.
The native currency CCD has a special purpose in the Concordium
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
complexity. You need a process that converts CCD into a token (named wCCD) that is ``CIS-2``
compliant so dApps can interact with it easily. For example, decentralized
exchanges depend on the wCCD token because the wCCD token can be traded with other ``CIS-2`` tokens.

Wrapping CCD refers to the process of converting the native currency CCD into
a ``CIS-2`` compliant token (wCCD) at a 1:1 ratio by sending CCD to the wCCD smart
contract and getting wCCD in return. The ``wrap`` function accepts an amount of CCD and mints(creates)
the same amount of wCCD tokens. It takes a receiving address as the parameter and transfers
the minted amount of wCCD tokens to this receiver.

Unwrapping CCD refers to the opposite process of converting the ``CIS-2``
compliant wCCD token at a 1:1 ratio back to the native currency CCD by burning(destroying) the
wCCD token in the wCCD smart contract and getting CCD in return.
The ``unwrap`` function takes the amount of tokens to unwrap and burns(destroys) them
before transferring the same amount of CCD to the receiver.

The circulating supply of the wCCD token is backed 1:1
by the CCD balance on the wCCD smart contract.

Protocol contract addresses
---------------------------

The Concordium foundation maintains the canonical wCCD smart contract protocol and promotes its
usage to create a coherent overall smart contract ecosystem on the Concordium blockchain.

The protocol consists of three smart contracts (``proxy``, ``implementation``, and ``state``).
The ``proxy`` contract is the entrypoint for all your interactions with the protocol.
It holds the CCD funds and logs events. The ``proxy`` contract uses the fallback mechanism
to forward any CCD and parameters to the invoked entrypoint on the ``implementation`` contract.
If the ``implementation`` contract returns a value, this will also be returned by the ``proxy``.
This architecture is used to enable upgrades to the logic of the wCCD contract.
It can be used to add additional features and to improve the protocol based on the
newest science and research done at Concordium.

.. note::

    The testnet addresses below are an early version of the wCCD contract protocol.
    They will be updated when the protocol is finalized and some minor changes can be expected.

The canonical wCCD smart contract protocol following the ``CIS-2`` standard
is deployed on ``testnet`` at the following addresses:

+-----------------------------------------------------+-------------------------------------------------+
| ``ProxyContractAddress (Testnet):``                 |  { index: 864, subindex: 0 }                    |
+-----------------------------------------------------+-------------------------------------------------+
| ``ImplementationContractAddress (Testnet):``        |  { index: 865, subindex: 0 }                    |
+-----------------------------------------------------+-------------------------------------------------+
| ``StateContractAddress (Testnet):``                 |  { index: 866, subindex: 0 }                    |
+-----------------------------------------------------+-------------------------------------------------+
|                                                     |                                                 |
+-----------------------------------------------------+-------------------------------------------------+

The canonical wCCD smart contract protocol following the ``CIS-2`` standard is
deployed on ``mainnet`` at the following addresses:

.. note::

    Deployment on mainnet will follow once a partner has been chosen to manage the deployment.

+----------------------------------------------------------+-------------------------------------------------+
| ``ProxyContractAddress (Mainnet):``                      |        coming soon                              |
+----------------------------------------------------------+-------------------------------------------------+
| ``ImplementationContractAddress (Mainnet):``             |        coming soon                              |
+----------------------------------------------------------+-------------------------------------------------+
| ``StateContractAddress (Mainnet):``                      |        coming soon                              |
+----------------------------------------------------------+-------------------------------------------------+
|                                                          |                                                 |
+----------------------------------------------------------+-------------------------------------------------+

You have now read all information necessary to begin interacting with the protocol on testnet.
To continue with the tutorial click :ref:`here<wCCD-interacting>`.
