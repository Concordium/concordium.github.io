.. _install-Ledger-app:

.. contents::
    :local:
    :backlinks: none
    :depth: 2

==============================================================
Set up the Ledger Nano S and install the Concordium Ledger App
==============================================================

To be able to sign and send transactions using the Desktop Wallet, you need a Ledger Nano S hardware wallet, and you need to install the Concordium Ledger Application on the Ledger. You can use Windows, macOS or Ubuntu to install the app.

Prerequisites
=============

-  Ledger hardware wallet

.. Warning:: During the process described in this guide, you’ll generate private keys on the Ledger Nano S hardware wallet, and you’ll receive a 24-word recovery phrase. This is the only backup of your private keys. Make sure that you store it securely.

Set up the Ledger Nano S
========================

The Ledger Nano S will generate the unique 24-word recovery phrase that is used to derive your private keys.

#. Download and install **Ledger Live**. For information on how to do this, see `Ledger's documentation <https://www.ledger.com/ledger-live/download>`_. You’ll only need Ledger Live when you set up the Ledger and update the firmware.

#. Open **Ledger Live**, select **Get started**, and then select **Nano S**.

#. Follow the on-screen setup instructions to set up your PIN code on the Ledger.

#. Follow the on-screen instructions to get your 24-word recovery phrase.

.. Warning:: Make sure that you write down the recovery phrase precisely as displayed and in the correct order. The recovery phrase is the only backup of your private keys.

Once you've set up the Ledger, you must check that it's running the proper firmware version. The Concordium Ledger App currently only supports Ledger firmware version 2.0.0.

Update the Ledger Nano S firmware
---------------------------------

To find out which firmware version the Ledger is running, do the following:

#. On the Ledger navigate to **Settings** and press both buttons for a little while to enter the Settings menu.

#. Press the right button to navigate to **Firmware version**.

#. Press both buttons to view the **Secure Element** version. If it says **2.0.0**, you don’t have to update the firmware. If there’s a lower version number, you’ll have to update the firmware.

For details on how to update the Ledger firmware, see `Ledger ‘s guide <https://support.ledger.com/hc/en-us/articles/360002731113-Update-Ledger-Nano-S-firmware>`_

Install Concordium Ledger app on Windows
========================================

Install Python and pip
----------------------

#. In the **Start** menu, type *store* to open the Microsoft store.

#. In **Search**, in the upper right corner, enter *python*.

#. Select **Python 3.9**, and then select **Install**.

   Python is downloaded and installed automatically. Depending on the setup of your computer, you might see a message saying **Python 3.9 just got installed**.

#. In the **Start** menu, type *PowerShell* and select **Windows PowerShell**. The command-line window opens.

#. To confirm that Python3 was installed, enter

.. code-block:: console

   Python --version

6. To confirm that the package manager named pip is installed, enter

.. code-block:: console

   pip --version

7. To install Python tools for the Ledger Nano S, enter

.. code-block:: console

   pip3 install ledgerblue

Install the custom certificate on Windows
-----------------------------------------

You now have to install a custom certificate on the Ledger to ensure that it trusts applications signed by Concordium's private key.

#. Disconnect the Ledger from your computer.

#. Download the ZIP folder with Concordium Ledger application.

#. Extract the files from the ZIP folder to a folder on your computer.

#. Close all applications that might be connected to the Ledger such as Ledger Live and Concordium Desktop Wallet and keep them closed until you’ve completed the steps in this guide.

#. Press the right button while you reconnect the Ledger to the computer, and hold it down until the Ledger says **recovery**.

#. Enter your PIN code.

#. Open the folder you extracted the files to and double-click the ``loadcertificate.bat`` file. If there’s a message saying **Windows protected your PC**, select **More info**, and then select **Run anyway**.

#. The Ledger says **Deny unsafe manager**. Press the right button to navigate through the public key until the Ledger says **Allow unsafe manager**. Press both buttons. The certificate is installed on the Ledger.

#. The Ledger says **Certificate concordium**. Press the right button to navigate through the key, and then press both buttons when the Ledger says Trust certificate.

#. Enter your PIN.

Install the Concordium Ledger app on Windows
--------------------------------------------

#. In the folder that you extracted the files to, double-click the ``install.bat`` file. If there’s a message saying **Windows protected your PC**, select **More info**, and then select **Run anyway**.

#. The Ledger says **Deny unsafe manager**. Press the right button to navigate through the public key until the Ledger says **Allow unsafe manager**. Press both buttons. The Ledger says **Loading, please wait** while it installs the app.

#. The Ledger says **Concordium**. Press both buttons. The Ledger says **Concordium is ready**. You can now use the Ledger with the Desktop Wallet.

Install Concordium Ledger app on macOS
======================================

Install Homebrew, Python, and pip
---------------------------------

#. Open the Terminal application. Click the **Launchpad** icon in the **Dock**, type *Terminal* in the search field, then select **Terminal**.

#. Install the package manager Homebrew. Copy the following line into the Terminal and press enter.

.. code-block:: console

   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

2. Install Python3 and Pip3 to manage (alternatively use pyenv if you need multiple python versions). Copy the following line into the Terminal and press enter:

.. code-block:: console

   brew install python@3.9

3. Install libusb. Copy the following line into the Terminal and press enter:

.. code-block:: console

   brew install libusb

4. If you have Mac with an M1 or similar Apple Silicon CPU, install:

.. code-block:: console

   brew install libjpeg

5. Install ledgerblue:

.. code-block:: console

   pip3 install ledgerblue

Install the custom certificate using macOS
------------------------------------------

You now have to install a custom certificate to ensure that the Ledger trusts applications signed by Concordium's private key.

#. Download the ZIP folder with the Concordium Ledger application.

#. Extract the files from the ZIP folder to a folder on your computer.

#. Close all applications that might be connected to the Ledger such as Ledger Live and Concordium Desktop Wallet and keep them closed until you’ve completed the steps in this guide.

#. Disconnect the Ledger from your computer.

#. Press the right button and hold it down while you reconnect the Ledger to the computer. The Ledger says **recovery mode**.

#. Enter your PIN code.

Load the certificate onto the Ledger by running the following script from the extracted folder:

.. code-block:: console

   ./loadcertificate.sh

#. The Ledger says **Deny unsafe manager**. Press the right button to navigate through the public key until the Ledger says **Allow unsafe manager**. Press both buttons. The certificate is installed on the Ledger.

#. The Ledger says **Certificate concordium**. Press the right button to navigate through the key, and then press both buttons when the Ledger says **Trust certificate**.

#. Enter your PIN.

Install the Concordium Ledger app on MacOS
---------------------------------------------

#. Install the Concordium application on the Ledger by running the following script from the folder you extracted the files to:

.. code-block:: console

   ./install.sh

2. The Ledger says **Deny unsafe manager**. Press the right button to navigate through the public key until the Ledger says **Allow unsafe manager**. Press both buttons. The Ledger says **Loading, please wait** while it installs the app.

3. The Ledger says **Concordium**. Press both buttons. The Ledger says **Concordium is ready**. You can now use the Ledger with the Desktop Wallet.

Install Concordium Ledger app on Ubuntu
=======================================

Install Python and pip on Ubuntu
--------------------------------

#. Add udev rules. For more information, see the Linux section in `Ledger ‘s guide Fix connection history <https://support.ledger.com/hc/en-us/articles/115005165269-Fix-connection-issues>`_.

.. code-block:: console

   wget -q -O - https://raw.githubusercontent.com/LedgerHQ/udev-rules/master/add_udev_rules.sh | sudo bash


2. Install python3:

.. code-block:: console

   sudo apt-get install python3

3. Install pip:

.. code-block:: console

   sudo apt-get install python3-pip

4. Install

.. code-block:: console

   sudo apt-get install libudev-dev libusb-1.0-0-dev python-dev

5. Install ledgerblue:

.. code-block:: console

   sudo pip3 install ledgerblue

Install the custom certificate on Ubuntu
----------------------------------------

You now have to install a custom certificate to ensure that the Ledger trusts applications signed by Concordium's private key.

#. Download the ZIP folder with the Concordium Ledger application.

#. Extract the files from the ZIP folder to a folder on your computer.

#. Close all applications that might be connected to the Ledger such as Ledger Live and Concordium Desktop Wallet and keep them closed until you’ve completed the steps in this guide.

#. Disconnect the Ledger from your computer.

#. Press the right button and hold it down while you reconnect the Ledger to the computer. The Ledger says **recovery mode**.

#. Enter your PIN code.

#. Run the following script from the folder you extracted the files to:

.. code-block:: console

   ./loadcertificate.sh

#. The Ledger says **Deny unsafe manager**. Press the right button to navigate through the public key until the Ledger says **Allow unsafe manager**. Press both buttons. The certificate is installed on the Ledger.

#. Press the right button to navigate through the key, and then press both buttons when the Ledger says **Trust certificate**.

Install the Concordium Ledger app on Ubuntu
-------------------------------------------

#. Install the Concordium application on the Ledger by running the following script from the folder you extracted the files to:

.. code-block:: console

   ./install.sh

2. The Ledger says **Deny unsafe manager**. Press the right button to navigate through the public key until the Ledger says **Allow unsafe manager**. Press both buttons. The Ledger says **Loading, please wait** while it installs the app.

3. The Ledger says **Concordium**. Press both buttons. The Ledger says **Concordium is ready**. You can now use the Ledger with the Desktop Wallet.
