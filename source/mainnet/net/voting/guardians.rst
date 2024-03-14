.. _guardians:
.. include:: ../../variables.rst

=========
Guardians
=========

The guardian (via the guardian application) participates in two flows: the setup flow before the election and the decryption flow at the end of the election.

The setup flow ensures that the election tallying is decentralized. A number of guardians as defined by the election parameters in the smart contract register their public keys in the smart contract to say that they will tally election votes. After the election closes, the guardians decrypt their share of the votes and send the decrypted tally back to the smart contract. In this way, no one party tallies the votes for the election, ensuring a fair election.

.. note::

    Guardians cannot use the Desktop wallet or |mw-gen1| because these wallets cannot export account keys.

Pre-setup
=========

The guardians must give account addresses to the organizer of the election. If you need to know how to find your account address, see :ref:`share-address-mw`

Guardians must download and install the Guardian desktop application that is created by the election coordinator.

Setup
=====

Before the election opens, the guardians must generate keys.

#. Use the guardian app to generate pre-key.

    #. Register the public key in the contract

    #. Store the secrets

    #. wait until other guardians have done the same

#. After step 1 is complete, generate the real public key together with shares of encryption.

    #. Share this (together with proof) in the contract

    #. Store private keys securely in a JSON file.

    #. Wait until other guardians have done the same and check their proofs.

    #. If corruption is detected the guardian should register a complaint in the contract.

After the election
==================

The app retrieves the encrypted tally from the contract automatically.

#. Find the secret key stored during the Setup phase and decrypt the guardian’s share.

#. Send the decrypted share to the contract.

Uninstall the app
=================

Once the election is final, guardians should install the app. The instructions below describe how to install the app for each platform.

Windows
-------

MacOS
-----

Linux
-----

