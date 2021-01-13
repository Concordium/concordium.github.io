
.. _networkDashboardLink: https://dashboard.testnet.concordium.com/
.. _node-dashboard: http://localhost:8099
.. _Discord: https://discord.com/invite/xWmQ5tp

.. _become-a-baker:

==================================
Become a baker (create blocks)
==================================

.. contents::
   :local:
   :backlinks: none

This section explains what a baker is, its role in the network and how to become
one.

By reading this section you will learn:

-  What is a baker and the concepts related to it.
-  How to upgrade your node to become a baker.

The process of becoming a baker can be summarized in the following steps:

#. Get an account and some GTUs.
#. Get a set of baker keys.
#. Register the baker keys with the account.
#. Start the node with the baker keys.

After completing these steps, the baker node will bake blocks. If a baked block
is added to the chain the node's baker will receive a reward.

.. note::

   In this section we will use the name ``bakerAccount`` as the name of the
   account that will be used to register and manage a baker.

Definitions
===========

Baker
-----

A node is a *baker* (or *is baking*) when it actively participates in the
network by creating new blocks that are added to the chain. A baker collects,
orders and validates the transactions that are included in a block to maintain
the integrity of the blockchain. The baker signs each block that they bake so
that the block can be checked and executed by the rest of the participants of
the network.

Baker keys
----------

Each baker has a set of cryptographic keys called *baker keys*. The node uses
these keys to sign the blocks that it bakes. In order to bake blocks signed by a
specific baker the node has to be running with its set of baker keys loaded.

Baker account
-------------

Each account can use a set of baker keys to register a baker.

Whenever a baker bakes a valid block that gets included in the chain, after some
time a reward is paid to the associated account.

Stake and lottery
-----------------

.. todo::

   - Link to release schedule.

The account can stake part of its GTU balance into the *baker stake* and can
later manually release all or part of the staked amount. The staked amount
cannot be moved or transferred until it is released by the baker.

.. note::

   If an account owns an amount that was transferred with a release schedule,
   the amount can be staked even if not released yet.

In order to be chosen for baking a block, the baker must participate in a
*lottery* in which the probability of getting a winning ticket is roughly
proportional to the staked amount.

The same stake is used when calculating whether a baker is included in the finalization
committee or not. See Finalization_.

.. _epochs-and-slots:

Epochs and slots
----------------

In the Concordium blockchain, time is subdivided into *slots*. Slots have a time
duration fixed at the Genesis block. On any given branch, each slot can have at
most one block, but multiple blocks on different branches can be produced in the
same slot.

.. todo::

   Let's add a picture.

When considering the rewards and other baking-related concepts, we use the
concept of an *epoch* as a unit of time that defines a period in which the set
of current bakers and stakes are fixed. Epochs have a time duration fixed at the
Genesis block. In the testnet, epochs have a duration of **1 hour**.

Start baking
============

Managing accounts
-----------------

This section provides a brief recap of the relevant steps for importing an
account. For a complete description, see :ref:`managing_accounts`.

Accounts are created using the :ref:`concordium_id` app. Once an account has been
successfully created, navigating to the **More** tab and selecting **Export**
allows you to get a JSON file containing the account information.

To import an account into the toolchain run

.. code-block:: console

   $concordium-client config account import <path/to/exported/file> --name bakerAccount

``concordium-client`` will ask for a password to decrypt the exported file and
import all accounts. The same password will be used for encrypting the
transaction signing keys and the encrypted transfers key.

Creating keys for a baker and registering it
--------------------------------------------

.. note::

   For this process the account needs to own some GTU so make sure to request the
   100 GTU drop for the account in the mobile app.

Each account has a unique baker ID that is used when registering its baker. This
ID has to be provided by the network and currently cannot be precomputed. This
ID must be given inside the baker keys file to the node so that it can use the
baker keys to create blocks. The ``concordium-client`` will automatically fill
this field when performing the following operations.

To create a fresh set of keys run:

.. code-block:: console

   $concordium-client baker generate-keys <keys-file>.json

where you can choose an arbitrary name for the keys file. To
register the keys in the network you need to be :ref:`running a node <running-a-node>`
and send a ``baker add`` transaction to the network:

.. code-block:: console

   $concordium-client baker add <keys-file>.json --sender bakerAccount --stake <amountToStake> --out <concordium-data-dir>/baker-credentials.json

replacing

- ``<amountToStake>`` with the GTU amount for the baker's initial stake
- ``<concordium-data-dir>`` with the following data directory:

  * on Linux and MacOS: ``~/.local/share/concordium``
  * on Windows: ``%LOCALAPPDATA%\\concordium``.

(The output file name should remain ``baker-credentials.json``).

Provide a ``--no-restake`` flag to avoid automatically adding the
rewards to the staked amount on the baker. This behavior is described on the
section `Restaking the earnings`_.

In order to start the node with these baker keys and start producing blocks you
first need to shut down the current running node (either by pressing
``Ctrl + C`` on the terminal where the node is running or using the
``concordium-node-stop`` executable).

After placing the file in the appropriate directory (already done in the
previous command when specifying the output file), start the node again using
``concordium-node``. The node will automatically start baking when the baker
gets included in the bakers for the current epoch.

This change will be executed
immediately and will take effect when finishing the epoch after the one in which
the transaction for adding the baker was included in a block.

.. table:: Timeline: adding a baker

   +-------------------------------------------+-----------------------------------------+-----------------+
   |                                           | When transaction is included in a block | After 2 epochs  |
   +===========================================+=========================================+=================+
   | Change is visible by querying the node    |  ✓                                      |                 |
   +-------------------------------------------+-----------------------------------------+-----------------+
   | Baker is included in the baking committee |                                         | ✓               |
   +-------------------------------------------+-----------------------------------------+-----------------+

.. note::

   If the transaction for adding the baker was included in a block during epoch `E`, the
   baker will be considered as part of the baking committee when epoch
   `E+2` starts.

Managing the baker
==================

Checking the status of the baker and its lottery power
------------------------------------------------------

In order to see if the node is baking, you can check various sources that
offer different degrees of precision in the information displayed.

- In the `network dashboard <http://dashboard.testnet.concordium.com>`_, your
  node will show its baker ID in the ``Baker`` column.
- Using the ``concordium-client`` you can check the list of current bakers
  and the relative staked amount that they hold, i.e. their lottery power.  The
  lottery power will determine how likely it is that a given baker will win the
  lottery and bake a block.

  .. code-block:: console

     $concordium-client consensus show-parameters --include-bakers
     Election nonce:      07fe0e6c73d1fff4ec8ea910ffd42eb58d5a8ecd58d9f871d8f7c71e60faf0b0
     Election difficulty: 4.0e-2
     Bakers:
                                  Account                       Lottery power
             ----------------------------------------------------------------
         ...
         34: 4p2n8QQn5akq3XqAAJt2a5CsnGhDvUon6HExd2szrfkZCTD4FX   <0.0001
         ...

- Using the ``concordium-client`` you can check that the account has
  registered a baker and the current amount that is staked by that baker.

  .. code-block:: console

     $./concordium-client account show bakerAccount
     ...

     Baker: #22
      - Staked amount: 10.000000 GTU
      - Restake earnings: yes
     ...

- If the staked amount is big enough and there is a node running with the baker
  keys loaded, that baker should eventually produce blocks and you can see
  in your mobile wallet that baking rewards are being received by the account,
  as seen in this image:

  .. image:: images/bab-reward.png
     :align: center
     :width: 250px

Updating the staked amount
--------------------------

To update the baker stake run

.. code-block:: console

   $concordium-client baker update-stake --stake <newAmount> --sender bakerAccount

Modifying the staked amount modifies the probability that a baker gets elected
to bake blocks.

When a baker **adds stake for the first time or increases their stake**, that
change is executed on the chain and becomes visible as soon as the transaction
is included in a block (can be seen through ``concordium-client account show
bakerAccount``) and takes effect 2 epochs after that.

.. table:: Timeline: increasing the stake

   +----------------------------------------+-----------------------------------------+----------------+
   |                                        | When transaction is included in a block | After 2 epochs |
   +========================================+=========================================+================+
   | Change is visible by querying the node | ✓                                       |                |
   +----------------------------------------+-----------------------------------------+----------------+
   | Baker uses the new stake               |                                         | ✓              |
   +----------------------------------------+-----------------------------------------+----------------+

When a baker **decreases the staked amount**, the change will need *2 +
bakerCooldownEpochs* epochs to take effect. The change becomes visible on the
chain as soon as the transaction is included in a block, it can be consulted through
``concordium-client account show bakerAccount``:

.. code-block:: console

   $concordium-client account show bakerAccount
   ...

   Baker: #22
    - Staked amount: 50.000000 GTU to be updated to 20.000000 GTU at epoch 261  (2020-12-24 12:56:26 UTC)
    - Restake earnings: yes

   ...

.. table:: Timeline: decreasing the stake

   +----------------------------------------+-----------------------------------------+----------------------------------------+
   |                                        | When transaction is included in a block | After *2 + bakerCooldownEpochs* epochs |
   +========================================+=========================================+========================================+
   | Change is visible by querying the node | ✓                                       |                                        |
   +----------------------------------------+-----------------------------------------+----------------------------------------+
   | Baker uses the new stake               |                                         | ✓                                      |
   +----------------------------------------+-----------------------------------------+----------------------------------------+
   | Stake can be decreased again or        | ✗                                       | ✓                                      |
   | baker can be removed                   |                                         |                                        |
   +----------------------------------------+-----------------------------------------+----------------------------------------+

.. note::

   In the testnet, ``bakerCooldownEpochs`` is set initially to 168 epochs. This
   value can be checked as follows:

   .. code-block:: console

      $concordium-client raw GetBlockSummary
      ...
              "bakerCooldownEpochs": 168
      ...

.. warning::

   As noted in the `Definitions`_ section, the staked amount is *locked*,
   i.e. it cannot be transferred or used for payment. You should take this
   into account and consider staking an amount that will not be needed in the
   short term. In particular, to deregister a baker or to modify the staked
   amount you need to own some non-staked GTU to cover the transaction
   costs.

Restaking the earnings
----------------------

When participating as a baker in the network and baking blocks, the account
receives rewards on each baked block. These rewards are automatically added to
the staked amount by default.

You can choose to modify this behavior and instead receive the rewards in
the account balance without staking them automatically. This switch can be
changed through ``concordium-client``:

.. code-block:: console

   $concordium-client baker update-restake False --sender bakerAccount
   $concordium-client baker update-restake True --sender bakerAccount

Changes to the restake flag will take effect immediately; however, the changes
start affecting baking and finalizing power in the epoch after next. The current
value of the switch can be seen in the account information which can be queried
using ``concordium-client``:

.. code-block:: console

   $concordium-client account show bakerAccount
   ...

   Baker: #22
    - Staked amount: 50.000000 GTU
    - Restake earnings: yes

   ...

.. table:: Timeline: updating restake

   +-----------------------------------------------+-----------------------------------------+-------------------------------+
   |                                               | When transaction is included in a block | 2 epochs after being rewarded |
   +===============================================+=========================================+===============================+
   | Change is visible by querying the node        | ✓                                       |                               |
   +-----------------------------------------------+-----------------------------------------+-------------------------------+
   | Earnings will [not] be restaked automatically | ✓                                       |                               |
   +-----------------------------------------------+-----------------------------------------+-------------------------------+
   | If restaking automatically, the gained        |                                         | ✓                             |
   | stake affects the lottery power               |                                         |                               |
   +-----------------------------------------------+-----------------------------------------+-------------------------------+

When the baker is registered, it will automatically re-stake the earnings, but as
mentioned above, this can be changed by providing the ``--no-restake`` flag to
the ``baker add`` command as shown here:

.. code-block:: console

   $concordium-client baker add baker-keys.json --sender bakerAccount --stake <amountToStake> --out baker-credentials.json --no-restake

Finalization
------------

Finalization is the voting process performed by nodes in the *finalization
committee* that *finalizes* a block when a sufficiently big number of members of
the committee have received the block and agree on its outcome. Newer blocks
must have the finalized block as an ancestor to ensure the integrity of the
chain. For more information about this process, see the
:ref:`finalization<glossary-finalization>` section.

The finalization committee is formed by the bakers that have a certain staked
amount. This specifically implies that in order to participate in the
finalization committee you will probably have to modify the staked amount
to reach said threshold. In the testnet, the staked amount needed to participate
in the finalization committee is **0.1% of the total amount of existing GTU**.

Participating in the finalization committee produces rewards on each block that
is finalized. The rewards are paid to the baker account some time after the
block is finalized.

Removing a baker
================

The controlling account can choose to de-register its baker on the chain. To do
so you have to execute the ``concordium-client``:

.. code-block:: console

   $concordium-client baker remove --sender bakerAccount

This will remove the baker from the baker list and unlock the staked amount on
the baker so that it can be transferred or moved freely.

When removing the baker, the change has the same timeline as decreasing
the staked amount. The change will need *2 + bakerCooldownEpochs* epochs to take effect.
The change becomes visible on the chain as soon as the transaction is included in a block and you
can check when this change will be take effect by querying the account information
with ``concordium-client`` as usual:

.. code-block:: console

   $concordium-client account show bakerAccount
   ...

   Baker #22 to be removed at epoch 275 (2020-12-24 13:56:26 UTC)
    - Staked amount: 20.000000 GTU
    - Restake earnings: yes

   ...

.. table:: Timeline: removing a baker

   +--------------------------------------------+-----------------------------------------+----------------------------------------+
   |                                            | When transaction is included in a block | After *2 + bakerCooldownEpochs* epochs |
   +============================================+=========================================+========================================+
   | Change is visible by querying the node     | ✓                                       |                                        |
   +--------------------------------------------+-----------------------------------------+----------------------------------------+
   | Baker is removed from the baking committee |                                         | ✓                                      |
   +--------------------------------------------+-----------------------------------------+----------------------------------------+

.. warning::

   Decreasing the staked amount and removing the baker cannot be done
   simultaneously. During the cooldown period produced by decreasing the staked
   amount, the baker cannot be removed and vice versa.

Support & Feedback
==================

If you run into any issues or have suggestions, post your question or
feedback on `Discord`_, or contact us at testnet@concordium.com.
