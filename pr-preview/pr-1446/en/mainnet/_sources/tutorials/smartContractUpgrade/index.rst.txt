.. include:: ../../variables.rst
.. _intro-smart-contract-upgrade:

.. image:: smartContractUpgrade.png
   :width: 80%
   :align: center
   :alt: A smart contract upgrade mechanism

=======================================
Upgrading smart contracts on Concordium
=======================================

In this tutorial, you are going to get familiar with how to upgrade a smart contract natively. You will explore how to
migrate the smart contract state from your old contract to the upgraded contract.

An important desired feature of blockchains is that smart contracts, once deployed, are immutable by default.
History has shown that development teams are looking for mutable smart contract options as well if they want to have
the capabilities to fix bugs, or to have the option to add additional
features to their smart contract protocol in the future.
Other blockchain require complex ``proxy-implementation`` patterns to achieve upgradability on the by default immutable smart contracts.
Concordium makes this process easier by exposing an upgrade mechanism to natively upgrade the smart contract.
Upgradability is an opt-in on Concordium, meaning you can continue to write immutable contracts on Concordium if you prefer to do so.

.. note::

   If you want to ensure a smart contract is truly immutable, you need to do your own research
   and study its logic. This includes evaluating if a ``proxy-implementation`` pattern exists or if native upgradability is implemented in the smart contract code.

.. note::

   If you are unfamiliar with the native upgradability mechanism on Concordium, you can read the :ref:`upgrade guide<guide-upgradable-contract>`.


.. toctree::
   :hidden:
   :maxdepth: 1

   Native upgradability <./smartContractUpgrade.rst>

