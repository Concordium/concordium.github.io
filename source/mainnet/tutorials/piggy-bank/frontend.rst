.. include:: ../../variables.rst
.. _piggy-bank-frontend:

=====================
Setting up a frontend
=====================

As an alternative to interacting with smart contracts directly,
users might have a better experience using a web-based application.

For the Piggybank example, such an application is available in `this repository <https://github.com/Concordium/concordium-dapp-piggybank/>`_.
The application is able to perform contract updates on behalf of the user,
either using the |bw| or |mw-gen2| via
`Wallet Connect (v2) <https://docs.walletconnect.com/2.0/>`_.

The `wCCD tutorial part 3 <wCCD-frontend-set-up>`_ explains how to set up the |bw|.
Wallet Connect is currently supported by the |mw-gen2|. iOS support will be added in the near future.

The steps for setting up the Piggybank dApp are very similar to the :ref:`wCCD tutorial<wCCD-frontend-set-up>`, only with the repository linked above.

The complete minimal steps for running the dApp in development mode are:

.. code-block:: console

    $ git clone https://github.com/Concordium/concordium-dapp-piggybank.git
    $ cd concordium-dapp-piggybank
    $ yarn
    $ yarn start

This starts a local server running on port 3000 and opens the application in your default web browser.

The repository documentation describes how to build the application for production, optionally into a Docker image.

For instructions about how to connect either the |bw| or |mw-gen2| to a dApp, see :ref:`Connect dApps<connect-app-bw>`.
