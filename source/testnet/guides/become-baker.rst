==================================
Becoming a baker (creating blocks)
==================================

.. contents::
   :local:

This section explains why and how to become a baker as well as what a
baker is and its role in the network.

By reading this section you will learn:

-  What is a baker and the concepts related to it.
-  How to upgrade your node for becoming a baker.
-  How to request delegation from the testnet delegation accounts.

The process of becoming a baker can be summarized in the following
steps:

#. Get an account.
#. Get a set of baker keys.
#. Start the node with the baker keys.
#. Register the baker keys with the account.
#. Get some stake delegated.

After completing those steps, the node will bake blocks that will
produce rewards for the account that registered it. The documentation
that follows explains this steps and guides the user through the
process.

Definitions
===========

A *baker* is a node that actively participates in the network by
creating (or *baking*) new blocks that are added to the chain. A baker
collects, orders and validates the transactions that are included in a
block to ensure that the integrity of the blockchain is maintained. It
signs each block it bakes so that it can be checked and executed by the
rest of the participants of the network.

Each baker has a set of cryptographic keys called *baker credentials*.
The baker uses these keys to sign the blocks that it bakes. Each
registered baker is associated with a baker ID that is used when
referring to that baker.

Whenever a baker bakes a valid block that gets included in the chain,
after some time a reward is paid to the *reward account* that is
registered for the baker.

When considering the rewards and other baking-related concepts, we use
the concept of an *epoch* as a unit of time that defines a period in
which the set of current bakers and delegations are fixed.

In order to be eligible to craft a block, the baker must participate in
a *lottery* in which the probability of getting a winning ticket is
roughly proportional to the stake that is `delegated`_ to the baker.

An account may choose to delegate to a baker and then the baker can use
the stake of the account as lottery power. This process is called
*delegation*. This way, a newcomer could go through the process of
becoming a baker and if some stake is delegated to their baker then the
baker would be able to win the lottery and have the opportunity of
crafting some blocks (and earning the reward associated with those).
When an account delegates its stake, up to two epochs have to pass
before the delegated stake contributes to the baker's lottery power.
When an account stops delegating (sends an undelegation order) the same
principle applies; up two epochs have to pass before the account's stake
stops contributing to the baker's lottery power. For more information,
check the last section of this quickstart.

In order to simplify the process of becoming a baker, on the Testnet,
Concordium deploys 4 *delegation* accounts, each with 5% of the total
stake at the beginning of the chain, that the users can request a
delegation from. This will be discussed more in detail `below`_.

Managing accounts
-----------------

This section provides a brief recap of the relevant steps for importing
an account. For a complete description, see `Managing accounts`_.

Accounts are created using the `Concordium ID`_ app. Once an account has
been successfully created, navigating to the **More** tab and selecting
**Export** allows the user to get a JSON file containing the account
information.

In order to import an account into the toolchain, the user needs to
access their node-dashboard which when running the ``concordium-node``
is located at http://localhost:8099.

The node-dashboard will ask for a password to decrypt the exported file
and import all accounts. The same password will be used for encrypting
the transaction signing keys and the encrypted transfers key.

.. image :: account-management-node-dashboard2.png
   :align: center
   :width: 460px

The baker keys
--------------

When the node is started with baker credentials it is ready to start
baking once it is registered as a baker on the chain. Hence, to support
registering as a baker after the node is running, the
``concordium-node`` automatically generates a set of credentials
``baker-credentials.json`` if not already present.

These keys are generated in the data directory which will change
depending on the running OS. On Linux and macOS, the data directory is
``~/.local/share/concordium`` whereas in Windows it is
``%LOCALAPPDATA%\\concordium``.

Normally the data directory is not erased but the user can choose to
make a copy of the file in case they ever wanted to use it in multiple
running nodes or more advanced setups.

Registering a baker and associating a reward account
----------------------------------------------------

The first step towards becoming a baker is registering the baker keys in
the chain in association with the reward account.

The flow for registering the new baker from the node-dashboard is as
follows:

#. Import an account and select it as the active account.
#. Introduce the key for signing transaction on the prompt under the
   *Baking* header.
#. Click on the button under the *Baking* header in order to start the
   process.
#. Wait for the transaction to be finalized, and then 2 epochs to become
   active.

.. image :: baking-node-dashboard4.png
   :align: center
   :width: 460px


In every moment the node-dashboard informs of the status of the process.
From this point on, the user can click on the ``Stop Baking`` button to
unregister the baker if they want to.

Both being included in the baker list and being removed from it happens
2 epochs after the epoch in which the transaction was finalized.

At this point, the baker has been registered and associated with the
selected account. Rewards will be paid to that account and the node
automatically starts trying to bake.

Checking the status of the baker and its lottery power
------------------------------------------------------

The user can see in the node dashboard that the node is baking and its
status. However, this is also reflected in other components with
different degrees of precision.

In the """ , networkDashboardLink , """, the user's node will show its
baker ID in the ``Baker`` column.

.. _networkDashboardLink: https://dashboard.testnet.concordium.com/

However, there is still some information that is not shown in the
node-dashboard neither in the network dashboard which is the lottery
power of the bakers. The lottery power will determine how likely it is
that a given baker will win the lottery and bake a block. As said, this
is the percentage of the total delegated stake that is delegated to a
given baker. The only current way for a user to check the stake that is
delegated to a baker is using ```concordium-client```_:

::

   $ concordium-client consensus show-parameters --include-bakers
   Election nonce:      07fe0e6c73d1fff4ec8ea910ffd42eb58d5a8ecd58d9f871d8f7c71e60faf0b0
   Election difficulty: 4.0e-2
   Bakers:
                                Account                       Lottery power
           ----------------------------------------------------------------
       ...
       34: 4p2n8QQn5akq3XqAAJt2a5CsnGhDvUon6HExd2szrfkZCTD4FX   <0.0001
       ...

The given command will output a list with the different bakers that are
registered in the chain and their relative lottery power.

Also if the user's baker has been delegated enough stake, it should
start producing blocks and the user can see in their wallet that they
are receiving baking rewards in the account associated with the baker.
   
.. image :: baking-rewards.png
   :align: center
   :width: 460px

.. _``concordium-client``: /testnet/docs/client

Delegating to a baker
---------------------

At this point, the user's node is capable of baking as the baker keys
have been added to the baker list and 2 epochs have passed since then.
The node tries to get a winning ticket for the lottery using the stake
delegated to the baker as an input to the lottery though a fresh baker
doesn't have any stake upon creation.

Delegations don't have a expiry time and require issuing another
delegating transaction to another account or an undelegate transaction
for them to finish.

Requesting delegation from the Concordium accounts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As said before, Concordium owns 4 accounts in the network that have 5%
of the initial total stake each. These accounts can delegate to bakers
when requested and the delegation will be active for 2 epochs.

In order to do this, the user must once more access the
`node-dashboard`_. Once the baker is added to the baker list, the
node-dashboard shows a new button to request delegation from the
Concordium accounts.

.. image :: delegating-node-dashboard1.png
   :align: center
   :width: 460px

When requested, the delegation process will begin and the node-dashboard
will report the different steps at which the delegation is in each
instant. The user is allowed to have the stake delegated **for at least
2 epochs** and it will be revoked automatically.

Using the same command as before for checking the baker list, the user
can check the delegated stake it has in each instant.

.. _node-dashboard: http://localhost:8099

Delegating manually to a chosen baker
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Every baker is associated with an account. However, a baker does not
automatically inherit its account's stake. In order to ensure that a
baker has stake (which is necessary for participating in the lottery)
accounts have to explicitly delegate their stake to the baker. To do
that an account can send a *delegating transaction* which can be done
from the command line.

Assuming that the user has loaded the account into the toolchain either
via the node dashboard or using the command line interface, a
transaction for delegating the stake owned by the account ``SENDER`` to
the baker ``BAKER_ID`` can be sent. In order to do it, the user will
need to execute the following command:

::

   concordium-client account delegate --baker BAKER-ID --sender SENDER

The user may choose any baker ID from the ones registered in the
blockchain and delegate stake to it. Sending a new delegating
transaction from an account that is already delegating will undelegate
from the old recipient and delegate to the new one.

The user can also choose to manually undelegate any running delegation
sending an undelegate transaction, which is done in the command line
with the following command:

::

   concordium-client account undelegate --sender SENDER

In order to check if an account is currently delegating to a baker and
its baker ID, the user can check the information of the account by
`querying the node`_.

.. _querying the node: /testnet/docs/queries#account-state

Finalization
------------

For blocks to be considered part of the "authoritative" chain, they must
go through a process of consensus that decides whether the nodes in the
network agree on including a specific block. This process is called
**finalization**. For more information about it, check `here`_.

Finalization is done by the finalization committee which is formed by
the bakers that have a certain amount of stake, so from the point of
view of a user, no further action is needed in order to be eventually
included in the finalization committee.

.. _here: /testnet/docs/glossary#finalization

Detailed description on the time constraints
--------------------------------------------

For the interested user, the descriptions above are missing some pieces
of information that draw the whole flow and the waiting times in each
step. Here we present a diagram that tries to capture the events that
take place on the chain and their waiting times as well as indicating
the state of the node in each moment.

This explanation might be too detailed for the reader and it is not
required for getting a general understanding of the flow.

.. image :: timeline.png
   :align: center
   :width: 460px


In the diagram we are showing a node that will become a baker and get
some stake delegated. We are assuming an `epoch`_ duration of 100.

Note that the amounts reflected in the ``Lottery power`` and
``Delegated stake`` boxes are orientative and don't mean absolute
amounts, in particular the amount for being included in the finalization
committee has to be above a certain threshold.

As seen in the diagram, it takes between one and two epochs for baker
changes to take effect. This is because the current bakers are based on
the stake distribution at the end of the epoch before last. This way, if
the block containing the transaction was baked at a slot time which
happens in the epoch ``E``, the change will be effective when starting
the epoch ``E + 2``.

.. _epoch: /testnet/docs/glossary#epoch

In practice, the user can expect the changes to take more than one and
at most two epochs to become active under normal finalization
conditions, and also expect the block bake and finalization time to not
be distant.

There is one exception to this mechanism and it is the stake accounted
for being part of the finalization committee. When stake is delegated
and the delegation transaction is finalized, the finalization committee
is instantly updated and if the user has enough stake, they will become
a finalizer. This way, the ``Delegated stake`` timeline shows that the
accounted stake for being part of the finalization committee changes in
the exact moment when the transaction is finalized.

Note that when delegating stake to a baker, it is important to wait for
the transaction that registers a baker to be in a finalized block. The
reason is that if the transaction gets included in two different
branches, it could happen that the winning branch does not have the
baker ID that one wanted to delegate stake to. This means that one could
end up delegating stake to a different baker than wanted.

Support & Feedback
==================

If you run into any issues or have suggestions, post your question or
feedback on `Discord`_, or contact us at testnet@concordium.com. 

.. _Discord: https://discord.com/invite/xWmQ5tp
