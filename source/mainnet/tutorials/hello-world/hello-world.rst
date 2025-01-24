.. _hello-world:

====================================
Creating your first Concordium dApp
====================================

This tutorial guides you through creating and deploying your first smart contract on the Concordium blockchain. You'll create a simple "Hello World" smart contract and deploy it on the testnet.

Before you start
================
Ensure you have set up your development environment by following this :ref:`tutorial <setup-env>`.

Creating your first smart contract
==================================

Create a new project
--------------------

#. Create a new project directory:

   .. code-block:: console

      $ mkdir hello_world && cd hello_world

#. Initialize a new smart contract project:

   .. code-block:: console

      $ cargo concordium init

#. Select the **default** template when prompted.

Writing the contract
--------------------

Modify ``src/lib.rs`` to create a simple message-storing contract:

#. Define the state structure:

   .. code-block:: rust

      /// The state of the smart contract.
      #[derive(Serialize, SchemaType)]
      pub struct State {
          message: String,
      }

#. Create the initialization function:

   .. code-block:: rust

      #[init(contract = "hello_world")]
      fn init(_ctx: &InitContext, _state_builder: &mut StateBuilder) -> InitResult<State> {
          Ok(State {
              message: "Hello World!".to_string(),
          })
      }

#. Add the message update function:

   .. code-block:: rust

      #[receive(
          contract = "hello_world",
          name = "set_message",
          parameter = "String",
          error = "Error",
          mutable
      )]
      fn set_message(ctx: &ReceiveContext, host: &mut Host<State>) -> Result<(), Error> {
          let new_message: String = ctx.parameter_cursor().get()?;
          host.state_mut().message = new_message;
          Ok(())
      }

#. Add the view function:

   .. code-block:: rust

      #[receive(contract = "hello_world", name = "view", return_value = "String")]
      fn view(_ctx: &ReceiveContext, host: &Host<State>) -> ReceiveResult<String> {
          Ok(host.state().message.clone())
      }

#. Build the project:

   .. code-block:: console

      $ cargo concordium build --out hello_world.wasm.v1

Deploying your contract
=======================

#. :ref:`Set up a wallet <setup-wallets-lp>`
#. Request testnet CCD using the **Request** option
#. Deploy your contract using the `Smart Contract Deploy Tool <https://sctools.mainnet.concordium.software/>`_ or read the :ref:`deploy a smart contract module guide <deploy-module>` and use the :ref:`concoridum client <concordium-client>` to deploy
#. Use the ``view`` function to verify your deployed contract

Congratulations! You've created and deployed your first smart contract on the Concordium blockchain.
