.. include:: ../variables.rst
.. _developer-tools:

===============
Auxiliary Tools
===============

Decrypt encrypted output
========================

Some Concordium tools may produce encrypted output. These files can be decrypted and inspected using the **utils** tool. You can download the tool from :ref:`Installation downloads <downloads>`.

To encrypt, enter:

.. code-block:: console

    $utils encrypt --in input.example --out output.json

where ``--in ...`` is the file to encrypt, and ``--out`` is the file where encrypted data will be written.

The code example above results in the following interaction:

.. code-block:: console

    Enter password to encrypt with: ....
    Re-enter password: ....
    Writing output to output.json

To decrypt, enter:

.. code-block:: console

    $utils decrypt --in output.json --out decrypted-keys

where ``--in ...`` is the encrypted file, and ``--out`` is the decryption.

Enter password to decrypt with, writing output to **decrypted-keys**.

Getting your private key from an account already imported to the `concordium-client`
====================================================================================

Display your keys with the following command:

.. code-block:: console

    $concordium-client config show

Save the ``encryptedSignKey`` blob to a file named ``output.json``. The content of that file
should look similar to the below content.

.. code-block:: json

    {
        "cipherText": "K1ylur5Qy+UUYlwyShu1W6rRgRhcN12e91SEGZ9UBboEzTVVQ80cDpsJNBQmU+sBlo1FKrGxKFzPjxhKxxohmZ99yDXgyo9bMDxuTosqcfY=",
        "metadata": {
            "encryptionMethod": "AES-256",
            "initializationVector": "oJhcClLqUEotJxh4nmuCgA==",
            "iterations": 100000,
            "keyDerivationMethod": "PBKDF2WithHmacSHA256",
            "salt": "0XSYLtrsLN+XXwYqxD+gDw=="
        }
    }

Decode your private key by running the decrypt command on the ``output.json`` file.
You will need to enter your password from the backup file when it was exported from the mobile wallet.

.. code-block:: console

    $utils decrypt --in output.json --out decrypted-keys

Your private key will be saved to the ``decrypted-keys`` file.
