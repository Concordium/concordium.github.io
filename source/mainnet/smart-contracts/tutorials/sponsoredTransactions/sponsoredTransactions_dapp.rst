.. include:: ../../../variables.rst
.. _sponsoredTransactions_dapp:

TODO: explain where the schema base64 comes from

TODO: explain where to get the exact types for complex input parameters

===========================
Sponsored Transactions dApp
===========================


You can explore the `hosted sponsored transaction service <https://todo.com>`_.
The sponsored transaction service consists of a front-end and a back-end. You can start your own service by
following the instructions in the `front-end README.md file <https://github.com/Concordium/concordium-browser-wallet/tree/main/examples/sponsoredTXs/front-end/README.md>`_
and then the instructions in the `back-end README.md file <https://github.com/Concordium/concordium-browser-wallet/tree/main/examples/sponsoredTXs/back-end/README.md>`_.

.. note::

   Comprehensive instructions on how to set up the |bw|, create an account in the |bw|,
   get some testnet CCD and run a local front end can be found in :ref:`wCCD front-end-set-up section <wCCD-front-end-set-up>`.

The front end supports the following three flows with the |bw| (or |mw-gen2| that uses WalletConnect):

-   Register a public key (associated with the account from your wallet) in the smart contract.
-   Compute the message of a sponsored ``updateOperator`` transaction => Sign it with the wallet => Submit the signature and some input parameters to the ``/submitUpdateOperator`` back-end endpoint.
-   Mint an NFT to your wallet => Compute the message of a sponsored ``transfer`` transaction => Sign it with the wallet => Submit the signature and some input parameters to the ``/submitTransfer`` back-end endpoint.

The back-end creates a sponsored transaction and submits it to the `permit` function in the smart contract ``{index: 4129, subindex: 0}`` that has a similar logic to [this contract](https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/cis3-nft-sponsored-txs).
The back-end returns the transaction hash to the front-end.


Register your public key
========================

Select the **Registration tab** to register your public key in the smart contract as shown below:

