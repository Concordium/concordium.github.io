.. include:: ../../variables.rst
.. _sponsoredTransactionsFrontendAndBackend:

===========================================
Sponsored Transactions Frontend and Backend
===========================================

The goal of this part of the tutorial is to set up the frontend and the backend locally and to understand the two flows that the dApp provides.

You can explore the `hosted sponsored transaction service <https://sponsored.testnet.concordium.com>`_.
The sponsored transaction service consists of a frontend and a backend. You can start your own service by
following the instructions in the `frontend README.md file <https://github.com/Concordium/concordium-dapp-examples/blob/main/sponsoredTransactions/frontend/README.md>`_
and then the instructions in the `backend README.md file <https://github.com/Concordium/concordium-dapp-examples/blob/main/sponsoredTransactions/backend/README.md>`_.
Alternatively, follow the steps in the `README.md file <https://github.com/Concordium/concordium-dapp-examples/blob/main/sponsoredTransactions/README.md>`_ to deploy the Docker container.
The docker container will set up the frontend as well as the backend.

.. note::

   Comprehensive instructions on how to set up the |bw|, create an account in the |bw|,
   get some testnet CCD and run a local frontend can be found in :ref:`wCCD frontend-set-up section <wCCD-frontend-set-up>`.

The frontend supports the following two flows with the |bw| (or |mw-gen2| that uses WalletConnect):

-   Create the message of a sponsored ``updateOperator`` transaction => Sign it with the wallet => Submit the signature to the ``/submitUpdateOperator`` backend endpoint.
-   Mint an NFT to your wallet account => Create the message of a sponsored ``transfer`` transaction => Sign it with the wallet => Submit the signature to the ``/submitTransfer`` backend endpoint.

The backend is a server that exposes two endpoints:

- ``POST /submitUpdateOperator``
- ``POST /submitTransfer``

After submitting the signature to the ``/submitUpdateOperator`` or the ``/submitTransfer`` endpoint,
the backend creates a sponsored transaction and submits it on-chain to the ``permit`` function in the smart contract {index: `SMART_CONTRACT_INDEX <https://github.com/Concordium/concordium-dapp-examples/blob/main/sponsoredTransactions/frontend/package.json#L41>`_, subindex: 0}.
The deployed smart contract code can be found `here <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/cis3-nft-sponsored-txs>`_.
After the transaction is sent to the blockchain node, the backend returns the transaction hash to the frontend.

The backend server has to have access to a blockchain node and an account (with its associated private key)
that is funded with some CCD to submit the sponsored transaction to the chain. The backend wallet
will pay for the transaction fees on behalf of the user.

Schemas
=======

The frontend uses several `json` schemas in the ``./frontend/src/constants.ts`` file such as:

.. code-block:: javascript

   export const UPDATE_OPERATOR_SCHEMA = 'EAEUAAIAAAAGAAAAdXBkYXRlFQIAAAAGAAAAUmVtb3ZlAgMAAABBZGQCCAAAAG9wZXJhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA';

   export const TRANSFER_SCHEMA = 'EAEUAAUAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAQAAABmcm9tFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAgAAAAwWAQQAAABkYXRhEAEC';

   export const SERIALIZATION_HELPER_SCHEMA = 'FAAFAAAAEAAAAGNvbnRyYWN0X2FkZHJlc3MMBQAAAG5vbmNlBQkAAAB0aW1lc3RhbXANCwAAAGVudHJ5X3BvaW50FgEHAAAAcGF5bG9hZBABAg==';

   export const NONCE_OF_PARAMETER_SCHEMA = 'FAABAAAABwAAAHF1ZXJpZXMQARQAAQAAAAcAAABhY2NvdW50Cw==';

   export const NONCE_OF_RETURN_VALUE_SCHEMA = 'FAEBAAAAEAEF';

   export const MINT_PARAMETER_SCHEMA = 'FAABAAAABQAAAG93bmVyFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA==';

These schemas can be generated `in the smart contract folder <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/cis3-nft-sponsored-txs>`_ with the command below.

.. code-block:: rust

   cargo concordium build --schema-json-out ./

This command creates a file with the JSON schema of your smart contract in your current directory.

Explore your public key
=======================

You can export your keys file from the |bw| as follows:

.. image:: ./images/pic1.png
   :width: 30 %

.. image:: ./images/pic2.png
   :width: 30 %

.. image:: ./images/pic3.png
   :width: 30 %

In this exported file, you will find a ``verifyKey`` (your ``public key``), which should be
identical to the displayed ``public key`` at the frontend. The frontend also displays your next nonce associated with your account.
This nonce is initially 0 and increases every time a successful sponsored transaction
is recorded in the smart contract that was signed by your account.

.. note::

   The nonce is used as a method of preventing replay attacks by ensuring that a signed message by your account
   can not be reused a second time.

Submit a sponsored ``updateOperator`` transaction
=================================================

.. image:: ./images/updateOperator.gif
   :alt: Update operator gif
   :align: center

The GIF shows an example of input parameters that can be used to successfully execute a sponsored ``updateOperator`` transaction.
The transaction should be successfully submitted by the backend to the blockchain which can be checked on the
blockchain explorer by clicking the transaction hash displayed at the frontend.

When exploring the code, you will realize that the input parameter to the ``permit`` function
and the ``message`` that is signed in the wallet are rather complex. For example, the ``message`` for the sponsored ``updateOperator`` transaction is as follows:

.. code-block:: javascript

   const operatorAction = addOperator
      ? {
         Add: [],
      }
      : {
         Remove: [],
      };

   const updateOperator = [
      {
         operator: {
            Account: [operator],
         },
         update: operatorAction,
      },
   ];

   const payload = serializeTypeValue(updateOperator, toBuffer(UPDATE_OPERATOR_SCHEMA, 'base64'));

   const message = {
      contract_address: {
         index: Number(process.env.SMART_CONTRACT_INDEX),
         subindex: 0,
      },
      nonce: Number(nonce),
      timestamp: expiryTimeSignature,
      entry_point: 'updateOperator',
      payload: Array.from(payload),
   };

Because the schema is included in the smart contract, you can use the format returned by the below command to get a
template for how to create the ``message`` and input parameters for the functions in the smart contract:

.. code-block:: rust

   cargo concordium build --schema-template-out -

The above command will print the schema template to the console. The command has to be executed
`in the smart contract folder <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/cis3-nft-sponsored-txs>`_.

Submit a sponsored ``transfer`` transaction
===========================================

.. image:: ./images/transfer.gif
   :alt: Transfer gif
   :align: center

The GIF shows an example of input parameters that can be used to successfully execute a sponsored ``transfer`` transaction.
The transaction should be successfully submitted by the backend to the blockchain which can be checked on the
blockchain explorer by clicking the transaction hash displayed at the frontend. You can also check that your ``to`` account is now the owner of the ``token_id``.

When exploring the code, you will realize that the input parameter to the ``permit`` function
and the ``message`` that is signed in the wallet are rather complex. For example, the ``message`` for the sponsored ``transfer`` transaction is as follows:

.. code-block:: javascript

   const transfer = [
      {
         amount: '1',
         data: [],
         from: {
            Account: [from],
         },
         to: {
            Account: [to],
         },
         token_id: tokenID,
      },
   ];

   const payload = serializeTypeValue(transfer, toBuffer(TRANSFER_SCHEMA, 'base64'));

   const message = {
      contract_address: {
         index: Number(process.env.SMART_CONTRACT_INDEX),
         subindex: 0,
      },
      nonce: Number(nonce),
      timestamp: expiryTimeSignature,
      entry_point: 'transfer',
      payload: Array.from(payload),
   };

Because the schema is included in the smart contract, you can use the format returned by the below command to get a
template on how to create the ``message`` and input parameters for the functions in the smart contract:

.. code-block:: rust

   cargo concordium build --schema-template-out -

The above command will print the schema template to the console. The command has to be executed
`in the smart contract folder <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/cis3-nft-sponsored-txs>`_.

.. note::

   The NFT smart contract used in the hosted demo app is meant for exploring sponsored transactions.
   To ease this process, the mint function can be called by any account to mint a token.
   ``Token_ids`` are stored in the smart contract in little-endian order and a counter is used to
   increase the  ``token_id`` by 1 every time the mint function is invoked. The wallet displays the ``token_id`` bytes in a hex string.
   In other words, the first token minted will have the ``token_id=01000000``,
   the second token minted will have ``02000000``, ..., ``0f000000``, ``10000000``, ..., ``ff000000``, ``00010000``, ... .
   You can look up your minted ``token_id`` in the |bw| by getting the smart contract
   index as seen below and searching for tokens in that contract that are owned by your account.

.. image:: ./images/TokenId_1.png
   :width: 25 %
.. image:: ./images/TokenId_2.png
   :width: 25 %
.. image:: ./images/TokenId_3.png
   :width: 25 %
.. image:: ./images/TokenId_4.png
   :width: 24 %
.. image:: ./images/TokenId_5.png
   :width: 24 %
.. image:: ./images/TokenId_6.png
   :width: 24 %
.. image:: ./images/TokenId_7.png
   :width: 24 %

.. note::

   Every ``token_id`` would usually have
   its own metadata associated with it by e.g. appending the ``TOKEN_METADATA_URL`` with the ``token_id``. But to simplify the
   metadata management for Concordium, the NFT smart contract used in the hosted demo app returns
   the same metadata hash (``TOKEN_METADATA_URL``) for all ``token_ids``.
   The NFT picture in the below URL changes every time you access ``https://picsum.photos/40/40``. Hence, the |bw| depicts random new pictures
   for your minted NFT.

   .. code-block:: rust

      const TOKEN_METADATA_URL: &str = "https://gist.githubusercontent.com/abizjak/ab5b6fc0afb78acf23ee24d979eb7639/raw/7c03f174d628df1d2fd0dc8cffb319c89e770708/metadata.json";
