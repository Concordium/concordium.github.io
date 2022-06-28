.. _baker-pool:

================
Baker management
================

A :ref:`baker <baker-concept>` is a node that participates in the network by baking (creating) new blocks that are added to the chain. There are some recommended best practices around baking, particularly when a baker runs a baker pool. A baker can choose to open a baker pool to which others can :ref:`delegate<delegation-concept>` some of their stake.

Best practices for baking
=========================

As a baker you should manage your baker node responsibily for the benefit of all users of the blockchain. The recommendations for bakers are:

- Make sure your node is running 24/7/365 in a reliable place.
- Protect your baker keys so that they are not lost or compromised.
- Check regularly to make sure that you are not close to the bounding cap for max capital for a baker. If you're getting close to the max capital, you can split and make another baker to divide the capital.
- Open a baker pool. This allows others to delegate stake to you, thus increasing your effective stake and your odds of getting selected to bake a block. You also receive a commission on the delegator's rewards.

Recommendations for baker pool owners
-------------------------------------

If you are running a baker pool, you are responsible for managing your pool to maximize returns, both for yourself and those who have delegated stake to your pool.

To help potential delegators with their choice, it is a good idea to create a site with information and add this URL to your baker pool configuration. This information is published on :ref:`CCD Scan<bakers-view>` so that potential delegators can read about the pool and understand your goals. Having a URL on your baker pool configuration is not required.

Besides the recommendations for bakers listed above, you should subscribe to the `Mainnet status page <https://status.mainnet.concordium.software/>`_ and the `release information on Discourse <https://support.concordium.software/c/releases/9>`_ to stay informed about updates and changes that may affect you as a baker.

Research a baker pool
=====================

Before delegating stake to a baker pool, it is important to research the pool and get an idea of performance and how it is managed.

The first thing to check before delegating stake to a baker pool is the URL for the baker pool. This is information that the baker can provide about the pool. It is not required that the baker provide this, but recommended. You can find the URLs on :ref:`CCD Scan<bakers-view>`.

Make sure that the pool isn't close to having too many delegators or close to max capital. Another indicator of good management is reliability, such as uptime (i.e., has it been running a long time), and if the node is upgraded to the latest version.

Once you have made a delegation, it is a good idea to monitor baker performance regularly and adjust if needed.

CCD Scan
========

The tool for both baker management and research is CCD Scan. For more information, see :ref:`CCD Scan<ccd-scan>`.
