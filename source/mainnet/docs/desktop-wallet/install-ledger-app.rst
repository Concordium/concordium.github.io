:orphan:

.. include:: ../../variables.rst

.. _install-Ledger-app:

==============================================================
Set up the LEDGER device and install the Concordium LEDGER App
==============================================================

.. warning::

   The steps here are only for members of the governance committee. If you are not a member of the governance committee, see :ref:`Install the Concordium LEDGER app using LEDGER Live<install-ledger>` for instructions on how to install.

.. seealso::

   To read about the latest changes, see the `changelog <https://github.com/Concordium/concordium-ledger-app/blob/main/governance-app/CHANGELOG.md>`_.

To be able to sign and send transactions using the Desktop Wallet, you need a LEDGER hardware wallet, and you need to install the Concordium LEDGER Application on the LEDGER device. You can use Windows, macOS or Ubuntu to install the app.

.. Note::

   The LEDGER NANO X is not supported currently.

Prerequisites
=============

-  LEDGER hardware wallet

.. Warning::

   During the process described in this guide, you’ll generate private keys on the LEDGER device, and you’ll receive a 24-word recovery phrase. This is the only backup of your private keys. Make sure that you store it securely.

Set up the LEDGER device
========================

The LEDGER device will generate the unique 24-word recovery phrase that is used to derive your private keys.

#. Download and install **Ledger Live**. For information on how to do this, see `Ledger's documentation <https://www.ledger.com/ledger-live/download>`_. You’ll only need Ledger Live when you set up the LEDGER device and update the firmware.

#. Open **Ledger Live**, select **Get started**, and then select **Ledger device**.

#. Follow the on-screen setup instructions to set up your PIN code on the LEDGER device.

#. Follow the on-screen instructions to get your 24-word recovery phrase.

.. Warning::

   Make sure that you write down the recovery phrase precisely as displayed and in the correct order. The recovery phrase is the only backup of your private keys.

Once you've set up the LEDGER device, you must check that it's running the proper firmware version for your device. The Concordium LEDGER App currently supports LEDGER firmware version 1.0.3 for LEDGER NANO S PLUS.

Update the LEDGER device firmware
---------------------------------

To update the LEDGER device firmware, do the following:

#. On the LEDGER device press both buttons for a little while until the Settings icon appears. Press both buttons to enter the Settings menu.

#. Press both buttons on the **General** menu item.

#. Press the right button to navigate to **Firmware version**.

#. Press both buttons to view the **Secure Element** version.

   - I it says **1.1.0**, you don't have to update the firmware. If there’s a lower version number, you’ll have to update the firmware.

For details on how to update the LEDGER firmware, see `LEDGER NANO S PLUS guide <https://support.ledger.com/hc/en-us/articles/4445777839901-Update-Ledger-Nano-S-Plus-firmware?docs=true>`_.

.. _Ledger-downloads:

Ledger packages
---------------

Once you have updated the firmware version, you can download the LEDGER app:

`Dwnload the Concordium LEDGER App 1.1.0 for LEDGER firmware version 1.1.0 <https://s3.eu-west-1.amazonaws.com/distribution.mainnet.concordium.software/tools/concordium-governance-ledger-app-1.1.0-nanos-plus-.zip>`_

When installing the certificate, ensure that the public key of the certificate is :substitution-code:`|ledger-app-public-key|`.

Follow the instructions below to update your app:

   * :ref:`update-app-windows`
   * :ref:`update-app-macos`
   * :ref:`update-app-ubuntu`

It should not be necessary to update the certificate.

See the changelog(link) for this governance version of the app.

Install Concordium LEDGER app on Windows
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


Install the custom certificate on Windows
-----------------------------------------

You now have to install a custom certificate on the LEDGER device to ensure that it trusts applications signed by Concordium's private key.

#. Close all applications that might be connected to the LEDGER device such as LEDGER LIVE and Concordium Desktop Wallet and keep them closed until you’ve completed the steps in this guide.

#. Disconnect the LEDGER device from your computer.

#. :ref:`Download the ZIP folder with Concordium LEDGER application<Ledger-downloads>`.

#. Extract the files from the ZIP folder to a folder on your computer.

#. Now you need to start recovery mode on the LEDGER device.

   - On the LEDGER device, press the *left* button and hold it down while you reconnect the LEDGER device to the computer. Navigate to **Recovery mode** and press both buttons to enter **recovery mode**.

#. Enter your PIN code.

#. Open the folder you extracted the files to and double-click the ``loadcertificate.bat`` file. If there’s a message saying **Windows protected your PC**, select **More info**, and then select **Run anyway**. A command-line window opens.

#. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**. Press both buttons. You can safely ignore the message in the command-line window saying **Broken certificate chain - loading from user key**. This is expected behavior.

#. The LEDGER device says **Certificate concordium**. Press the right button to navigate through the key, while confirming that it is the following:

   - :substitution-code:`|ledger-app-public-key|`

and then press both buttons when the LEDGER device says **Trust certificate**.

#. Enter your PIN. The certificate has now been installed on the LEDGER device.

.. _install-ledger-app-windows:

Install the Concordium LEDGER app on Windows
--------------------------------------------

#. In the folder that you extracted the files to, double-click the ``install.bat`` file. If there’s a message saying **Windows protected your PC**, select **More info**, and then select **Run anyway**.

#. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**. Press both buttons. The LEDGER device says **Loading, please wait** while it installs the app.

#. The LEDGER device says **Concordium**. Press both buttons. The LEDGER device says **Concordium is ready**. You can now use the LEDGER device with the Desktop Wallet.

.. _update-app-windows:

Update the Concordium LEDGER app on Windows
-------------------------------------------

For the app to work properly with the current version of the Desktop Wallet, make sure that you update to the latest version of the app.

.. Note::
    Before updating, verify that you have :ref:`installed Python3, pip, and the Python tools <install-python-pip-windows>` for LEDGER (ledgerblue) before updating the app.

#. :ref:`Download the LEDGER app<Ledger-downloads>` if you haven't done so already.

#. In the folder that you extracted the files to, double-click the ``install.bat`` file. If there’s a message saying **Windows protected your PC**, select **More info**, and then select **Run anyway**.

.. Note::

   If you get the error ``loadApp.py: error: unrecognized arguments: --apiLevel 1`` this means that you have an older version of the Python tools for LEDGER (ledgerblue). To update, run ``$pip3 install ledgerblue --upgrade``.

#. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**. Press both buttons.

#. Before you can install the new version of the LEDGER app, you have to uninstall the old one. The LEDGER device says **Uninstall Concordium**. Press the right button to navigate through the identifier until the LEDGER device says **Confirm action**. Press both buttons to confirm. The LEDGER device says **Loading, please wait** while it installs the app.

#. The LEDGER device says **Concordium**. Press both buttons. The LEDGER device says **Concordium is ready**. Press the left button to verify that you've installed the latest version of the LEDGER app.

Install Concordium LEDGER app on macOS
======================================

.. _install-python-pip-macos:

Install Homebrew, Python3, and pip
----------------------------------

#. Open the `Terminal <https://support.apple.com/en-gb/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac>`_ application.

#. Navigate to where you have downloaded the LEDGER install package. For example, this might be ``~/Downloads/concordium-governance-ledger-app-1.1.0-nanos-2.1.0.zip``. To navigate to this directory in a Terminal, enter ``cd ~/Downloads/concordium-governance-ledger-app-1.1.0-nanos-2.1.0.zip``.

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

You now have to install a custom certificate to ensure that the LEDGER device trusts applications signed by Concordium's private key.

#. Close all applications that might be connected to the LEDGER device such as LEDGER LIVE and Concordium Desktop Wallet and keep them closed until you’ve completed the steps in this guide.

#. :ref:`Download the ZIP folder with the Concordium LEDGER application<Ledger-downloads>`.

#. Extract the files from the ZIP folder to a folder on your computer.

#. Disconnect the LEDGER device from your computer.

#. Now you need to start recovery mode on the LEDGER device.

   - On the LEDGER device, press the *left* button and hold it down while you reconnect the LEDGER device to the computer. Navigate to **Recovery mode** and press both buttons to enter **recovery mode**.

#. Enter your PIN code.

#. Open the `Terminal <https://support.apple.com/en-gb/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac>`_ application.

#. Navigate to where you have downloaded the LEDGER install package. For example, this might be ``~/Downloads/concordium-governance-ledger-app-1.1.0-nanos-2.1.0.zip``. To navigate to this directory in a Terminal, enter ``cd ~/Downloads/concordium-governance-ledger-app-1.1.0-nanos-2.1.0.zip``.

#. Load the certificate onto the LEDGER device by running the following script from the extracted folder:

   .. code-block:: console

      $./loadcertificate.sh

#. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**. Press both buttons. You can safely ignore the message in the command-line window saying **Broken certificate chain - loading from user key**. This is expected behavior.

#. The LEDGER device says **Certificate concordium**. Press the right button to navigate through the key, while confirming that it is the following:

   - :substitution-code:`|ledger-app-public-key|`

and then press both buttons when the LEDGER device says **Trust certificate**.

#. Enter your PIN. The certificate has now been installed on the LEDGER device .

.. _install-ledger-app-macos:

Install the Concordium LEDGER app on macOS
---------------------------------------------

#. Open the `Terminal <https://support.apple.com/en-gb/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac>`_ application.

#. Navigate to where you have downloaded the LEDGER install package. For example, this might be ``~/Downloads/concordium-governance-ledger-app-1.1.0-nanos-2.1.0.zip``. To navigate to this directory in a Terminal, enter ``cd ~/Downloads/concordium-governance-ledger-app-1.1.0-nanos-2.1.0.zip``.

#. Install the Concordium application on the LEDGER device by running the following script from the folder you extracted the files to:

   .. code-block:: console

      $./install.sh

#. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**. Press both buttons. The LEDGER device says **Loading, please wait** while it installs the app.

#. The LEDGER device says **Concordium**. Press both buttons. The LEDGER device says **Concordium is ready**. You can now use the LEDGER device with the Desktop Wallet.

.. _update-app-macos:

Update/reinstall the Concordium LEDGER app on macOS
---------------------------------------------------

For the app to work properly with the current version of the Desktop Wallet, make sure that you update to the latest version of the app.

When you update your LEDGER device, it should not be necessary to update the certificate.

.. Note::
    If you're using a different computer than the one you used when you installed the app, you must :ref:`install Python3, pip, and the Python tools <install-python-pip-macos>` tools for LEDGER (ledgerblue) before updating the app.

#. :ref:`Download the LEDGER app<Ledger-downloads>` if you haven't done so already.

#. Open the `Terminal <https://support.apple.com/en-gb/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac>`_ application.

#. Navigate to where you have downloaded the LEDGER install package. For example, this might be ``~/Downloads/concordium-ledger-app-2.0.3-target-2.1.0``. To navigate to this directory in a Terminal, enter ``cd ~/Downloads/concordium-ledger-app-2.0.3-target-2.1.0``.

#. Install the Concordium application on the LEDGER device by running the following script from the folder you extracted the files to:

   .. code-block:: console

      ./install.sh

.. Note::

   If you get the error ``loadApp.py: error: unrecognized arguments: --apiLevel 1`` this means that you have an older version of the Python tools for LEDGER (ledgerblue). To update, run ``$pip3 install ledgerblue --upgrade``.

#. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**.

#. Before you can install the new version of the LEDGER app, you have to uninstall the old one. The LEDGER device says **Uninstall Concordium**. Press the right button to navigate through the identifier until the LEDGER device says **Confirm action**. Press both buttons to confirm. The LEDGER device says **Loading, please wait** while it installs the app.

#. The LEDGER device says **Concordium**. Press both buttons. The LEDGER device says **Concordium is ready**. Press the left button to verify that you've installed the latest version of the LEDGER app.

Install Concordium LEDGER app on Ubuntu
=======================================

Install Python3 and pip on Ubuntu
---------------------------------

.. _install-python-pip-ubuntu:

#. Add udev rules. For more information, see the Linux section in `LEDGER ‘s guide Fix connection history <https://support.ledger.com/hc/en-us/articles/115005165269-Fix-connection-issues>`_.

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

You now have to install a custom certificate to ensure that the LEDGER device trusts applications signed by Concordium's private key.

#. Close all applications that might be connected to the LEDGER device such as LEDGER LIVE and Concordium Desktop Wallet and keep them closed until you’ve completed the steps in this guide.

#. Download the ZIP folder with the Concordium LEDGER application.

#. Extract the files from the ZIP folder to a folder on your computer.

#. Disconnect the LEDGER device from your computer.

#. Now you need to start recovery mode on the LEDGER device.

   - On the LEDGER device, press the *left* button and hold it down while you reconnect the LEDGER device to the computer. Navigate to **Recovery mode** and press both buttons to enter **recovery mode**.

#. Enter your PIN code.

#. Run the following script from the folder you extracted the files to:

   .. code-block:: console

      $./loadcertificate.sh

#. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**. Press both buttons. You can safely ignore the message in the command-line window saying **Broken certificate chain - loading from user key**. This is expected behavior.

#. The LEDGER device says **Certificate concordium**. Press the right button to navigate through the key, while confirming that it is the following:

   - :substitution-code:`|ledger-app-public-key|`

and then press both buttons when the LEDGER device says **Trust certificate**.

#. Enter your PIN. The certificate has now been installed on the LEDGER device.

.. _install-ledger-app-ubuntu:

Install the Concordium LEDGER app on Ubuntu
-------------------------------------------

#. Install the Concordium application on the LEDGER device by running the following script from the folder you extracted the files to:

   .. code-block:: console

      $./install.sh

2. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**. Press both buttons. The LEDGER device says **Loading, please wait** while it installs the app.

3. The LEDGER device says **Concordium**. Press both buttons. The LEDGER device says **Concordium is ready**. You can now use the LEDGER device with the Desktop Wallet.

.. _update-app-ubuntu:

Update the Concordium LEDGER app on Ubuntu
-------------------------------------------

For the app to work properly with the current version of the Desktop Wallet, make sure that you update to the latest version of the app.

.. Note::
    If you're using a different computer than the one you used when you installed the app, you must :ref:`install Python3, pip, and the Python tools <install-python-pip-ubuntu>` for LEDGER (ledgerblue) before updating the app.

#. :ref:`Download <downloads>` the latest version of the LEDGER app if you haven't done so already.

#. Run the ``install.sh`` file from the folder that you extracted the files to.

.. Note::

   If you get the error ``loadApp.py: error: unrecognized arguments: --apiLevel 1`` this means that you have an older version of the Python tools for LEDGER (ledgerblue). To update, run ``$sudo pip3 install ledgerblue --upgrade``.

#. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**.

#. Before you can install the new version of the LEDGER app, you have to uninstall the old one. The LEDGER device says **Uninstall Concordium**. Press the right button to navigate through the identifier until the LEDGER device says **Confirm action**. Press both buttons to confirm. The LEDGER device says **Loading, please wait** while it installs the app.

#. The LEDGER device says **Concordium**. Press both buttons. The LEDGER device says **Concordium is ready**. Press the left button to verify that you've installed the latest version of the LEDGER app.
