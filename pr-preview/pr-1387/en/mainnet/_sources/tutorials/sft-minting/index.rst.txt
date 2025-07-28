.. _sft-index:

==========================
Mint a semi-fungible token
==========================

In this tutorial, you will learn how to mint semi-fungible tokens on Concordium testnet with ``concordium-client``, the Concordium command line interface tool.  In the :ref:`NFT minting tutorial<nft-index>`, you learned many things, including how you can mint an NFT on Concordium and set up your development environment with node configurations, wallet and key exports, build, deploy, initialize, mint and transfer. The process in this tutorial will be the same as the first tutorial: first is the wallet setup and key exports, then the storage solutions and preparation of metadata, and finally the development part including minting, transferring and querying balances.

Before you start this tutorial, if you have not completed your development environment setup, see :ref:`Setup the development environment<setup-env>`. This tutorial assumes you’ve already configured your environment, have a node running, and installed your web wallet and exported its key.

What are Semi-Fungible Tokens
=============================

When do you need a semi fungible token or why do you need them in the first place? Of course depending on your use case they can really add more value to your project as they bring both fungibility and non-fungibility, and not to mention that it may be as a significantly cheaper option than minting non-fungible tokens for everything. `This article <https://medium.com/@bogachanyigitbasi/about-semi-fungible-tokens-9b2fb74ea057>`_ has more information.

Have you ever been to a rock concert, one with people screaming, jumping and acting crazy? Thousands of people stand on a pitch in a stadium, for example? Or a new year's party in a nice, cozy and cool pub? Or visited any ancient cities like `this one <https://en.wikipedia.org/wiki/Ephesus>`_ that require hours of walking to explore? If the answer is yes, then you know that you need a ticket to do that. For example, let’s say you pay for them for your family or friends and buy 4 tickets. Now let’s take a look at each example with your tickets. Think about that concert. Does it really matter the number on that ticket as everybody is standing and having fun? Or when you are sitting at a table in a pub with your friends does it matter which chair you are sitting in?

The only thing that matters to the owner is you have that ticket to enter the place. You can change your ticket with your friends or anyone else, or you can buy that ticket from someone who cannot attend. There is no difference in that sense, because you still have a ticket that allows you to join the event. So you have to have at least one of them but it doesn’t really matter which one. This is a perfect use case for a semi-fungible token! It utilizes both fungibility and non-fungibility.

Let’s dive deeper. What if there are different groups of tickets like bronze and gold ones, for example. Gold ones have a limited amount of direct access to backstage. Then you will need to mint 2 types of semi-fungible tokens like 1000 bronze concert tickets and 40 exclusive fun tickets. You can implement your use case with regular NFTs with a 1040 minting process and it will exactly give you the same functionality. But that will come with some additional costs. On the other hand, minting two semi-fungible tokens (with a 1000 + 40 supply) is cheaper than minting 1040 NFTs.

One of the best use cases of semi-fungible tokens is in gaming and the metaverse. They are widely used in online gaming today. In-game items, characters, gold, and coins are perfect examples of it. You can push your imagination, the possibilities are endless. An example is the idea of Steve Jobs’s semi-fungible figure on the `Sandbox <https://www.sandbox.game/en/assets/jobs-lululand/49dc1a31-c02a-428b-96be-035cda6b4b3f/>`_. As you can see it’s minted as 100 and that indicates 100 different owners could have a right to use it in their game basically. (Or only one owner can use it 100 times of course; it’s some sort of licensing in that sense.)

.. toctree::
   :maxdepth: 1
   :caption: Semi-fungible token minting

   build-smart-contract
   mint-xfer
