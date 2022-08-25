.. _wCCD-front-end-set-up:

========================
Setting up the front-end
========================

.. note::

    Before you start with part 3 of this tutorial, make sure you have:

    - access to a web browser on your laptop or computer

Non-tech users might find it inconvenient to interact via the Concordium node with smart contracts
and we cannot expect everyone is going to host their own Concordium node in the future.

You can lower the bar for entry by coding an appealing front-end that provides additional information
to your potential customers. Web front-ends are a familiar side nowadays but keep in mind
that downloading a crypto wallet as a browser extension and its behavior or safe usage might be new
for people using your front-end. Providing comprehensive explanations and step-by-step guides at your front-end on topics
related to the browser wallet is important for a good user experience. The browser wallet
connects via ``HTTPS`` to a server that runs a Concordium node. This setup alleviates the
need for the user to host their own Concordium node.

Concordium browser wallet
-------------------------

A browser wallet is a piece of code that can be added as an extension to supported browsers such as ``Chrome``.
The browser wallet hosts the private keys corresponding to the accounts of the user and a link that points
to a ``JSON-RPC server``.

Your front-end code that is run in the browser constructs the transaction object
and sends it the the browser wallet. The transaction object is signed by the private key hosted in the browser wallet
and transmitted to the `JSON-RPC server <https://github.com/Concordium/concordium-json-rpc>`_ via ``HTTPS``. This server has access to a Concordium node and masks
the request (including the signed transaction object) that comes via ``HTTPS`` from the browser wallet
to a ``JSON-RPC`` request that the Concordium node can execute. The signed transaction is
transmitted via peer-to-peer communication to other Concordium nodes and becomes
part of the Concordium blockchain.

.. note ::

    The Concordium browser wallet is in active development. A pre-MVP
    (minimum viable product) version is currently available that can be built from the source code.
    Expect some breaking changes until the MVP version is released in the next quarter. It is not recommended to
    use any pre-MVP product on mainnet.

We provide two different workflows that will guide you through the setup steps. Workflow 1 is for
advanced readers that want to build all the components from the source code and connect the browser wallet
to their own hosted Concordium node. Workflow 2 is easier by downloading the browser wallet and
connecting it to a ``JSON-RPC server proxy`` hosted by Concordium which will take care of the
Concordium node on behalf of you.

.. dropdown:: Workflow 1 (click here)

    Before you start this workflow, make sure you have:

    - a running Concordium testnet node

    - have port forwarding enabled with the command (only needed when running the node on a remote server instead of locally):

    .. code-block:: console

        $ssh -NL localhost:10001:<IP-address-of-your-instance>:10001 <username>@<host>

    If you don't have a running testnet node, the piggy bank tutorial :ref:`part 3 <piggy-bank-preparing>`
    will guide you through these setup steps.

    These prerequisites ensure that you have a testnet node reachable locally on port 10001. The browser wallet requires a
    `JSON-RPC server <https://github.com/Concordium/concordium-json-rpc>`_
    that points to your node. Clone the repository with the command:

    .. code-block:: console

        $git clone git@github.com:Concordium/concordium-json-rpc.git

    You can build and run the server as described in the
    `README file of the json-rpc repo <https://github.com/Concordium/concordium-json-rpc>`_.

    The final command that you execute to start the ``JSON-RPC server`` is as follows:

    .. code-block:: console

        $yarn start --port 9095 --nodeAddress 127.0.0.1 --nodePort 10001 --nodeTimeout 5000

    You are ready now to build the pre-MVP browser wallet from the source code.
    Clone the repository with the command:

    .. code-block:: console

        $git clone git@github.com:Concordium/concordium-browser-wallet.git

    You can build the browser wallet extension and load it
    (``dist`` folder from the path `root/packages/browser-wallet`) into the
    `Chrome browser <https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked>`_ as
    described in the
    `README file of the browser wallet repo <https://github.com/Concordium/concordium-browser-wallet/tree/main/packages/browser-wallet>`_.

    You are ready now to start the browser wallet by clicking on the Concordium icon at the top right of the
    ``Chrome`` browser.

    .. note::

        You can pin the Concordium browser wallet icon at the top right of your ``Chrome`` browser
        by clicking on the puzzle icon that allows you to manage your browser extensions.

    .. image:: ./images/wCCD_tutorial_12.png
        :width: 100 %

    .. note::

        Depending on the exact commit hash that you used to build your pre-MVP browser wallet, the
        screenshots and setup steps might differ. The browser wallet hosts the private keys corresponding
        to the accounts of the user and a link that points to a ``JSON-RPC server``.
        Depending on the pre-MVP browser wallet version, you either need to create a new account
        (a new private key) or import an existing private key (as it can be seen in the above screenshot).

.. dropdown:: Workflow 2 (click here)

    .. note::

        Coming soon after browser wallet MVP is released.

    Overview of steps (coming soon):

    - Download the Concordium browser wallet MVP from this link.

    - Input the following JSON-RPC server wallet proxy link.

    - Create a new account by clicking this button.

    .. note::

        The browser wallet hosts the private keys corresponding to the accounts of the user and a link that points to a ``JSON-RPC server``.

Running the web front-end
-------------------------

To continue with the tutorial click :ref:`here<wCCD-full-dApp>`.
