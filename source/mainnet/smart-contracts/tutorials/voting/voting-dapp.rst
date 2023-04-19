.. include:: ../../../variables.rst
.. _voting-frontend:

========================
Setting up the front end
========================

In this part, you will create a web front end. Users can interact with the smart contract more easily
using a front end compared to interacting with the node directly.
Non-tech users might find it inconvenient to interact with smart contracts via the Concordium node
and some users may choose not to host their own Concordium node locally. This tutorial part shows you
a setup that eliminates the need for the user to host their own Concordium node.

You can lower the bar for entry by coding an appealing front end that provides additional information
to your potential customers. Web front ends are a familiar sight nowadays, but to use
the front end, users will also need to download a web wallet as a browser extension.
The installation and safe usage of the |bw| might be new for people using your front end.
Providing comprehensive explanations and step-by-step guides on your website on topics
related to the |bw| is important for a good user experience. The |bw|
connects via `HTTPS <https://en.wikipedia.org/wiki/HTTPS>`_ to a server that is connected to a Concordium node. This setup alleviates the
need for the user to host their own Concordium node.

.. note::

    Before you start with part 2 of this tutorial, make sure you have:

    - access to the a chromium web browser on your computer

    - `git <https://git-scm.com/>`_ installed to be able to clone a repository from `GitHub <https://github.com/>`_

    - `node.js <https://nodejs.org/en/download/>`_ and `yarn <https://yarnpkg.com/getting-started/install>`_ installed

    ``Node.js`` is a JavaScript runtime environment and ``yarn`` is a package manager
    used in combination with ``node.js``. You can download `node.js <https://nodejs.org/en/download/>`_  and
    `yarn <https://yarnpkg.com/getting-started/install>`_  on their official websites.

|bw|
-------------------------

A web wallet is a piece of code that can be added as an extension to supported browsers such as ``Chrome``.
The web wallet allows you to interact with the chain and make transactions.
Currently, the |bw| does this by connecting to a (JSON-RPC) server that communicates with a node.
The |bw| hosts the private keys corresponding to the accounts of the user and a link that points
to a `server  <https://github.com/Concordium/concordium-json-rpc>`_.

Your front-end code that is run in the browser constructs the transaction object
and sends it to the |bw|. The transaction object is signed by the private key hosted in the |bw|
and transmitted to the server via ``HTTPS``. This server has access to a Concordium node and converts
the request (including the signed transaction object) that comes via ``HTTPS`` from the |bw|
to a request that the Concordium node can execute. The signed transaction is
transmitted via peer-to-peer communication to other Concordium nodes and becomes
part of the Concordium blockchain.

Installation
^^^^^^^^^^^^

    You are ready now to install the |bw|. Install the extension for your browser as described :ref:`here<setup-browser-wallet>`.

    The |bw| connects to a server hosted by Concordium which will take care of the Concordium node on your behalf.

    You are ready now to start the |bw| by clicking on the Concordium icon at the top right of the
    ``Chrome`` browser.

    .. image:: ../wCCD/images/wCCD_tutorial_18.png
        :width: 100 %

    .. note::

        The puzzle icon at the top right of the ``Chrome`` browser allows you to manage your browser extensions.
        You can enable pinning of the |bw|.

        .. image:: ../wCCD/images/wCCD_tutorial_13.png
            :width: 30 %

    Create a new account on testnet by going through the setup steps of the |bw|.
    You have to choose a password to secure your |bw|.
    This password is needed to log in to your |bw|.

    .. image:: ../wCCD/images/wCCD_tutorial_15.png
        :width: 30 %

    The |bw| creates a unique secret recovery phrase. Write down the secret recovery phrase
    and keep it in a safe place to be able to recover your accounts in case
    you lose access to your device.

    You have completed the setup. Check that your |bw| is connected to the testnet.

    .. image:: ../wCCD/images/wCCD_tutorial_16.png
        :width: 30 %

    .. image:: ../wCCD/images/wCCD_tutorial_17.png
        :width: 30 %

    Before you can create a new account. You need to create an identity.

    .. image:: ../wCCD/images/wCCD_tutorial_19.png
        :width: 30 %

    .. image:: ../wCCD/images/wCCD_tutorial_20.png
        :width: 30 %

    .. image:: ../wCCD/images/wCCD_tutorial_21.png
        :width: 30 %

    .. image:: ../wCCD/images/wCCD_tutorial_22.png
        :width: 30 %

    You are ready now to create a new account on testnet.

    .. image:: ../wCCD/images/wCCD_tutorial_19.png
        :width: 30 %

    .. image:: ../wCCD/images/wCCD_tutorial_20.png
        :width: 30 %

    You completed the |bw| setup. Send some CCD to your new account or request some CCD from the :ref:`testnet faucet button<testnet-faucet>` within the |bw|.
    Check that your account balance is displayed and you have enough
    CCD to be able to execute transactions.

    .. note::
        You are connected to a website with your |bw| when you see the green ``Connected`` button.
        You can toggle on/off the connection by clicking on the button.

    .. image:: ../wCCD/images/wCCD_tutorial_14.png
        :width: 40 %

You can find more information on how to set up the |bw| in :ref:`Setup the Concordium Wallet for web<setup-browser-wallet>`.

Running the web front end
-------------------------

You have successfully added the |bw| to your browser in the previous section.
In the next step of the tutorial, you are going to clone a voting demo front end written with the `React library <https://reactjs.org/>`_
and run it locally. The demo front end has the required packages installed to connect to the |bw|
and implements common flows to deal with the different states that the |bw| could be in. For example,
the front end will display a ``connect wallet`` button when loading the website. Furthermore, the front end has flows
to react to the events when the user switches the account in the browser wallet or
connects/disconnects an account in the |bw| to update the front-end state accordingly.

.. note::

    React is a popular open-source front-end JavaScript library.

Clone this `repository <https://github.com/Concordium/concordium-browser-wallet/tree/main/examples/voting>`_.

.. code-block:: console

    $git clone https://github.com/Concordium/concordium-browser-wallet/tree/main/examples/voting

Build and run the front end as described below:

- Run ``yarn`` in the root folder to install all dependencies.

.. code-block:: console

    $yarn

- Run ``yarn build`` to build the package.

.. code-block:: console

    $yarn build

- Navigate to the voting example folder.

.. code-block:: console

    $cd ./examples/voting/

- Run ``yarn watch`` to enable hot-reload (useful for development) of the web front end whenever you do any changes to the code.

.. code-block:: console

    $yarn watch

- Run ``yarn start`` in another terminal to start the web front end.

.. code-block:: console

    $yarn start

This command logs a URL in the console (typically http://127.0.0.1:8080). Open this URL in the ``Chrome`` browser.

.. note::

    Check that your |bw| is connected to the testnet and not to mainnet.

You completed the local front end setup. You are running your own local dApp now. If you want, you can compare it with Concordium's
`voting dApp <https://voting.testnet.concordium.com/>`_ hosted on testnet. You can use your |bw|
to connect to the dApp.
