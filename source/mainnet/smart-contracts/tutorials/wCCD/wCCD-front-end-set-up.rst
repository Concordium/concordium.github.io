.. _wCCD-front-end-set-up:

========================
Setting up the front-end
========================

Non-tech users might find it inconvenient to interact via the Concordium node with smart contracts
and some users may choose not to host their own Concordium node in the future.

You can lower the bar for entry by coding an appealing front-end that provides additional information
to your potential customers. Web front-ends are a familiar sight nowadays, but keep in mind
that downloading a crypto wallet as a browser extension and its behavior or safe usage might be new
for people using your front-end. Providing comprehensive explanations and step-by-step guides on your website on topics
related to the browser wallet is important for a good user experience. The browser wallet
connects via ``HTTPS`` to a server that is connected to a Concordium node. This setup alleviates the
need for the user to host their own Concordium node.

.. note::

    Before you start with part 3 of this tutorial, make sure you have:

    - access to the `Chrome <https://www.google.com/chrome/>`_ web browser on your laptop or computer

    - `git <https://git-scm.com/>`_ installed to be able to clone a repository from `GitHub <https://github.com/>`_

    - `node.js <https://nodejs.org/en/download/>`_ and `yarn <https://yarnpkg.com/getting-started/install>`_ installed

    ``Node.js`` is a JavaScript runtime environment and ``yarn`` is a package manager
    used in combination with ``node.js``. You can download `node.js <https://nodejs.org/en/download/>`_  and
    `yarn <https://yarnpkg.com/getting-started/install>`_  on their official websites.

Concordium browser wallet
-------------------------

A browser wallet is a piece of code that can be added as an extension to supported browsers such as ``Chrome``.
The browser wallet hosts the private keys corresponding to the accounts of the user and a link that points
to a `JSON-RPC server  <https://github.com/Concordium/concordium-json-rpc>`_.

Your front-end code that is run in the browser constructs the transaction object
and sends it the the browser wallet. The transaction object is signed by the private key hosted in the browser wallet
and transmitted to the ``JSON-RPC server`` via ``HTTPS``. This server has access to a Concordium node and masks
the request (including the signed transaction object) that comes via ``HTTPS`` from the browser wallet
to a ``JSON-RPC`` request that the Concordium node can execute. The signed transaction is
transmitted via peer-to-peer communication to other Concordium nodes and becomes
part of the Concordium blockchain.

.. warning ::

    The Concordium browser wallet is in active development. A pre-MVP
    (minimum viable product) version is currently available to be built from the source code.
    Expect some breaking changes until the MVP version is released in the next quarter. It is not recommended to
    use any pre-MVP product on mainnet.

You can choose from two different workflows that will guide you through the setup steps. Workflow 1 is for
advanced readers that want to build all the components from the source code and connect the browser wallet
to their own hosted Concordium node. Workflow 2 is easier.
The ``JSON-RPC wallet proxy`` is hosted by Concordium in workflow 2 which will take care of the
Concordium node on your behalf.

.. dropdown:: Workflow 1 - Setup browser wallet connected to local node (click here)

    Before you start this workflow, make sure you have:

    - a running Concordium testnet node

    - have port forwarding enabled with the following command (this step is only required when you run your node on a remote server instead of locally):

    .. note::

        When your node is running on a remote server your cloud provider usually gives you an option to ssh into it.
        Add the following port forwarding rule to your method to ssh into your instance by running the command in another terminal.
        The port 10001 on your localhost is forwarded to the port 10001 on your instance.

    .. code-block:: console

        $ssh -NL localhost:10001:<IP-address-of-your-instance>:10001 <username>@<host>

    If you don't have a running testnet node or port forwarding enabled, the piggy bank tutorial :ref:`part 3 <piggy-bank-preparing>`
    will guide you through these setup steps.

    These prerequisites ensure that you have a testnet node reachable locally on port 10001. The browser wallet requires a
    `JSON-RPC server <https://github.com/Concordium/concordium-json-rpc>`_
    that points to your node. Clone the repository with the command:

    .. code-block:: console

        $git clone https://github.com/Concordium/concordium-json-rpc.git

    Build and run the server as described in the README file of the
    `JSON-RPC repo <https://github.com/Concordium/concordium-json-rpc>`_.

    The final command that you execute to start the ``JSON-RPC server`` is as follows:

    .. code-block:: console

        $yarn start --port 9095 --nodeAddress 127.0.0.1 --nodePort 10001 --nodeTimeout 5000

    Your ``JSON-RPC server`` is running on port `9095` and connects to your local node on port `10001`.
    You are ready now to build the pre-MVP browser wallet from the source code.
    Clone the repository with the command:

    .. code-block:: console

        $git clone https://github.com/Concordium/concordium-browser-wallet.git

    You can build the browser wallet extension and load it
    (``dist`` folder from the path `root/packages/browser-wallet`) into the
    `Chrome browser <https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked>`_ as
    described in the README file of the
    `browser wallet repo <https://github.com/Concordium/concordium-browser-wallet/tree/main/packages/browser-wallet>`_.

    .. note::

        Depending on the exact commit hash that you used to build your pre-MVP browser wallet, the
        screenshots and setup steps might differ. The browser wallet hosts the private keys corresponding
        to the accounts of the user and a link that points to a ``JSON-RPC server``.

    The next steps are based on the pre-MVP browser wallet from a git commit before around 22.8.2022.
    These earlier versions of the pre-MVP browser wallet have an input field for the private key
    to import an already existing account and an input field for the link to the ``JSON-RPC server``.
    Alternatively, you can follow workflow 2 to use the most recent pre-MVP browser wallet
    without hosting your own node and ``JSON-RPC server``.

    You are ready now to start the browser wallet by clicking on the Concordium icon at the top right of the
    ``Chrome`` browser.

    .. image:: ./images/wCCD_tutorial_12.png
        :width: 100 %

    .. note::

        The puzzle icon at the top right of the ``Chrome`` browser allows you to manage your browser extensions.
        You can enable pinning of the Concordium browser wallet.

        .. image:: ./images/wCCD_tutorial_13.png
            :width: 30 %

    .. dropdown:: Getting your private key from an account already imported to the `concordium-client`

        Display your keys with the following :ref:`command <concordium-client-display>`

        .. code-block:: console

            $./concordium-client config show

        Save the ``encryptedSignKey`` blob to a file named ``output.json``. The content of that file
        should look similar to the below content.

        .. code-block:: json

            {
                "cipherText": "K1ylur5Qy+UUYlwyShu1W6rRgRhcN12e91SEGZ9UBboEzTVVQ80cDpsJNBQmU+sBlo1FKrGxKFzPjxhKxxohmZ99yDXgyo9bMDxuTosqcfY=",
                "metadata": {
                    "encryptionMethod": "AES-256",
                    "initializationVector": "oJhcClLqUEotJxh4nmuCgA==",
                    "iterations": 100000,
                    "keyDerivationMethod": "PBKDF2WithHmacSHA256",
                    "salt": "0XSYLtrsLN+XXwYqxD+gDw=="
                }
            }

        Download the :ref:`utils tool <downloads-testnet-auxiliary-tools>` under the auxiliary tools section.
        This tool is able to decode your encrypted key.

        You can find additional information on the `utils` tool :ref:`here <developer-tools>`.

        Decode your private key by running the decrypt command on the ``output.json`` file.
        You will need to enter your password from the backup file when it was exported from the mobile wallet.

        .. code-block:: console

            $./utils decrypt --in output.json --out decrypted.example

        Your private key will be saved to the ``decrypted.example`` file.

    Enter the below ``JSON-RPC`` endpoint into the browser wallet to connect to
    your local ``JSON-RPC server`` on port 9095.

    .. code-block:: console

        http://127.0.0.1:9095

    In case you run an older pre-MVP wallet, you have to enter the private key and
    the associated account into the browser wallet similar to the below string. In case you run a newer pre-MVP wallet,
    you can create a new account with the associated private key in the browser wallet.

    .. code-block:: toml

        74ff83a13ca066298583dcb9151822359fd2e4c9b69c9ca427455da565f6129b,3oLNhuxM7yrf3LrJa3hH5NfocTViGS8Aj2t6YScWNvUq4o2nC

    You completed the browser wallet setup. Check that your account balance is displayed and you have enough
    CCD to be able to execute transactions.

    .. note::
        You are connected to a website with your browser wallet when you see the green ``Connected`` button.
        You can toggle on/off the connection by clicking on the button.

    .. image:: ./images/wCCD_tutorial_14.png
        :width: 40 %

.. dropdown:: Workflow 2 - Setup browser wallet connected to hosted node (click here)

    You are ready now to build the pre-MVP browser wallet from the source code.

    Clone the repository with the command:

    .. code-block:: console

        $git clone https://github.com/Concordium/concordium-browser-wallet.git

    .. note::

        Depending on the exact commit hash that you used to build your pre-MVP browser wallet, the
        screenshots might differ. The browser wallet hosts the private keys corresponding
        to the accounts of the user and a link that points to a ``JSON-RPC server``.

    The next steps are based on the pre-MVP browser wallet from a git commit after 22.8.2022.
    These newer versions of the pre-MVP browser wallet connect to the ``JSON-RPC wallet proxy``
    hosted by Concordium which will take care of the Concordium node on behalf of you.

    You can build the browser wallet extension and load it
    (``dist`` folder from the path `root/packages/browser-wallet`) into the
    `Chrome browser <https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked>`_ as
    described in the README file of the
    `browser wallet repo <https://github.com/Concordium/concordium-browser-wallet/tree/main/packages/browser-wallet>`_.

    You are ready now to start the browser wallet by clicking on the Concordium icon at the top right of the
    ``Chrome`` browser.

    .. image:: ./images/wCCD_tutorial_18.png
        :width: 100 %

    .. note::

        The puzzle icon at the top right of the ``Chrome`` browser allows you to manage your browser extensions.
        You can enable pinning of the Concordium browser wallet.

        .. image:: ./images/wCCD_tutorial_13.png
            :width: 30 %

    Create a new account on testnet by going through the setup steps of the browser wallet.
    You have to choose a password for securing your browser wallet.
    This password is needed to log in to your browser wallet.

    .. image:: ./images/wCCD_tutorial_15.png
        :width: 30 %

    The browser wallet creates a unique seed phrase. Write down the seed phrase
    and keep it in a safe place to be able to recover your accounts in case
    you lose access to your device.

    You have completed the browser setup. Check that your browser wallet is connected to the testnet.

    .. image:: ./images/wCCD_tutorial_16.png
        :width: 30 %

    .. image:: ./images/wCCD_tutorial_17.png
        :width: 30 %

    Before you can create a new account. You need to create an identity card.

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

    You completed the browser wallet setup. Send some CCD to your new account or request some CCD from testnet faucet button within the browser wallet.
    Check that your account balance is displayed and you have enough
    CCD to be able to execute transactions.

    .. note::
        You are connected to a website with your browser wallet when you see the green ``Connected`` button.
        You can toggle on/off the connection by clicking on the button.

    .. image:: ./images/wCCD_tutorial_14.png
        :width: 40 %

Running the web front-end
-------------------------

You have successfully added the Concordium browser wallet extension to your browser in the previous section.
In the next step of the tutorial, you are going to clone a wCCD demo front-end written with the React library
and run it locally. The demo front-end has the required packages installed to connect to the Concordium browser wallet
and implements common flows to deal with the different states that the browser wallet could be in. For example,
the front-end will display a ``connect wallet`` button when loading the website. Furthermore, the front-end has flows
to react to the events when the user switches the account in the browser wallet or
connects/disconnects an account in the browser wallet to update the front-end state accordingly.

.. note::

    React is a popular open-source front-end JavaScript library.

Clone this `repository <https://github.com/Concordium/concordium-browser-wallet>`_.

.. code-block:: console

    $git clone https://github.com/Concordium/concordium-browser-wallet.git

Build and run the front-end as described in the README file of the
`wCCD front-end demo <https://github.com/Concordium/concordium-browser-wallet/tree/main/examples/wCCD>`_.

The steps in the README file are as follows:

- Run ``yarn`` in the root folder to install all dependencies.

.. code-block:: console

    $yarn

- Run ``yarn build:all`` to build the concordium-helpers package.

.. code-block:: console

    $yarn build:all

- Navigate to the wCCD example folder.

.. code-block:: console

    $cd ./examples/wCCD/

- Run ``yarn watch`` to enable hot-reload (useful for development) of the web front-end whenever you do any changes to the code.

.. code-block:: console

    $yarn watch

- Run ``yarn start`` in another terminal to start the web front-end.

.. code-block:: console

    $yarn start

This command logs a URL in the console (typically http://127.0.0.1:8080). Open this URL in the ``Chrome`` browser.

.. note::

    Check that your browser wallet is connected to the testnet and not to mainnet or stagenet.

You completed the local front-end setup.

To continue with the tutorial click :ref:`here<wCCD-full-dApp>`.
