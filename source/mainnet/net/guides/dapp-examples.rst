.. include:: ../../variables.rst
.. _dapp-examples:

=============
dApp examples
=============

Select an example to see more information about it, such as a hosted dApp for you to try, links to tutorials, repositories, and more.

.. dropdown:: Piggy bank

    `Demo front end <https://piggybank.testnet.concordium.com>`__ where you can try the functionality on Concordium's testnet

    :ref:`Tutorial about the piggy bank smart contract and dApp<piggy-bank>`

    `Smart contracts <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/piggy-bank>`__

    `Front end code <https://github.com/Concordium/concordium-dapp-piggybank/>`__

.. dropdown:: wCCD

    `Demo front end <https://wccd.testnet.concordium.com/>`__ where you can try the functionality on Concordium's testnet

    :ref:`Tutorial about the wCCD smart contract and dApp<wCCD>`.

    `Smart contract <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-wccd/src/lib.rs>`__

    `Front end code <https://github.com/Concordium/concordium-browser-wallet/tree/main/examples/wCCD>`__

.. dropdown:: View gallery upon ID proof

    `Demo front end <https://gallery.testnet.concordium.com/>`__ where you can try the functionality on Concordium's testnet

    :ref:`Information about ID proofs<create-proofs>`

    :ref:`Tutorial about the gallery dApp<gallery>`

    `Back end and front end code <https://github.com/Concordium/concordium-dapp-examples/tree/main/gallery>`__

.. dropdown:: eSealing

    `Demo front end <https://esealing.testnet.concordium.com/>`__ where you can try the functionality on Concordium's testnet

    :ref:`Tutorial about the eSealing dApp<eSealing>`

    `Smart contract <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/eSealing>`__

    `Front end code <https://github.com/Concordium/concordium-browser-wallet/tree/main/examples/eSealing>`__

.. dropdown:: Sponsored Transactions

    `Demo front end <https://sponsored.testnet.concordium.com/>`__ where you can try the functionality on Concordium's testnet

    :ref:`Tutorial about the sponsored Transactions dApp<sponsoredTransactions>`

    `Smart contract <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis3-nft-sponsored-txs>`__

    `Back end and front end code <https://github.com/Concordium/concordium-dapp-examples/tree/main/sponsoredTransactions>`__

.. dropdown:: Voting

    `Demo front end <https://voting.testnet.concordium.com>`__ where you can try the functionality on Concordium's testnet

    :ref:`Tutorial about the Voting dApp<voting-dapp>`

    `Smart contract <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/voting>`__

    `Front end code <https://github.com/Concordium/concordium-browser-wallet/tree/main/examples/voting>`__

.. dropdown:: Sign message

    `Demo front end <http://signmessage.testnet.concordium.com/>`__ where you can try the functionality on Concordium's testnet

    `Front end code <https://github.com/Concordium/concordium-dapp-examples/tree/main/signMessage>`__

The dApps are written in React.

Piggy bank, wCCD, eSealing, and sponsored Transactions use the NPM library
`@concordium/react-components <https://www.npmjs.com/package/@concordium/react-components>`__
to implement integrations to the |bw| and |mw-gen2| on Android devices using WalletConnect.
