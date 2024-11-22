.. include:: ../../variables.rst

.. _wCCD-introduction:

=====================================
Understanding the wCCD smart contract
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
    Please explore the five ``CIS-2`` token standard implementation examples in the Concordium
    smart contract repo:

    - `natively-upgradable wccd <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-wccd/src/lib.rs>`_
    - `nft <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-nft/src/lib.rs>`_
    - `dynamic-nft <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-dynamic-nft/src/lib.rs>`_
    - `multi <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-multi/src/lib.rs>`_
    - `multi-royalties <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-multi-royalties/src/lib.rs>`_


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

Contract addresses
------------------

The Concordium foundation maintains the canonical wCCD smart contract and promotes its
usage to create a coherent overall smart contract ecosystem on the Concordium blockchain. The wCCD
smart contract deployed can be upgraded to add additional features and to improve the smart contract based on the
newest science and research done at Concordium. The protocol is free of charge and no commissions are collected by Concordium.

.. note::

    The testnet address below is an early version of the wCCD smart contract. Some minor changes can be expected.

The canonical wCCD smart contract following the ``CIS-2`` standard
is deployed on ``testnet`` at the following addresses:

``wCCD (Testnet):`` |wccd-address-testnet|

The canonical wCCD smart contract following the ``CIS-2`` standard is
deployed on ``mainnet`` at the following addresses:

``wCCD (Mainnet):`` |wccd-address-mainnet|

.. note::

    The wCCD smart contract is upgradeable, but the wCCD contract address will always stay the same. Only the module pointer
    (a reference to the code that is executed) is updated in the smart contract during an upgrade.

You have now read all information necessary to begin interacting with the wCCD smart contract on testnet.
To continue with the tutorial click :ref:`here<wCCD-interacting>`.
