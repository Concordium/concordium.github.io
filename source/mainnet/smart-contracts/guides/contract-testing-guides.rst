.. _contract-testing-guides:

===========================
Contract testing guides
===========================

The contract testing guides help you get started testing smart contracts. Here you have guides to help you set up and write integrations tests.

.. toctree::
   :maxdepth: 1
   :hidden:

   integration-test-contract

.. note::

   Unit testing your contracts with the |test_infrastructure|_ has been deprecated in favour of |concordium-smart-contract-testing|_.
   To migrate your contracts and tests see :ref:`migrate-contracts-for-std-9`.
   You can read the :ref:`old documentation for unit testing here <unit-test-contract>` if you are not ready to migrate your contracts.

.. |test_infrastructure| replace:: ``test_infrastructure``
.. _test_infrastructure: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure
.. _concordium-smart-contract-testing: https://docs.rs/concordium-std-derive/latest/concordium_smart-contract-testing
.. |concordium-smart-contract-testing| replace:: ``concordium-smart-contract-testing``
