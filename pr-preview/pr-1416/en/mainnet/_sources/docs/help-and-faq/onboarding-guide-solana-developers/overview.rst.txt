.. _solana-overview:

================================
Onboarding for Solana developers
================================

This overview outlines the main differences of account models and smart contract functionality between Solana and Concordium. :ref:`The FAQ<solana-faq>` answers commonly asked questions.

Accounts
========

Solana accounts are somewhat similar to files and can hold arbitrary data.
Some accounts are marked as *executable* and contain program code.
These accounts themselves are immutable, but programs stored in their data can modify data in accounts they own.

Concordium, on the other hand, has a strict separation between user accounts and smart contracts.
Both accounts and smart contracts have CCD balances associated with them.
Moreover, smart contracts can have state -- structured data associated with the contract.
This data can be updated directly only by the smart contract code it belongs to.
The only way of interacting with the contract state from outside is through the interface that the smart contract provides.
This interface consists of entrypoints.

Another important difference is that transferring CCD to a non-existing account or interacting with a non-existing smart contract address on Concordium will fail.

.. _solana-programs:

Smart contracts and programs
============================

Concordium *smart contracts* serve the same purpose as *programs* on Solana.
However, some details are different in how these two are structured.

Solana programs take a list of accounts as input.
Some of these accounts can be used to store persistent data, that is, data that is stored after the contract invocation is completed.
Concordium uses smart contract states for that purpose.
Each contract on Concordium can write to its own state directly.
Modifying the state of other smart contracts is only possible by calling their entrypoints.
Smart contracts cannot read/write arbitrary data from/to user accounts, but they can transfer CCD they own to any user account and other smart contracts.
Note that CCD cannot be transferred to the smart contract balance without calling a specific entrypoint or a :ref:`fallback entrypoint<fallback-entrypoints>`.
The smart contract logic determines whether to accept CCD or not.

Example
=======

This example demonstrates the difference in how the persistent state is handled.

Solana
------

The example code is taken from `example-helloworld <https://github.com/solana-labs/example-helloworld>`_ and adjusted.

.. code-block:: rust

        // Define the type of state stored in accounts
        #[derive(BorshSerialize, BorshDeserialize, Debug)]
        pub struct GreetingAccount {
            pub counter: u32,
        }

        ...

        pub fn process_instruction(
            program_id: &Pubkey, // Public key of the program account
            accounts: &[AccountInfo], // A slice of accounts to operate on
            _instruction_data: &[u8], // Instructions, ignored in this example
        ) -> ProgramResult {

            let accounts_iter = &mut accounts.iter();

            // Get the account from the input to store the state
            let account = next_account_info(accounts_iter)?;

            // The account must be owned by the program in order to modify its data
            if account.owner != program_id {
                msg!("Greeted account does not have the correct program id");
                return Err(ProgramError::IncorrectProgramId);
            }

            // Increment and store the number of times the account has been greeted
            let mut greeting_account = GreetingAccount::try_from_slice(&account.data.borrow())?;
            greeting_account.counter += 1;
            greeting_account.serialize(&mut &mut account.data.borrow_mut()[..])?;

            Ok(())
        }

Concordium
----------

.. code-block:: rust

    // Define the type of state for the contract
    #[derive(Serialize, SchemaType, Clone)]
    pub struct MyState {
        counter: u32
    }

    ...

   #[receive(
        contract = "example",
        name = "some_receive",
        mutable,
    )]
    fn some_receive(
        ctx: &ReceiveContext,
        host: &mut Host<MyState>,
    ) -> Result<(), Error> {

        // Load the contract state; increment and store the counter
        host.state_mut().counter += 1;

        Ok(())
    }

