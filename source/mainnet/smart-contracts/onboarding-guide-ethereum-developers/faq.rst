.. _faq:

====
FAQs
====

This is a list of Frequently Asked Questions about Concordium. It is focused on
helping developers with an Ethereum/solidity background to understand
the Concordium blockchain and its smart contract ecosystem.

Feel free to suggest additional FAQs by contacting `support@concordium.software`.

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

.. dropdown::  What smart contract language is used on Concordium?

    Concordium uses Rust as smart contract language.

.. dropdown::  How can I start with the Rust smart contract language?

    Rust is a fast and memory-efficient
    language that is a popular smart contract language among different blockchain projects.
    There is plenty of literature to get started with Rust such as the
    `Rust language book <https://doc.rust-lang.org/book/>`_.
    You can find examples of smart contracts in the
    `Concordium Rust smart contract repo  <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples>`_.

.. dropdown::  Where can I find example smart contracts?

    You can find examples of smart contracts in the
    `Concordium Rust smart contract repo  <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples>`_.

.. dropdown::  Do you have a smart contract reference library similar to the GitHub repo from `OpenZeppelin`?

    You can find examples and standard implementations in the
    `Concordium Rust smart contract repo  <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples>`_.

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

.. dropdown::  Can I distinguish between contract and account addresses?

    Yes. You can distinguish between the different types of addresses
    in smart contracts on the Concordium chain.
    `Addresses <https://docs.rs/concordium-std/latest/concordium_std/enum.Address.html>`_
    are represented as an enum with two variants.

    .. code-block:: console

        pub enum Address {
            Account(AccountAddress),
            Contract(ContractAddress),
        }

    Rust has a matching pattern that determines at runtime which
    variant of the enum Address is applicable, and then the appropriate code
    is executed. You can read more about `pattern matching  <https://doc.rust-lang.org/book/ch18-03-pattern-syntax.html>`_ in the
    Rust language book.

    For example, the below code prints out if the `sender`
    that invoked this smart contract function is a contract or an account.

    .. code-block:: console

        match ctx.sender() {
            Address::Contract(contract_address) => { println!("This contract invoked the function: {:?}", contract_address) },
            Address::Account(account_address) => { println!("This account invoked the function: {:?}", account_address) },
        };

    Add the above matching pattern snippet to one of your Rust smart contract functions and write
    a test case that invokes that function. You can see the printout of the snippet
    by running the tests with the below command.

    .. code-block:: console

        $cargo test -- --nocapture

.. dropdown::  What is the equivalent to `msg.sender` and `tx.origin` on Concordium?

    `ctx.sender()`, and `ctx.invoker()` are the equivalent variables to `msg.sender`, and `tx.origin` on the Concordium chain, respectively.
    The `ctx.invoker()` variable refers to the original account address (no contract address)
    that started the transaction while `ctx.sender()`
    refers to the immediate account (it could be an account
    or another contract address) that invokes the function entry point.
    A contract cannot start a tx and that is why `ctx.invoker()` never returns a contract address.

.. dropdown::  Can you force CCD to a smart contract even if it has no payable function?

    There are three edge cases on the Ethereum chain that forces ETHER to a contract address even though there is no payable function on it.

    - using the self-destruct opt-code.
    - inserting a smart contract address as the miner address in a minted block.
    - pre-calculating the contract address and sending ETHER before the contract is deployed.

    In contrast, CCD can only get onto a smart contract if it has at least one payable entry point.

    - no self-destruct host function.
    - a smart contract cannot be a baker(miner) of a minted block.
    - CCD cannot be transferred to a smart contract address before a smart contract is initialized at that index.

.. dropdown:: Is there a smart contract code linter?

    Yes. You can use the `fmt` and `cargo clippy` linter tools as described in the `README <https://github.com/Concordium/concordium-rust-smart-contracts>`_.

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

.. dropdown:: Does Concordium have something similar to `delegateCall`?

    No. A contract on Concordium can only change its own state. If you are looking for an upgradable pattern, please explore
    the  `upgradable wCCD implementation <https://github.com/Concordium/concordium-rust-smart-contracts/pull/128>`_.

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

Miscellaneous:
==============

.. dropdown:: What is the native currency on Concordium?

    The native currency of the Concordium chain is CCD.

.. dropdown:: Where do I get some test CCD? Is there a testnet faucet?

    There are several options to request test CCD:

    **Option 1:**
    If you just created your account in the mobile app wallet then you
    find a button to request 2000 testnet CCD to get started with your new account.

    .. image:: ../tutorials/piggy-bank/images/pb_tutorial_5.png
        :width: 20 %
    .. image:: ../tutorials/piggy-bank/images/pb_tutorial_6.png
        :width: 20 %

    **Option 2:** If you have the curl package installed on your Unix-like operating systems,
    you can request CCD in the terminal directly from the wallet proxy via the below command.

    .. code-block:: console

        $curl -X PUT https://wallet-proxy.testnet.concordium.com/v0/testnetGTUDrop/<YourAccountAddress>

    If you insert your account address correctly, the command should look similar to the below line.

    .. code-block:: console

        $curl -X PUT https://wallet-proxy.testnet.concordium.com/v0/testnetGTUDrop/4phD1qaS3U1nLrzJcgYyiPq1k8aV1wAjTjYVPE3JXBDAz9WdEy

    **Option 3:**
    If you have the curl package and the `concordium-client` tool installed on your Unix-like operating systems, you can request CCD to any of your alias account addresses.
    If you already sent a previous request to the wallet proxy, you can not request any more CCD to the same account address.
    Look up one of your alias account addresses instead and use it for your request.
    The CCD will be credited to your canonical account address.

    .. code-block:: console

        $concordium-client account show-alias <YourAccountAddress> --alias <number>

    If you insert your account address and a number correctly, the command should look similar to the below line.

    .. code-block:: console

        $concordium-client account show-alias 4phD1qaS3U1nLrzJcgYyiPq1k8aV1wAjTjYVPE3JaqovViXS4j --alias 17

    This generates the output:

    .. code-block:: console

        The requested alias for address 4phD1qaS3U1nLrzJcgYyiPq1k8aV1wAjTjYVPE3JaqovViXS4j is 4phD1qaS3U1nLrzJcgYyiPq1k8aV1wAjTjYVPE3JXBDCpCaUT6

    Copy your alias address to the below command.

    .. code-block:: console

        $curl -X PUT https://wallet-proxy.testnet.concordium.com/v0/testnetGTUDrop/<YourAliasAccountAddress>

    If you insert your alias account address correctly, the command should look similar to the below line.

    .. code-block:: console

        $curl -X PUT https://wallet-proxy.testnet.concordium.com/v0/testnetGTUDrop/4phD1qaS3U1nLrzJcgYyiPq1k8aV1wAjTjYVPE3JXBDCpCaUT6

    **Option 4:** If you need plenty of CCD for large-scale testing.
    Please contact Concordium’s technical support via support@concordium.software.

.. dropdown::  What does `invoke` mean?

    `Invoke` may refer to:
        - It can mean to execute or initiate a function. It is equivalent to Ethereum saying: "Calling a smart contract function".

        - In the context of the `concordium-client` tool, it means to simulate a tx locally on your node via the `invoke` command of the `concordium-client` tool instead of sending the tx to the blockchain network and executing it on-chain. Since the tx was simulated it was not inserted by the bakers in a block and is not part of the blockchain.
