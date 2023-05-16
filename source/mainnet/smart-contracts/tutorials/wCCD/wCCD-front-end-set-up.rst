.. include:: ../../../variables.rst
.. _wCCD-front-end-set-up:

========================
Setting up the front end
========================

In this part, you will create a web front end. Users can interact with the smart contract easier
by using your front end compared to interacting with the node directly.
Non-tech users might find it inconvenient to interact with smart contracts via the Concordium node
and some users may choose not to host their own Concordium node locally. This tutorial part will show you
a setup that alleviates the need for the user to host their own Concordium node.

You can lower the bar for entry by coding an appealing front end that provides additional information
to your potential customers. Web front ends are a familiar sight nowadays, but to use
the front end, users will also need to download a browser wallet as a browser extension.
The installation and safe usage of the browser wallet might be new for people using your front end.
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
Currently, the |bw| does this by connecting to a (JSON-RPC) server that communicates with a node.
The |bw| hosts the private keys corresponding to the accounts of the user and a link that points
to a `server  <https://github.com/Concordium/concordium-json-rpc>`_.

Your front end code that is run in the browser constructs the transaction object
and sends it to the |bw|. The transaction object is signed by the private key hosted in the |bw|
and transmitted to the server via ``HTTPS``. This server has access to a Concordium node and converts
the request (including the signed transaction object) that comes via ``HTTPS`` from the |bw|
to a request that the Concordium node can execute. The signed transaction is
transmitted via peer-to-peer communication to other Concordium nodes and becomes
part of the Concordium blockchain.

.. todo::

    Reactivate this once bw supports inputting own node.
    You can choose from two different workflows that will guide you through the setup steps. Workflow 1 is easier.
    The server that the |bw| connects to is hosted by Concordium in workflow 1. This setup will take care of the
    Concordium node on your behalf. Workflow 2 is for
    advanced readers that want to build all the components from the source code and connect the |bw|
    to their own hosted Concordium node.

.. note::

    If you already have an older |bw| extension installed, check its version and download a newer version if applicable.
    The wCCD front end requires some new features that are supported by the |bw| version 0.8.3 or greater.

.. dropdown:: Setup wallet connected to hosted node (click here)

    You are ready now to install the |bw|. Install the extension for your browser as described :ref:`here<setup-browser-wallet>`.

    The |bw| connects to a server hosted by Concordium which will take care of the Concordium node on your behalf.

    You are ready now to start the |bw| by clicking on the Concordium icon at the top right of the
    ``Chrome`` browser.

    .. image:: ./images/wCCD_tutorial_18.png
        :width: 100 %

    .. note::

        The puzzle icon at the top right of the ``Chrome`` browser allows you to manage your browser extensions.
        You can enable pinning of the |bw|.

        .. image:: ./images/wCCD_tutorial_13.png
            :width: 30 %

    Create a new account on testnet by going through the setup steps of the |bw|.
    You have to choose a password to secure your |bw|.
    This password is needed to log in to your |bw|.

    .. image:: ./images/wCCD_tutorial_15.png
        :width: 30 %

    The |bw| creates a unique secret recovery phrase. Write down the secret recovery phrase
    and keep it in a safe place to be able to recover your accounts in case
    you lose access to your device.

    You have completed the setup. Check that your |bw| is connected to the testnet.

    .. image:: ./images/wCCD_tutorial_16.png
        :width: 30 %

    .. image:: ./images/wCCD_tutorial_17.png
        :width: 30 %

    Before you can create a new account. You need to create an identity.

    .. image:: ./images/wCCD_tutorial_19.png
        :width: 30 %

    .. image:: ./images/wCCD_tutorial_20.png
        :width: 30 %

    .. image:: ./images/wCCD_tutorial_21.png
        :width: 30 %

    .. image:: ./images/wCCD_tutorial_22.png
        :width: 30 %

    You are ready now to create a new account on testnet.

    .. image:: ./images/wCCD_tutorial_19.png
        :width: 30 %

    .. image:: ./images/wCCD_tutorial_20.png
        :width: 30 %

    You completed the |bw| setup. Send some CCD to your new account or request some CCD from the testnet faucet button within the |bw|.
    Check that your account balance is displayed and you have enough
    CCD to be able to execute transactions.

    .. note::
        You are connected to a website with your |bw| when you see the green ``Connected`` button.
        You can toggle on/off the connection by clicking on the button.

    .. image:: ./images/wCCD_tutorial_14.png
        :width: 40 %

.. todo::

    Update this once the bw supports inputting own node.
    .. dropdown:: Workflow 2 - Setup wallet connected to local node (click here)

        Before you start this workflow, make sure you have:

        - a running Concordium testnet node that is fully caught up.

        - have port forwarding enabled (This step is only required when you run your node on a remote server instead of locally. See the note below):

        .. note::

            When your node is running on a remote server your cloud provider usually gives you an option to ssh into it.
            Add the following port forwarding rule to your method to ssh into your instance by running the command in another terminal.
            The port 10001 on your localhost is forwarded to the port 10001 on your instance.

            .. code-block:: console

                $ssh -NL localhost:10001:<IP-address-of-your-instance>:10001 <username>@<host>

        If you don't have a running testnet node or port forwarding enabled, :ref:`Setup the development environment<setup-env>`
        will guide you through these setup steps.

        These prerequisites ensure that you have a testnet node reachable locally on port 10001. The |bw| requires the
        `Concordium JSON-RPC server <https://github.com/Concordium/concordium-json-rpc>`_
        that points to your node. Clone the repository with the command:

        .. code-block:: console

            $git clone https://github.com/Concordium/concordium-json-rpc.git

        Build and run the server as described in the README file of the
        `JSON-RPC repository <https://github.com/Concordium/concordium-json-rpc>`_.

        The final command that you execute to start the ``JSON-RPC server`` is as follows:

        .. code-block:: console

            $yarn start --port 9095 --nodeAddress 127.0.0.1 --nodePort 10001 --nodeTimeout 5000

        Your ``JSON-RPC server`` is running on port `9095` and connects to your local node on port `10001`.
        You are ready now to build the |bw| from the source code.
        Clone the repository with the command:

        .. code-block:: console

            $git clone https://github.com/Concordium/concordium-browser-wallet.git

        You can build the browser wallet extension and load the ``dist`` folder
        (located at ``root/packages/browser-wallet/dist``) into the
        `Chrome browser <https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked>`_ as
        described in the README file of the
        `browser wallet repository <https://github.com/Concordium/concordium-browser-wallet/tree/main/packages/browser-wallet>`_.

        .. Note::

            Depending on the exact commit hash that you used to build your |bw|, the screenshots and setup steps might differ.

        The next steps are based on the pre-MVP |bw| from a git commit before 22.8.2022. These early versions of the pre-MVP |bw| have an input field for the private key to import an already existing account and an input field for the link to the JSON-RPC server. Alternatively, you can follow workflow 1 to use the most recent |bw| without hosting your own node and JSON-RPC server. The |bw| from workflow 1 can be used to create a new account (no importing of private keys needed).

        You are ready now to start the |bw| by clicking on the Concordium icon at the top right of the
        ``Chrome`` browser.

        .. image:: ./images/wCCD_tutorial_12.png
            :width: 100 %

        .. note::

            The puzzle icon at the top right of the ``Chrome`` browser allows you to manage your browser extensions.
            You can enable pinning of the Concordium browser wallet.

            .. image:: ./images/wCCD_tutorial_13.png
                :width: 30 %

        You have to enter your private key into the |bw|. You might have already an account in the ``concordium-client`` or in the ``Concordium mobile wallet``. You can decrypt the private keys of these accounts and use them in the |bw|. Download the :ref:`utils tool<downloads-testnet-auxiliary-tools>` under the auxiliary tools section. This tool is able to decode your encrypted key. You can find additional information on the utils tool and how to decrypt your keys :ref:`here<developer-tools>`.

        You have to enter the private key and the associated account into the browser wallet similar to the below string.

        .. code-block:: console

            74ff83a13ca066298583dcb9151822359fd2e4c9b69c9ca427455da565f6129b,3oLNhuxM7yrf3LrJa3hH5NfocTViGS8Aj2t6YScWNvUq4o2nC

        Enter the below ``JSON-RPC`` endpoint into the |bw| to connect to
        your local ``JSON-RPC server`` on port 9095.

        .. code-block:: console

            http://127.0.0.1:9095

        You completed the |bw| setup. Check that your account balance is displayed and you have enough
        CCD to be able to execute transactions.

        .. note::
            You are connected to a website with your |bw| when you see the green ``Connected`` button.
            You can toggle on/off the connection by clicking on the button.

        .. image:: ./images/wCCD_tutorial_14.png
            :width: 40 %

Running the web front end
-------------------------

You have successfully added the |bw| to your browser in the previous section.
In the next step of the tutorial, you are going to clone a wCCD demo front end written with the `React library <https://reactjs.org/>`_
and run it locally. The demo front end has the required packages installed to connect to the |bw|
and implements common flows to deal with the different states that the |bw| could be in. For example,
the front end will display a ``connect wallet`` button when loading the website. Furthermore, the front end has flows
to react to the events when the user switches the account in the browser wallet or
connects/disconnects an account in the |bw| to update the front end state accordingly.

.. note::

    React is a popular open-source front end JavaScript library.

Clone this `repository <https://github.com/Concordium/concordium-browser-wallet>`_.

.. code-block:: console

    $git clone https://github.com/Concordium/concordium-browser-wallet.git

Build and run the front end as described in the README file of the
`wCCD front-end demo <https://github.com/Concordium/concordium-browser-wallet/tree/main/examples/wCCD>`_.

The steps in the README file are as follows:

- Run ``yarn`` in the root folder to install all dependencies.

.. code-block:: console

    $yarn

- Navigate to the wCCD example folder.

.. code-block:: console

    $cd ./examples/wCCD/

- Run ``yarn build`` in the wCCD folder.

.. code-block:: console

    $yarn build

- Run ``yarn watch`` to enable hot-reload (useful for development) of the web front end whenever you do any changes to the code.

.. code-block:: console

    $yarn watch

- Run ``yarn start`` in another terminal to start the web front end.

.. code-block:: console

    $yarn start

This command logs a URL in the console (typically http://127.0.0.1:8080). Open this URL in the ``Chrome`` browser.

.. note::

    Check that your |bw| is connected to the testnet and not to mainnet.

You completed the local front end setup.

To continue with the tutorial click :ref:`here<wCCD-full-dApp>`.
