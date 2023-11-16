.. _getting-started:

===============
Getting started
===============

Concordium is focused on strengthening the valuable community's power and aiming to empower the ecosystem with talented developers.

Concordium Academy's vision: Our aim is to give you a verified learning path with good quality materials in your journey towards Web3, help to onboard in a gamified fashion, and motivate you while building on Concordium.

Throughout this journey, you will find a set of tutorials to follow and get more experienced with Concordium. Whether an absolute beginner or an expert, you will find good material that teaches you about smart contract development, dApps, wallets, and ID 2.0.

There are three different difficulty levels and each will have a couple of tutorials for that category where each is followed by an assignment section. You are expected to submit your assignments from the related section to gain a Soul-Bound Token minted by Concordium to verify you are a skilled developer.

What is Concordium?
===================

Concordium is a public-layer 1, science-backed blockchain, designed to balance privacy with accountability through its ID layer.

Concordium's vision: Concordium emphasizes true trust in this disrupting technology through the ID Layer.

The Concordium blockchain is a compliance-ready blockchain backed by science that enables private and public transactions. It offers high throughput, fast transactions, and predictable fees, allowing businesses, developers, and traders to harness blockchain’s true power and potential.

The protocol level ID ensures that every wallet is associated with a real-world identity that has been verified through a third-party ID provider so that people and companies can trust one another, while remaining private, with zero-knowledge proof.

You can read more about Identities, Accounts, Baking, Delegation and other concepts of Concordium `in the documentation <https://developer.concordium.software/en/mainnet/net/guides/learn-about-concordium.html>`_.

The ID layer
------------

Concordium's ID Layer is a unique identity management system that is integrated into the Concordium blockchain. It allows individuals and entities to establish a digital identity on the network and interact with each other securely and privately.
The ID Layer is designed to provide strong authentication, privacy protection, and regulatory compliance. It uses advanced cryptographic techniques such as zero-knowledge proofs, threshold signatures, and ring signatures to ensure the security and privacy of user data.
One of the key features of Concordium's ID Layer is that it allows users to control their own identity and personal data. Users can choose what information they share with others and can revoke access to their data at any time. This gives users more control over their digital identity and helps protect them from identity theft and other types of fraud.
Overall, Concordium's ID Layer is an important component of the Concordium blockchain and helps make it a secure, reliable, and privacy-focused platform for conducting business and exchanging value.

CIS-2 token types
-----------------

In this section, you will learn more about Concordium Interoperability Standard tokens. (CIS-2) Unlike some other Layer-1 token standards, CIS-2 represents more than one type of token with one standard including fungible tokens, non-fungible tokens, semi-fungible tokens, and soulbound tokens. You can read more information about the CIS-2 standard library at this link.

Concordium Interoperability Standard (CIS-2)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A standard interface for both fungible and non-fungible tokens is implemented in a smart contract. The interface provides functions for transferring token ownership, allowing other addresses to transfer tokens, and querying token balances, operators, and token metadata. It allows off-chain applications to track token balances and the location of token metadata using logged events. Read more about CIS-2 at this link.

.. dropdown:: Fungible tokens

    In this section you will learn about the fungibility of the tokens, Layer-1 blockchain coins, cryptourrencies and fiat money. Fungible tokens are tokens that can change interchangeably without causing any effect on the owner's account. This term is not only for cryptocurrencies or tokens but also accurate for fiat money as well. A banknote of 100 Euro is equal to two banknotes worth 50. Basically, if you switch your 100 euros with two 50s your account is not affected. The total value would remain the same. This comes from fungibility.

    **Layer-1 Coin**

    Like fiat money, there are fungible cryptocurrencies exist such as BTC (Bitcoin), ETH (Ethereum), or CCD (Concordium). These are examples of Layer-1 blockchains coins, owners can divide them into smaller parts, transfer them, trade them, and exchange them but all of these assets are one of a kind and they are interchangeable. 1 CCD will always be equal to 1 CCD. A Layer-1 can use this for allowing monetary transactions, covering transaction costs known as transaction fees, rewarding bakers or miners, etc. Depending on the total supply you can consider a coin deflationary or inflationary.

    **Token**

    A token is a form of a digital asset that represents a share of some either digital or physical asset. It has to be implemented on a Layer-1 blockchain like Concordium. A fungible token is like fiat money or coin of a Layer-1, an owner can divide it into smaller parts transfer it, trade it, and exchange it but all of these assets are one of a kind and they are interchangeable. 1 TKN will always be equal to 1 TKN.

.. dropdown:: Non-fungible tokens

    A Non-Fungible Token (NFT) is a special type of token that represents a digital or physical asset's ownership. An NFT can be an on-chain proof of artwork, a game asset, music, real estate, digital or physical any kind of data, documents, etc. Anything can become an NFT as the NFT itself holds a link to the asset data itself.

    One of the key drivers of this type of crypto asset is uniqueness. When you create an NFT you simply create a unique asset that is stored on-chain with a specific token ID on a contract. This is not possible for anyone else and your asset remains unique forever on-chain. This brings scarcity, and this is what artists need for their masterpieces.

    **Use Cases**

    But the use cases of NFTs are not limited to only art or some animal pictures. You can find a lot of use cases developing on Concordium in the following:

    - Carbon Credits and Carbon Marketplaces

    - Real Asset-Backed & Redeemable NFTs and Marketplaces

    - In-Game Assets and Item Markets

    - Token Gated Metaverses

    - Music NFTs and IP Rights

    - Esports and Game Tournaments

.. dropdown:: Semi-fungible tokens

    When do you need a semi-fungible token or why do you need them in the first place? Of course, depending on your use case they can really add more value to your project as they bring both fungibility and non-fungibility, and not to mention that it may be as a significantly cheaper option than minting non-fungible tokens for everything. This article has more information.

    Have you ever been to a rock concert, one with people screaming, jumping and acting crazy? Thousands of people stand on a pitch in a stadium, for example? Or a new year’s party in a nice, cozy and cool pub? Or visited any ancient cities like this one that requires hours of walking to explore? If the answer is yes, then you know that you need a ticket to do that. For example, let’s say you pay for them for your family or friends and buy 4 tickets. Now let’s take a look at each example with your tickets. Think about that concert. Does it really matter the number on that ticket as everybody is standing and having fun? Or when you are sitting at a table in a pub with your friends does it matter which chair you are sitting in?

    The only thing that matters to the owner is you have that ticket to enter the place. You can change your ticket with your friends or anyone else, or you can buy that ticket from someone who cannot attend. There is no difference in that sense because you still have a ticket that allows you to join the event. So you have to have at least one of them but it doesn’t really matter which one. This is a perfect use case for a semi-fungible token! It utilizes both fungibility and non-fungibility.

    Let’s dive deeper. What if there are different groups of tickets like bronze and gold ones, for example? Gold ones have a limited amount of direct access backstage. Then you will need to mint 2 types of semi-fungible tokens like 1000 bronze concert tickets and 40 exclusive fun tickets. You can implement your use case with regular NFTs with a 1040 minting process and it will exactly give you the same functionality. But that will come with some additional costs. On the other hand, minting two semi-fungible tokens (with a 1000 + 40 supply) is cheaper than minting 1040 NFTs.

    One of the best use cases of semi-fungible tokens is in gaming and the metaverse. They are widely used in online gaming today. In-game items, characters, gold, and coins are perfect examples of it. You can push your imagination, the possibilities are endless. An example is the idea of Steve Jobs’s semi-fungible figure on the Sandbox. As you can see it’s minted as 100 and that indicates 100 different owners could have a right to use it in their game basically. (Or only one owner can use it 100 times of course; it’s some sort of licensing in that sense.)

.. dropdown:: Soul Bound tokens

    A Soul Bound Token (SBT) is a special type of NFT that is publicly verifiable and represents an individual's credentials and affiliations. It is a unique, non-transferrable type of token created by an issuer. It could represent the authenticity of furniture, a graduation diploma or a certificate issued by a university, a subscription-based membership proof like a golf club, a level or profession about something for example an eSports game like League of Legends, etc.

    Concordium's Web3 ID will be effectively combining SBTs and its ID Layer with Zero Knowledge Proofs.
