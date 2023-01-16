.. _sc-development-best-practices:

==========================
Development best practices
==========================

This document provides guidelines for developing smart contracts.
We start with some general thoughts about smart contract development and then give more details about writing smart contracts in Rust for Concordium.

Mindset
========

Smart contract development involves many risks that do not show up in, for example, web programming:

- the cost of mistakes is very high;
- possibilities for fixing bugs are limited;
- the area is evolving constantly with new vulnerabilities being discovered;
- malicious parties deliberately try to break your smart contracts and steal the money.

Therefore, it is not sufficient to defend your code against known vulnerabilities.
You can think about smart contracts as mission-critical software, or software for embedded devices rather than a web application.

To minimize the exposure of your smart contract to possible attacks consider the following.

- Determine the “bare minimum” that should be on-chain: use smart contracts only for the part that requires decentralization.
- Keep your contracts simple and minimalistic: stick to strictly necessary functionality only.
  The more complexity you have in your contract, the larger the attack surface.
- Be ready that things can go wrong after deployment:

  - provide “pause” functionality;
  - implement additional approvals/wait periods for dangerous operations;
  - have a clear plan for how to fix bugs found after deployment.

- Extensively review, test and apply automated analysis/verification tools. Use different methods to ensure the correctness of your code.
  Do not trust one particular method or tool, make sure that many people have looked at the code, and interacted with the smart contract.


.. _best-practices-specification:

Specification
=============

A smart contract specification reflect developers' intentions regarding the smart contract functionality.
It can serve as a guide for the implementation and further for testing, verifying, and auditing the code.
Start with an outline of the functionality and gradually refine it into specifications of contract entrypoints.

For the entrypoints, consider the following:

- What is the interface (entrypoints and their parameters)? For example, ``transfer`` takes three parameters ``from``, ``to`` addresses, and ``amount``.
- Who can access the entrypoints? For example, the transaction sender must be an operator of the ``from`` account.
- Which properties of these entrypoints should be satisfied? For example, a successful call of ``transfer(from, to, amount)`` decreases the ``from`` balance and the ``to`` balance by ``amount``.

If the logic of your application requires complex flows that include several contract calls, or features several interacting smart contracts, use diagrams with description to document these.

The specification is not static, it can be refined once you start developing your application.
Work in iterations, refining the specification when new requirements are discovered or old requirements change.

An informal specification can be refined, turned into a formal one, and used as input to automated testing and verification tools.

The absence of specifications complicates the quality assurance of smart contracts.
For example, it makes auditing process less efficient and more expensive, because specifications has to be recovered from the source code before starting the audit process.


Concordium Rust Smart Contracts
===============================

This section provides recommendations for developing smart contract in Rust.


.. _best-practices-code-structure:

Recommended structure
---------------------

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
  Use the ``ensure!()`` macro to validate and return an error.

.. _best-practices-external-calls:

External Calls
--------------

Every external call should be treated as a potential security risk.
Calling another contact hands control out to potentially malicious code that could make arbitrary calls to any other contract, including your own contract.
Calls to your contract might change its state through entrypoints that permit updating the state, see :ref:`best-practices-reentrancy`.
Moreover, you should not make any assumptions about energy consumption, or expect that the execution succeeds.
You contract should be able to correctly handle situations when the call to an external contract fails.

General recommendations
^^^^^^^^^^^^^^^^^^^^^^^

- *Avoid complex interactions*. Avoid splitting the on-chain part of your dApp into several smart contracts unless it is strictly necessary.
  For example, instead of using the *proxy* pattern, use :ref:`natively upgradable contracts <contract-instance-upgradeability>`.
- *Think about the contract state*. Do not assume that the contract state stays the same after an external call (see :ref:`best-practices-reentrancy` for details).
- *Protect from denial-of-service (DoS) attacks*. Use the *Pull over Push* pattern: avoid sending funds back (*Push*) to an unknown address as part of some complex operation in your smart contract.
  It opens doors to DoS attacks since the contract you call might fail for various reasons, blocking your functionality from succeeding.
  Instead, create a separate entrypoint allowing users, which could be smart contracts, to request funds back (*Pull*).
  Note that it is safe to transfer to user addresses, because on Concordium it is guaranteed not to execute any code.

.. _best-practices-reentrancy:

Reentrancy
^^^^^^^^^^

The *reentrant behavior* is not specific to smart contracts: it is a well known issue in the context of concurrency.
A procedure can be interrupted in the middle of its execution, run again in *another* execution context, and then continue execution from the interruption point.
In case of smart contracts, each external call interrupts the execution and hands over control to unknown code.
Do not treat external contract invocations as regular method calls.
Instead, think of them as sending a message and temporarily pausing execution of your contract.
The receiving side has full control of what to do next and can choose to call your contract again, while it is still in the "paused" state waiting for the external call to be completed.
Once the external call is completed, you might find your contract in a completely different state.
See an :ref:`example <reentracny-unit-testing>`, based on the DAO contract vulnerability of how reentrancy can be discovered using unit testing.

- Avoid changing the state after an external call: use the *Checks-Effects-Interactions* pattern: validate data, update the contract state, make external calls.
- If you need to perform some state changes after and external call -- use `invoke_contract_read_only <https://docs.rs/concordium-std/latest/concordium_std/trait.HasHost.html#method.invoke_contract_read_only>`_.
  If the read-only invocation succeeds, it ensures that the state has not been changed after returning from the external call.
  Using ``invoke_contract`` covers most of the cases where protection from reentrancy is required.
- Alternatively, consider using a *mutex*: a boolean flag that is set before making an external call, preventing all entrypoints from reentrancy, and reset back after the call is complete.

.. _best-practices-code-documentation:

Code Documentation
------------------

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

.. _best-practices-code-automated-testing:

Automated testing
-----------------

The Concordium standard library `concordium-std`_ offers several possibilities for testing the smart contract code.

- :ref:`Unit testing <unit-test-contract>` used for testing particular cases where you define what is the valid output.
- :ref:`Property-based testing <writing_property_based_tests>` is a variant of randomized testing that repeatedly checks a *property* with randomly generated input.

Use the :ref:`smart contract specification <best-practices-specification>` to come up with cases and properties to test.

Checklist
---------

Make sure that:

- you have a smart contract specification;
- your code follows the :ref:`recommended structure <best-practices-code-structure>`;
- you looked carefully for all *known* source of issues, e.g. :ref:`external calls <best-practices-external-calls>`, arithmetic overflows, etc.
- you have a *disaster recovery plan*: the pause functionality, upgradability, etc.
- you used formatting and linting tools (see the `Contributing section <https://github.com/Concordium/concordium-rust-smart-contracts#contributing>`_);
- you :ref:`documented your code properly <best-practices-code-documentation>`;
- you tested your code according to the specification, both using :ref:`automated <best-practices-code-automated-testing>` and manual testing;
- your code was reviewed externally.

.. _concordium-std: https://docs.rs/concordium-std/latest/concordium_std/
