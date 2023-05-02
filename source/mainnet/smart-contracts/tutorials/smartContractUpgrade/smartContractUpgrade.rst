.. include:: ../../../variables.rst
.. _smart-contract-upgrade:

====================
Native upgradability
====================

The goal of this tutorial is to deploy a ``contract-version1``, upgrade its logic and migrate its state to ``contract-version2``.

The `contract-version1 <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/smart-contract-upgrade/contract-version1>`_
includes an ``upgrade`` function and the `contract-version2 <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/smart-contract-upgrade/contract-version2>`_
includes a ``migration`` function which the next two paragraphs explore.

``upgrade`` function
====================

To trigger a smart contract upgrade natively on Concordium, the upgrade needs to be triggered on the ``host`` as seen in the code snippet below:

.. code-block:: rust

   fn contract_name<S: HasStateApi>(
      ...
      host: &mut impl HasHost<S>,
      ...
   )  ... {
      ...
      let result = host.upgrade(module);
      ...
   }

.. note::

   If you don't find a ``host.upgrade(module)`` snippet in a smart contract code, you can be sure that this contract
   can not be natively upgraded. The smart contract can still be part of a ``proxy-implementation`` pattern.
   If you want to ensure a smart contract is truly immutable you need to do your own research
   and study its logic.


Greater control is given to the smart contract developer when using ``low-level`` functions (e.g. additional state manipulation
capabilities are exposed which are unavailable when using ``high-level`` functions). These additional state manipulation features are necessary to change the
shape of the state during the ``migration`` but they bear the risk that the state becomes corrupted if the ``migration`` function has some coding bugs.
Make sure you test your upgrade thoroughly (with integration tests as well as manual tests on testnet)
and ensure your state is correctly migrated before doing
the same smart contract upgrade on mainnet.

Using ``high-level`` function in your smart contract code (except for ``upgrade``/``migration`` functions)
should be your preferred option to write smart contract code safely because
it prevents you from accidentally corrupting the state of your smart contract. Smart contract functions are by default
``high-level`` (no need to add this attribute explicitly).

.. note::

   You can remove the ``low-level`` attribute at the ``upgrade`` function, in other words, use a ``high-level`` function, in
   the case that the shape of the state stays the same. In other words, when the ``State`` struct in
   ``contract-version1`` and ``contract-version2`` is identical, you don't need a ``migration`` function and you can remove the ``low-level`` attribute
   at the ``upgrade`` function.

``migration`` function
======================

.. warning::

   Since more responsibility is given to the smart contract developer, smart contract ``upgrade``/``migration`` functions
   should be coded and executed by experts that know about the underlying risk. You are about to become such an expert.


Clone the `smart contract upgrade example <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/smart-contract-upgrade>`_.

.. code-block:: console

    $git clone --recurse-submodules git@github.com:Concordium/concordium-rust-smart-contracts.git

Navigate to the ``contract-version1`` example folder:

.. code-block:: console

    $cd ./examples/csmart-contract-upgrade/contract-version1

Compile the smart contract to a wasm module which you will deploy to testnet in the next step.

.. code-block:: console

    $cargo concordium build -e --out smart_contract_upgrade.wasm.v1

.. note::

   Comprehensive instructions on how to download and set up ``cargo-concordium`` can be found in :ref:`Setup the development environment<setup-env>`.

This command will create the ``smart_contract_upgrade.wasm.v1`` file in your current repository. Deploy the smart contract to testnet with the command:

.. code-block:: console

    $./concordium-client module deploy ./smart_contract_upgrade.wasm.v1 --sender <YourAccountAddress> --grpc-port 10000 --grpc-ip node.testnet.concordium.com

.. note::

   Comprehensive instructions on how to download and set up ``concordium-client`` and how to import an account that you can use
   for the above placeholder ``YourAccountAddress`` can be found in :ref:`Setup the development environment<setup-env>`.

Since other users will read this tutorial, you will likely get an error that the above module is already deployed.
If the module is already deployed or not deployed does not make a
difference because in both cases the console output will print the ``moduleReference`` that you need for the next step.

Initialize a `contract-version1` smart contract instance with the command:

.. code-block:: console

   $./concordium-client contract init <ModuleReference> --contract smart_contract_upgrade --energy 30000 --sender <YourAccountAddress> --grpc-port 10000  --grpc-ip node.testnet.concordium.com

For example, when using the module reference from the above screenshot, the command will look as follows:

.. code-block:: console

   $./concordium-client contract init ed90ddce40c1382e0399954975641f7279d13eb3e8b434aa63c472a43b9b6496 --contract smart_contract_upgrade --energy 30000 --sender <YourAccountAddress> --grpc-port 10000  --grpc-ip node.testnet.concordium.com

As seen in the screenshot above, this command returns your smart contract index.

Before upgrading the ``contract-version1``, you can check its state content with the view function as follows:

.. code-block:: console

   $./concordium-client contract invoke <YourContractVersion1Index> --entrypoint view --grpc-port 10000 --grpc-ip node.testnet.concordium.com

For example, when using the smart contract index from the above screenshot, the command will look as follows:

.. code-block:: console

   $./concordium-client contract invoke 3139 --entrypoint view --grpc-port 10000 --grpc-ip node.testnet.concordium.com

You should see the following output. You need to compile and deploy ``contract-version2`` before we can upgrade our smart contract instance.

Navigate to the ``contract-version2`` example folder:

.. code-block:: console

    $cd ./examples/csmart-contract-upgrade/contract-version2

Compile the smart contract to a wasm module which you will deploy to testnet in the next step.

.. code-block:: console

    $cargo concordium build -e --out smart_contract_upgrade.wasm.v1

Deploy the module to testnet as follows:

.. code-block:: console

    $./concordium-client module deploy ./smart_contract_upgrade.wasm.v1 --sender <YourAccountAddress> --grpc-port 10000 --grpc-ip node.testnet.concordium.com

The ``moduleReference`` returned when deploying ``contract-version2`` is different from the ``moduleReference`` when deploying ``contract-version1``.
This shows that the module's code is not identical.

Create the ``upgrade.json`` file with the following content by inserting the ``moduleReference`` returned by ``contract-version2`` from the previous step:

.. code-block:: json

   {
      "migrate": {
         "Some": [
            [
            "migration",
            ""
            ]
         ]
      },
      "module": "<ModuleReferenceContractVersion2>"
   }

Upgrade the smart contract as follows:

.. code-block:: console

   $./concordium-client contract update <YourContractVersion1Index> --entrypoint upgrade --parameter-json upgrade.json --energy 5000 --sender <YourAccountAddress> --grpc-port 10000 --grpc-ip node.testnet.concordium.com

For example, when using the smart contract index from the above screenshot, the command will look as follows:

.. code-block:: console

   $./concordium-client contract update 3141 --entrypoint upgrade --parameter-json upgrade.json --energy 5000 --sender <YourAccountAddress> --grpc-port 10000 --grpc-ip node.testnet.concordium.com

You should see the following output.

You can check that the state migration was successful by inspecting the state with the view function:

.. code-block:: console

   $./concordium-client contract invoke <YourContractVersion1Index> --entrypoint view --grpc-port 10000 --grpc-ip node.testnet.concordium.com

If the migration function had a bug and changed the shape of the state wrongly, your state might be corrupted. You might see an output similar to below in case of a corrupted state.

