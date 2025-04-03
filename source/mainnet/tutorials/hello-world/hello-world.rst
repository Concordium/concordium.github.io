.. _hello-world:

====================================
Creating your first Concordium dApp
====================================

This tutorial guides you through creating and deploying your first smart contract on Concordium. You'll create a simple **Hello World** smart contract and deploy it on the testnet.

Before you start
================

Ensure you have set up your development environment by following this :ref:`tutorial <setup-env>`.

Creating your first smart contract
==================================

#. Initialize a new smart contract project:

   .. code-block:: console

      $ cargo concordium init

#. Select the **default** template when prompted, then choose an appropiate project name. The ``init`` command has now created a template smart contract and a corresponding local repository.

Write the contract
--------------------

Modify ``src/lib.rs`` to create a simple message-storing contract:

#. Modify the existing state structure, the new state defines the **message** variable:

   .. code-block:: rust

      /// The state of the smart contract.
      #[derive(Serialize, SchemaType)]
      pub struct State {
          message: String,
      }

#. Modify the **init** method which initialises the **message** variable:

   .. code-block:: rust

      #[init(contract = "hello_world")]
      fn init(_ctx: &InitContext, _state_builder: &mut StateBuilder) -> InitResult<State> {
          Ok(State {
              message: "Hello World!".to_string(),
          })
      }

#. Modify the **receive** method by specifying **String** as the parameter type, changing it's name to be more suggestive and assigning the **input** string to the **state**:

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

#. Modify the **view** function by specifying the **String** return value type and the **message** variable of the **state**

   .. code-block:: rust

      #[receive(contract = "hello_world", name = "view", return_value = "String")]
      fn view(_ctx: &ReceiveContext, host: &Host<State>) -> ReceiveResult<String> {
          Ok(host.state().message.clone())
      }

#. Build the contract:

   .. code-block:: console

      $ cargo concordium build

   After the command runs successfully, a file called **module.wasm.v1** will be generated in the **concordium-out** folder

Deploying your contract
=======================

We recommend deploying on the **testnet**, which can be done by following these steps:

#. :ref:`Set up a wallet <setup-wallets-lp>`
#. Request **testnet CCD** using the **Request** option in the wallet
#. **Access** the `Smart Contract Deploy Tool <https://sctools.mainnet.concordium.software/>`_  in order to deploy the generated module
#. **Click** on the button to connect to the **Browser Wallet**
#. **Upload** the module generated in the previous section in the Step 1 section of the dApp then **click** the button to **deploy**
#. Choose **Derive from step 1** in **Step 2**, then **click** the button to **initialise** the smart contract, a **Smart Contract Index** will be shown
#. **Input** the index in the next step, then select the **Derive From Smart Contract Index** option
#. Choose **view** as the **Entry Point Name**, then **click** the **Read Smart Contract** button, **"Hello World"** will be displayed

Congratulations! You've now created and deployed your first smart contract on the Concordium blockchain.
