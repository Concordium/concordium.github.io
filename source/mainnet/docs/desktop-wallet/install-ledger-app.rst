.. include:: ../../variables.rst

.. |nano-s-firmware| replace:: **2.1.0**
.. |nano-s-plus-firmware| replace:: **1.4.0**
.. |ccd-governance-version| replace:: **1.3.0**
.. _dl-nanos: https://github.com/Concordium/concordium-ledger-app/releases/download/governance-app%2F1.3.0/concordium-governance-ledger-app-1.3.0-nanos-2.1.0.zip
.. _dl-nanosp: https://github.com/Concordium/concordium-ledger-app/releases/download/governance-app%2F1.3.0/concordium-governance-ledger-app-1.3.0-nanosplus.zip

.. _install-Ledger-app:

=========================================================================
Set up the LEDGER device and install the Concordium Governance LEDGER App
=========================================================================

.. warning::

   The steps here are only for members of the governance committee. If you are not a member of the governance committee, see :ref:`Install the Concordium LEDGER app using LEDGER Live<install-ledger>` for instructions on how to install.

.. seealso::

   To read about the latest changes, see the `changelog <https://github.com/Concordium/concordium-ledger-app/blob/main/governance-app/CHANGELOG.md>`_.

To be able to sign and send transactions using the Desktop Wallet, you need a LEDGER hardware wallet, and you need to install the Concordium LEDGER Application on the LEDGER device. You can use Windows, macOS or Ubuntu to install the app.

.. Note::

   Only Ledger Nano S/S+ is currently supported.

Prerequisites
=============

-  LEDGER hardware wallet

.. Warning::

   During the process described in this guide, you'll generate private keys on the LEDGER device, and you'll receive a 24-word recovery phrase. This is the only backup of your private keys. Make sure that you store it securely.

Set up the LEDGER device
========================

The LEDGER device will generate the unique 24-word recovery phrase that is used to derive your private keys.

#. Download and install **Ledger Live**. For information on how to do this, see `Ledger's documentation <https://www.ledger.com/ledger-live/download>`_. You'll only need Ledger Live when you set up the LEDGER device and update the firmware.

#. Open **Ledger Live**, select **Get started**, and then select **Ledger device**.

#. Follow the on-screen setup instructions to set up your PIN code on the LEDGER device.

#. Follow the on-screen instructions to get your 24-word recovery phrase.

.. Warning::

   Make sure that you write down the recovery phrase precisely as displayed and in the correct order. The recovery phrase is the only backup of your private keys.


.. tabs::

   .. group-tab:: Nano S

       Once you've set up the LEDGER device, you must check that it's running the proper firmware version for your device. The Concordium LEDGER App currently supports LEDGER firmware version |nano-s-firmware| for LEDGER NANO S.

   .. group-tab:: Nano S+

       Once you've set up the LEDGER device, you must check that it's running the proper firmware version for your device. The Concordium LEDGER App currently supports LEDGER firmware version |nano-s-plus-firmware| for LEDGER NANO S+.

Update the LEDGER device firmware
---------------------------------

To update the LEDGER device firmware, do the following:

.. tabs::

   .. group-tab:: Nano S

      #. On the LEDGER device press both buttons for a little while until the Settings icon appears. Press both buttons to enter the Settings menu.

      #. Press both buttons on the **General** menu item.

      #. Press the right button to navigate to **Firmware version**.

      #. Press both buttons to view the **Secure Element** version.

          - If it says |nano-s-firmware|, you don't have to update the firmware. If there's a lower version number, you'll have to update the firmware.

   .. group-tab:: Nano S+

      #. On the LEDGER device press both buttons for a little while until the Settings icon appears. Press both buttons to enter the Settings menu.

      #. Press both buttons on the **General** menu item.

      #. Press the right button to navigate to **Firmware version**.

      #. Press both buttons to view the **Secure Element** version.

          - If it says |nano-s-plus-firmware|, you don't have to update the firmware. If there's a lower version number, you'll have to update the firmware.

.. note::

   For details on how to update the LEDGER firmware, see `LEDGER NANO S PLUS guide <https://support.ledger.com/article/360013349800-zd>`_.

Install Python and pip
======================

You need to install Python and pip to proceed with installing the Concordium LEDGER app. The installation steps depend on your operating system.

.. tabs::

   .. group-tab:: Windows

      .. _install-python-pip-windows:

      #. In the **Start** menu, type *store* to open the Microsoft store.

      #. In **Search**, in the upper right corner, enter *python*.

      #. Select **Python 3**, and then select **Install**.

         Python is downloaded and installed automatically. Depending on the setup of your computer, you might see a message saying **Python 3 just got installed**.

      #. Restart your computer, and then confirm that Python and Pip were installed.

      #. In the **Start** menu, type *PowerShell* and select **Windows PowerShell**. The command-line window opens.

      #. To confirm that Python3 was installed, enter

         .. code-block:: console

            $python3 --version

      #. To confirm that the package manager named pip is installed, enter

         .. code-block:: console

            $pip --version

      #. To install ledgerblue, copy the following into the Terminal and press Enter:

         .. code-block:: console

            $pip install ledgerblue

   .. group-tab:: macOS

      .. _install-python-pip-macos:

      #. Open the `Terminal <https://support.apple.com/en-gb/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac>`_ application.

      #. Install the package manager `Homebrew <https://brew.sh/>`_ (if not already available on your mac); you will need the Homebrew tool to install the remaining dependencies. Copy the following line into the Terminal and press enter.

         .. code-block:: console

            $/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

      #. To install Python3, Pip3, `libusb <https://libusb.info/>`_, and `libjpeg <http://libjpeg.sourceforge.net/>`_, copy the following into the Terminal and press Enter:

         .. code-block:: console

            $brew install python@3 libusb libjpeg

         You can use `pyenv <https://github.com/pyenv/pyenv>`_ if you need multiple python versions. Installing libjpeg is only necessary if you have a Mac with an M1 or similar Apple Silicon CPU.

      #. To install ledgerblue, copy the following into the Terminal and press Enter:

         .. code-block:: console

            $pip3 install ledgerblue

   .. group-tab:: Ubuntu

      .. _install-python-pip-ubuntu:

      #. Add udev rules. For more information, see the Linux section in `LEDGER 's guide Fix connection history <https://support.ledger.com/article/115005165269-zd>`_.

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

.. _Ledger-downloads:

Download Concordium Governance LEDGER app
=========================================

Once you have updated the firmware version, you can download the LEDGER app:

.. tabs::

   .. group-tab:: Nano S

      #. `Download the Concordium Governance LEDGER App for LEDGER Nano S <dl-nanos_>`_

      #. Extract the files from the ``.zip`` folder to a folder on your computer.

   .. group-tab:: Nano S+

      #. `Download the Concordium Governance LEDGER App for LEDGER Nano S+ <dl-nanosp_>`_

      #. Extract the files from the ``.zip`` folder to a folder on your computer.

Install the custom certificate (Nano S only)
============================================

.. Note::

   If the certificate is already installed on the device, it should not be necessary to update this. If you're a LEDGER Nano S+ user, you can also skip this section.

You need to install a custom certificate to ensure that the LEDGER device trusts applications signed by Concordium's private key.

.. tabs::

   .. group-tab:: Windows

      #. Close all applications that might be connected to the LEDGER device such as LEDGER LIVE and Concordium Desktop Wallet and keep them closed until you've completed the steps in this guide.

      #. Disconnect the LEDGER device from your computer.

      #. Now you need to start recovery mode on the LEDGER device.

         - On the LEDGER device, press the *left* button and hold it down while you reconnect the LEDGER device to the computer. Navigate to **Recovery mode** and press both buttons to enter **recovery mode**.

      #. Enter your PIN code.

      #. Open the folder you extracted the files to and double-click the ``loadcertificate.bat`` file. If there's a message saying **Windows protected your PC**, select **More info**, and then select **Run anyway**. A command-line window opens.

      #. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**. Press both buttons. You can safely ignore the message in the command-line window saying **Broken certificate chain - loading from user key**. This is expected behavior.

      #. The LEDGER device says **Certificate concordium**. Press the right button to navigate through the key, while confirming that it is the following:

         - :substitution-code:`|ledger-app-public-key|`

      #. Press both buttons when the LEDGER device says **Trust certificate**.

      #. Enter your PIN. The certificate has now been installed on the LEDGER device.

   .. group-tab:: macOS

      #. Close all applications that might be connected to the LEDGER device such as LEDGER LIVE and Concordium Desktop Wallet and keep them closed until you've completed the steps in this guide.

      #. Disconnect the LEDGER device from your computer.

      #. Now you need to start recovery mode on the LEDGER device.

         - On the LEDGER device, press the *left* button and hold it down while you reconnect the LEDGER device to the computer. Navigate to **Recovery mode** and press both buttons to enter **recovery mode**.

      #. Enter your PIN code.

      #. Open the `Terminal <https://support.apple.com/en-gb/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac>`_ application.

      #. Navigate to where you have downloaded and extracted the LEDGER install package. For example to navigate to the default download directory in a Terminal, enter

         .. code-block:: console
            :substitutions:

            $cd ~/Downloads/concordium-governance-ledger-app-|ccd-governance-version|-nanos-|nano-s-firmware|

         .. For now, setting up custom CAs on Nano S+ does not make any difference, as sideloading signed apps is not working.
         ..
         .. .. tabs::
         ..
         ..    .. group-tab:: Nano S
         ..
         ..       .. code-block:: console
         ..          :substitutions:
         ..
         ..          $cd ~/Downloads/concordium-governance-ledger-app-|ccd-governance-version|-nanos-|nano-s-firmware|
         ..
         ..    .. group-tab:: Nano S+
         ..
         ..       .. code-block:: console
         ..          :substitutions:
         ..
         ..          $cd ~/Downloads/concordium-governance-ledger-app-|ccd-governance-version|-nanosplus

      #. Load the certificate onto the LEDGER device by running the following script from the extracted folder:

         .. code-block:: console

            $./loadcertificate.sh

      #. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**. Press both buttons. You can safely ignore the message in the command-line window saying **Broken certificate chain - loading from user key**. This is expected behavior.

      #. The LEDGER device says **Certificate concordium**. Press the right button to navigate through the key, while confirming that it is the following:

         - :substitution-code:`|ledger-app-public-key|`

      #. Press both buttons when the LEDGER device says **Trust certificate**.

      #. Enter your PIN. The certificate has now been installed on the LEDGER device.

   .. group-tab:: Ubuntu

      #. Close all applications that might be connected to the LEDGER device such as LEDGER LIVE and Concordium Desktop Wallet and keep them closed until you've completed the steps in this guide.

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

      #. Press both buttons when the LEDGER device says **Trust certificate**.

      #. Enter your PIN. The certificate has now been installed on the LEDGER device.

Install the Concordium Governance LEDGER app
============================================

After installing the certificate, you can proceed to install the Concordium LEDGER app.

.. tabs::

   .. group-tab:: Windows

      .. _install-ledger-app-windows:

      #. In the folder that you extracted the files to, double-click the ``install.bat`` file. If there's a message saying **Windows protected your PC**, select **More info**, and then select **Run anyway**.

      #. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**. Press both buttons. The LEDGER device says **Loading, please wait** while it installs the app.

      #. The LEDGER device says **Concordium**. Press both buttons. The LEDGER device says **Concordium is ready**. You can now use the LEDGER device with the Desktop Wallet.

   .. group-tab:: macOS

      .. _install-ledger-app-macos:

      #. Open the `Terminal <https://support.apple.com/en-gb/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac>`_ application.

      #. Navigate to where you have downloaded and extracted the LEDGER install package. For example to navigate to the default download directory in a Terminal, enter

         .. tabs::

            .. group-tab:: Nano S

               .. code-block:: console
                  :substitutions:

                  $cd ~/Downloads/concordium-governance-ledger-app-|ccd-governance-version|-nanos-|nano-s-firmware|

            .. group-tab:: Nano S+

               .. code-block:: console
                  :substitutions:

                  $cd ~/Downloads/concordium-governance-ledger-app-|ccd-governance-version|-nanosplus

      #. Install the Concordium application on the LEDGER device by running the following script from the folder you extracted the files to:

         .. code-block:: console

            $./install.sh

      #. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**. Press both buttons. The LEDGER device says **Loading, please wait** while it installs the app.

      #. The LEDGER device says **Concordium**. Press both buttons. The LEDGER device says **Concordium is ready**. You can now use the LEDGER device with the Desktop Wallet.

   .. group-tab:: Ubuntu

      .. _install-ledger-app-ubuntu:

      #. Install the Concordium application on the LEDGER device by running the following script from the folder you extracted the files to:

         .. code-block:: console

            $./install.sh

      2. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**. Press both buttons. The LEDGER device says **Loading, please wait** while it installs the app.

      3. The LEDGER device says **Concordium**. Press both buttons. The LEDGER device says **Concordium is ready**. You can now use the LEDGER device with the Desktop Wallet.

Update the Concordium LEDGER app
================================

For the app to work properly with the current version of the Desktop Wallet, make sure that you update to the latest version of the app.

.. tabs::

   .. group-tab:: Windows

      .. _update-app-windows:

      .. Note::
          Before updating, verify that you have :ref:`installed Python3, pip, and the Python tools <install-python-pip-windows>` for LEDGER (ledgerblue) before updating the app.

      #. :ref:`Download the LEDGER app<Ledger-downloads>` if you haven't done so already.

      #. In the folder that you extracted the files to, double-click the ``install.bat`` file. If there's a message saying **Windows protected your PC**, select **More info**, and then select **Run anyway**.

      .. Note::

         If you get the error ``loadApp.py: error: unrecognized arguments: --apiLevel 1`` this means that you have an older version of the Python tools for LEDGER (ledgerblue). To update, run ``$pip3 install ledgerblue --upgrade``.

      #. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**. Press both buttons.

      #. Before you can install the new version of the LEDGER app, you have to uninstall the old one. The LEDGER device says **Uninstall Concordium**. Press the right button to navigate through the identifier until the LEDGER device says **Confirm action**. Press both buttons to confirm. The LEDGER device says **Loading, please wait** while it installs the app.

      #. The LEDGER device says **Concordium**. Press both buttons. The LEDGER device says **Concordium is ready**. Press the left button to verify that you've installed the latest version of the LEDGER app.

   .. group-tab:: macOS

      .. _update-app-macos:

      When you update your LEDGER device, it should not be necessary to update the certificate.

      .. Note::
          If you're using a different computer than the one you used when you installed the app, you must :ref:`install Python3, pip, and the Python tools <install-python-pip-macos>` tools for LEDGER (ledgerblue) before updating the app.

      #. :ref:`Download the LEDGER app<Ledger-downloads>` if you haven't done so already.

      #. Open the `Terminal <https://support.apple.com/en-gb/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac>`_ application.

      #. Navigate to where you have downloaded the LEDGER install package. For example to navigate to the default download directory in a Terminal, enter

         .. tabs::

            .. group-tab:: Nano S

               .. code-block:: console
                  :substitutions:

                  $cd ~/Downloads/concordium-governance-ledger-app-|ccd-governance-version|-nanos-|nano-s-firmware|

            .. group-tab:: Nano S+

               .. code-block:: console
                  :substitutions:

                  $cd ~/Downloads/concordium-governance-ledger-app-|ccd-governance-version|-nanosplus

      #. Install the Concordium application on the LEDGER device by running the following script from the folder you extracted the files to:

         .. code-block:: console

            $./install.sh

         .. Note::

            If you get the error ``loadApp.py: error: unrecognized arguments: --apiLevel 1`` this means that you have an older version of the Python tools for LEDGER (ledgerblue). To update, run ``$pip3 install ledgerblue --upgrade``.

      #. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**.

      #. Before you can install the new version of the LEDGER app, you have to uninstall the old one. The LEDGER device says **Uninstall Concordium**. Press the right button to navigate through the identifier until the LEDGER device says **Confirm action**. Press both buttons to confirm. The LEDGER device says **Loading, please wait** while it installs the app.

      #. The LEDGER device says **Concordium**. Press both buttons. The LEDGER device says **Concordium is ready**. Press the left button to verify that you've installed the latest version of the LEDGER app.

   .. group-tab:: Ubuntu

      .. _update-app-ubuntu:

      .. Note::
          If you're using a different computer than the one you used when you installed the app, you must :ref:`install Python3, pip, and the Python tools <install-python-pip-ubuntu>` for LEDGER (ledgerblue) before updating the app.

      #. :ref:`Download <Ledger-downloads>` the latest version of the LEDGER app if you haven't done so already.

      #. Run the ``install.sh`` file from the folder that you extracted the files to.

         .. Note::

            If you get the error ``loadApp.py: error: unrecognized arguments: --apiLevel 1`` this means that you have an older version of the Python tools for LEDGER (ledgerblue). To update, run ``$sudo pip3 install ledgerblue --upgrade``.

      #. The LEDGER device says **Deny unsafe manager**. Press the right button to navigate through the public key until the LEDGER device says **Allow unsafe manager**.

      #. Before you can install the new version of the LEDGER app, you have to uninstall the old one. The LEDGER device says **Uninstall Concordium**. Press the right button to navigate through the identifier until the LEDGER device says **Confirm action**. Press both buttons to confirm. The LEDGER device says **Loading, please wait** while it installs the app.

      #. The LEDGER device says **Concordium**. Press both buttons. The LEDGER device says **Concordium is ready**. Press the left button to verify that you've installed the latest version of the LEDGER app.
