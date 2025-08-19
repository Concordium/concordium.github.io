.. include:: ../../../variables.rst
.. _plt-concordium-client:

Concordium Client CLI Tool
==========================

This guide explains how to use concordium-client to perform PLT operations from the command line.

Installation and setup
----------------------

Download and install ``concordium-client v9.1.4``:

**Downloads (v9.1.4):**

-  `Linux <https://github.com/Concordium/concordium-client/releases/download/9.1.4-0-rc/concordium-client-linux>`_

      - SHA256 checksum of the download: :substitution-code:`|client-linux-checksum|`
      - :ref:`Verification instructions <verification-client-linux>`

   Before you can use the downloaded Concordium Client on Linux you have to make the downloaded file executable. Run the following command to make the file you download executable:

      .. code-block:: console

         chmod +x concordium-client-linux

-  `Download Concordium Client for Windows <https://github.com/Concordium/concordium-client/releases/download/9.1.4-0-rc/concordium-client-windows.zip>`_

   - The Windows distribution is a zip file that must be extracted before use.
     To do this, in Windows Explorer, right-click the downloaded file and select
     "Extract All...". After extraction, you will have a folder containing the
     Concordium Client executable (``concordium-client.exe``) as well as other files
     that are required to run the client.

-  macOS: `ARM <https://github.com/Concordium/concordium-client/releases/download/9.1.4-0-rc/concordium-client-macos-arm.pkg>`_ `Intel <https://github.com/Concordium/concordium-client/releases/download/9.1.4-0-rc/concordium-client-macos-intel.pkg>`_

   - The macOS distribution is an installer that places an alias to the binary
     into the folder ``/usr/local/bin``. So after installing, you should have
     ``concordium-client`` on your path.

.. note::
   With new DevNet releases and features, new concordium-client versions may get released. Follow the communication channels for the most recent versions.


Available PLT commands
----------------------

The following PLT operations are available via CLI:

**Token Query Operations:**

- ``raw GetTokenList`` - Get a list of all PLTs available on DevNet
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

  concordium-client raw GetTokenList --grpc-ip grpc.devnet-plt-beta.concordium.com --grpc-port 20000 --secure

**Get PLT Info:**

.. code-block:: bash

  concordium-client raw GetTokenInfo TOKEN_SYMBOL --grpc-ip grpc.devnet-plt-beta.concordium.com --grpc-port 20000 --secure

.. _concordium-client-transfer-tokens:

**Transfer PLT:**

.. code-block:: bash

   concordium-client transaction plt send --sender YOUR_ACCOUNT --receiver RECEIVER_ADDRESS --amount 1 --tokenId TOKEN_SYMBOL --memo "test" --grpc-ip grpc.devnet-plt-beta.concordium.com --grpc-port 20000 --secure


**Mint PLT:**

.. code-block:: bash

   concordium-client transaction plt mint --sender GOVERNANCE_ACCOUNT --amount TOKEN-AMOUNT --tokenId TOKEN_SYMBOL --grpc-ip grpc.devnet-plt-beta.concordium.com --grpc-port 20000 --secure

**Burn PLT:**

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

**Suspend balance transfer operations for the PLT:**

.. code-block:: bash

   concordium-client transaction plt pause --sender GOVERNANCE_ACCOUNT --tokenId TOKEN_SYMBOL --grpc-ip grpc.devnet-plt-beta.concordium.com --grpc-port 20000 --secure

**Resume balance transfer operations for the PLT:**

.. code-block:: bash

   concordium-client transaction plt unpause --sender GOVERNANCE_ACCOUNT --tokenId TOKEN_SYMBOL --grpc-ip grpc.devnet-plt-beta.concordium.com --grpc-port 20000 --secure

