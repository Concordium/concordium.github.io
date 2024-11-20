.. include:: ../../variables.rst
.. _wCCD-frontend-set-up:

========================
Setting up the frontend
========================

In this part, you will create a web frontend. Users can interact with the smart contract easier
by using your frontend compared to interacting with the node directly.
Non-tech users might find it inconvenient to interact with smart contracts via the Concordium node
and some users may choose not to host their own Concordium node locally. This tutorial part will show you
a setup that alleviates the need for the user to host their own Concordium node.

You can lower the bar for entry by coding an appealing frontend that provides additional information
to your potential customers. Web frontends are a familiar sight nowadays, but to use
the frontend, users will also need to download a browser wallet as a browser extension.
The installation and safe usage of the browser wallet might be new for people using your frontend.
Providing comprehensive explanations and step-by-step guides on your website on topics
related to the browser wallet is important for a good user experience. The browser wallet
connects via `HTTPS <https://en.wikipedia.org/wiki/HTTPS>`_ to a server that is connected to a Concordium node. This setup alleviates the
need for the user to host their own Concordium node.

.. note::

    Before you start with part 3 of this tutorial, make sure you have:

    - access to the `Chrome <https://www.google.com/chrome/>`_ web browser on your computer

    - `git <https://git-scm.com/>`_ installed to be able to clone a repository from `GitHub <https://github.com/>`_

    - `node.js <https://nodejs.org/en/download/>`_ and `yarn <https://yarnpkg.com/getting-started/install>`_ installed

    ``Node.js`` is a JavaScript runtime environment and ``yarn`` is a package manager
    used in combination with ``node.js``. You can download `node.js <https://nodejs.org/en/download/>`_  and
    `yarn <https://yarnpkg.com/getting-started/install>`_  on their official websites.

|bw|
-------------------------

A browser wallet is a piece of code that can be added as an extension to supported browsers such as ``Chrome``.
The browser wallet allows you to interact with the chain and make transactions.
Currently, the |bw| does this by connecting to a (gRPC) server that communicates with a node.
The |bw| hosts the private keys corresponding to the accounts of the user.

Your frontend code that is run in the browser constructs the transaction object
and sends it to the |bw|. The transaction object is signed by the private key hosted in the |bw|
and transmitted to the server via ``HTTPS``. This server has access to a Concordium node and converts
the request (including the signed transaction object) that comes via ``HTTPS`` from the |bw|
to a request that the Concordium node can execute. The signed transaction is
transmitted via peer-to-peer communication to other Concordium nodes and becomes
part of the Concordium blockchain.

Comprehensive instructions on how to set up the wallet can be found in :ref:`this tutorial <setup-wallet>`.

Running the web frontend
-------------------------

You have successfully added the |bw| to your browser in the previous section.
In the next step of the tutorial, you are going to clone a wCCD demo frontend written with the `React library <https://reactjs.org/>`_
and run it locally. The demo frontend has the required packages installed to connect to the |bw|
and implements common flows to deal with the different states that the |bw| could be in. For example,
the frontend will display a ``connect wallet`` button when loading the website. Furthermore, the frontend has flows
to react to the events when the user switches the account in the browser wallet or
connects/disconnects an account in the |bw| to update the frontend state accordingly.

.. note::

    React is a popular open-source frontend JavaScript library.

Clone this `repository <https://github.com/Concordium/concordium-browser-wallet>`_.

.. code-block:: console

    $ git clone https://github.com/Concordium/concordium-browser-wallet.git

Build and run the frontend as described in the README file of the
`wCCD frontend demo <https://github.com/Concordium/concordium-browser-wallet/tree/main/examples/wCCD>`_.

The steps in the README file are as follows:

- Run ``yarn`` in the root folder to install all dependencies.

.. code-block:: console

    $ yarn

- Build the Concordium helpers by running ``yarn build:api-helpers``. You can run this from anywhere in your cloned repository.

.. code-block:: console

    $ yarn build:api-helpers

- Navigate to the wCCD example folder.

.. code-block:: console

    $ cd ./examples/wCCD/

- Run ``yarn build`` in the wCCD folder.

.. code-block:: console

    $ yarn build

- Run ``yarn watch`` to enable hot-reload (useful for development) of the web frontend whenever you do any changes to the code.

.. code-block:: console

    $ yarn watch

- Run ``yarn start`` in another terminal to start the web frontend.

.. code-block:: console

    $ yarn start

This command logs a URL in the console, in our case http://127.0.0.1:4173 since the app is built using Vite and that is the default port. Open this URL in the ``Chrome`` browser.

.. note::

    Check that your |bw| is connected to the testnet and not to mainnet.

Conclusion
----------

You are now running your own local dApp. If you want, you can compare it with our
`testnet wCCD dApp <https://wccd.testnet.concordium.com/>`_ hosted on testnet or `mainnet wCCD dApp <https://wccd.mainnet.concordium.software/>`_ hosted on mainnet. You can use your |bw|
to connect to the dApp.

.. note::

    The |bw| is connected to the testnet.
    You have an identity and account in your wallet loaded.
    You can find more information on how to set up the wallet in :ref:`Setup the Concordium Wallet for web<setup-browser-wallet>`.

.. note::

    If you already have an older |bw| extension installed, check its version and download a newer version if applicable.
    The wCCD frontend requires some new features that are supported by the |bw| version 0.8.3 or greater.

Congratulations! You have now completed the wCCD tutorial.
