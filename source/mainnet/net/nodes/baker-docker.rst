.. _Discord: https://discord.gg/xWmQ5tp

.. _baking-docker:

==========================
Run a baker node on Docker
==========================

This guide describes how to configure and manage baking on a Docker/Linux node.

Prerequisites
=============

- :ref:`Install and run the node<run-a-node>`
- Generate baker keys for the account you want to bake

Configure a node as a baker
===========================

To run a node as baker, you first have to generate baker keys and then register the keys on an account. Depending on whether you are using Desktop Wallet or Mobile Wallet, the process to generate baker keys differs.
For information about the process for each type of wallet, see :ref:`overview-baker`.
You then need to move the generated baker keys file to a location accessible by the node,
and finally specify this location in the service file for the Concordium Node.

.. Note::

   The baker keys output file name must be ``baker-credentials.json``.

To register the keys in the network you need to be :ref:`running a node <running-a-node>`
and send a ``baker add`` transaction to the network:

.. code-block:: console

   $concordium-client baker add <keys-file>.json --sender bakerAccount --stake <amount-to-stake> --out <concordium-data-dir>/baker-credentials.json

where you replace

- ``<amount-to-stake>`` with the CCD amount for the baker's initial stake
- ``<concordium-data-dir>`` with:

  * on Linux and MacOS: ``~/.local/share/concordium``
  * on Windows: ``%LOCALAPPDATA%\\concordium``.

  Remember to configure your node to bake using this path.

.. Warning::
   Do not stake all of your funds or you will not have enough funds to cover transaction fees.

Provide a ``--no-restake`` flag to avoid automatically adding the
rewards to the staked amount on the baker. Read more about this behavior in the section :ref:`Restake earnings<restake-earnings>`.

To start the node with these baker keys and bake blocks, you
first need to shut down the current running node. To do this, either press ``Ctrl + C`` on the terminal where the node is running or use the
``concordium-node-stop`` executable.

When you've placed the file in the appropriate directory, which is what you did you did in the previous command when you specified the output file, start the node again using ``concordium-node``. The node will automatically start baking when the baker is included in the bakers for the current epoch.

In the Desktop Wallet and the Mobile Wallet, a bread icon is added to
the account associated with the baker node. The bread icon appears as
soon as the transaction has been submitted. That is, before the two
epochs have elapsed.
