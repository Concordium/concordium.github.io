.. _setup-dev-env:

=================================
Setup the development environment
=================================

First, you need to install “rustup” which installs Rust and Cargo to your computer. To do that, you can use this command.

.. code-block:: console

   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

Select **1** to continue the installation.

Finally, when Rust and Cargo are successfully installed in your system, you should see something similar to below. Copy and paste the commands on a terminal. Then you need to install Wasm which will be used for building contracts.

.. code-block:: console

    source “$HOME/.cargo/env”
    rustup target add wasm32-unknown-unknown

While during Wasm installation in your system you should see something similar to below.

Now you need to install the Concordium software package. Navigate to cargo-concordium and download the correct version for your operating system. You need to install the tools both for testnet and mainnet.

First, we need to rename the “cargo-congordium-v.x.x” file to “cargo-concordium”. Then go to the directory where the file is downloaded and run this command to make it executable. You also need to move the cargo-concordium executable to the cargo folder. All steps below are configured for MacOS, if you are using another operating system I suggest you follow this link. (Note : In this tutorial, we are not going to use concordium-client for our operations so you don’t have to install it.)

.. code-block:: console
    
    sudo chmod +x cargo-concordium
    mv cargo-concordium ~/.cargo/bin
    cargo concordium --help

If everything is correct, the last command should print something similar below.

If you have a warning (on a mac device) like “cargo-condordium cannot be opened because the developer cannot be verified” that means it requires permission to run and you should go to System Preferences → Security and unlock it via your password and click “Allow Anyway”.

Clone the repository
====================

You can start by cloning this repository which includes some essential binaries, docker files, and configurations that are provided by Concordium.

There are multiple collections of sample images provided by this link and I used one of them.

You can find the detailed information about the nft-artifact’s folder in the repository but I will explain them all briefly.

In order to start the tutorial, first, you need to install Docker Compose which we are gonna use it for running a Concordium node because you need to run a node to deploy your contracts.

Run the following command on your terminal to clone this repository. It will clone the repository to your local computer.

.. code-block:: console

    git clone --recurse-submodules
    https://github.com/chainorders/concordium-nft-tutorials.git

Setup a |mw-gen2|
=================

Now you need a Concordium wallet, please use the link to install a Concordium testnet wallet to your mobile. Follow the instructions described on this link to install and run the software. First, if you are using an IOS device you are going to need the TestFlight application and then Concordium Testnet Wallet.

When you have the Concordium Testnet Mobile Wallet on your phone installed, you need to create an account. If you follow this link, you can create your account and claim your 2000 CCD faucet from the app.

After that step, you need to transfer your account’s backup file to your local computer from your phone. You can do it in a couple of steps from your mobile with your password. And also check the steps from this link. When your export process is done, send it to your local machine. You can set an email address while exporting, it should send the backup file via e-mail. Or you can transfer it manually.

Once you receive the wallet backup file make sure that it’s copied to the same folder as the rest of the repository.

Continue to the :ref:`next part<upload-nft>` of the tutorial to upload your NFT and assign metadata to it.
