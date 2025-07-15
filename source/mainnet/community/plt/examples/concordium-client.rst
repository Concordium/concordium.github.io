.. _plt-concordium-client:

Concordium Client CLI Tool
==========================

This guide explains how to use concordium-client to perform PLT operations from the command line.

Installation and setup
----------------------

Download and install concordium-client v9.1.3-1-alpha:

**Downloads (v9.1.3):**

- `Linux <https://distribution.concordium.software/devnet/linux/concordium-client-9.1.3-1-alpha>`_
- `Windows (signed) <https://distribution.concordium.software/devnet/windows/signed/concordium-client_9.1.3-1-alpha.zip>`_
- `macOS - arm (signed) <https://distribution.concordium.software/devnet/macos/signed/concordium-client-arm-9.1.3-1-alpha.pkg>`_
- `macOS - intel (signed) <https://distribution.concordium.software/devnet/macos/signed/concordium-client-intel-9.1.3-1-alpha.pkg>`_

.. note::
   With new DevNet releases and features, new concordium-client versions may get released. Follow the communication channels for the most recent versions.


Available PLT commands
----------------------

The following PLT operations are available via CLI:

**Token Query Operations:**

- ``raw GetTokenList`` - Get a list of all PLTs available on DevNet

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

.. note::
   All PLT management operations require a governance account.

Command examples
----------------

.. _concordium-client-get-token-list:

**Get PLT Token List:**

.. code-block:: bash

  concordium-client raw GetTokenList --grpc-ip grpc.devnet-plt-beta.concordium.com --grpc-port 20000 --secure


.. _concordium-client-transfer-tokens:

**Transfer PLT Tokens:**

.. code-block:: bash

   concordium-client transaction plt send --sender YOUR_ACCOUNT --receiver RECEIVER_ADDRESS --amount 1 --tokenId TOKEN_SYMBOL --memo "test" --grpc-ip grpc.devnet-plt-beta.concordium.com --grpc-port 20000 --secure


**Mint PLT Tokens:**

.. code-block:: bash

   concordium-client transaction plt mint --sender GOVERNANCE_ACCOUNT --amount TOKEN-AMOUNT --tokenId TOKEN_SYMBOL --grpc-ip grpc.devnet-plt-beta.concordium.com --grpc-port 20000 --secure

**Burn PLT Tokens:**

.. code-block:: bash

   concordium-client transaction plt burn --sender GOVERNANCE_ACCOUNT --amount TOKEN-AMOUNT --tokenId TOKEN_SYMBOL --grpc-ip grpc.devnet-plt-beta.concordium.com --grpc-port 20000 --secure

**Add an Account to the Allow List:**

.. code-block:: bash

   concordium-client transaction plt add-to-allow-list --sender GOVERNANCE_ACCOUNT --account ACCOUNT_ADDRESS --tokenId TOKEN_SYMBOL --grpc-ip grpc.devnet-plt-beta.concordium.com --grpc-port 20000 --secure

**Add an Account to the Deny List:**

.. code-block:: bash

   concordium-client transaction plt add-to-deny-list --sender GOVERNANCE_ACCOUNT --account ACCOUNT_ADDRESS --tokenId TOKEN_SYMBOL --grpc-ip grpc.devnet-plt-beta.concordium.com --grpc-port 20000 --secure

**Remove an Account from the Allow List:**

.. code-block:: bash

   concordium-client transaction plt remove-from-allow-list --sender GOVERNANCE_ACCOUNT --account ACCOUNT_ADDRESS --tokenId TOKEN_SYMBOL --grpc-ip grpc.devnet-plt-beta.concordium.com --grpc-port 20000 --secure

**Remove an Account from the Deny List:**

.. code-block:: bash

   concordium-client transaction plt remove-from-deny-list --sender GOVERNANCE_ACCOUNT --account ACCOUNT_ADDRESS --tokenId TOKEN_SYMBOL --grpc-ip grpc.devnet-plt-beta.concordium.com --grpc-port 20000 --secure



