.. _assignment-1:

==================================
Assignment 1: Basic smart contract
==================================

Create a smart contract that mints a CIS-2 token, transfers, and burns it when invoked by the ``concordium-client``. It should require 20 CCDs for each operation (invokes) as transaction fees and doesn't allow minting the same token ID twice.

.. Note::

    To be able to accept CCD, you have to add the payable attribute to the ``#[receive]`` macro.

When you have completed the assignment, you can claim your beginner-level NFT badge by `submitting your assignment information here <https://docs.google.com/forms/d/1ks_oWIxbRoW6NGHHjwOGfaO4pVvZAD92me0ChbvzDZc/edit>`_.
