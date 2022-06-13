.. _sirius-testnet-reset-nodes:

==================================
Node migration after Testnet reset
==================================

The following contains information about how to migrate your node after Testnet reset depending on your platform.

Windows
=======

To update the Windows node you need to delete the existing testnet database and
install and run the new node. The steps are:

1. Stop the existing testnet node following :ref:`instructions
   <install-upgrade-node-windows>` on how to upgrade a node.
2. Delete the testnet node's data directory folder. This was selected during node
   installation. By default it will be ``<CommonAppDataFolder>\Concordium\Node
   Runner\testnet\data`` where ``<CommonAppDataFolder>`` is usually
   ``C:\ProgramData``.
3. `Download the Testnet Windows Installer package <https://distribution.concordium.software/windows/Signed/Node-4.1.1-0.msi>`_
4. Install the new node version and start it.


MacOS
=====

To update the macOS node you need to delete the existing testnet database and
install and run the new node. The steps are:

1. Stop the existing testnet node by running the **Concordium Node Stop
   Testnet** application.
2. Navigate to the testnet node's data directory at ``/Library/Application
   Support/Concordium Node/Testnet/Data``.
3. Delete the directory named ``database-v4``.
4. `Download the Testnet macOS installer package <https://distribution.concordium.software/macos/signed/concordium-node-4.1.1-0.pkg>`_
5. Install the new node version and start it.

Ubuntu
======

To update Ubuntu, you need to download and intall the new version.

`Download the Testnet Debian package <https://distribution.testnet.concordium.com/deb/concordium-testnet-node_4.1.1_amd64.deb>`_

      - SHA256 checksum of the download: ``35c668769576e32d94f53b3c167b16ad7c74425737932f9b9f2837ea35fe3641``

Docker
======

To update a Docker node, you need to download the full suite for running a node on Linux using Docker. The suite contains Concordium Node, Concordium Client and cargo-concordium.

To upgrade from the previous testnet you should

1. Stop the existing node using the ``concordium-node-stop`` tool.
2. Delete the existing database. The database is located in ``~/.local/share/concordium/database-v4``. Delete this directory.
3. Start the new node.

`Download the Testnet suite for Linux <https://distribution.testnet.concordium.com/tools/linux/concordium-software-linux-4.1.1-1-testnet.tar.gz>`_

      - SHA256 checksum of the download: ``f914336abd4143f17beacbeb8f53af775cbbbf29258f40af2ef35fbdc613b8e1``
