.. _counter-sc:

=================================
Concordium counter smart contract
=================================

This tutorial guides you through creating a smart contract using the Concordium default contract template that simply keeps a counter value in its state. It is a super simple, fundamental example contract that touches on the following points:

- Updating the counter value by a parameter given by the user.
- Reading the current value.
- Returning a custom error if the counter overflows.
- Restricting updating the value to only the owner of the contract.

.. Attention::

   Before starting the next steps, make sure that you have :ref:`setup the developer environment<setup-env>` with the tools needed.

Once you have setup your development environment, you are ready to create your smart contract project. Run the initialization command below to create a new working directory for your smart contract. It will set up the initial project for you, including any necessary Rust dependencies.

.. Note::

    The template repository contains `short GIFs <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/templates>`_ that show many of these commands.

.. code-block:: console

    $cargo concordium init

When prompted for which template to expand, select the ``default`` option. You will then be asked for a name for your project. In this example we'll use "counter", but you can choose whatever name you want.

The result is a basic skeleton of a smart contract. Initially, it has a ``State`` struct, an ``init`` function for creating new instances, an ``Error`` enum for custom errors, a ``view`` function to read the state, and a dummy ``receive`` function.

To build the counter smart contract, rename the ``custom_state_field`` of the ``State`` to ``counter``. Then add the variants ``OwnerError`` and ``OverflowError`` to the ``Error`` enum, and specify the counter initial value as zero in the ``init`` function, so the counter value starts from zero when you create a new, fresh instance of the contract. The first part of your contract now looks like this:

.. code-block:: rust

    /// The state of the smart contract.
    #[derive(Serialize, SchemaType)]
    pub struct State {
        counter: i8,
    }

    /// Errors that may be emitted by this smart contract.
    #[derive(Debug, PartialEq, Eq, Reject, Serialize, SchemaType)]
    pub enum Error {
        /// Failed parsing the parameter.
        #[from(ParseError)]
        ParseParams,
        OwnerError,
        OverflowError,
    }

    /// Creates a new instance of the smart contract.
    #[init(contract = "counter")]
    fn init(_ctx: &InitContext, _state_builder: &mut StateBuilder) -> InitResult<State> {
        Ok(State { counter: 0 })
    }

Update counter
==============

Now let's add the function to update the counter. Change the ``receive`` function as shown below. If the input cannot be parsed, we return ``Error::ParseParams``. The function must be triggered by the owner of the contract instance or it will return ``Error::OwnerError``. Note that the ``receive`` attribute on the function includes the ``mutable`` flag, which makes the ``host`` parameter a mutable reference rather than a shared reference, which enables us to change the state of the contract.

.. code-block:: rust

    /// Updates the smart contracts counter by adding the input to the current value. The input parameter is an `i8`.
    ///
    /// If the sender does not match the contract owner, this returns [`Error::OwnerError`] without updating the counter.
    ///
    /// If the input failed to parse, this returns [`Error::ParseParams`] without updating the counter.
    ///
    /// If the counter would overflow due to the update, the update is not performed and this returns [`Error::OverflowError`].
    #[receive(
        contract = "counter",
        name = "update",
        parameter = "i8",
        error = "Error",
        mutable
    )]
    fn update(ctx: &ReceiveContext, host: &mut Host<State>) -> Result<(), Error> {
        // Return Error::OwnerError if the owner does not match the sender.
        ensure!(
            ctx.sender().matches_account(&ctx.owner()),
            Error::OwnerError
        );

        // Returns ParseError on failure.
        let input: i8 = ctx.parameter_cursor().get()?;

        let state = host.state_mut();
        let Some(result) = state.counter.checked_add(input) else {
            return Err(Error::OverflowError);
        };

        state.counter = result;
        Ok(())
    }

View function
-------------

The view function will return only the counter's value so you need to update its return value as ``i8`` and return it from the ``host.state()``.

.. code-block:: rust

    /// Returns the state of the smart contract.
    #[receive(contract = "counter", name = "view", return_value = "i8")]
    fn view(_ctx: &ReceiveContext, host: &Host<State>) -> ReceiveResult<i8> {
        Ok(host.state().counter)
    }

Build, deploy, and initialize the contract
==========================================

Create a ``dist`` folder for the compiled WASM contract. Then, run the build command.

.. code-block:: console

    $cargo concordium build --out dist/module.wasm.v1

You may get a warning about the build not being verifiable, which you may ignore.

Now we can deploy the smart contract using the Concordium client CLI. If you are running your own node, you can use this command:

.. code-block:: console

    $concordium-client module deploy dist/module.wasm.v1 \
        --sender <YOUR-ADDRESS> \
        --grpc-port 20001

Or, if you just want to try things out on testnet, you can use the testing nodes provided by Concordium:

.. code-block:: console

    $concordium-client module deploy dist/module.wasm.v1 \
        --sender <YOUR-TESTNET-ADDRESS> \
        --grpc-ip grpc.testnet.concordium.com \
        --grpc-port 20000 \
        --secure

The client may also ask you for the password you specified when you :ref:`imported your key into the Concordium client<import-client-key>`. If successful, the command should respond with ``Module successfully deployed with reference: <MODULE-HASH>``, where the module hash is a long hex string. Note down this hash, we'll need it when we initialize a new contract instance below.

Note that you will also pay a small fee from your account to pay for the deployment. If you followed the environment setup to create a testnet account, you should already have some CCD for testing purposes in that account.

Finally, let's initialize a contract instance, so you are ready to invoke the contract functions in the next section. Use this command if you are running your own node:

.. code-block:: console

    $concordium-client contract init <MODULE-HASH> \
        --sender <YOUR-ADDRESS> \
        --energy 30000 \
        --contract counter \
        --grpc-port 20001

Or, use this command to use the Concordium testnet node:

.. code-block:: console

    $concordium-client contract init <MODULE-HASH> \
        --sender <YOUR-TESTNET-ADDRESS> \
        --energy 30000 \
        --contract counter \
        --grpc-ip grpc.testnet.concordium.com \
        --grpc-port 20000 \
        --secure

Be sure to note down the contract index returned by this command. You'll need the index in the next section to invoke functions for the contract instance.

Congratulations if you made it this far! You have now successfully deployed and initialized a simple smart contract.

Interact with the contract
==========================

View function
-------------

First, check the initial state of the contract. Use this command if you're hosting your own node.

.. code-block:: console

    $concordium-client contract invoke <CONTRACT-INSTANCE-INDEX> \
        --entrypoint view \
        --grpc-port 20001

Or, use this command to use the Concordium testnet node:

.. code-block:: console

    $concordium-client contract invoke <CONTRACT-INSTANCE-INDEX> \
        --entrypoint view \
        --grpc-ip grpc.testnet.concordium.com \
        --grpc-port 20000 \
        --secure

Since you just initialized the contract, you should see that the return value is 0.

Update function
---------------

In order to call a function that takes input, like our update function, we'll need to create a JSON file that represents the input to the function. Since our input in this simple example is just a number, a simple text file with a number will do, since this is also valid JSON. We can quickly make this file with this command:

.. code-block:: console

    echo 42 > input.json

Now we can invoke the update function with that input by using a contract update transaction. This will mutate the smart contract state and store the new value. If you have your own node, you can invoke the update function like so:

.. code-block:: console

    $concordium-client contract update <CONTRACT-INSTANCE-INDEX> \
        --entrypoint update \
        --parameter-json input.json \
        --sender <YOUR-ADDRESS> \
        --energy 6000 \
        --grpc-port 20001

Or, to use Concordium's testnet node, use this command:

.. code-block:: console

    $concordium-client contract update <CONTRACT-INSTANCE-INDEX> \
        --entrypoint update \
        --parameter-json input.json \
        --sender <YOUR-ADDRESS> \
        --energy 6000 \
        --grpc-ip grpc.testnet.concordium.com \
        --grpc-port 20000 \
        --secure

Now try calling the view function again using the instructions above. If everything worked as it should, you should see the return value is now 42!

We can also test that our error conditions work correctly. For instance, you can try updating the counter using another account (i.e. a different ``--sender`` address). If you try, you'd get an error code of -2. You can check the developer portal for more information about :ref:`custom errors<custom-errors>`, but basically, -2 means the second variant from your ``Error`` enum, which is ``OwnerError``, which is what we'd expect.

You can also try updating the counter with a high value that would cause an overflow error, for instance 100 (since 42 + 100 overflows an ``i8``). This should give you a -3 error code, which corresponds to the third variant in the ``Error`` enum, namely ``OverflowError``, just as we would expect.
