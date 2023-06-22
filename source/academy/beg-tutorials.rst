.. _beg-tutorials:

=======================================
Beginner level tutorials and assignment
=======================================

In this section, you will find a set of beginner level tutorials that will allow you to gain some experience before diving into more heavy tasks. They may include a combination of command line tools, smart contract development, and decentralized applications (dApps) development to increase your familiarity with Concordium.

When you have completed the tutorials, you can attempt the beginner level assignment to obtain your beginner-level NFT badge!

.. dropdown:: Beginning assignment - basic smart contract

    Create a smart contract that mints a CIS-2 token, transfers, and burns it when invoked by the ``concordium-client``. It should require 20 CCDs for each operation (invokes) as transaction fees and doesn't allow minting the same token ID twice.

    .. Note::

        To be able to accept CCD, you have to add the payable attribute to the ``#[receive]`` macro.

    When you have completed the assignment, you can claim your beginner-level NFT badge by `submitting your assignment information here <https://docs.google.com/forms/d/1ks_oWIxbRoW6NGHHjwOGfaO4pVvZAD92me0ChbvzDZc/edit>`_.

.. toctree::
    :hidden:

    tutorials/counter-contract
    tutorials/register-data
    tutorials/simple-nft-dapp
