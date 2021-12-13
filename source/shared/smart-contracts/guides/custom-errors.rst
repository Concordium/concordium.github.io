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

Standard error codes
====================

The following standard error codes exist:

=========================================== ===========================
Variant                                     Error code
=========================================== ===========================
()	                                         i32::MIN + 1 (-2147483647)
ParseError	                                i32::MIN + 2 (-2147483646)
LogError::Full	                             i32::MIN + 3 (-2147483645)
LogError::Malformed	                       i32::MIN + 4 (-2147483644)
NewContractNameError:://! MissingInitPrefix i32::MIN + 5 (-2147483643)
NewContractNameError::TooLong	              i32::MIN + 6 (-2147483642)
NewContractNameError::ContainsDot	        i32::MIN + 9 (-2147483639)
NewContractNameError::InvalidCharacters     i32::MIN + 10 (-2147483638)
NewReceiveNameError::MissingDotSeparator	  i32::MIN + 7 (-2147483641)
NewReceiveNameError::TooLong	              i32::MIN + 8 (-2147483640)
NewReceiveNameError::InvalidCharacters	     i32::MIN + 11 (-2147483637)
NotPayableError                             i32::MIN + 12 (-2147483636)
=========================================== ===========================
