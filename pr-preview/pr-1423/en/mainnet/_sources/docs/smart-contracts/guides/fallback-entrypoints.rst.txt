.. _fallback-entrypoints:

====================
Fallback entrypoints
====================

This guide explains how to use fallback entrypoints, which can be useful
when creating a proxy for your smart contract.

Preparation
===========

Make sure you have the Rust source code for a smart contract module you wish to
add a fallback entrypoint to.
You also need to have the following installed:

- Rust
- Cargo
- The ``wasm32-unknown-unknown`` compiling target
- ``cargo-concordium``

.. seealso::

   For instructions on how to install the developer tools, see
   :ref:`setup-env`.

What are fallback entrypoints
=============================

A fallback entrypoint is a special kind of entrypoint for a contract.
If defined for a given contract, it acts as a catchall for handling invocations
of entrypoints that do not exist in the contract.

Consider the contract ``A``, which has two entrypoints, ``foo`` and a fallback
entrypoint.
If you invoke ``foo`` on ``A``, ``foo`` is simply invoked.
But if you invoke *any other* entrypoint, for example ``bar``, then the fallback
entrypoint is invoked.
The fallback entrypoint will then have access to the parameter, amount, and,
notably, the name of the entrypoint you attempted to invoke (``bar``).

Note, that if ``A`` did *not* have a fallback entrypoint defined, invoking
``bar`` would result in a missing entrypoint error.

Using fallback entrypoints
==========================

You can create fallback entrypoints by making a new entrypoint and adding
the ``fallback`` attribute to it:

.. code-block:: rust
   :emphasize-lines: 1

   #[receive(contract = "MyContract", fallback)]
   fn receive_fallback(
       ctx: &ReceiveContext,
       host: &Host<State>,
   ) -> ReceiveResult<MyReturnType> {
       // ...
   }

.. note::

   For fallback entrypoints, you don't (and cannot) use the ``name`` attribute.
   This is because a fallback entrypoints always have the empty string as the
   name and that is, in fact, how the node recognizes it as a fallback entrypoint.

   Also note that there can only ever be *one* fallback entrypoint per contract.

The ``named_entrypoint`` method on ``HasReceiveContext`` allows you to get the
name of the entrypoint used to the reach the fallback entrypoint.

.. code-block:: rust
   :emphasize-lines: 6

   #[receive(contract = "MyContract", fallback)]
   fn receive_fallback(
       ctx: &ReceiveContext,
       host: &Host<State>,
   ) -> ReceiveResult<MyReturnType> {
       let entrypoint_invoked = ctx.named_entrypoint();
   }

In the example from the previous section, ``named_entrypoint`` would return the
entrypoint ``"bar"``.

.. note::

   The ``named_entrypoint`` method is available in all receive methods, but it
   is only useful in fallback receive methods. In regular receive methods, it
   just returns the entrypoint name specified with the ``name`` attribute.

.. seealso::

   With fallback entrypoints, it is possible to create a **proxy** contract,
   which can act as the public contract address for your (proxied) smart contract. This
   allows you to upgrade the proxied contract, for example to fix bugs.
   An example proxy contract can be seen `here <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/proxy/src/lib.rs>`_.
