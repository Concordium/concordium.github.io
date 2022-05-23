.. _custom discriminant values: https://doc.rust-lang.org/reference/items/enumerations.html#custom-discriminant-values-for-fieldless-enumerations
.. _custom-errors-v0:

====================
Return custom errors
====================

This guide shows how to return custom errors from your Rust smart contract.

Defining and deriving
=====================

Custom error codes help communicate why a contract rejects and can be returned
both during initialization and during updates.

On-chain, smart contracts return a numeric error code when rejecting. This is
also the case when using a custom error type. Therefore, a mapping from the
custom error type to ``Reject``, in the form of an implementation of
``From<MyError> for Reject``, is needed. We can also derive it
automatically using ``#[derive(Reject)]``::

   #[derive(Reject)]
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

   Deriving ``Reject`` is only possible for fieldless enums, i.e., enums where
   the variants do not have associated data. Additionally, derivation for enums
   with `custom discriminant values`_ is not supported either.

Using custom errors
===================

Return custom errors, as you would with any other error type:

.. code-block:: rust

   #[init(contract = "my_contract")]
   fn contract_init_my(
       _ctx: &impl HasInitContext<()>,
   ) -> Result<State, MyError> { Err(MyError::ErrOne) }

   #[receive(contract = "my_contract", name = "my_receive")]
   fn contract_receive_my<A: HasActions>(
       _ctx: &impl HasReceiveContext<()>,
       _state: &mut State,
   ) -> Result<A, MyError> { Err(MyError::ErrTwo) }
