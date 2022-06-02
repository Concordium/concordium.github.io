.. _Rust: https://www.rust-lang.org/
.. _concordium-std: https://docs.rs/concordium-std/latest/concordium_std/index.html
.. |concordium-std| replace:: ``concordium-std``
.. _test_infrastructure: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure/index.html
.. |test_infrastructure| replace:: ``test_infrastructure``
.. _init: https://docs.rs/concordium-std/latest/concordium_std/attr.init.html
.. |init| replace:: ``#[init]``
.. _receive: https://docs.rs/concordium-std/latest/concordium_std/attr.receive.html
.. |receive| replace:: ``#[receive]``
.. _TestInitContext: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure/type.TestInitContext.html
.. |TestInitContext| replace:: ``TestInitContext``
.. _TestReceiveContext: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure/type.TestReceiveContext.html
.. |TestReceiveContext| replace:: ``TestReceiveContext``
.. _TestHost: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure/struct.TestHost.html
.. |TestHost| replace:: ``TestHost``
.. _TestStateBuilder: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure/type.TestStateBuilder.html
.. |TestStateBuilder| replace:: ``TestStateBuilder``
.. _HasInitContext: https://docs.rs/concordium-std/latest/concordium_std/trait.HasInitContext.html
.. |HasInitContext| replace:: ``HasInitContext``
.. _HasStateApi: https://docs.rs/concordium-std/latest/concordium_std/trait.HasStateApi.html
.. |HasStateApi| replace:: ``HasStateApi``
.. _AccountAddress: https://docs.rs/concordium-std/latest/concordium_std/struct.AccountAddress.html
.. |AccountAddress| replace:: ``AccountAddress``
.. _set_owner: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure/type.TestReceiveContext.html#method.set_owner
.. |set_owner| replace:: ``set_owner``
.. _Address: https://docs.rs/concordium-std/latest/concordium_std/enum.Address.html
.. |Address| replace:: ``Address``
.. _set_sender: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure/type.TestReceiveContext.html#method.set_sender
.. |set_sender| replace:: ``set_sender``
.. _set_self_balance: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure/struct.TestHost.html#method.set_self_balance
.. |set_self_balance| replace:: ``set_self_balance``
.. _invoke_transfer: https://docs.rs/concordium-std/latest/concordium_std/trait.HasHost.html#tymethod.invoke_transfer
.. |invoke_transfer| replace:: ``invoke_transfer``
.. _get_transfers: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure/struct.TestHost.html#method.get_transfers
.. |get_transfers| replace:: ``get_transfers``
.. _concordium_cfg_test: https://docs.rs/concordium-std/latest/concordium_std/attr.concordium_cfg_test.html
.. |concordium_cfg_test| replace:: ``#[concordium_cfg_test]``
.. _concordium_test: https://docs.rs/concordium-std/latest/concordium_std/attr.concordium_test.html
.. |concordium_test| replace:: ``#[concordium_test]``
.. _fail: https://docs.rs/concordium-std/latest/concordium_std/macro.fail.html
.. |fail| replace:: ``fail!``
.. _expect_report: https://docs.rs/concordium-std/latest/concordium_std/trait.ExpectReport.html#tymethod.expect_report
.. |expect_report| replace:: ``expect_report``
.. _expect_err_report: https://docs.rs/concordium-std/latest/concordium_std/trait.ExpectErrReport.html#tymethod.expect_err_report
.. |expect_err_report| replace:: ``expect_err_report``
.. _claim: https://docs.rs/concordium-std/latest/concordium_std/macro.claim.html
.. |claim| replace:: ``claim!``
.. _claim_eq: https://docs.rs/concordium-std/latest/concordium_std/macro.claim_eq.html
.. |claim_eq| replace:: ``claim_eq!``
.. _ensure: https://docs.rs/concordium-std/latest/concordium_std/macro.ensure.html
.. |ensure| replace:: ``ensure!``
.. _mutable: https://docs.rs/concordium-std-derive/latest/concordium_std_derive/attr.receive.html#mutable-function-can-mutate-the-state
.. |mutable| replace:: ``mutable``

.. _piggy-bank-deploying:

=======================================
Deploying the piggy bank smart contract
=======================================

This is the fourth :ref:`part of a tutorial<piggy-bank>` on smart contract
development.
So far you have written and tested a piggy bank smart contract in the Rust_ programming
language and setup your testnet node on a server.
This part will focus on how you can deploy your developed
piggy bank smart contract to the testnet node and interact with it.

.. warning::

   The reader is assumed to have basic knowledge of what a blockchain and smart
   contract is, and some experience with Rust_.


Preparation
===========
