
.. _networkDashboardLink: https://dashboard.testnet.concordium.com/
.. _concordium-client: /testnet/docs/client
.. _node-dashboard: http://localhost:8099
.. _querying the node: /testnet/docs/queries#account-state
.. _Discord: https://discord.com/invite/xWmQ5tp
.. _epoch: /testnet/docs/glossary#epoch

==================================
Becoming a baker (creating blocks)
==================================

.. contents::
   :local:
   :backlinks: none

This section explains what a baker is, what is its role in the network and how
to become one.

By reading this section you will learn:

-  What is a baker and the concepts related to it.
-  How to upgrade your node for becoming a baker.

The process of becoming a baker can be summarized in the following steps:

#. Get an account and some GTUs.
#. Get a set of baker keys.
#. Register the baker keys with the account.
#. Start the node with the baker keys.

After completing those steps, the node will bake blocks that will produce
rewards for the associated account that registered it. The documentation that
follows explains this steps and guides the user through the process.

.. note::

   During this section we will use the name ``bakerAccount`` as the name of the
   account that will be used to register and manage the baker. This name of the
   account will be set when importing the account into the toolchain.

Definitions
===========

Baker
-----

A node is said to be a *baker* (or *is baking*) when it actively participates in
the network by creating (or *baking*) new blocks that are added to the chain. A
baker collects, orders and validates the transactions that are included in a
block to ensure that the integrity of the blockchain is maintained. It signs
each block it bakes so that it can be checked and executed by the rest of the
participants of the network. 

Baker keys
----------

Each baker has a set of cryptographic keys to which we will refer as *baker
keys*. The node uses these keys to sign the blocks that it bakes. In order to
bake blocks signed by a specific baker the node has to be running with its set
of baker keys loaded.

Baker account
-------------

Each account in the network can register one and only one new set of baker
keys that effectively registers a baker in the network, so this means
that every account can choose whether to be a baker or not.

During this guide we will refer to the account that opted to be a baker simply
as *the account*, *the baker account* or *the associated account*.

Each registered baker is given a baker ID in the network. The baker ID is unique
for each account so if an account removes its baker and then registers a new
baker, it will have the same baker ID as the original baker. This ID merely tags
the baker and is not needed to be provided for any operation, as the sender
account already identifies in which baker should the operation be performed.

Whenever a baker bakes a valid block that gets included in the chain, after some
time a reward is paid to the associated account.

Stake and lottery
-----------------

A baker holds some *stake* which is part of the amount of GTU owned by the
account. The staked amount can never be greater than the available amount on the
account. The staked amount cannot be moved nor transferred in any way until it
is released by the baker.

.. note::
   
   If an account owns an amount that was transferred with a release schedule,
   said amount can be staked even if not released yet.

In order to be chosen for baking a block, the baker must participate in a
*lottery* in which the probability of getting a winning ticket is roughly
proportional to the staked amount.

Epochs and slots
----------------

In the Concordium blockchain, time is subdivided into *slots*. Slots have a time
duration fixed at the Genesis block. On any given branch, each slot can have at
most one block, but multiple blocks on different branches can be produced in the
same slot.

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
allows the user to get a JSON file containing the account information.

In order to import an account into the toolchain, the user needs to execute the
``concordium-client``:

.. code-block:: console

   $concordium-client config account import <path/to/exported/file> --name bakerAccount

``concordium-client`` will ask for a password to decrypt the exported file and
import all accounts. The same password will be used for encrypting the
transaction signing keys and the encrypted transfers key.

Creating keys for a baker and registering it
--------------------------------------------

.. note::

   For this process the account needs to own some GTU so make sure to request the
   100 GTU drop on the created account, which has to be done on the mobile app.

As mentioned above, each account has a unique baker ID that is used when
registering its baker. This ID has to be provided by the network and currently
cannot be pre-computed.

In order to create a fresh set of keys, the user has to execute the
``concordium-client`` as:

.. code-block:: console
                
   $concordium-client baker generate-keys <file-name>.json

Where the user can choose an arbitrary ``file-name`` for the keys file. To
register this keys into the network the user needs to have a node running
and send a ``baker add`` transaction to the network. This is achieved by
executing the ``concordium-client`` as follows:

.. code-block:: console

   $concordium-client baker add <file-name>.json --sender bakerAccount --stake <amountToStake> --out baker-credentials.json 

replacing ``<amountToStake>`` with the intial amount that the user wants to
stake on the baker and ``<file-name>`` with the file name that was used in the
previous command. This command will send a ``baker add`` transaction to the
network and will output a file ``baker-credentials.json`` that is suitable to be
provided to the node in order to start baking.

The user can provide the flag ``--no-restake`` to avoid automatically adding the
rewards to the staked amount on the baker. This behavior is described on the
section `Restaking the earnings`_.

In order to start the node with these baker keys and start producing blocks the
user first needs to shut down the current running node (either by pressing
``Ctrl + C`` on the terminal where the node is running or using the
``concordium-node-stop`` executable).

The file that was outputted in the previous step has to be placed in the data
directory which will change depending on the running OS. On Linux and macOS, the
data directory is ``~/.local/share/concordium`` whereas in Windows it is
``%LOCALAPPDATA%\\concordium``.

.. warning::

   The name of the file must be exactly ``baker-credentials.json`` and must be
   placed in the exact folder mentioned above for the node to use it on startup.

After placing the file in the appropriate directory, the user should start the
node again using ``concordium-node``. The node will automatically start baking
when the baker is included in the bakers for the current epoch. This will happen
when finishing the epoch after the one in which the transaction for adding the
baker was finalized.

.. note::

   If the transaction for adding the baker was finalized during epoch `E`, the
   baker will be active when epoch `E+2` starts.

Manage the baker
================

Checking the status of the baker and its lottery power
------------------------------------------------------

In order to see if the node is baking, the user can check various sources that
offer different degrees of precision in the information displayed.

- In the `network dashboard <http://dashboard.testnet.concordium.com>`_, the
  user's node will show its baker ID in the ``Baker`` column.
- Using the ``concordium-client`` the user can check the list of current bakers
  and the relative staked amount that they hold, i.e. its lottery power.  The
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

- Using the ``concordium-client`` the user can check that the account has
  registered a baker and the current amount that is staked by that baker.

  .. code-block:: console

     $./concordium-client account show bakerAccount
     ...
     
     Baker: #22
      - Staked amount: 10.000000 GTU
      - Restake earnings: yes
     ...  

- If staked amount is big enough and there is a node running with the baker keys
  loaded, that baker should eventually produce blocks and the user can see in
  their mobile wallet that baking rewards are being received on the account, as
  seen on this image:
  
  .. image:: images/bab-reward.png
     :align: center
     :width: 250px
  
Updating the staked amount
--------------------------

Although the staked amount is locked and cannot be moved, the user can modify
that amount to increase it or decrease it.

Modifying the staked amount takes **2 epochs** regardless of what operation is
performed.

When **decreasing the staked amount**, there is a *cooldown period* during which
the operations are queued but not yet executed. This particularly means that
supposing a cooldown period of `X epochs`, the change will be executed when `X`
epochs after the transaction for updating the stake is finalized have
passed. Note that after the change is executed it will still take 2 epochs for
the change to take effect. In the testnet, this value is set to **168 epochs**
which corresponds to **one week**.

.. note::

   The value of the *cooldown period* is not currently displayed in any usual
   command on the ``concordium-client`` and can only be consulted using the
   ``raw`` commands. As the value can change in each block, it can be seen with
   the following command:

   .. code-block:: console

      $concordium-client raw GetBlockSummary
      ...
              "bakerCooldownEpochs": 168
      ...

In the case of increasing the staked amount, the change is executed in the
moment the transaction is finalized. Note that after the change is executed it
will still take 2 epochs for the change to take effect.

The stake is updated using the ``concordium-client``:

.. code-block:: console

   $concordium-client baker update-stake --stake <newAmount> --sender bakerAccount              

Note that modifying the staked amount modifies the probability of a baker being
elected to create the next block.

The user can then check when will this change be executed if decreasing the
stake by querying for the account information:

.. code-block:: console

   $concordium-client account show bakerAccount
   ...
   
   Baker: #22
    - Staked amount: 50.000000 GTU to be updated to 20.000000 GTU at epoch 261  (2020-12-24 12:56:26 UTC)
    - Restake earnings: yes

   ...

.. warning::
   
   As said in the `Definitions`_ section, the staked amount is locked while
   staked and cannot be transferred or moved in any way. The user should take
   this into account and might consider staking an amount that will not be
   needed in the short term. Also, note that deregistering as a baker or
   modifying the staked amount requires that the account has some unlocked GTU
   so there needs to be a sufficient amount of unlocked GTU on the account to
   perform these operations.

Restaking the earnings
----------------------

When participating as a baker in the network and baking blocks, the account
receives rewards on each baked block. These rewards are automatically added to
the staked amount by default.

The user can choose to modify this behavior and instead receive the rewards in
the account balance without staking them automatically. This switch can be
changed through ``concordium-client``:

.. code-block:: console

   $concordium-client baker update-restake False --sender bakerAccount
   $concordium-client baker update-restake True --sender bakerAccount

Changing the switch will take effect 2 epochs after the transaction is
finalized. The current value of the switch can be seen in the account
information which can be queried using ``concordium-client``:

.. code-block:: console

   $concordium-client account show bakerAccount
   ...
   
   Baker: #22
    - Staked amount: 50.000000 GTU to be updated to 20.000000 GTU at epoch 261  (2020-12-24 12:56:26 UTC)
    - Restake earnings: yes

   ...                

When the baker is registered, it will automatically re-stake the earnings, but,
as mentioned above, this can be changed by providing the ``--no-restake`` flag to
the ``baker add`` command as shown here:

.. code-block:: console

   $concordium-client baker add baker-keys.json --sender bakerAccount --stake <amountToStake> --out baker-credentials.json --no-restake             
   
Finalization
------------

Finalization is the voting process performed by specific nodes (those belonging
to the finalization committee) that *finalizes* a block when a sufficently big
number of members of the committee have received the block and agree on its
outcome. Newer blocks must have the finalized block as an ancestor to ensure the
integrity of the chain. For more information about this process, check
:ref:`glossary_finalization`.

The finalization committee is formed by the bakers that have a certain staked
amount. This specifically implies that in order to participate in the
finalization committee the user will probably have to modify the staked amount
to reach said threshold. In the testnet, the staked amount needed to participate
in the finalization committee is **0.1% of the total amount of existing GTU**.

Participating in the finalization committee produces rewards on each block that
is finalized which are paid to the baker account some time after the block is
finalized.

Removing a baker
================

The controlling account can choose to de-register its baker on the chain. To do
so the user has to execute the ``concordium-client``:

.. code-block:: console

   $concordium-client baker remove --sender bakerAccount

This will remove the baker from the baker list and unlock the staked amount on
the baker so that it can be transferred or moved freely.

When removing the baker, there is a **cooldown period** (check `Updating the
staked amount`_ above for more information about this value) during which the
operation is queued but not yet executed. The user can check when will this take
effect by querying the account information with ``concordium-client`` as usual:

.. code-block:: console

   $concordium-client account show bakerAccount
   ...

   Baker #22 to be removed at epoch 275 (2020-12-24 13:56:26 UTC)
    - Staked amount: 20.000000 GTU 
    - Restake earnings: yes

   ...

.. warning::

   Decreasing the staked amount and removing the baker cannot be done
   simultaneously. During the cooldown period produced by decreasing the staked
   amount, the baker cannot be removed and viceversa.

Support & Feedback
==================

If you run into any issues or have suggestions, post your question or
feedback on `Discord`_, or contact us at testnet@concordium.com.

