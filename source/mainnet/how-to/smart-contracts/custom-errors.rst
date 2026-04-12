.. _custom discriminant values: https://doc.rust-lang.org/reference/items/enumerations.html#custom-discriminant-values-for-fieldless-enumerations
.. _custom-errors:

=============
Custom errors
=============

This guide shows how to return custom errors from your Rust smart contract.

Defining and deriving
=====================

Custom error codes help communicate why a contract rejects and can be returned
both during initialization and during updates.

On-chain, smart contracts return `a numeric error code and an optional serialized
return value when rejecting <https://docs.rs/concordium-std/latest/concordium_std/#signalling-errors>`__. This is also the case when using a custom error type.
Therefore, a mapping from the custom error type to ``Reject``, in the
form of an implementation of ``From<MyError> for Reject``, is needed.
You can derive the implementation automatically with `#[derive(Reject)] <https://docs.rs/concordium-std/latest/concordium_std/derive.Reject.html>`__ if
the type also implements ``Serial`` (also derivable). The ``Serial`` instance is
needed because the whole data type is serialized and included as the optional
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
   fn contract_init_my(
       _ctx: &InitContext,
       _state_builder: &mut StateBuilder,
   ) -> Result<State, MyError> { Err(MyError::ErrOne) }

   #[receive(contract = "my_contract", name = "my_receive")]
   fn contract_receive_my(
       _ctx: &ReceiveContext,
       _host: &Host<State>
   ) -> Result<MyReturnValue, MyError> { Err(MyError::ErrTwo) }

.. note::

   Adding  :ref:`schemas<build-schema>` to your errors makes them more useful in
   ``concordium-client`` and ``cargo-concordium``.

Standard error codes
====================

The following standard error codes exist:

=========================================== ===========================
Variant                                     Error code
=========================================== ===========================
()                                          i32::MIN + 1 (-2147483647)
ParseError                                  i32::MIN + 2 (-2147483646)
LogError::Full                              i32::MIN + 3 (-2147483645)
LogError::Malformed                         i32::MIN + 4 (-2147483644)
NewContractNameError::MissingInitPrefix     i32::MIN + 5 (-2147483643)
NewContractNameError::TooLong               i32::MIN + 6 (-2147483642)
NewContractNameError::ContainsDot           i32::MIN + 9 (-2147483639)
NewContractNameError::InvalidCharacters     i32::MIN + 10 (-2147483638)
NewReceiveNameError::MissingDotSeparator    i32::MIN + 7 (-2147483641)
NewReceiveNameError::TooLong                i32::MIN + 8 (-2147483640)
NewReceiveNameError::InvalidCharacters      i32::MIN + 11 (-2147483637)
NotPayableError                             i32::MIN + 12 (-2147483636)
TransferError::AmountTooLarge               i32::MIN + 13 (-2147483635)
TransferError::MissingAccount               i32::MIN + 14 (-2147483634)
CallContractError::AmountTooLarge           i32::MIN + 15 (-2147483633)
CallContractError::MissingAccount           i32::MIN + 16 (-2147483632)
CallContractError::MissingContract          i32::MIN + 17 (-2147483631)
CallContractError::MissingEntrypoint        i32::MIN + 18 (-2147483630)
CallContractError::MessageFailed            i32::MIN + 19 (-2147483629)
CallContractError::LogicReject              i32::MIN + 20 (-2147483628)
CallContractError::Trap                     i32::MIN + 21 (-2147483627)
UpgradeError::MissingModule                 i32::MIN + 22 (-2147483626)
UpgradeError::MissingContract               i32::MIN + 23 (-2147483625)
UpgradeError::UnsupportedModuleVersion      i32::MIN + 24 (-2147483624)
QueryAccountBalanceError                    i32::MIN + 25 (-2147483623)
QueryContractBalanceError                   i32::MIN + 26 (-2147483622)
=========================================== ===========================

The error codes are also listed in `the library documentation on docs.rs <https://docs.rs/concordium-std/latest/concordium_std/#signalling-errors>`_.
