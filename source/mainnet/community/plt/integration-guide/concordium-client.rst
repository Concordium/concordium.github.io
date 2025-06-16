.. _plt-concordium-client:

Using Concordium Client with PLTs
=================================

This guide explains how to use the Concordium Client CLI tool to perform PLT operations from the command line.

Installation and setup
----------------------

Download and install Concordium Client v9.1.1-alpha:

**Downloads (v9.1.1):**

- `Linux <link>`_
- `Windows (signed) <link>`_
- `macOS - arm (signed) <link>`_
- `macOS - intel (signed) <link>`_

Available PLT commands
----------------------

The following PLT operations are available via CLI:

**Token Transfer Operations:**

- ``transaction plt send`` - Transfer PLT tokens (renamed from ``transaction transfer-plt``)

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

**Transfer PLT Tokens:**

.. code-block:: bash

   concordium-client transaction plt send --sender YOUR_ACCOUNT --receiver RECEIVER_ADDRESS --amount 1 --tokenId TOKEN_SYMBOL --memo "test" --grpc-ip grpc.devnet-plt-alpha.concordium.com --grpc-port 20000 --secure

**Mint PLT Tokens:**

.. code-block:: bash

   concordium-client transaction plt mint --sender GOVERNANCE_ACCOUNT --amount TOKEN-AMOUNT --tokenId TOKEN_SYMBOL --grpc-ip grpc.devnet-plt-alpha.concordium.com --grpc-port 20000 --secure

**Burn PLT Tokens:**

.. code-block:: bash

   concordium-client transaction plt burn --sender GOVERNANCE_ACCOUNT --amount TOKEN-AMOUNT --tokenId TOKEN_SYMBOL --grpc-ip grpc.devnet-plt-alpha.concordium.com --grpc-port 20000 --secure

**Add an Account to the Allow List:**

.. code-block:: bash

   concordium-client transaction plt add-to-allow-list --sender GOVERNANCE_ACCOUNT --account ACCOUNT_ADDRESS --tokenId TOKEN_SYMBOL --grpc-ip grpc.devnet-plt-alpha.concordium.com --grpc-port 20000 --secure

**Add an Account to the Deny List:**

.. code-block:: bash

   concordium-client transaction plt add-to-deny-list --sender GOVERNANCE_ACCOUNT --account ACCOUNT_ADDRESS --tokenId TOKEN_SYMBOL --grpc-ip grpc.devnet-plt-alpha.concordium.com --grpc-port 20000 --secure

**Remove an Account from the Allow List:**

.. code-block:: bash

   concordium-client transaction plt remove-from-allow-list --sender GOVERNANCE_ACCOUNT --account ACCOUNT_ADDRESS --tokenId TOKEN_SYMBOL --grpc-ip grpc.devnet-plt-alpha.concordium.com --grpc-port 20000 --secure

**Remove an Account from the Deny List:**

.. code-block:: bash

   concordium-client transaction plt remove-from-deny-list --sender GOVERNANCE_ACCOUNT --account ACCOUNT_ADDRESS --tokenId TOKEN_SYMBOL --grpc-ip grpc.devnet-plt-alpha.concordium.com --grpc-port 20000 --secure



