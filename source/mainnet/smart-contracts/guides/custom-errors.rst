.. _custom discriminant values: https://doc.rust-lang.org/reference/items/enumerations.html#custom-discriminant-values-for-fieldless-enumerations
.. _custom-errors:

====================
Return custom errors
====================

This guide shows how to return custom errors from your Rust smart contract.

Defining and deriving
=====================

Custom error codes help communicate why a contract rejects and can be returned
both during initialization and during updates.

On-chain, smart contracts return a numeric error code and an optional serialized
return value when rejecting. This is also the case when using a custom error type.
Therefore, a mapping from the custom error type to ``Reject``, in the
form of an implementation of ``From<MyError> for Reject``, is needed.
You can derive the implementation automatically with ``#[derive(Reject)]``, if
the type also implements ``Serial`` (also derivable). The ``Serial`` instance is
needed, because the whole data type is serialized and included as the optional
return value.
Here is a typical example::

   #[derive(Serial, Reject)]
   enum MyError {
       ErrOne,
       ErrTwo,
   }

.. note::

   The valid range of error codes is ``i32::MIN..-1``. When deriving
   ``Reject``, each variant is assigned an error code as determined by the
   ordering. First variant (``ErrOne`` in example) gets ``-1``, second variant
   (``ErrTwo`` in example) gets ``-2``, and so on.

.. warning::

   Deriving ``Reject`` for enums with `custom discriminant values`_ is not supported.

Using custom errors
===================

Return custom errors, as you would with any other error type:

.. code-block:: rust

   #[init(contract = "my_contract")]
   fn contract_init_my<S: HasStateApi>(
       _ctx: &impl HasInitContext,
       _state_builder: &mut StateBuilder<S>,
   ) -> Result<State, MyError> { Err(MyError::ErrOne) }

   #[receive(contract = "my_contract", name = "my_receive")]
   fn contract_receive_my<S: HasStateApi>(
       _ctx: &impl HasReceiveContext,
       _host: &impl HasHost<State, StateApiType = S>
   ) -> Result<MyReturnValue, MyError> { Err(MyError::ErrTwo) }

.. note::

   Adding  :ref:`schemas<build-schema>` to your errors makes them more useful in
   ``concordium-client`` and ``cargo-concordium``.
