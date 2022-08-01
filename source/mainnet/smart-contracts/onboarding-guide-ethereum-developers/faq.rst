.. _faq:

====
FAQs
====

This is a list of Frequently Asked Questions about Concordium. It is focused on
helping developers with an Ethereum/solidity background to understand
the Concordium blockchain and its smart contract ecosystem.

Feel free to suggest additional FAQs here<TODO: add an official email address>.

.. dropdown::  Example question?

    Example text

    Example picture

    .. image:: ./images/onboarding_ethereum_developers_1.png
      :width: 100 %

    Example code

    .. code-block:: console

        $./concordium-client contract init piggy_bank_part2_module --sender <account-name> --contract PiggyBank --name piggy_bank_part2_instance --energy 1000 --grpc-port 10001

    Example note

    .. note::

        abcdefgh

Concordium smart contracts:
===========================

.. dropdown::  Where can I find example smart contracts?

    You can find examples of smart contracts in the
    `Concordium rust smart contract repo  <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples>`_.

.. dropdown::  How are `smart contract addresses` represented on Concordium?

    In terms of naming, Concordium uses `contract`, and `account` to refer
    to the Ethereum equivalent of a `smart contract`, and an `externally owned address`, respectively.
    The word `address` refers to either an `account` address or a `contract` address on Concordium.

    Contract addresses on Concordium are represented by an index and a subindex as seen below.
    When invoking the `init` function, a new smart contract instance is
    deployed and assigned the next index number in sequential order.
    The subindex is currently not in use and is always 0. There are plans to give the subindex meaning in the future.

    In contrast to Ethereum, you cannot send CCD to a contract address (or account address) before they have been deployed/initialized on the Concordium chain.

    .. code-block:: console

        ContractAddress {
            index:    1234,
            subindex: 0,
        };

.. dropdown::  How are `externally owned addresses` represented on Concordium?

    In terms of naming, Concordium uses `contract`, and `account` to refer
    to the Ethereum equivalent of a `smart contract`, and an `externally owned address`, respectively.
    The word `address` refers to either an `account` address or a `contract` address on Concordium.

    Accounts on the chain are identified via an account address, which is a 32-byte sequence.
    The address is usually displayed in Base58Check encoding with version byte 1.
    An example of such an address is 3ZFGxLtnUUSJGW2WqjMh1DDjxyq5rnytCwkSqxFTpsWSFdQnNn.

    In contrast to Ethereum, `accounts` are also deployed on-chain and their corresponding `account` address only exists from that point on.
    You cannot send CCD to an account address (or a smart contract address) before they have been deployed/initialized on the Concordium chain.
    When a smart contract tries to interact with an address that has not been deployed/initialized yet, the smart contract will revert on the Concordium chain.

.. dropdown::  Can I distinguish between contract and account addresses in smart contracts on the Concordium chain?

    Yes. You can distinguish between the different types of addresses
    in smart contracts on the Concordium chain while this is impossible to do on the Ethereum chain.

    The below code behaves differently depending on if the `sender` that invoked this smart contract function is a contract or an account.

    .. code-block:: console

        match ctx.sender() {
            Address::Contract(contract_address) => { println!("This smart contract invoked the function {:?}", contract_address) },
            Address::Account(account_address) => { println!("This account invoked the function {:?}", account_address) },
        };

.. dropdown::  Can you force CCD to a smart contract even if it has no payable function?

    There are three edge cases on the Ethereum chain that forces ETHER to a contract address even though there is no payable function on it.

    - using the self-destruct opt-code.
    - inserting a smart contract address as the miner address in a minted block.
    - pre-calculating the contract address and sending ETHER before the contract is deployed.

    In contrast, CCD can only get onto a smart contract if it has at least one payable entry point.

    - no self-destruct host function.
    - a smart contract cannot be a baker(miner) of a minted block.
    - CCD cannot be transferred to a smart contract address before a smart contract is initialized at that index.

Events:
=======

.. dropdown::  Where can I find a logged event on testnet/mainnet?

    You can look up a tx hash on the `dashboard <https://dashboard.testnet.concordium.com/lookup/13ded9aaf6085e970b2cf3874431de5805ffa35a553c93707d1863a8888e8aa4>`_.
    It will provide you with the full execution chain of the smart contracts that
    were invoked and updated during this tx.
    You can click on an updated contract instance row to see additional information.
    For example, navigate to the last page (third page) of the displayed execution chain of `this tx <https://dashboard.testnet.concordium.com/lookup/13ded9aaf6085e970b2cf3874431de5805ffa35a553c93707d1863a8888e8aa4>`_
    and click on the top row `Updated contract instance at address: <783,0>`. You will see additional information
    about the smart contract address, name, the function entry point that was invoked,
    the CCD amount that was sent to the function, and events that were logged by this smart contract function.

    The below picture shows that one event was logged by the contract `<783,0>` and no event was logged by the contract `<782,0>`.

    .. image:: ./images/onboarding_ethereum_developers_1.png
        :width: 100 %

    If several events are logged by one function entry point, the different events can be distinguished by their array index.
    The below picture shows that four events were logged by an entry point in
    `this execution chain <https://dashboard.testnet.concordium.com/lookup/7fcad417384d8e36fd2264d16d0ce1385860cdad711d17f7d6c12137c9cbab2e>`_.

    .. image:: ./images/onboarding_ethereum_developers_2.png
        :width: 100 %

Standards:
==========

.. dropdown::  Is there something similar to the ERC20 standard?

    Yes, please read the `CIS-2 standard <https://github.com/Concordium/concordium-update-proposals/blob/main/source/CIS/cis-2.rst>`_.
    The `CIS-2` standard can represent fungible and non-fungible tokens.
    It combines the Ethereum ERC20 and ERC721 standards with some modifications.
    Please explore the corresponding `CIS-2 library <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/concordium-cis2/src/lib.rs>`_.
    The `CIS-2` library is meant to be imported by `CIS-2` tokens.
    Please explore the four `CIS-2` token standard implementations that import the `CIS-2` library:

    - `wccd <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-wccd/src/lib.rs>`_
    - `upgradable wccd <https://github.com/Concordium/concordium-rust-smart-contracts/pull/128>`_
    - `nft <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-nft/src/lib.rs>`_
    - `multi <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-multi/src/lib.rs>`_

.. dropdown::  Is there something similar to the ERC721 standard?

    Yes, please read the `CIS-2 standard <https://github.com/Concordium/concordium-update-proposals/blob/main/source/CIS/cis-2.rst>`_.
    The `CIS-2` standard can represent fungible and non-fungible tokens.
    It combines the Ethereum ERC721 and ERC20 standards with some modifications.
    Please explore the corresponding `CIS-2 library <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/concordium-cis2/src/lib.rs>`_.
    The `CIS-2` library is meant to be imported by `CIS-2` tokens.
    Please explore the four `CIS-2` token standard implementations that import the `CIS-2` library:

    - `nft <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-nft/src/lib.rs>`_
    - `multi <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-multi/src/lib.rs>`_
    - `wccd <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-wccd/src/lib.rs>`_
    - `upgradable wccd <https://github.com/Concordium/concordium-rust-smart-contracts/pull/128>`_

.. dropdown::  Is there something similar to the ERC165 standard?

    Yes, please read the `CIS-0 standard <https://github.com/Concordium/concordium-update-proposals/blob/main/source/CIS/cis-0.rst>`_.
    Please explore the `CIS-2 library <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/concordium-cis2/src/lib.rs>`_
    that provides the basic `CIS-0` primitives.
    The `CIS-2` library is meant to be imported by `CIS-2` tokens so they can implement the `CIS-0` standard easily.
    Please explore the four token examples that have the `CIS-0` standard implemented:

    - `wccd <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-wccd/src/lib.rs>`_
    - `upgradable wccd <https://github.com/Concordium/concordium-rust-smart-contracts/pull/128>`_
    - `nft <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-nft/src/lib.rs>`_
    - `multi <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-multi/src/lib.rs>`_

.. dropdown::  Is there something similar to a wrapped token contract?

    Yes, please explore the following two wCCD examples:

    - `wccd <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-wccd/src/lib.rs>`_
    - `upgradable wccd <https://github.com/Concordium/concordium-rust-smart-contracts/pull/128>`_

    Concordium will provide and maintain the canonical wCCD implementation on testnet and mainnet soon.
    Developers are encouraged to use the following addresses for their dApps.

    - Testnet canonical wCCD address: coming soon
    - Mainnet canonical wCCD address: coming soon

.. dropdown:: Does Concordium have an upgradable smart contract pattern?

    Yes, please explore the `upgradable wCCD implementation <https://github.com/Concordium/concordium-rust-smart-contracts/pull/128>`_.

Deploying and Initializing of smart contracts:
==============================================

.. dropdown::  What is the `owner` of a smart contract instance on Concordium?

    You can access the account that created a smart contract instance with the variable `ctx.owner()`.
    It is always an account because smart contracts cannot initialize another smart contract on Concordium.
    `ctx.owner()` is the account that invoked the `init` function to create a smart contract instance.

.. dropdown::  Can a smart contract deploy/initialize another smart contract on Concordium?

    No. The `init` function has to be called by an account (not a smart contract) on the Concordium chain.

.. dropdown::  Can I create a factory smart contract on Concordium?

    No. A factory smart contract on the Ethereum chain deploys other smart contracts. In contrast,
    the `init` function has to be called by an account (not a smart contract) on the Concordium chain.

.. dropdown::  Can I predict/calculate the address of the smart contract before deploying it? Is there something similar to the Ethereum CREATE2?

    Contract addresses on Concordium are represented by an index and a subindex as seen below.
    When invoking the `init` function, a new smart contract instance is
    deployed and assigned the next index number in sequential order.
    The subindex is currently not in use and is always 0. There are plans to give the subindex meaning in the future.

    In contrast to Ethereum, you cannot send CCD to a contract address (or account address) before they have been deployed/initialized.

    .. code-block:: console

        ContractAddress {
            index:    1234,
            subindex: 0,
        };

.. dropdown::  How can I deploy a smart contract to the Concordium chain?

    You can follow the chapter :ref:`deploying a smart contract<piggy-bank-deploying>` in the piggy bank tutorial.

Concordium tools:
=================

.. dropdown::  Can I upload and verify my smart contract code on the block explorer (CCDScan)?

    CCDScan currently does not support compiling, hosting, or verifying your smart contract code.
    You are welcome to publish your smart contract code in public source code management tools such as `GitHub <https://github.com/>`_.

.. dropdown::  What does `invoke` mean?

    `Invoke` may refer to:
        - It can mean to execute or initiate a function. It is equivalent to Ethereum saying: "Calling a smart contract function".

        - In the context of the `concordium-client` tool, it means to simulate a tx locally on your node via the `invoke` command of the `concordium-client` tool instead of sending the tx to the blockchain network and executing it on-chain. Since the tx was simulated it was not inserted by the bakers in a block and is not part of the blockchain.

Miscellaneous:
==============
