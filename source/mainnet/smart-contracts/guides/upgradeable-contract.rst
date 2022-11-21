.. _guide-upgradable-contract:

===========================
Make a contract upgradeable
===========================

This guide shows how to make a Rust smart contract upgradeable.

Immutable smart contracts come with the drawback that bugs cannot be fixed, new features and cost optimizations cannot be implemented.
For some decentralized applications this is a problem and these need some way to upgrade the smart contract code.

.. note::
   A common way to workaround immutability that is seen on other blockchains is to have an additional smart contract acting as a proxy, forwarding calls to the actual smart contract.
   Upgrading is then updating the proxy to forward the calls to another smart contract.
   Unfortunately, this will introduce an extra cost on every contract call and add an additional layer of complexity to the contract code, which usually makes authorization and testing harder.

Concordium smart contract instances have the option to upgrade their smart contract module by calling the ``upgrade`` function with a reference to a new smart contract module to use.
If successful, new invocations to the upgraded smart contract instance will use the new smart contract module.

.. seealso::

   To learn more about upgradeability of smart contracts see :ref:`contract-instance-upgradeability`.

Owner can upgrade
=================

The code below will add an ``upgrade`` endpoint to a smart contract, which allows the smart contract owner to trigger a smart contract upgrade.
The parameter for this endpoint takes the new module reference and optionally a name of an entrypoint with parameter to invoke in the upgraded smart contract instance.

Providing the optional entrypoint can be used for triggering a migration function in the new module.
This has the benefit of being in the same transaction as the upgrade itself, making the transaction revert the upgrade if the migration fails.

.. code-block:: rust

   /// The parameter type for the contract function `upgrade`.
   /// Takes the new module and optionally a migration function to call in the new
   /// module after the upgrade.
   #[derive(Debug, Serialize, SchemaType)]
   struct UpgradeParams {
       /// The new module reference.
       module:  ModuleReference,
       /// Migration function in the new module.
       migrate: Option<(OwnedEntrypointName, OwnedParameter)>,
   }

   #[receive(contract = "my_contract", name = "upgrade", mutable, parameter = "UpgradeParams")]
   fn contract_upgrade<S: HasStateApi>(
       ctx: &impl HasReceiveContext,
       host: &mut impl HasHost<State<S>, StateApiType = S>,
   ) -> ReceiveResult<()> {
       // Authorize the sender.
       ensure!(ctx.sender().matches_account(&ctx.owner()));
       // Parse the parameter.
       let params: UpgradeParams = ctx.parameter_cursor().get()?;
       // Trigger the upgrade.
       host.upgrade(params.module)?;
       // Call a migration function if provided.
       if let Some((func, parameter)) = params.migrate {
           host.invoke_contract_raw(
               &ctx.self_address(),
               parameter.as_parameter(),
               func.as_entrypoint_name(),
               Amount::zero(),
           )?;
       }
       Ok(())
   }

.. note::

   The code snippet above is using Rust and ``concordium-std`` version 5 or newer.

The JSON parameter for triggering an upgrade is of the form:

.. code-block:: json

   {
       "module": "<Lowercase hex encoding of module ref>",
       "migrate": { "Some": [["<Migration entrypoint name>", "<Parameter for the migration entrypoint>"]] }
   }

.. seealso::

   For a guide how to send interact with a smart contract using JSON see :ref:`interact-instance-json-parameters`.
