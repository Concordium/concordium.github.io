.. include:: ../../../variables.rst
.. _plt-concordium-client:

Concordium Client CLI Tool
==========================

This guide explains how to use concordium-client to perform PLT operations from the command line.

Installation and setup
----------------------

Download and install ``concordium-client``: :ref:`Downloads <concordium-node-and-client-download>`

Available PLT commands
----------------------

The following PLT operations are available via CLI:

**Token Query Operations:**

- ``raw GetTokenList`` - Get a list of all PLTs available on testnet
- ``raw GetTokenInfo`` - Query the gRPC server for the info of a protocol level token

**Token Transfer Operations:**

- ``transaction plt send`` - Transfer PLT tokens

**Token Management Operations:**

- ``transaction plt mint`` - Mint protocol-level tokens
- ``transaction plt burn`` - Burn protocol-level tokens

**Allow/Deny List Operations:**

- ``transaction plt add-to-allow-list`` - Add an account to the allow list
- ``transaction plt add-to-deny-list`` - Add an account to the deny list
- ``transaction plt remove-from-allow-list`` - Remove an account from the allow list
- ``transaction plt remove-from-deny-list`` - Remove an account from the deny list
- ``transaction plt pause`` - Suspend balance transfer operations for a selected PLT
- ``transaction plt unpause`` - Resume balance transfer operations for a selected PLT

.. note::
   All PLT management operations require a governance account.

Command examples
----------------

.. _concordium-client-get-token-list:

**Get PLT List:**

.. code-block:: bash

  concordium-client raw GetTokenList --grpc-ip grpc.testnet.concordium.com --grpc-port 20000 --secure

**Get PLT Info:**

.. code-block:: bash

  concordium-client raw GetTokenInfo TOKEN_SYMBOL --grpc-ip grpc.testnet.concordium.com --grpc-port 20000 --secure

.. _concordium-client-transfer-tokens:

**Transfer PLT:**

.. code-block:: bash

   concordium-client transaction plt send --sender YOUR_ACCOUNT --receiver RECEIVER_ADDRESS --amount 1 --tokenId TOKEN_SYMBOL --memo "test" --grpc-ip grpc.testnet.concordium.com --grpc-port 20000 --secure


**Mint PLT:**

.. code-block:: bash

   concordium-client transaction plt mint --sender GOVERNANCE_ACCOUNT --amount TOKEN-AMOUNT --tokenId TOKEN_SYMBOL --grpc-ip grpc.testnet.concordium.com --grpc-port 20000 --secure

**Burn PLT:**

.. code-block:: bash

   concordium-client transaction plt burn --sender GOVERNANCE_ACCOUNT --amount TOKEN-AMOUNT --tokenId TOKEN_SYMBOL --grpc-ip grpc.testnet.concordium.com --grpc-port 20000 --secure

**Add an Account to the Allow List:**

.. code-block:: bash

   concordium-client transaction plt add-to-allow-list --sender GOVERNANCE_ACCOUNT --account ACCOUNT_ADDRESS --tokenId TOKEN_SYMBOL --grpc-ip grpc.testnet.concordium.com --grpc-port 20000 --secure

**Add an Account to the Deny List:**

.. code-block:: bash

   concordium-client transaction plt add-to-deny-list --sender GOVERNANCE_ACCOUNT --account ACCOUNT_ADDRESS --tokenId TOKEN_SYMBOL --grpc-ip grpc.testnet.concordium.com --grpc-port 20000 --secure

**Remove an Account from the Allow List:**

.. code-block:: bash

   concordium-client transaction plt remove-from-allow-list --sender GOVERNANCE_ACCOUNT --account ACCOUNT_ADDRESS --tokenId TOKEN_SYMBOL --grpc-ip grpc.testnet.concordium.com --grpc-port 20000 --secure

**Remove an Account from the Deny List:**

.. code-block:: bash

   concordium-client transaction plt remove-from-deny-list --sender GOVERNANCE_ACCOUNT --account ACCOUNT_ADDRESS --tokenId TOKEN_SYMBOL --grpc-ip grpc.testnet.concordium.com --grpc-port 20000 --secure

**Suspend balance transfer operations for the PLT:**

.. code-block:: bash

   concordium-client transaction plt pause --sender GOVERNANCE_ACCOUNT --tokenId TOKEN_SYMBOL --grpc-ip grpc.testnet.concordium.com --grpc-port 20000 --secure

**Resume balance transfer operations for the PLT:**

.. code-block:: bash

   concordium-client transaction plt unpause --sender GOVERNANCE_ACCOUNT --tokenId TOKEN_SYMBOL --grpc-ip grpc.testnet.concordium.com --grpc-port 20000 --secure

