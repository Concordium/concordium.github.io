.. include:: ../../variables.rst
.. _bw-piggy-bank:

===========================
Piggy bank example for |bw|
===========================

The example project included in `this repository <https://github.com/Concordium/concordium-browser-wallet/tree/main/examples/piggybank>`_ serves as a working example of how to integrate with smart contracts on the Concordium blockchain. It includes a page for both a V0 and a V1 version of the piggy bank smart contract.

Prerequisites
=============

The |bw| must be installed in Google Chrome and configured to use the Testnet in order to view smart contract details or submit transactions.

Installation
============

#. Run ``yarn`` in package root.

#. Build concordium helpers by running ``yarn build:all``.

Run the example
===============

#. Run ``yarn build`` in a terminal.

#. Run ``yarn start``.

#. Open the URL logged in the console (typically http://127.0.0.1:8080).

To have hot-reload (useful for development), do the following instead:

#. Run ``yarn watch`` in a terminal.

#. Run ``yarn start`` in another terminal.

#. Open the URL logged in the console (typically http://127.0.0.1:8080).

Now you can connect to the |bw|. For information about how to do this, see :ref:`Connect dApps<connect-app-bw>`.
