.. _counter-sc-index:

=================================
Concordium counter smart contract
=================================

This tutorial guides you through creating a smart contract using the Concordium a default contract template that simply keeps a counter value in its state. It is a super simple, fundamental example contract that touches on the following points: to be able to increase/decrease the counter value by the parameter given by the user if it is a positive number, view the current value, return a custom error when someone tries to increase it with a negative value (or vice versa), and all these operations have to be done by only the owner of the contract.

.. toctree::
   :hidden:
   :maxdepth: 1

   setup-env
   counter-contract
