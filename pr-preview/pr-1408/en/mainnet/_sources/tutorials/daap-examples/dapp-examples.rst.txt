.. include:: ../../variables.rst
.. _dapp-examples:

=============
dApp examples
=============

Select an example to see more information about it, such as a hosted dApp for you to try, links to tutorials, repositories, and more.

Starting a new project on the Concordium blockchain? Have a look at the `dApp starter template <https://github.com/Concordium/concordium-dapp-starter>`__!

.. dropdown:: Piggy bank

    `Demo frontend <https://piggybank.testnet.concordium.com>`__ where you can try the functionality on Concordium's testnet

    :ref:`Tutorial about the piggy bank smart contract and dApp<piggy-bank>`

    `Smart contracts <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/piggy-bank>`__

    `Frontend code <https://github.com/Concordium/concordium-dapp-piggybank/>`__

.. dropdown:: wCCD

    `Demo frontend testnet <https://wccd.testnet.concordium.com/>`__ where you can try the functionality on Concordium's testnet

    `Demo frontend mainnet <https://wccd.mainnet.concordium.software/>`__ where you can try the functionality on Concordium's mainnet

    :ref:`Tutorial about the wCCD smart contract and dApp<wCCD>`.

    `Smart contract <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-wccd/src/lib.rs>`__

    `Frontend code <https://github.com/Concordium/concordium-browser-wallet/tree/main/examples/wCCD>`__

.. dropdown:: View gallery upon ID proof

    `Demo frontend <https://gallery.testnet.concordium.com/>`__ where you can try the functionality on Concordium's testnet

    :ref:`Information about ID proofs<create-proofs>`

    `Backend and frontend code <https://github.com/Concordium/concordium-dapp-examples/tree/main/gallery>`__

.. dropdown:: eSealing

    `Demo frontend <https://esealing.testnet.concordium.com/>`__ where you can try the functionality on Concordium's testnet

    :ref:`Tutorial about the eSealing dApp<eSealing>`

    `Smart contract <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/eSealing>`__

    `Frontend code <https://github.com/Concordium/concordium-browser-wallet/tree/main/examples/eSealing>`__

.. dropdown:: Sponsored Transactions

    `Demo frontend <https://sponsored.testnet.concordium.com/>`__ where you can try the functionality on Concordium's testnet

    :ref:`Tutorial about the sponsored Transactions dApp<sponsoredTransactions>`

    `Smart contract <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis3-nft-sponsored-txs>`__

    `Backend and frontend code <https://github.com/Concordium/concordium-dapp-examples/tree/main/sponsoredTransactions>`__

.. dropdown:: CIS2 Sponsored Transactions

    `Demo frontend <https://cis2-sponsored.testnet.concordium.com/>`__ where you can try the functionality on Concordium's testnet

    :ref:`Tutorial about the sponsored Transactions dApp<sponsoredTransactions>`

    `Smart contract <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/cis2-multi>`__

    `Backend and frontend code <https://github.com/Concordium/concordium-dapp-examples/tree/main/sponsoredTransactionsAuction>`__

.. dropdown:: Track and Trace

    `Demo frontend <https://trackntrace.testnet.concordium.com/>`__ where you can try the functionality on Concordium's testnet

    `Smart contract <https://github.com/Concordium/concordium-dapp-examples/tree/main/trackAndTrace/smart-contract>`__

    `Frontend and backend code <https://github.com/Concordium/concordium-dapp-examples/tree/main/trackAndTrace>`__

.. dropdown:: Compliant Reward Distribution

    `Demo frontend <https://compliant-reward-distribution.testnet.concordium.com/>`__ where you can try the functionality on Concordium's testnet

    `Frontend and backend code <https://github.com/Concordium/concordium-dapp-examples/tree/main/compliant-reward-distribution>`__

.. dropdown:: Voting

    `Demo frontend <https://voting.testnet.concordium.com>`__ where you can try the functionality on Concordium's testnet

    :ref:`Tutorial about the Voting dApp<voting-dapp>`

    `Smart contract <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/voting>`__

    `Frontend code <https://github.com/Concordium/concordium-browser-wallet/tree/main/examples/voting>`__

.. dropdown:: Sign message

    `Demo frontend <http://signmessage.testnet.concordium.com/>`__ where you can try the functionality on Concordium's testnet

    `Frontend code <https://github.com/Concordium/concordium-dapp-examples/tree/main/signMessage>`__

.. dropdown:: EuroE age verification

    `Demo frontend <https://euroe-demo.testnet.concordium.com/>`__ where you can try the functionality on Concordium's testnet

    `Frontend code <https://github.com/Concordium/concordium-dapp-examples/tree/main/euroe-demo>`__

.. dropdown:: Smart contract deploy and initialize tool

    `Demo frontend <https://sctools.mainnet.concordium.software/>`__ where you can deploy and initlize a smart contract on testnet or mainnet

    `Frontend code <https://github.com/Concordium/concordium-smart-contract-tools/tree/main/front-end-tools>`__

.. dropdown:: Wallet test bench

    This tool is for testing wallets and shows a great overview of the available interactions between wallets and frontend.

    Deploy and initialize scenarios are available on the |bw|.

    `Demo frontend <https://wallet-test-bench.testnet.concordium.com/>`__ where you can test wallet interactions

    `Frontend code <https://github.com/Concordium/concordium-misc-tools/tree/main/wallet-connect-test-bench/front-end>`__

    `Smart contract <https://github.com/Concordium/concordium-misc-tools/tree/main/wallet-connect-test-bench/smart-contract>`__

The dApps are written in React.

Piggy bank, wCCD, eSealing, sponsored Transactions, smart contract deploy and initialize tool, and wallet test bench use the NPM library
`@concordium/react-components <https://www.npmjs.com/package/@concordium/react-components>`__
to implement integrations to the |bw| and |mw-gen2| using WalletConnect.

.. tip::

   Starting a new project on the Concordium blockchain? Have a look at our `DApp starter template <https://github.com/Concordium/concordium-dapp-starter>`__!
