.. include:: ../../../variables.rst
.. _supporting-staking:

==================
Supporting staking
==================

.. admonition:: At a glance

   This page explains what staking and delegation features your wallet should support to enable users to earn rewards on their CCD. No prerequisites are needed to read this page. After reading this, you will understand the delegation model, the key user flows to implement, and where to find more detailed documentation on staking mechanics.

Concordium secures its network using a :term:`proof-of-stake` model enabling your users to earn rewards on their CCD holdings. This ecosystem is built on two key roles: :term:`validators<validator>`, who operate the nodes that run the network, and :term:`delegators<delegator>`, who are users that stake their CCD to support these validators.

For the majority of users, the primary way to participate is through :term:`delegation`. This allows them to assign the weight of their CCD to a validator of their choice, earning a share of the rewards without the technical overhead of running their own node.

Your wallet's role is to provide the essential interface for this process, enabling users to discover validators, delegate their funds securely, and manage their staking rewards. This includes handling timing factors such as :term:`pay day` cycles and :term:`cool-down periods<Cool-down period>`, as well as supporting delegation to specific validator pools as well as :term:`passive delegation`.

Integrating these features provides a significant incentive for users to hold and interact with CCD within your application.

Learn more
==========

For more information about how staking and delegation work on Concordium, see :ref:`Staking<staking>`.

For detailed information on delegation and reward types, see :ref:`Concordium tokenomics system<tokenomics>`.

For a more in-depth explanation of how validation works, see :ref:`Block production and validation<baker-concept>`.

