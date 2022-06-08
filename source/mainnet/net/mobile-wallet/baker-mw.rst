.. _baker-mw:

=======================
Baking in Mobile Wallet
=======================

A :ref:`baker <baker-concept>` is a node that participates in the network by baking (creating) new blocks that are added to the chain. Each baker has a set of cryptographic keys called baker keys that the node needs to bake blocks. You generate the baker keys in the Mobile Wallet when you add a baker account. The baker node will start baking two :ref:`epochs <glossary-epoch>` after the transaction has been approved.

You have the option when adding a baker to open a :ref:`baker pool<glossary-baker-pool>`. A baker pool allows others who want to earn rewards to do so without the need to run a node or become a baker themselves. To do this they :ref:`delegate<delegation-concept>` an amount of stake to your baker pool which then increases your stake and your chances of winning the lottery to bake a block. You can also choose not to open a pool, in which case only your own stake applies toward the lottery. You can always open a pool later.

The process of becoming a baker involves the following:

#. Create a set of baker keys for the account.
#. Start a :ref:`node <node-requirements>` with the baker keys.

To start baking, you must start your node with the baker keys. You can run a baker node with keys generated in the Mobile Wallet on :ref:`Ubuntu <run-node-ubuntu>`, :ref:`Windows <run-node-windows>`, :ref:`Docker<run-a-node>`, or :ref:`macOS <run-node-macos>`. You can also choose to have a third-party node runner run a node for you if you do not want to run the node yourself.

.. Note::

   It is not possible to have multi signature baker accounts in Mobile Wallet. If you need this functionality, you need to run Desktop Wallet.

Prerequisites
=============

There are several things you must set up in preparation before you can start baking.

- Run a node on the Concordium blockchain. Make sure that you have a setup where the node can operate around the clock. You can run the node yourself or use a third-party provider.
- Download and install the Mobile Wallet.
- Set up an initial account and an identity.
- Set up a new account that you'll be using as the baker account.
- Verify that the account balance has the required amount of CCD to become a baker.

.. Note::

   All transfers and transactions cost a fee, including staking and unstaking transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees. A locked-for-staking balance cannot be used to pay for these transactions.
   You can see the fee in the transaction log.

.. Warning::

    Transactions on the blockchain are permanent. That is, they are irreversible and can't be deleted. Therefore, carefully review that you have selected the right account to add as baker, and that you have entered the correct amount to stake.

Next steps
==========

- Read the information about :ref:`baker management<baker-pool>`.
- If you are interested in a baker pool, read the Delegation FAQ (link).
- You need to :ref:`add a baker <add-baker-mw>` to the account you created.
- You can then :ref:`update baker settings <update-baker-mw>` as needed to manage your baker.

.. toctree::
    :hidden:
    :maxdepth: 1

    add-baker-mw
    update-baker-mw
