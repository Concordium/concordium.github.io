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

.. dropdown::  Can you force CCD to a smart contract even if it has no payable function?

    There are three edge cases on the Ethereum chain that forces ETHER to a contract address even though there is no payable function on it.

    - using the self-destruct opt-code.
    - inserting a smart contract address as the miner address in a minted block.
    - pre-calculating the contract address and sending ETHER before the contract is deployed.

    In contrast, CCD can only get onto a smart contract if it has at least one payable entry point.

    - no self-destruct host function.
    - a smart contract cannot be a baker(miner) of a minted block.
    - CCD cannot be transferred to a smart contract address before a smart contract is initialized at that index.

.. dropdown::  Can I upload and verify my smart contract code on the block explorer (CCDScan)?

    CCDScan currently does not support compiling, hosting, or verifying your smart contract code.
    You are welcome to publish your smart contract code in public source code management tools such as `GitHub <https://github.com/>`_.
