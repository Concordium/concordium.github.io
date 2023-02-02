.. include:: ../../variables.rst
.. _overview-desktop:

=========================
Set up the Desktop Wallet
=========================

This topic contains an overview of each task you need to complete to set up and start using the Desktop Wallet. The guide assumes that you'll be using the Desktop Wallet in combination with a LEDGER device to generate and store keys and sign transactions.

.. dropdown:: Step 1: Set up a node

    The Desktop Wallet must be connected to a running **trusted** node on the Concordium blockchain. The node enables the Desktop Wallet to interact with the Concordium blockchain to receive updates and submit transactions. A default Virtual Hive node (concordiumwalletnode.com) is provided. But you can run a node yourself using :ref:`Windows<run-node-windows>`, :ref:`macOS <run-node-macos>`, and :ref:`with Docker <run-a-node>` or :ref:`a Debian package <run-node-ubuntu>` on Linux. You can also have a third-party provider run a node for you.

.. dropdown:: Step 2: Set up the LEDGER device

    The Desktop Wallet requires that you store your keys on a LEDGER device. This is to ensure that your private account keys are kept secure. To be able to sign and send transactions using the Desktop Wallet, you need a LEDGER hardware wallet, and you need to install the Concordium LEDGER Application on the LEDGER device. The LEDGER device will generate the unique 24-word recovery phrase that is used to derive your private keys.

    .. Warning::

        During the process described in this guide, you’ll generate private keys on the Ledger device, and you’ll receive a 24-word recovery phrase. This is the only backup of your private keys. Make sure that you store it securely.

    #. Download and install **Ledger Live**. Ledger Live is available for Windows, Mac, and Linux desktop platforms, and iOS and Android for mobile devices. For information on how to do this, see `Ledger's documentation <https://www.ledger.com/ledger-live/download>`_. You’ll need Ledger Live when you set up the LEDGER device, install the Concordium app, and update the firmware.

    #. Follow the on-screen setup instructions to set up your PIN code on the LEDGER device and to get your 24 word recovery phrase.

.. dropdown:: Step 3: Set up the Concordium Desktop Wallet

    You'll need to install and set up the Desktop Wallet to create and manage identities and accounts and add a baker.

    To set up the Desktop Wallet:

    #. Install the Desktop Wallet. For more information, see :ref:`Installation downloads <downloads>`.

    #. Open the Desktop Wallet and create a password that contains at least 6 characters. Keep the password safe. You’ll need it to sign into the Desktop Wallet again.

    #. In the Desktop Wallet go to **Settings** and then select **Node settings**.

    #. The Virtual Hive node (concordiumwalletnode.com) is inserted by default, but you can change this to any other node that you prefer or the node provided by your third-party provider. Enter the **Address** and **Port** of the node you're running. The address is the network address of the node.

    #. Select **Set connection**. If the connection is working properly, there's a message saying **Successfully connected**.

    .. Warning::

        Currently, it is not possible to exchange identities and accounts between the |mw-gen1| or |mw-gen2| and the Desktop Wallet. If you try to import a file that has been exported from the |mw-gen1| into the Desktop Wallet, the import will fail, and likewise, if you try to import a file exported from the Desktop Wallet into the |mw-gen1|.

    .. Note::

        Without CCD you can't submit transactions on the Concordium blockchain. This includes creating multi-signature accounts and creating baker transactions. However, you can create identities, accounts that only require one signature, and you can add account addresses to your address book.

        You can buy CCD on many exchanges. If you are running on testnet, you can request CCD for testing using a button in the wallet.

.. dropdown:: Step 4: Set up an identity and an initial account

    Once you've installed the Desktop Wallet, you must set up an identity and an initial account. Concordium also recommends that you create a separate account to use as a baker account. See :ref:`Create an identity and an initial account in the Desktop Wallet <create-initial-account>` and :ref:`Create an account in the Desktop Wallet<create-account>`.

    You're now ready to start using the Desktop Wallet.
