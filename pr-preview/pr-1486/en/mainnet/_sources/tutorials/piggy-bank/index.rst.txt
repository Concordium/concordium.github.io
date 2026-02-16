.. _Rust: https://www.rust-lang.org/

.. image:: piggy-bank.svg
   :width: 33%
   :align: center
   :alt: A Concordium piggy bank

.. _piggy-bank:

=============================
The piggy bank smart contract
=============================

.. todo::

   Link the repo with the code

In this tutorial, you are going to build a simple smart contract modelling a
piggy bank.
It should allow any account to insert CCD and only the owner to smash it,
taking all of the CCD inside.

In the :ref:`first part<piggy-bank-writing>`, you will learn how to write the very basic piggy bank smart
contract using the Rust_ programming language.

The :ref:`second part<piggy-bank-testing>` is about how to test your piggy bank smart contract with integration tests.

The :ref:`third part<piggy-bank-deploying>` is about how to deploy your piggy bank smart contract to the Concordium testnet and interact with it.

Finally, the :ref:`fourth part<piggy-bank-frontend>` explains how to set up a web-based frontend for interacting with the piggy bank smart contract.

.. warning::

   The reader is assumed to have basic knowledge of what a blockchain and smart
   contracts are, and to have some experience with Rust_. Consider reading the
   simpler :ref:`Counter smart contract tutorial <counter-sc>` first.

Before starting the tutorial, make sure that you have all of the necessary tools installed and running as described in :ref:`Setup the development environment<setup-env>`.

To start the tutorial click :ref:`here<piggy-bank-writing>`.

.. toctree::
   :hidden:
   :maxdepth: 1

   writing
   testing
   deploying
   frontend
