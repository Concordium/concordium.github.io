.. _fractionalized-nft-sc-actions:

===============================================================
Build, deploy, and initialize the fractionalizer smart contract
===============================================================

So far so good! You have implemented your smart contract and now you are ready to build, deploy, and create an instance of it.

Build smart contract
====================

First, build the smart contract into Wasm format. Use the following command to do it. You can extract the **schema** and Wasm-compiled file into a new folder called *dist* as shown in this example.

.. code-block:: console

    cargo concordium build --out dist/module.wasm.v1 --schema-out dist/schema.bin

.. image:: ../../images/mid-fractnft-scactions1.png

Deploy smart contract
=====================

Second, you need to deploy the Wasm-compiled smart contract to testnet. If you don't have your own node running, you can use the Concordium testnet node to deploy. Using a public URL (node.testnet.concordium.com), you can connect to the Concordium testnet node and will be able to deploy/query nodes. For all operations in this tutorial, you are going to use the public gRPC endpoint that is provided by Concordium.

For some use cases you might need to run your own local node as there could be some limitations of this one. If you need more information either check :ref:`this link<developer-page>` or `contact Concordium support <http://support.concordium.software>`_.

Use the following command to do deploy your smart contract.

.. code-block:: console

    concordium-client module deploy dist/module.wasm.v1 --sender <YOUR-ADDRESS> --name CIS2-Fractionalizer --grpc-port 20000 --grpc-ip node.testnet.concordium.com

.. image:: ../../images/mid-fractnft-scactions2.png

Initialize smart contract
=========================

Third, you need to create a new instance of this smart contract which will initialize the empty state that holds the assets and allow you to invoke all methods. Run the command below to create an instance of your deployed contract using the module reference.

.. code-block:: console

    concordium-client contract init <YOUR-MODULE-HASH> --sender <YOUR-ADDRESS> --energy 30000 --contract CIS2-Fractionalizer --grpc-port 20000 --grpc-ip node.testnet.concordium.com

.. image:: ../../images/mid-fractnft-scactions3.png

Excellent. Now you can continue to the :ref:`following section<mint-fractionalized-nft>`.
