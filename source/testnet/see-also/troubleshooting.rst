.. _`Issue with adding a baker on node dashboard on Mac in previous Mac release`: #issue-with-adding-baker-on-node-dashboard-on-mac-in-previous-mac-release
.. _`Multiple nodes, bakers, and accounts`: #multiple-nodes-bakers-and-accounts
.. _`Appearance of high memory consumption of the node`: #appearance-of-high-memory-consumption-of-the-node
.. _`Symbolic links in Documents path`: #symbolic-links-in-documents-path
.. _`Node does not catch up with chain on Windows`: #node-does-not-catch-up-with-chain-on-windows
.. _`Error starting the node due to port already in use`: #docker-error-port-already-in-use
.. _`Supported ID document types and countries`: #supported-id-document-types-and-countries
.. _`Inconsistency with Spanish national identity card`: #inconsistency-with-spanish-national-identity-card
.. _`Performance issues in mobile wallet on Android phones`: #performance-issues-in-mobile-wallet-on-android-phones
.. _`Robustness issues with shielded transfer in mobile wallets`: #robustness-issues-with-shielded-transfer-in-mobile-wallets
.. _`Creation of account fails with imported identity`: #creation-of-account-fails-with-imported-identity
.. _`Node dashboard shows outdated information after node reset`: #node-dashboard-shows-outdated-information-after-node-reset
.. _`Node dashboard does not load`: #node-dashboard-does-not-load
.. _supported ID documents: http://onfido.com/supported-documents
.. _stopped: /testnet/docs/quickstart-node#stopping-the-node
.. _other ports: /testnet/docs/quickstart-node#configuring-ports
.. _Discord: https://discord.gg/xWmQ5tp

.. _troubleshooting-and-known-issues:

================================
Troubleshooting and known issues
================================

.. contents::
   :local:
   :backlinks: none

If you cannot find your issue here, please email testnet@concordium.com,
including logs from the ``concordium-node-retrieve-logs`` tool.

Issue with adding a baker on node dashboard on Mac in previous Mac release
==========================================================================

There was an issue on Mac when trying to add a baker on the node dashboard,
which failed with a network error in the first released Mac version. We have
fixed the issue and uploaded a new release for Mac to our
https://developers.concordium.com/testnet/docs/downloads page. Please make sure
to download the latest Mac version, released on 2020-10-16, stop your node,
reset your data, and restart your node.

If you have a previous release version, please complete the following
steps:

-  Delete folder ``~/Documents/concordium-software``.
-  Extract the new release .zip into folder ``~/Documents``.
-  Open a terminal in ``~/Documents/concordium-software`` and run
   ``./concordium-node-stop``.
-  Reset the data by running ``./concordium-node-reset-data``.
-  Run ``./concordium-node`` and let it catch up.

Note that in all releases you can use the Concordium client for account
and baker management, see e.g.
``concordium-client config account --help`` and
``concordium-client baker --help``, respectively, to get started.

Multiple nodes, bakers, and accounts
====================================

We do not currently support running two nodes on the same machine. This means
that while it is possible, we provide no support for it. When the
``concordium-node`` tool is run when the node is already running it will either
do nothing, in case none of the parameters, e.g., node name, have changed, or
restart the node with the new parameters. Note that "do nothing" means that it
will attach the terminal to the existing running node, so it will appear similar
to if another node is running, but upon close inspection it will become clear
that the outputs of the previously running, and the "newly started" nodes are
the same.

A node can only run as one baker. A baker is by definition a member of the
committee. The current committee can be obtained by querying the node via
``concordium-client consensus show-parameters --include-bakers``. A node can run
as a baker or not, depending on how it is started, and whether the keys it
starts with are registered in the committee.

Which baker the node runs as is determined by the baker keys that it starts with
(these are in the file ``baker-credentials.json``). If a node is restarted it
reloads the keys that exist at the time it starts.

The same account can be used to register multiple bakers. All these bakers will,
by default, have the account as the reward account. An account can only delegate
to one of the bakers however (delegate in the sense that the tokens on the
account will count towards the stake of the baker). When a baker is registered,
and without further action, it will be in the committee, but it will have 0%
stake. Any account can subsequently delegate to any of the registered bakers.

Appearance of high memory consumption of the node
=================================================

The Concordium node may appear to use a lot of memory, and its memory
consumption may grow over time. This happens because the node internally uses
the LMDB database for block and transaction storage. LMDB manages the database
as a single memory-mapped file which can cause certain tools to erroneously
include the whole or parts of the database file into the reported memory
consumption of the process.

Symbolic links in ``Documents`` path
====================================

On Linux and macOS the ``concordium-client`` tool must be run from
``$HOME/Documents/concordium-software`` directory or its subdirectory.

The tool checks the absolute path of the directory and any symbolic links in the
path will make this check fail.

For example if ``$HOME/Documents`` is a symbolic link to some other directory
then the tool will fail to start.

The easiest way to check the absolute path is to run ``pwd -P``.

Node does not catch up with chain on Windows
============================================

On Windows, the Concordium node may fail to catch up with the chain when
changing internet connections. It usually catches up with the chain again after
few minutes. Otherwise, stop and restart the node.

Failure to catch-up on Windows might also occur, if the time in the docker
virtual machine is out of sync. This can happen as a result of the machine
entering sleep (even if the node is not running at the time). The following may
be indications that this has occurred:

-  Errors in the log such as
   ``ERROR: External: Error importing block: ResultEarlyBlock`` (or any
   other error involving ``ResultEarlyBlock``).
-  Timestamps of messages in the log do not match the system time.
   (Note, the log timestamps are given in the UTC timezone; you may need
   to add or subtract a few hours to convert to your local time.)

To fix this, shutdown the node, restart your computer (or just restart Docker
Desktop), and then restart the node.

If the problem persists, it could be that the system time is set incorrectly.
(This is especially likely if you observe negative times on the Concordium
Network Dashboard.) To fix this, open *Date & time settings* and select *Sync
now* under *Synchronize your clock*. You may have to restart the node as
described above after synchronizing your clock.

(Note: it may be possible to resynchronize the virtual machine's clock without
having to restart it. This can be done by stopping and restarting the *Time
synchronization* integration service for the docker virtual machine using
*Hyper-V Manager*.)

Docker error port already in use
================================

The node may fail starting with the error ``Error starting {..} proxy: listen
tcp 0.0.0.0:{PORT}: bind: address already in use``, which can be remedied by
using a different ``{PORT}`` than the default used by the node.

The ports used by the node are as follows:

-  8888, the port for P2P networking, which can be set with
   ``--listen-node-port``
-  8099, the port used by the node dashboard, which can be set with
   ``--listen-dashboard-port``
-  8082, the port used by internal backend, which can be set with
   ``--listen-middleware-port``
-  10000, the gRPC port, which can be set with ``--listen-grpc-port``

When changing the mappings above the docker container must be stopped, reset,
and started again. To reset the container either use
``concordiumn-node-reset-data`` or run ``docker rm concordium-client`` in a
terminal.

Supported ID document types and countries
=========================================

For issuing a real-world identity in the mobile wallet ``Concordium ID``, i.e.
an identity based on a physical ID document, 3rd parties identity issuer
Notabene and identity verifier Onfido are invoked. For a list of supported ID
document types and countries, please visit `supported ID documents`_.

The previously described identity issuing option can be selected in the process
of creating a new identity using ``Notabene`` on the New Identity Verification
screen. Note that with option ``Notabene development`` test identities can be
issued, which are not verified against physical ID documents.

Inconsistency with Spanish national identity card
=================================================

A Spanish national identity card shows the serial number of the card (NUM
SOPORT) and the identity number of the holder (DNI). When issuing a real-world
identity in the mobile wallet ``Concordium ID``, based on a Spanish national
identity card, NUM SOPORT should be included in the issued identity.
Inconsistencies may be observed where DNI is used instead. This issue is caused
on the side of the 3rd party issue verifier Onfido.

Performance issues in mobile wallet on Android phones
=====================================================

Performance issues, e.g. long processing times, might occur when running the
mobile wallet ``Concordium ID`` on a low end Android phone. Processing delays
might not be indicated by approriate waiting screens.

Robustness issues with shielded transfer in mobile wallets
==========================================================

When executing multiple shielded transfers or unshielding flows in the mobile
wallets within a very short period of time, inconsistencies might be observed.
Those robustness issues can be circumvented by waiting a few seconds between
such transactions.

Creation of account fails with imported identity
================================================

Creating a new account with an imported identity fails in the following
scenario:

-  create an identity
-  make an export
-  create accounts using the identity
-  reinstall the app
-  import the exportfile
-  create an account, using the imported identity.

Node dashboard shows outdated information after node reset
==========================================================

The node dashboard stores information about the baking status and pending
transactions. This state is stored in the browser and is not cleared with the
node reset. To clear the information, use the following keys while being on the
node dashboard:

-  Windows/Linux: ctrl + delete
-  MacOS: ctrl + fn + backspace Once pressed, you will be prompted to
   confirm the action.

You can also delete the entries in the browser's local storage manually and
immediately refresh the webpage before it re-inserts the entries again.

Node dashboard does not load
============================

When connecting to the node dashboard from a machine other than the one running
the node, the node dashboard may not load, showing the error "Oops, something
went wrong: HTTP Network error". Accessing the node dashboard remotely is not
supported, but may be achieved in one of the following ways.

SSH tunnel to the node
----------------------

If the node is running on a server to which you have SSH access, you can forward
ports on your local machine to ports on the server via an SSH tunnel. To access
the node dashboard, it is necessary to forward both the node dashboard server
port (8099 by default) and the middleware port (8082 by default). For example:

::

   ssh -L 8099:0.0.0.0:8099 -L 8082:0.0.0.0:8082 user@server

It should then be possible to access the node dashboard at
http://localhost:8099/.

Configure the middleware address
--------------------------------

The node dashboard by default attempts to connect to the middleware server at
``127.0.0.1`` (the local machine). It is possible to configure this when
starting the node by providing the command-line argument
``--listen-middleware-address <node address>``, where ``<node address>`` is the
address that you will use to connect to the node. (To change this, the node must
be `stopped`_, reset, and started again. To reset the node use
``concordium-node-reset-data`` in a terminal.)

Note that it is *strongly recommended* to configure your firewall so that access
to ports other than 8888 (peer-to-peer networking) is not possible from the
public internet. Someone with access to the `other ports`_ may be able to take
control of your node or accounts you have saved on the node.

Support & Feedback
==================

If you run into any issues or have suggestions, post your question or feedback
on `Discord`_ or contact us at testnet@concordium.com.
