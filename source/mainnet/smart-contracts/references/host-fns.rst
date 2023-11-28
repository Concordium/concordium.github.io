.. _host-functions:

=======================
Contract host functions
=======================
This is a reference of the functions in the ``concordium`` module supplied by a
host running smart contract Wasm module.

.. warning::

   These functions are not meant to be called directly by smart contract writers.
   Instead, they are to be used behind a more idiomatic, language-specific API
   supplied by a library, such as `concordium-std`_ for Rust.

.. module:: concordium

.. _host-functions-log:

Logging events
==============

.. function:: log_event(start, length) -> i32

   Adds a log item from an array of bytes.
   If not enough data can be read then this function will trap and abort
   execution of the smart contract.

   :param i32 start: Pointer to the start of the item in Wasm linear memory.
   :param i32 length: Number of bytes in the item.

   :return: ``-1`` if logging failed because the message was too long.
            ``0`` if the log is already full.
            ``1`` if the data was successfully logged.
   :rtype: i32

Function parameter
==================

.. function:: get_parameter_size(i) -> i32

   Get the byte size of the ``i``-th parameter to the call. The 0-th parameter is
   always the original parameter that the method was invoked with. Invoking
   other contracts with ``invoke`` adds additional parameters to the stack.

   :param i32 i: Index of the parameter.
   :return: Byte size of the ``i``-th parameter or ``-1`` if the parameter
            doesn't exist.
   :rtype: i32

.. function:: get_parameter_section(i, location, length, offset) -> i32

   Read a section of the ``i``-th parameter to the given location in Wasm linear memory.
   Return the number of bytes read.
   The location is assumed to contain enough memory to write the requested
   length into. If not, the function will trap and abort execution of
   the contract.

   :param i32 i: Index of the parameter.
   :param i32 location: Pointer to the write location in Wasm linear memory.
   :param i32 length: Number of bytes to read from the parameter.
   :param i32 offset: Starting offset in the parameter bytes.
   :return: The number of actual bytes read. This is always less than or equal
            to ``length``. It is less if the parameter does not have
            enough bytes available (i.e., if ``offset + length >
            parameter_size``). Returns ``-1`` if the parameter does not exist.
   :rtype: i32

.. _host-functions-state:

Smart contract instance state
=============================

.. function:: state_create_entry(key_start, key_length) -> i64

    Create an empty entry with the given key.
    If an entry at that key already exists it is set to the empty entry.

    :param i32 key_start: Pointer to a key, represented as a bytearray in the Wasm
                          memory.
    :param i32 key_length: The length of the key.
    :return: The return value is either ``2^64 - 1`` if creating the entry failed
             because of an iterator lock on the part of the tree, or else the
             first bit is ``0``, and the remaining bits are an *entry
             identifier* that maybe used in subsequent state-related calls.
    :rtype: i64

.. function:: state_lookup_entry(key_start, key_length) -> i64

    Lookup an entry with the given key.

    :param i32 key_start: Pointer to key, represented as a bytearray in the Wasm
                          memory.
    :param i32 key_length: The length of the key.
    :return: The return value is either ``2^64 - 1`` if creating the entry failed
             because of an iterator lock on the part of the tree, or else the
             first bit is ``0`` and the remaining bits are an *entry
             identifier* that maybe used in any of the entry calls.
    :rtype: i64

.. function:: state_delete_entry(key_start, key_length) -> i32

    Delete the entry.

    :param i32 key_start: Pointer to a key, represented as a byte array in the Wasm
                          memory.
    :param i32 key_length: The length of the key.
    :return: Returns ``0`` if the part of the tree this entry was in is *locked*
             by an iterator (see the |state_iterate_prefix|_ for details) and
             the deletion thus failed.
             Returns ``1`` if the entry didn't exist. Return ``2`` if the entry
             was successfully deleted.
    :rtype: i32

.. function:: state_delete_prefix(key_start, key_length) -> i32

    Delete a prefix in the tree, that is, delete all parts of the tree that have
    the given key as a prefix.

    :param i32 key_start: Pointer to a key, represented as a byte array in the Wasm
                          memory.
    :param i32 key_length: The length of the key.
    :return: Returns ``0`` if the tree is *locked*
             by an iterator (see the |state_iterate_prefix|_ for details) and
             the deletion thus failed.
             Returns ``1`` if the tree *was not locked*, but the key points to
             an empty part of the tree.
             Returns ``2`` if a part of the tree was successfully deleted.
    :rtype: i32

.. function:: state_iterate_prefix(prefix_start, prefix_length) -> i64

    Construct an iterator over a part of the tree. This **locks the part of
    the tree that has the given prefix**. Locking means that no
    deletions or insertions of entries may occur in that subtree.

    :param i32 key_start: Pointer to a prefix, represented as a byte array in the Wasm
                          memory.
    :param i32 key_length: The length of the prefix.
    :return: Returns all 1 bits if too many iterators already exist with this key.
             Returns all but second bit set to 1 if there is no value in the
             state with given prefix.
             Otherwise, the first bit is 0, and the remaining bits are the
             *iterator identifier* that may be used in subsequent calls to
             advance it, or to get its key.
    :rtype: i64

.. function:: state_iterator_next(iterator) -> i64

   Return the next entry along the iterator, and advance the iterator.

   :param i64 iterator: An iterator identifier, as returned by |state_iterate_prefix|_.
   :return: Returns all 1 bits if the iterator does not exist (it was deleted,
            or the identifier was invalid).
            Returns all but the second bit set to 1 if no more entries are left,
            i.e., the iterator is exhausted. All further calls will yield the
            same value until the iterator is deleted.
            Otherwise, the first bit is 0, and the remaining bits encode an
            *entry identifier* that may be with any of the entry methods.
   :rtype: i64

.. function:: state_iterator_delete(iterator) -> i32

   Delete the iterator, unlocking the subtree.

   :param i64 iterator: An iterator identifier, as returned by |state_iterate_prefix|_.
   :return: Returns ``2^64 - 1`` if the iterator does not exist. Returns ``0`` if the
            iterator was already deleted. Returns ``1`` if the iterator was
            successfully deleted.
   :rtype: i32

.. function:: state_iterator_key_size(iterator) -> i32

   Get the length of the key that the iterator is currently pointing at.

   :param i64 iterator: An iterator identifier, as returned by |state_iterate_prefix|_.
   :return: ``2^64 - 1`` if the iterator does not exist. Otherwise, it returns the
            length of the key in bytes.
   :rtype: i32

.. function:: state_iterator_key_read(iterator, start, length, offset) -> i32

   Read a section of the key the iterator is currently pointing at.
   Before the first call to the |state_iterator_next|_ function this returns
   (sections of) the key that was used to create the iterator. After
   the iterator is exhausted, this method returns (sections of) the key at the
   first node returned by the iterator.

   :param i64 iterator: An iterator identifier, as returned by |state_iterate_prefix|_.
   :param i32 start: A pointer to a location in the Wasm memory where the key
                     section be written to.
   :param i32 length: Number of bytes to read from the key.
   :param i32 offset: Starting offset in the key bytes.
   :return: ``2^64 - 1`` if the iterator does not exist. Otherwise, it returns the
            length of the key in bytes.
   :rtype: i32

.. function:: state_entry_size(entry) -> i32

   Get the byte size of the entry.

   :param entry i64: Entry identifier.
   :return: Byte size of the entry. Or ``2^32 - 1`` if the entry does not exist.
   :rtype: i32

.. function:: state_entry_read(entry, location, length, offset) -> i32

   Read a section of the entry to the given location. Return the number of
   bytes written. The location is assumed to contain enough memory to write the
   requested length into. If not, the function will trap and abort execution of
   the contract.

   :param i64 entry: Entry identifier.
   :param i32 location: Pointer to write location in Wasm linear memory.
   :param i32 length: Number of bytes to read.
   :param i32 offset: Starting offset in the entry bytes.
   :return: The number of read bytes. Or ``2^32 - 1`` if the entry does not exist.
   :rtype: i32

.. function:: state_entry_write(entry, location, length, offset) -> i32

   Write a section of the memory to the entry at a given offset.
   Return the number of bytes written.
   The offset must be less than or equal to the current entry size.

   :param i64 entry: Entry identifier.
   :param i32 location: Pointer to read location in Wasm linear memory.
   :param i32 length: Number of bytes to write.
   :param i32 offset: Starting offset in the entry bytes.
   :return: The number of written bytes. Or ``2^32 - 1`` if the entry does not exist.
   :rtype: i32

.. function:: state_entry_resize(entry, new_size) -> i32

   Resize entry to the new value (truncate if new size is smaller).
   If the new size is bigger, the additional state is initialized with ``0``.

   :param i64 entry: Entry identifier.
   :param i32 new_size: New size of contract entry in bytes.
   :return: ``0`` if this was unsuccessful (new entry too big), ``1`` if
            successful, or ``2^32 - 1`` if the entry does not exist.
   :rtype: i32

.. _host_function_crypto_primitives:

Cryptographic primitives
========================

.. function:: verify_ed25519_signature(public_key, signature, message, message_len) -> i32

   Verify an ed25519 signature.

   :param i32 public_key: Pointer to a public key in linear memory. The ``public_key`` must point to a 32-byte array.
   :param i32 signature: Pointer to the claimed signature. The ``signature`` must point to a 64-byte array.
   :param i32 message: Pointer to the beginning of the message.
   :param i32 message_len: Length of the message in bytes.

   :return: ``1`` if the signature check is successful, ``0`` if not.
   :rtype: i32

.. function:: verify_ecdsa_secp256k1_signature(public_key, signature, message) -> i32

   Verify an ecdsa over secp256k1 signature with the bitcoin-core implementation.

   :param i32 public_key: Pointer to a public key in linear memory. The ``public_key`` must point to a 33-byte array.
   :param i32 signature: Pointer to the claimed signature. The ``signature`` must point to a 64-byte array, serialized in compressed format.
   :param i32 message: Pointer to the beginning of the message. The message must be exactly 32-bytes long.

   :return: ``1`` if the signature check is successful, ``0`` if not.
   :rtype: i32

.. function:: hash_sha2_256(data, data_len, output)

   Compute the SHA2-256 digest of the data.

   :param i32 data: Pointer to the beginning of the data.
   :param i32 data_len: Length of the data in bytes.
   :param i32 output: Pointer to a memory location where the digest will be written.

.. function:: hash_sha3_256(data, data_len, output)

   Compute the SHA3-256 digest of the data.

   :param i32 data: Pointer to the beginning of the data.
   :param i32 data_len: Length of the data in bytes.
   :param i32 output: Pointer to a memory location where the digest will be written.

.. function:: hash_keccak_256(data, data_len, output)

   Compute the Keccak-256 digest of the data.

   :param i32 data: Pointer to the beginning of the data.
   :param i32 data_len: Length of the data in bytes.
   :param i32 output: Pointer to a memory location where the digest will be written.

.. _host_function_chain_getters:

Chain data
==========
Functions for reading information about the chain.

.. function:: get_slot_time() -> i64

   Get time in milliseconds at the beginning of this block.

   :return: Time in milliseconds.
   :rtype: i64

Identity data
=============
Functions for reading identity information.

.. function:: get_policy_section(policy_bytes, length, offset) -> i32

   Read a section of the policy to the given location.
   Return the number of bytes read.
   Assumes the location has enough memory to write the requested length into.

   :param i32 policy_bytes: Pointer to write location in Wasm linear memory.
   :param i32 length: Number of bytes to read.
   :param i32 offset: Starting offset in the policy bytes.
   :return: The number of bytes read.
   :rtype: i32

Only in init function
=====================
Functions only accessible for smart contract init functions. If called from
a receive function execution will abort.

.. function:: get_init_origin(start)

   Get the address of the account that triggered the init function.

   :param i32 start: Pointer to the location to put the address. The address is 32
                     bytes and the memory must be large enough to contain it.

Only in receive function
========================
Functions only accessible for smart contract receive functions.


.. function:: invoke(tag, start, length) -> i64

   Invoke a host instruction which is either a *transfer to an account* or a *call to a
   contract*.

   :param i32 tag: Tag for the instruction to invoke.

      ``0`` for transfer to an account

      ``1`` for call to a contract.

      ``2`` for query an account balance.

      ``3`` for query a contract balance.

      ``4`` for query the exchange rates.

      ``5`` for check the account signature.

      ``6`` for query the account keys.
   :param i32 start: Pointer to the start of the invoke payload.
   :param i32 length: Length of the invoke payload.
   :return: If the last five bytes are ``0`` then the call succeeded. In this
            case, the first bit of the response indicates whether state (of the
            *invoking* contract) has changed (``1``) or not (``0``) and the
            remaining 23 bits are the index of the return value that can be used
            in a call to |get_parameter_size|_ and |get_parameter_section|_.
            If the bits 25..32 are all zero the call failed because of a logic error and
            there is a return value. Bits 1..24 of the response are the index of
            the return value. Bits 32..64 are to be interpreted in two's
            complement and will be a negative number indicating the error code.
            Otherwise, the call failed and only the fourth byte is set. Possible values are:

            ``1`` if the call failed because of insufficient funds.

            ``2`` if the account to transfer to did not exist.

            ``3`` if the contract to call did not exist.

            ``4`` if the entrypoint did not exist on contract to call.

            ``5`` if it called a V0 contract that failed.

            ``6`` if it called a contract that failed with a runtime error.

            No other values are possible.

   :rtype: i64

.. function:: upgrade(module) -> i64

   Upgrade to a new module. This will change the smart contract module used for
   this smart contract instance.

   :param i32 module: Pointer to 32 bytes for a module reference.
   :return: ``0`` if successful

            ``0x07_0000_0000`` if failed because of module did not exist.

            ``0x08_0000_0000`` if failed because of module did not contain a smart contract with a name matching to one of this instance.

            ``0x09_0000_0000`` if failed because of module being an unsupported smart contract version.

            No other values are possible.

   :rtype: i64

.. function:: get_receive_invoker(start)

   Get the address of the account that initiated the top-level transaction
   which lead to triggering the receive function.

   :param i32 start: Pointer to the location to put the address.

.. function:: get_receive_sender(start)

   Get the address of the account or contract, triggering the receive function.

   :param i32 start: Pointer to the location to put the address.

.. function:: get_receive_self_address(start)

   Get the address of the contract instance, running the receive function.

   :param i32 start: Pointer to the location to put the address.

.. function:: get_receive_owner(start)

   Get the address of the account, which created the contract instance.

   :param i32 start: Pointer to the location to put the address.

.. function:: get_receive_self_balance() -> i64

   Get the current balance of the contract instance.

   :return: Current balance of the contract instance.
   :rtype: i64

.. function:: get_receive_entrypoint_size() -> i32

   Get the size of the entrypoint that was named. See ``get_receive_entrypoint``
   for more information on the use of this host function.

   :return: The size of the entrypoint that was named.
   :rtype: i32

.. function:: get_receive_entrypoint(start)

   Write the receive entrypoint name into the given location.
   It is assumed that the location contains enough space to write the name.
   For regular receive methods, the entrypoint name will always be the same as
   the receive method's entrypoint name. But for fallback entrypoints, it might
   differ.

   :param i32 start: Pointer to the location to put the entrypoint name.

.. _concordium-std: https://docs.rs/concordium-std/latest/concordium_std/
.. _state_iterate_prefix: #concordium.state_iterate_prefix
.. |state_iterate_prefix| replace:: ``state_iterate_prefix``
.. _state_iterator_next: #concordium.state_iterator_next
.. |state_iterator_next| replace:: ``state_iterator_next``
.. _get_parameter_size: #concordium.get_parameter_size
.. |get_parameter_size| replace:: ``get_parameter_size``
.. _get_parameter_section: #concordium.get_parameter_section
.. |get_parameter_section| replace:: ``get_parameter_section``
