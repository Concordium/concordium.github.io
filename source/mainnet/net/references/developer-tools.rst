.. include:: ../../variables.rst
.. _developer-tools:

===============
Auxiliary Tools
===============

Decrypt encrypted output
========================

Some Concordium tools, such as the |mw-gen1|, sometimes produce encrypted output. These files can be decrypted and inspected using the **utils** tool . You can download the tool from :ref:`Installation downloads <downloads>`.

To encrypt, enter:

``utils encrypt --in input.example --out output.json``

where ``--in ...`` is the file to encrypt, and ``--out`` is the file where encrypted data will be written.

The code example above results in the following interaction:

| ``Enter password to encrypt with: ....``
| ``Re-enter password: ....``
| ``Writing output to output.json``

To decrypt, enter:

``utils decrypt --in output.json --out decrypted.example``

Enter password to decrypt with, writing output to **decrypted.example**.

where ``--in ...`` is the encrypted file, and ``--out`` is the decryption.
