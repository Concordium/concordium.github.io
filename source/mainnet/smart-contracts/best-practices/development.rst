==========================
Development best practices
==========================

This document provides guidelines for developing smart contracts.
We start with some general thoughts about smart contract development and then give more details about writing smart contracts in Rust for Concordium.

The mindset
-----------

Smart contract development involves many risks that do not show up in, for example, web programming:

- the cost of mistakes is very high;
- possibilities for fixing bugs are limited;
- the area is evolving constantly with new vulnerabilities being discovered;
- malicious parties deliberately try to break your smart contracts and steal the money.

Therefore, it is not sufficient to defend your code against known vulnerabilities.
You can think about smart contracts as mission-critical software, or software for embedded devices rather than a web application.

- Determine the “bare minimum” that should be on-chain: use smart contracts only for the part that requires decentralization.
- Keep your contracts simple and minimalistic: stick to strictly necessary functionality only.
  The more complexity you have in your contract, the larger the attack surface.
- Explicit is better than implicit: it should be clear from the smart contract code what is happening.
- Be ready that things can go wrong after deployment:

  - provide “pause” functionality;
  - implement additional approvals/wait periods for dangerous operations;
  - have a clear plan for how to fix bugs found after deployment.

- Extensively review, test and apply automated analysis/verification tools. Use different methods to ensure the correctness of your code.
  Do not trust one particular method or tool, make sure that many people have looked at the code, and interacted with the smart contract.


General
-------

- Write a smart contract specification:

  - What is the interface (entrypoints and their parameters)? For example, ``transfer`` takes three parameters ``from``, ``to`` addresses, and ``amount``.
  - Who can access the entrypoints? For example, the transaction sender must be an operator of the ``from`` account.
  - Which properties of these entrypoints should be satisfied? For example, a successful call of ``transfer(from, to, amount)`` decreases the ``from`` balance and the ``to`` balance by ``amount``.

- Make sure you use the last stable version tools/libraries.
- Write unit/integration tests to cover most of the functionality. Use the contract specification to drive the testing efforts.

Concordium Rust Smart Contracts
-------------------------------

Recommended structure
^^^^^^^^^^^^^^^^^^^^^

- Use ``cargo init`` with an appropriate template to start a new project.
- Build contract logic as the state struct implementation.

  .. code-block:: rust

    struct State {
    ...
    }

    impl State {
        fn new() -> Self { ... }

        fn do_something(&mut self, param: MyParameter) { ... }

        ...
    }

    #[receive(
        contract = "MyContract",
        name = "doSomething",
        parameter = "MyParameter",
        mutable
    )]
    fn contract_do_something<S: HasStateApi>(
        ctx: &impl HasReceiveContext,
        host: &mut impl HasHost<State<S>, StateApiType = S>,
    ) -> ReceiveResult<()> {
        // Parse parameters
        let param : MyParameter = ctx.parameter_cursor().get()?;
        ...
        // Perform authorization, potentially using using `ctx` info
        ensure!(sender.matches_account(&owner));
        ...
        host.state_mut().do_something(param);
        ...
    }

- Fail early: validate input/perform authorization as early as possible in an entrypoint.
  Returning earlier will save energy and make the call cheaper.
  Use the `ensure!()` macro to validate and return an error.


Code Documentation
^^^^^^^^^^^^^^^^^^

- Write an outline of the smart contract functionality in the beginning of the file, if the contract implements some standards, mention it.
- Document decisions/choices in the code.
- Document entrypoints:

  - What functionality the entrypoint implements?
  - Who has access rights to call the entrypoint?
  - When the call is rejected?
  - What events are logged?

- Document tests:

  - What scenario/property is being tested?
  - What are the assumptions: input data is assumed to be valid, users have enough rights, etc.

External Calls
^^^^^^^^^^^^^^

Every external call should be treated as a potential security risk. Calling another contact gives control to potentially malicious code that could make arbitrary calls to any other contract, including your contract, changing its state.

- Avoid splitting the on-chain part of your dApp into several smart contracts unless it is strictly necessary.
  For example, instead of using the *proxy* pattern, use :ref:`natively upgradable contracts <contract-instance-upgradeability>`.
- *Reentrancy*. Avoid changing the state after an external call.
  Use the *Checks-Effects-Interactions* pattern: validate data, update the contract state, make external calls.
  Alternatively, consider using a *mutex*: a boolean flag that is set before making an external call, preventing all entrypoints from reentrancy, and reset back after the call is complete.
- The *Pull over Push* pattern: avoid sending funds back to an unknown address without request as part of your contract logic (*Push*).
  Instead, create a separate entrypoint allowing users, which could be smart contracts, to request funds back (*Pull*).
  Note that it is safe to transfer to user addresses, because on Concordium it is guaranteed not to execute any code.
  However, sending funds to a smart contract might fail for various reasons, blocking some functionality from succeeding.
