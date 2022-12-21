.. _solana-overview:

========
Overview
========

In this document, we outline the main differences in models behind Concordium smart contracts and Solana programs.

Accounts
========

Solana accounts are somewhat similar to files and can hold arbitrary data.
Some accounts are marked as `executable` and contain program code.
These accounts themselves are immutable, but programs stored in their data can modify data in accounts they own.

Concordium, on the other hand, has a strict separation between user accounts and smart contracts.
Both accounts and smart contracts have CCD balance associated with them.
Moreover, smart contracts can have state -- structured data associated with the contract.
Unlike Solana, this data can be updated directly only by the smart contract code it belongs to.
The only way of interacting with contract state from outside is through the interface that the smart contract provides.
This interface consists of entypoints.


Smart contracts and programs
============================

Concordium `smart contracts` serve the same purpose as `programs` on Solana.
However, some details are different in how these two are structured.

Solana programs take a list of accounts as input.
Some of these accounts can be used to store persistent data, that is, data that is stored after the contract invocation is completed.
Concordium uses smart contract state for that purpose.
Each contract can write to its own state directly.
Modifying state of other smart contracts is only possible by calling their entrypoints.
Smart contracts cannot read/write arbitrary data from/to user accounts, but they can transfer CCD they own to any other user account and to other smart contracts, if they have `payable` entrypoints.

Solana
------

.. code-block:: rust

        #[derive(BorshSerialize, BorshDeserialize, Debug)]
        pub struct GreetingAccount {
            pub counter: u32,
        }

        pub fn process_instruction(
            program_id: &Pubkey, // Public key of the program account
            accounts: &[AccountInfo], // a slice of accounts to operate on
            instruction_data: &[u8], // instructions
        ) -> ProgramResult {
            // Iterating accounts is safer than indexing
            let accounts_iter = &mut accounts.iter();

            // Get the account to say hello to
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

            ...
        }

Concordium
----------

.. code-block:: rust

   #[derive(Serialize, SchemaType, Clone)]
    pub struct MyState {
        counter: u64
    }

   #[receive(
        contract = "example",
        name = "some_receive",
        mutable,
        payable
    )]
    fn some_receive<S: HasStateApi>(
        ctx: &impl HasReceiveContext,
        host: &mut impl HasHost<MyState, StateApiType = S>,
        _amount: Amount
    ) -> Result<(), Error> {
        // Read input parameters
        let input: u64 = ctx.parameter_cursor().get()?;
        ...
        // Update the state
        host.state_mut().counter += input;
        ...
    }
