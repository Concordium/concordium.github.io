
.. _install-Ledger-app:

==============================================================
Set up the Ledger device and install the Concordium Ledger App
==============================================================

To be able to sign and send transactions using the Desktop Wallet, you need a Ledger hardware wallet, and you need to install the Concordium Ledger Application on the Ledger. You can use Windows, macOS or Ubuntu to install the app.

.. Note::

   The Ledger Nano X is not supported currently.

Prerequisites
=============

-  Ledger device

.. Warning:: During the process described in this guide, you’ll generate private keys on the Ledger device, and you’ll receive a 24-word recovery phrase. This is the only backup of your private keys. Make sure that you store it securely.

Set up the Ledger device
========================

The Ledger device will generate the unique 24-word recovery phrase that is used to derive your private keys.

#. Download and install **Ledger Live**. For information on how to do this, see `Ledger's documentation <https://www.ledger.com/ledger-live/download>`_. You’ll only need Ledger Live when you set up the Ledger and update the firmware.

#. Open **Ledger Live**, select **Get started**, and then select **Nano S** or **Nano S Plus**.

#. Follow the on-screen setup instructions to set up your PIN code on the Ledger.

#. Follow the on-screen instructions to get your 24-word recovery phrase.

.. Warning:: Make sure that you write down the recovery phrase precisely as displayed and in the correct order. The recovery phrase is the only backup of your private keys.

Once you've set up the Ledger, you must check that it's running the proper firmware version for your device. The Concordium Ledger App currently supports Ledger firmware version 2.1.0 for the Ledger Nano S and 1.0.3 for Ledger Nano S Plus.

Update the Ledger device firmware
---------------------------------

To find out which firmware version the Ledger is running, do the following:

#. On the Ledger press both buttons for a little while until the Settings icon appears. Press both buttons to enter the Settings menu.

#. On the **Nano S Plus** press both buttons on the **General** menu item.

#. Press the right button to navigate to **Firmware version**.

#. Press both buttons to view the **Secure Element** version.

   - For **Nano S**, if it says **2.1.0**, you don’t have to update the firmware. If there’s a lower version number, you’ll have to update the firmware.

   - For **Nano S Plus**, if it says **1.0.4**, you don't have to update the firmware. If there’s a lower version number, you’ll have to update the firmware.

For details on how to update the Ledger firmware, see `Ledger Nano S guide <https://support.ledger.com/hc/en-us/articles/360002731113-Update-Ledger-Nano-S-firmware>`_ or `Ledger Nano S Plus guide <https://support.ledger.com/hc/en-us/articles/4445777839901-Update-Ledger-Nano-S-Plus-firmware?docs=true>`_.

Once you have updated the firmware version, you can download the Ledger app at :ref:`Downloads <downloads>`.

Follow the instructions below to update your app:

   * :ref:`update-app-windows`
   * :ref:`update-app-macos`
   * :ref:`update-app-ubuntu`

It should not be necessary to update the certificate.

.. _install-ledger-windows:

Install Concordium Ledger app on Windows
========================================

.. _install-python-pip-windows:

Install Python3 and pip
-----------------------

#. In the **Start** menu, type *store* to open the Microsoft store.

#. In **Search**, in the upper right corner, enter *python*.

#. Select **Python 3.9**, and then select **Install**.

   Python is downloaded and installed automatically. Depending on the setup of your computer, you might see a message saying **Python 3.9 just got installed**.

Restart your computer, and then confirm that Python and Pip were installed.

#. In the **Start** menu, type *PowerShell* and select **Windows PowerShell**. The command-line window opens.

#. To confirm that Python3 was installed, enter

   .. code-block:: console

      $Python3 --version

#. To confirm that the package manager named pip is installed, enter

   .. code-block:: console

      $pip --version

#. To install Python tools for the Ledger Nano S, enter

   .. code-block:: console

      $pip install ledgerblue

Install the custom certificate on Windows
-----------------------------------------

You now have to install a custom certificate on the Ledger to ensure that it trusts applications signed by Concordium's private key.

#. Close all applications that might be connected to the Ledger such as Ledger Live and Concordium Desktop Wallet and keep them closed until you’ve completed the steps in this guide.

#. Disconnect the Ledger from your computer.

#. Download the ZIP folder with Concordium Ledger application.

#. Extract the files from the ZIP folder to a folder on your computer.

#. Now you need to start recovery mode on the Ledger device.

   - On the **Nano S**, press the *right* button and hold it down while you reconnect the Ledger to the computer until the Ledger says **recovery**.

   - On the **Nano S Plus**, press the *left* button and hold it down while you reconnect the Ledger to the computer. Navigate to **Recovery mode** and press both buttons to enter **recovery mode**.

#. Enter your PIN code.

#. Open the folder you extracted the files to and double-click the ``loadcertificate.bat`` file. If there’s a message saying **Windows protected your PC**, select **More info**, and then select **Run anyway**. A command-line window opens.

#. The Ledger says **Deny unsafe manager**. Press the right button to navigate through the public key until the Ledger says **Allow unsafe manager**. Press both buttons. You can safely ignore the message in the command-line window saying **Broken certificate chain - loading from user key**. This is expected behavior.

#. The certificate is installed on the Ledger. The Ledger says **Certificate concordium**. Press the right button to navigate through the key, and then press both buttons when the Ledger says Trust certificate.

#. Enter your PIN.

.. _install-ledger-app-windows:

Install the Concordium Ledger app on Windows
--------------------------------------------

#. In the folder that you extracted the files to, double-click the ``install.bat`` file. If there’s a message saying **Windows protected your PC**, select **More info**, and then select **Run anyway**.

#. The Ledger says **Deny unsafe manager**. Press the right button to navigate through the public key until the Ledger says **Allow unsafe manager**. Press both buttons. The Ledger says **Loading, please wait** while it installs the app.

#. The Ledger says **Concordium**. Press both buttons. The Ledger says **Concordium is ready**. You can now use the Ledger with the Desktop Wallet.

.. _update-app-windows:

Update the Concordium Ledger app on Windows
-------------------------------------------

For the app to work properly with the current version of the Desktop Wallet, make sure that you update to the latest version of the app.

.. Note::
    Before updating, verify that you have :ref:`installed Python3, pip, and the Python tools <install-python-pip-windows>` for Ledger (ledgerblue) before updating the app.

#. :ref:`Download <downloads>` the latest version of the Ledger app if you haven't done so already.

#. In the folder that you extracted the files to, double-click the ``install.bat`` file. If there’s a message saying **Windows protected your PC**, select **More info**, and then select **Run anyway**.

#. The Ledger says **Deny unsafe manager**. Press the right button to navigate through the public key until the Ledger says **Allow unsafe manager**. Press both buttons.

#. Before you can install the new version of the Ledger app, you have to uninstall the old one. The Ledger says **Uninstall Concordium**. Press the right button to navigate through the identifier until the Ledger says **Confirm action**. Press both buttons to confirm. The Ledger says **Loading, please wait** while it installs the app.

#. The Ledger says **Concordium**. Press both buttons. The Ledger says **Concordium is ready**. Press the left button to verify that you've installed the latest version of the Ledger app.

.. _install-ledger-macos:

Install Concordium Ledger app on macOS
======================================

.. _install-python-pip-macos:

Install Homebrew, Python3, and pip
----------------------------------

#. Open the `Terminal <https://support.apple.com/en-gb/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac>`_ application.

#. Navigate to where you have downloaded the Ledger install package. For example, this might be ``~/Downloads/concordium-ledger-app-2.0.1-target-2.0.0``. To navigate to this directory in a Terminal, enter ``cd ~/Downloads/concordium-ledger-app-2.0.1-target-2.0.0``.

#. Install the package manager `Homebrew <https://brew.sh/>`_; you will need the Homebrew tool to install the remaining dependencies. Copy the following line into the Terminal and press enter.

   .. code-block:: console

      $/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

#. To install Python3, Pip3, `libusb <https://libusb.info/>`_, and `libjpeg <http://libjpeg.sourceforge.net/>`_, copy the following into the Terminal and press Enter:

   .. code-block:: console

      $brew install python@3.9 libusb libjpeg

   You can use `pyenv<https://github.com/pyenv/pyenv>` if you need multiple python versions. Installing libjpeg is only necessary if you have a Mac with an M1 or similar Apple Silicon CPU.

#. To install ledgerblue, copy the following into the Terminal and press Enter:

   .. code-block:: console

      $pip3 install ledgerblue

Install the custom certificate using macOS
------------------------------------------

You now have to install a custom certificate to ensure that the Ledger trusts applications signed by Concordium's private key.

#. Close all applications that might be connected to the Ledger such as Ledger Live and Concordium Desktop Wallet and keep them closed until you’ve completed the steps in this guide.

#. Download the ZIP folder with the Concordium Ledger application.

#. Extract the files from the ZIP folder to a folder on your computer.

#. Disconnect the Ledger from your computer.

#. Now you need to start recovery mode on the Ledger device.

   - On the **Nano S**, press the *right* button and hold it down while you reconnect the Ledger to the computer. The Ledger says **recovery mode**.

   - On the **Nano S Plus**, press the *left* button and hold it down while you reconnect the Ledger to the computer. Navigate to **Recovery mode** and press both buttons to enter **recovery mode**.

#. Enter your PIN code.

#. Open the `Terminal <https://support.apple.com/en-gb/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac>`_ application.

#. Navigate to where you have downloaded the Ledger install package. For example, this might be ``~/Downloads/concordium-ledger-app-2.0.1-target-2.0.0``. To navigate to this directory in a Terminal, enter ``cd ~/Downloads/concordium-ledger-app-2.0.1-target-2.0.0``.

#. Load the certificate onto the Ledger by running the following script from the extracted folder:

   .. code-block:: console

      $./loadcertificate.sh

#. The Ledger says **Deny unsafe manager**. Press the right button to navigate through the public key until the Ledger says **Allow unsafe manager**. Press both buttons. You can safely ignore the message in the command-line window saying **Broken certificate chain - loading from user key**. This is expected behavior.

#. The certificate is installed on the Ledger. The Ledger says **Certificate concordium**. Press the right button to navigate through the key, and then press both buttons when the Ledger says **Trust certificate**.

#. Enter your PIN.

.. _install-ledger-app-macos:

Install the Concordium Ledger app on MacOS
---------------------------------------------

#. Open the `Terminal <https://support.apple.com/en-gb/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac>`_ application.

#. Navigate to where you have downloaded the Ledger install package. For example, this might be ``~/Downloads/concordium-ledger-app-2.0.1-target-2.0.0``. To navigate to this directory in a Terminal, enter ``cd ~/Downloads/concordium-ledger-app-2.0.1-target-2.0.0``.

#. Install the Concordium application on the Ledger by running the following script from the folder you extracted the files to:

   .. code-block:: console

      $./install.sh

#. The Ledger says **Deny unsafe manager**. Press the right button to navigate through the public key until the Ledger says **Allow unsafe manager**. Press both buttons. The Ledger says **Loading, please wait** while it installs the app.

#. The Ledger says **Concordium**. Press both buttons. The Ledger says **Concordium is ready**. You can now use the Ledger with the Desktop Wallet.

.. _update-app-macos:

Update/reinstall the Concordium Ledger app on macOS
---------------------------------------------------

For the app to work properly with the current version of the Desktop Wallet, make sure that you update to the latest version of the app.

When you update your Ledger, it should not be necessary to update the certificate.

.. Note::
    If you're using a different computer than the one you used when you installed the app, you must :ref:`install Python3, pip, and the Python tools <install-python-pip-macos>` tools for Ledger (ledgerblue) before updating the app.

#. :ref:`Download <downloads>` the latest version of the Ledger app if you haven't done so already.

#. Open the `Terminal <https://support.apple.com/en-gb/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac>`_ application.

#. Navigate to where you have downloaded the Ledger install package. For example, this might be ``~/Downloads/concordium-ledger-app-2.0.3-target-2.1.0``. To navigate to this directory in a Terminal, enter ``cd ~/Downloads/concordium-ledger-app-2.0.3-target-2.1.0``.

#. Install the Concordium application on the Ledger by running the following script from the folder you extracted the files to:

   .. code-block:: console

      ./install.sh


#. The Ledger says **Deny unsafe manager**. Press the right button to navigate through the public key until the Ledger says **Allow unsafe manager**.

#. Before you can install the new version of the Ledger app, you have to uninstall the old one. The Ledger says **Uninstall Concordium**. Press the right button to navigate through the identifier until the Ledger says **Confirm action**. Press both buttons to confirm. The Ledger says **Loading, please wait** while it installs the app.

#. The Ledger says **Concordium**. Press both buttons. The Ledger says **Concordium is ready**. Press the left button to verify that you've installed the latest version of the Ledger app.

.. _install-ledger-ubuntu:

Install Concordium Ledger app on Ubuntu
=======================================

Install Python3 and pip on Ubuntu
---------------------------------

.. _install-python-pip-ubuntu:

#. Add udev rules. For more information, see the Linux section in `Ledger ‘s guide Fix connection history <https://support.ledger.com/hc/en-us/articles/115005165269-Fix-connection-issues>`_.

   .. code-block:: console

      $wget -q -O - https://raw.githubusercontent.com/LedgerHQ/udev-rules/master/add_udev_rules.sh | sudo bash


2. Install python3:

   .. code-block:: console

      $sudo apt-get install python3

3. Install pip:

   .. code-block:: console

      $sudo apt-get install python3-pip

4. Install

   .. code-block:: console

      $sudo apt-get install libudev-dev libusb-1.0-0-dev python-dev

5. Install ledgerblue:

   .. code-block:: console

      $sudo pip3 install ledgerblue

Install the custom certificate on Ubuntu
----------------------------------------

You now have to install a custom certificate to ensure that the Ledger trusts applications signed by Concordium's private key.

#. Close all applications that might be connected to the Ledger such as Ledger Live and Concordium Desktop Wallet and keep them closed until you’ve completed the steps in this guide.

#. Download the ZIP folder with the Concordium Ledger application.

#. Extract the files from the ZIP folder to a folder on your computer.

#. Disconnect the Ledger from your computer.

#. Now you need to start recovery mode on the Ledger device.

   - On the **Nano S**, press the *right* button and hold it down while you reconnect the Ledger to the computer. The Ledger says **recovery mode**.

   - On the **Nano S Plus**, press the *left* button and hold it down while you reconnect the Ledger to the computer. Navigate to **Recovery mode** and press both buttons to enter **recovery mode**.

#. Enter your PIN code.

#. Run the following script from the folder you extracted the files to:

   .. code-block:: console

      $./loadcertificate.sh

#. The Ledger says **Deny unsafe manager**. Press the right button to navigate through the public key until the Ledger says **Allow unsafe manager**. Press both buttons. You can safely ignore the message in the command-line window saying **Broken certificate chain - loading from user key**. This is expected behavior.

#. The certificate is installed on the Ledger. Press the right button to navigate through the key, and then press both buttons when the Ledger says **Trust certificate**.

.. _install-ledger-app-ubuntu:

Install the Concordium Ledger app on Ubuntu
-------------------------------------------

#. Install the Concordium application on the Ledger by running the following script from the folder you extracted the files to:

   .. code-block:: console

      $./install.sh

2. The Ledger says **Deny unsafe manager**. Press the right button to navigate through the public key until the Ledger says **Allow unsafe manager**. Press both buttons. The Ledger says **Loading, please wait** while it installs the app.

3. The Ledger says **Concordium**. Press both buttons. The Ledger says **Concordium is ready**. You can now use the Ledger with the Desktop Wallet.

.. _update-app-ubuntu:

Update the Concordium Ledger app on Ubuntu
-------------------------------------------

For the app to work properly with the current version of the Desktop Wallet, make sure that you update to the latest version of the app.

.. Note::
    If you're using a different computer than the one you used when you installed the app, you must :ref:`install Python3, pip, and the Python tools <install-python-pip-ubuntu>` for Ledger (ledgerblue) before updating the app.

#. :ref:`Download <downloads>` the latest version of the Ledger app if you haven't done so already.

#. Run the ``install.sh`` file from the folder that you extracted the files to.

#. The Ledger says **Deny unsafe manager**. Press the right button to navigate through the public key until the Ledger says **Allow unsafe manager**.

#. Before you can install the new version of the Ledger app, you have to uninstall the old one. The Ledger says **Uninstall Concordium**. Press the right button to navigate through the identifier until the Ledger says **Confirm action**. Press both buttons to confirm. The Ledger says **Loading, please wait** while it installs the app.

#. The Ledger says **Concordium**. Press both buttons. The Ledger says **Concordium is ready**. Press the left button to verify that you've installed the latest version of the Ledger app.
