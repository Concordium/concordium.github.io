.. _sc-development-best-practices:

===========
Development
===========

This document provides guidelines for developing smart contracts, including best practices for smart contract development, audit, information about common pitfalls and security vulnerabilities, and how to avoid them.

It starts with some general thoughts about smart contract development and then gives more details about writing smart contracts in Rust for Concordium.

Mindset
========

Smart contract development involves many risks that do not show up in, for example, web programming:

- the cost of mistakes is very high;
- possibilities for fixing bugs are limited;
- the area is evolving constantly, with new vulnerabilities being discovered regularly;
- malicious parties deliberately try to break your contract, for example, to steal the funds from the contract or account.

Therefore, it is not sufficient to defend your code against known vulnerabilities.
You can think about smart contracts as mission-critical software, or software for embedded devices rather than a web application.

To minimize the exposure of your smart contract to possible attacks consider the following.

- Determine the “bare minimum” that should be on-chain: use smart contracts only for the part that requires decentralization.
- Keep your contracts simple and minimalistic: stick to strictly necessary functionality only.
  The more complexity you have in your contract, the larger the attack surface.
- Be ready if things go wrong after deployment:

  - provide “pause” functionality (see more in the :ref:`best-practices-code-structure` section of this document);
  - implement additional approvals/wait periods for dangerous operations;
  - make your contract :ref:`upgradable <contract-instance-upgradeability>`;
  - have a clear plan for how to fix bugs found after deployment.

- Extensively review, test and apply automated analysis/verification tools. Use different methods to ensure the correctness of your code.
  Do not trust one particular method or tool; make sure that many people have looked at the code and interacted with the smart contract.


.. _best-practices-specification:

Specification
=============

A smart contract specification reflects developers' intentions regarding the smart contract functionality.
It can serve as a guide for the implementation as well as for testing, verifying, and auditing the code.
Start with an outline of the functionality and gradually refine it into specifications of contract entrypoints.

For the entrypoints, consider the following:

- What is the interface (entrypoints and their parameters)? For example, ``transfer`` takes three parameters: ``from``, ``to`` addresses, and ``amount``.
- Who can access the entrypoints? For example, the transaction sender must be an operator of the ``from`` account.
- Which properties of these entrypoints should be satisfied? For example, a successful call of ``transfer(from, to, amount)`` decreases the ``from`` balance and increases the ``to`` balance by ``amount``.

If the logic of your application requires complex flows that include several contract calls, or features several interacting smart contracts, use diagrams with descriptions to document these.

The specification is not static; it can be refined once you start developing your application.
Work in iterations, refining the specification when new requirements are discovered or old requirements change.

An informal specification can be refined, turned into a formal one, and used as input to automated testing and verification tools.

The absence of specifications complicates the quality assurance of smart contracts.
For example, it makes the auditing process less efficient and more expensive, because the specification has to be recovered from the source code before starting the audit process.


Concordium Rust Smart Contracts
===============================

This section provides recommendations for developing smart contracts in Rust.
See :ref:`Introduction to smart contracts<introduction>` for basic information.

.. _best-practices-code-structure:

Recommended structure
---------------------

- Use ``cargo concordium init`` with an appropriate template to start a new project.
- For non-trivial contracts, build the contract logic as the state struct implementation.

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
    fn contract_do_something(
        ctx: &ReceiveContext,
        host: &mut Host<State>,
    ) -> ReceiveResult<()> {
        // Parse parameters
        let param: MyParameter = ctx.parameter_cursor().get()?;
        ...
        // Perform authorization, potentially using `ctx` info
        ensure!(sender.matches_account(&owner));
        ...
        host.state_mut().do_something(param);
        ...
    }

- Fail early: validate input/perform authorization as early as possible in an entrypoint.
  Returning earlier will save energy and make the call cheaper.
  Use the ``ensure!()`` macro to validate and return an error.
- Provide the pause functionality: add a boolean flag to the state controlling whether the contract is active.
  The contract owner or admin can control the flag.
  See a code snippet from the `wCCD contract example <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-wccd/src/lib.rs>`_ below.

  .. code-block:: rust

    struct State {
      // The admin address pause and unpause the contract
      admin:  Address,
      // Contract is paused if `paused = true` and unpaused if `paused = false`.
      paused: bool,
      ...
    }

    fn contract_receive(
      ctx: &ReceiveContext,
      host: &mut Host<State>,
    ) -> ContractResult<()> {
      // Check that contract is not paused.
      ensure!(!host.state().paused, ContractError::Custom(CustomContractError::ContractPaused));
      // Continue execution
      ...
    }

    ...

    fn contract_set_paused(
      ctx: &ReceiveContext,
      host: &mut Host<State>,
    ) -> ContractResult<()> {
      // Check that only the admin is authorized to pause/unpause the contract.
      ensure_eq!(ctx.sender(), host.state().admin, ContractError::Unauthorized);

      // Parse the parameter.
      let params: SetPausedParams = ctx.parameter_cursor().get()?;

      // Update the paused variable.
      host.state_mut().paused = params.paused;

      Ok(())
    }

.. _best-practices-dos:

Denial-of-service
-----------------

This section presents situations when a smart contract ends up in a blocked state making it unusable permanently or for some period of time.

.. _best-practices-external-call-failure:

External call failure
^^^^^^^^^^^^^^^^^^^^^

Sending funds back to an unknown contract address as part of some complex operation could block this operation from succeeding.
The contract you call might fail for various reasons.
If the contract call fails, the whole operation also fails.

Consider splitting withdrawal of funds from the rest of the contract logic.
You could create a separate entrypoint allowing users, which could be smart contracts, to request funds back.
This pattern is called *Pull over Push*, where *Pull* corresponds to the user explicitly requesting funds and *Push* to sending the funds back as part of some other operation.

Note that this pattern is not always necessary.
In the `auction contract <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/auction/src/lib.rs>`_ example it is safe to refund the previous bidder as part of the bidding functionality, because on Concordium transferring to accounts is guaranteed not to execute any code.
However, if you want smart contract addresses to participate in the auction, it could lead to blocking if the receiving contract fails.
In this case, consider using the *Pull over Push* pattern.

Operations with unknown bound
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Interacting over data structures that store data updated by users can become expensive over time, once it has more and more entries.

Consider the following map for storing all user bids in an auction contract:

.. code-block:: rust

  pub struct State<S = StateApi> {
    bids: StateMap<Address, Amount, S>
  }

Computing the maximum for each new bid requires iterating over the map.
As the number of participants grows it becomes more expensive to compute the highest bid.
Eventually, it might not fit into the block energy limit and bidding becomes blocked.
See :ref:`contract-instance-operations` for more information.

This situation is not necessarily an attack, it could occur naturally during the contract lifetime.
In general, all computations requiring iteration with no clear bound could be an issue.
For the auction, consider adding ``highest_bid: Amount`` to the state.
Update ``highest_bid`` once a new bidder proposes a higher bid.

.. note::

  Keep only relevant data in the contract state.
  For example, if you are interested in historical data for all the bids, but your contract logic requires only the highest bid to make a decision, consider :ref:`logging events <contract-instances-logging-events>` instead.
  An off-chain part of your dApp can then use logs to obtain the historical data.

.. _best-practices-external-calls:

External Calls
--------------

Treat every external call as a potential security risk.
Calling another contract gives control to potentially malicious code that could make arbitrary calls to any other contract, including your own contract.
Calls to your contract might change its state through entrypoints that permit updating the state; see the :ref:`best-practices-reentrancy` section of this document.
Moreover, you should not make any assumptions about energy consumption, or expect that the execution succeeds.
Your contract should be able to correctly handle situations when the call to an external contract fails.

General recommendations
^^^^^^^^^^^^^^^^^^^^^^^

- *Avoid complex interactions*.
  Avoid splitting the on-chain part of your dApp into several smart contracts unless it is strictly necessary.
  For example, instead of using the *proxy pattern for upgradability*, use :ref:`natively upgradable contracts <contract-instance-upgradeability>`.
  Using the proxy makes the implementation more complex by introducing contract interactions.
  Proxies can be useful for other purposes, but for upgradability, it is recommended to use  :ref:`natively upgradable contracts <contract-instance-upgradeability>`.

  .. note::

    A simple *proxy pattern* splits your contract into the proxy contract that serves as a relayer and main contract that contains the actual implementation of the functionality.
    The address of the main contract can be updated in the state of the proxy contract, making the whole setup upgradable. (See `here <https://docs.openzeppelin.com/contracts/4.x/api/proxy>`_ for more information).

- *Think about the contract state*.
  Do not assume that the contract state stays the same after an external call.
  See the :ref:`best-practices-reentrancy` section of this document for details.
- *Protect from denial-of-service (DoS) attacks*.
  Calls to an *unknown*, e.g. user-provided, contract address can fail unpredictably.
  When this call is part of some complex operation, the whole operation will fail as well.
  In some cases, this results in blocking the functionality of your contract for all users.
  Read more in the :ref:`best-practices-external-call-failure` section of this document.

.. _best-practices-reentrancy:

Reentrancy
^^^^^^^^^^

The *reentrant behavior* is not specific to smart contracts: it is a well known issue in the context of concurrency.
A procedure can be interrupted in the middle of its execution, run again in *another* execution context, and then continue execution from the interruption point.
In case of smart contracts, each call to external smart contracts interrupts the execution and hands over control to unknown code.
Do not treat external contract invocations as regular method calls.
Instead, think of them as sending a message and temporarily pausing execution of your contract.
The receiving side has full control of what to do next and can choose to call your contract again while it is still in the "paused" state waiting for the external call to be completed.
Once the external call is completed, the contract state and balance might be different from those before the call.
See an :ref:`example <reentracny-unit-testing>` based on `the DAO <https://en.wikipedia.org/wiki/The_DAO_(organization)>`_ Ethereum smart contract vulnerability of how reentrancy can be discovered using unit testing.

- Avoid changing the state after an external call: use the *Checks-Effects-Interactions* pattern: validate data, update the contract state, make external calls.
- If you need to perform some state changes after an external call use `invoke_contract_read_only <https://docs.rs/concordium-std/latest/concordium_std/struct.ExternHost.html#method.invoke_contract_read_only>`_.
  If the read-only invocation succeeds, it ensures that the state has not been changed after returning from the external call.
  Using ``invoke_contract_read_only`` covers most of the cases that require protecting the contract state from updating due to reentrancy.
- Alternatively, consider using a *mutex*: a boolean flag that is set before making an external call, preventing all entrypoints from reentrancy. Reset after the call is complete.

  .. code-block:: rust

    pub struct State {
      ...
      lock : bool,
    }

    fn entrypoint_with_mutex(
      ctx: &ReceiveContext,
      host: &mut Host<State>,
    ) -> Result<(), Error> {
      ensure!(!host.state().lock, Error::Locked);
      host.state_mut().lock = true;
      ...
      host.invoke_contract(...);
      ...
      host.state_mut().lock = false;
    }
  .. warning::

    Using a mutex complicates the contract logic.
    First, think about using simpler solutions, like the *Checks-Effects-Interactions* pattern, or ``invoke_contract_read_only``.
    Think carefully which entrypoints you want to protect and make sure that the contract will not end up locked forever.

.. _best-practices-code-documentation:

Code documentation
------------------

- Write an outline of the smart contract functionality in the beginning of the file; if the contract implements some standards, mention it.
- Document decisions/choices in the code.
- Document entrypoints:

  - What functionality does the entrypoint implement?
  - Who has access rights to call the entrypoint?
  - When is the call rejected?
  - What events are logged and when?

- Document tests:

  - What scenario/property is being tested?
  - What are the assumptions: input data is assumed to be valid, users have enough rights, etc.

.. _best-practices-code-automated-testing:

Automated testing
-----------------

The Concordium standard library `concordium-std`_ offers several possibilities for testing the smart contract code.

- Use :ref:`Integration testing <integration-test-contract>` to test particular cases where you define what is the valid output.
- (**Deprecated**) Use :ref:`Unit testing <unit-test-contract>` to test particular cases where you define what is the valid output.
- (**Deprecated**) :ref:`Property-based testing <writing_property_based_tests>` is a variant of randomized testing that repeatedly checks a *property* with randomly generated input.

Use the :ref:`smart contract specification <best-practices-specification>` guidelines from this document to come up with cases and properties to test.

Checklist
---------

Make sure that:

- you have a smart contract specification;
- your code follows the :ref:`recommended structure <best-practices-code-structure>` described in this document;
- you looked carefully for all *known* sources of issues, e.g. :ref:`external calls <best-practices-external-calls>`, arithmetic overflows, etc.
- you have a *disaster recovery plan*: the pause functionality, upgradability, etc.
- you used formatting and linting tools (see the `Contributing section <https://github.com/Concordium/concordium-rust-smart-contracts#contributing>`_);
- you :ref:`documented your code properly <best-practices-code-documentation>`;
- you tested your code according to the specification, using both :ref:`automated <best-practices-code-automated-testing>` and manual testing;
- your code was reviewed externally.

.. _concordium-std: https://docs.rs/concordium-std/latest/concordium_std/
