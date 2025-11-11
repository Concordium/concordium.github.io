.. _provenance-tags-interview:

Interview with `Provenance Tags <https://ptagchain.io/>`_
=========================================================

**Developer Spotlight: A Conversation with Niels Soerensen, founder and CTO of Provenance Tags**

.. figure:: PT.png
   :alt: Provenance Tags team photo
   :align: center
   :scale: 80%

   *Provenance Tags team*

In this interview, we speak with Niels Soerensen, founder and CTO of Provenance Tags, to learn more about how the project is redefining trust, transparency, and product authentication in e-commerce and logistics.

Could you share the inspiration behind founding Provenance Tags and the specific challenges you aimed to address in the e-commerce and supply chain sectors?
------------------------------------------------------------------------------------------------------------------------------------------------------------

**Niels:** The idea came from real-world challenges in e-commerce and global supply chains — especially around trust, fraud prevention, and product authentication. But what truly drove us was seeing how fake and counterfeit products, especially medication in underdeveloped regions, result in hundreds of thousands of preventable deaths each year.

Despite the severity, many of these regions already have mobile infrastructure. With Provenance Tags, doctors and health workers can instantly verify a medication’s authenticity with a simple smartphone scan, making it a low-cost, scalable solution that can save lives.

We knew that combining secure, tamper-proof tags with a privacy-first blockchain like Concordium could help bring verifiable trust not only to luxury goods or e-commerce — but to the most critical and life-sensitive sectors globally.

Your recent focus has been on E-Fulfillment Reinvented. Could you elaborate on this concept and how it transforms the traditional e-fulfillment process?
--------------------------------------------------------------------------------------------------------------------------------------------------------

**Niels:** E-Fulfillment Reinvented is our response to inefficiencies in how e-commerce handles payments, identity verification, and shipping. By integrating Provenance Tags with Concordium’s blockchain and payment services, we eliminate high fees, streamline ID verification using Zero-Knowledge Proofs (ZKPs), enable in-transit yield via stablecoins, and authenticate products with a tap — all with privacy and transparency baked in.

What makes the current e-fulfillment process inefficient or insecure, and how does your solution improve upon it?
-----------------------------------------------------------------------------------------------------------------

**Niels:** Traditional systems rely on insecure payment holding, expensive credit card networks, and slow manual identity checks. There’s no way to easily prove a product is genuine. Our system replaces this with programmable payment flows, Zero-Knowledge Proofs based identity checks, and authenticated Provenance Tags — making the entire process more secure and cost-efficient.

Provenance Tags utilizes encrypted, tamper-proof tags for product authentication. Can you explain how these tags work and their role in ensuring product integrity throughout the supply chain?
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Niels:** Provenance Tags are encrypted, tamper-proof RFID tags that store secure product data. They are unclonable and physically destroy themselves if tampered with. Each tag is tied to a digital twin (NFT) on the Concordium blockchain, logging key supply chain events immutably and enabling trust at every step.

You’ve integrated Provenance Tags with multiple blockchains, including Concordium, Avalanche, and Ethereum. What advantages does this multi-chain approach offer to your clients and end-users?
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Niels:** All assets — including NFTs and authentication proofs — are always anchored on Concordium. We chose Concordium because of its built-in ID layer, privacy features using Zero-Knowledge Proofs, and strong compliance foundations, which are essential for secure and trusted product verification.

However, we also recognize the need for cross-chain visibility. That’s why we enable other blockchains like Ethereum, Avalanche, or Polygon to view and interact with Concordium-based NFTs, while preserving the source of truth on Concordium.

This gives developers and dApps the flexibility to build within their preferred ecosystems while relying on the security, privacy, and regulatory-grade identity of Concordium as the foundation.

How does the use of Concordium’s Zero-Knowledge Proofs (ZKP) enhance security and privacy, especially in scenarios like delivery verification or ownership confirmation?
------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Niels:** ZKPs let us prove identity without revealing private information. For example, at the point of delivery, a user can confirm they’re authorized `without showing an ID <https://docs.concordium.com/en/mainnet/docs/network/web3-id/index.html>`_. We also use ZKPs to prove ownership, enabling secure transfer of ownership of goods during delivery — all without compromising privacy.

Your platform also uses the `Concordium Wallet SDK <https://docs.concordium.com/en/mainnet/tools/wallet-sdk/wallet-sdk.html>`_ and `Rust SDK <https://github.com/Concordium/concordium-rust-sdk>`_. How have these tools helped streamline development and user experience?
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Niels:** They streamlined both frontend and backend development. The Wallet SDK made it easier to integrate secure identity flows on mobile, while the Rust SDK allowed us to efficiently build reliable services for real-time verification and logging. It helped us reduce development time and increase robustness.

Provenance Tags offers a white-label smartphone SDK in React Native. How does this enable faster adoption and integration by other businesses?
----------------------------------------------------------------------------------------------------------------------------------------------

**Niels:** It allows brands and partners to integrate our tag scanning and product verification flow directly into their apps with minimal effort. They can offer secure, trusted experiences without rebuilding the technology stack — accelerating adoption.

You mentioned that some parts of the platform are open source. Which components are publicly available, and how can developers or the community get involved?
-------------------------------------------------------------------------------------------------------------------------------------------------------------

**Niels:** Our platform is not fully open source to the public — but we do provide select components to trusted partners within our own ecosystem. These include tools like our tag verifier logic, SDKs, and API interfaces, which help partners build and integrate quickly while maintaining the integrity and security of the system. By keeping it within our ecosystem, we can ensure high-quality integrations, protect against misuse, and maintain trust across all verified participants.

In industries like pharmaceuticals and luxury goods, counterfeiting is a significant issue. How does Provenance Tags provide solutions tailored to these sectors to combat counterfeit products?
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Niels:** By making the tag part of the product — and binding it immutably to the blockchain — we prevent substitution or cloning. Consumers or inspectors can instantly scan the tag and verify the product’s origin, history, and integrity. In pharma, this supports regulation; in luxury, it protects brand trust.

What types of companies are already using Provenance Tags, and what results have they seen so far?
--------------------------------------------------------------------------------------------------

**Niels:** We're working with partners across fine wines, logistics, and industrial tracking. In each case, Provenance Tags enable secure authentication, location-aware validation, and automated compliance reporting — and they’ve seen reduced fraud and greater customer trust.

Your platform emphasizes minimal carbon emissions and sustainability. Could you discuss the environmental considerations taken into account during the development of Provenance Tags?
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Niels:** We focus on minimal infrastructure by using low-energy RFID tags and blockchain layers like Concordium with low carbon footprints. Yield-generating flows also encourage efficient capital use, and our system supports circular economy principles by ensuring reuse tracking and quality validation.

Does Provenance Tags plan to launch a native token?
---------------------------------------------------

**Niels:** Not at the moment.

Will the token be issued on the Concordium blockchain? If so, do you plan for it to follow the `CIS-2 standard <https://proposals.concordium.com/CIS/cis-2.html>`_ ?
--------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Niels:** We already have many CIS-2 tokens — digital twins. In fact, we already minted over 1 million CIS-2 standard NFTs on Concordium. We have also processed over 50 million simple data registration transactions.

Do you plan any public or private token sale rounds in the future?
------------------------------------------------------------------

**Niels:** Not at the moment.

How will the token economy support real-world use cases like product authentication, payment settlement, or merchant rewards?
-----------------------------------------------------------------------------------------------------------------------------

**Niels:** Tokens will cover transaction costs, reward validators, and enable conditional flows — like releasing payments upon delivery or dividing yield among stakeholders. They also act as an incentive layer for merchants, carriers, and users.

Are there any staking, yield-sharing, or governance mechanisms planned as part of the Provenance Tags token model?
------------------------------------------------------------------------------------------------------------------

**Niels:** Yes. We plan to offer yield-sharing tied to in-transit funds, and later, governance features so stakeholders can influence protocol decisions — particularly around fee structures and integrations.

What are the biggest challenges you're currently facing in development or adoption?
-----------------------------------------------------------------------------------

**Niels:** Driving adoption among carriers and e-commerce platforms. The tech is ready, but onboarding the first major partners and aligning with logistics workflows is the current challenge. We’re also ensuring scalability and regulatory alignment.

What are the key milestones and future developments we can expect from Provenance Tags in the coming years?
-----------------------------------------------------------------------------------------------------------

**Niels:** A full Proof of Concept rollout with stablecoins, ZKP delivery verification and in-transit yield, expanded SDK features, and integration with major e-commerce platforms. Our 120-day plan includes full web shop + delivery workflow testing and onboarding more partners across sectors.

Final Thoughts
--------------

Provenance Tags is building trust infrastructure for global commerce — not by reinventing what works, but by securing what matters. With a privacy-first approach, real-world integrations, and a mission-driven roadmap, Niels Soerensen and his team are leading the charge for authenticated, efficient, and decentralized trade.
