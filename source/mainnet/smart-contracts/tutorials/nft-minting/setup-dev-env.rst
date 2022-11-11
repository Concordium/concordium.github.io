.. include:: ../../../variables.rst
.. _setup-dev-env:

=================================
Setup the development environment
=================================

First, you need to install “rustup” which installs Rust and Cargo to your computer. To do that, you can use this command.

.. code-block:: console

   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

Select **1** to continue the installation.

.. image:: images/mint-install-rustup.png
    :width: 100%

Finally, when Rust and Cargo are successfully installed in your system, you should see something similar to below.

.. image:: images/mint-rust-install-done.png
    :width: 100%

Copy and paste the commands in a terminal to install Wasm which will be used for building contracts.

.. code-block:: console

    source “$HOME/.cargo/env”
    rustup target add wasm32-unknown-unknown

During Wasm installation in your system you should see something similar to below.

.. image:: images/mint-wasm-install.png
    :width: 100%

Now you need to install the Concordium software package. :ref:`Click here<cargo-concordium-testnet>` and download the version 2.2.0 or greater of ``cargo-concordium`` for your operating system. The tool is the same for both testnet and mainnet.

First, rename the “cargo-congordium-v.x.x” file to “cargo-concordium”. Then go to the directory where the file is downloaded and run this command to make it executable. You also need to move the cargo-concordium executable to the cargo folder. :ref:`Follow the information here<setup-tools>` to ensure that your cargo-concordium is configured correctly. The step below is specifically for MacOS.

.. code-block:: console

    sudo chmod +x cargo-concordium

.. code-block:: console

    mv cargo-concordium ~/.cargo/bin

If everything is correct, when you enter the command ``cargo concordium --help`` it shows something similar to the below.

.. image:: images/cargo-help.png
    :width: 100%

.. Note::

    If you have a warning on a Mac device that says “cargo-condordium cannot be opened because the developer cannot be verified” that means it requires permission to run and you should go to **System Preferences → Security** and unlock it with your password and click **Allow Anyway**.

    .. image:: images/mac-warning.png
        :width: 100%

Install Concordium Client
=========================

This tutorial uses ``concordium-client`` as a command line tool to deploy, mint, and transfer. :ref:`Download it here<concordium-node-and-client-download-testnet>`. For information about how to use ``concordium-client``, see :ref:`Concordium Client<concordium-client>`.

.. Note::

    The version of ``concordium-client`` above is the testnet version. Download the Mainnet version :ref:`here<concordium-node-and-client-download>`.

Run a node
==========

You will need to run a node. For this tutorial, it is recommended to run a Docker image of a node that can be :ref:`found here<run-a-node>`. This runs a Docker image of a node and this step currently takes some time, potentially hours based on your device configuration, because your node is freshly started and needs to recover all the previous blocks. Once the height value is the same as the height in `CCDScan <https://testnet.ccdscan.io/blocks>`__, then you can continue with the development.

Clone the repository
====================

You can start by cloning `this repository <https://github.com/chainorders/concordium-nft-tutorials>`_ which includes some essential binaries, Docker files, and configurations that are provided by Concordium.

There are multiple collections of sample images provided in this link. You can find detailed information about the nft-artifact’s folder in the repository.

In order to start the tutorial, you need to install Docker Compose which you will use for running a Concordium node because you need to run a node to deploy your contracts.

Run the following command on your terminal to clone `this repository <https://github.com/chainorders/concordium-nft-tutorials>`_. It will clone the repository to your local computer.

.. code-block:: console

    git clone --recurse-submodules
    https://github.com/chainorders/concordium-nft-tutorials.git

.. _signkey:

Setup a wallet
==============

Now you need a Concordium wallet. This tutorial uses the |bw|. The |bw| uses a 24 word secret recovery phrase to secure your wallet. Make sure that it’s protected. Save them in a secure place. Anyone who knows the secret recovery phrase can access your wallet.

Use `this link <https://chrome.google.com/webstore/detail/concordium-wallet/mnnkpffndmickbiakofclnpoiajlegmg?hl=en-US>`_ to install a |bw| in a chromium web browser. Follow :ref:`these instructions<setup-bw>` to install the extension. Configure it to run on testnet with an identity created from the Concordium testnet IP (shown below) and an account based on that identity.

.. image:: images/bw-idp-selection.png
    :width: 100%

Use the Testnet faucet in your account to claim 2000 CCDs for testing purposes.

To read more about using the |bw| see :ref:`Use the Concordium Wallet for Web<use-browser-wallet>`. One thing to note is that if you click |send|, you enter transaction window. This allows you to transfer CCDs. You can type the amount of CCD and the recipient’s address in this section. As you can see just below those textboxes, there is a value highlighting the “Estimated transaction fee” in CCD terms. This allows you to estimate the costs beforehand and it allows helps you to calculate your business expenses in the future.

.. image:: images/tx-fee-in-bw.png
    :width: 100%

After that step, you need to :ref:`export the keys<export-bw-keys>` for your wallet. Save the file on your local machine in the same folder as the rest of the repository. It will have a name like this <YOUR PUBLIC ADDRESS>.export. You can open it with a text editor and see your signKey, verifyKey in there. Copy signKey and your address. You will use them while deploying and interacting with your contract.

.. image:: images/bw-export-key.png
    :width: 100%

When you export the key it creates a file named ``<YOUR PUBLIC ADDRESS>.export``. Open it with a text editor and find your ``signKey``, ``verifyKey`` in there. Copy the ``signKey`` and your address. You will use it while deploying and interacting with your contract.

.. image:: images/bw-exported-key.png
    :width: 100%

Continue to the :ref:`next part<upload-nft>` of the tutorial to upload your NFT and assign metadata to it.

.. |send| image:: images/send-ccd.png
             :alt: button with paper airplane
             :width: 50px
