.. _edubuk-interview:

Interview with `Edubuk <https://edubukeseal.org/>`_
===================================================

**Developer Spotlight: A Conversation with Apoorva Bajaj, Co-Founder and CEO of Edubuk**

.. figure:: edubuk.png
   :alt: Edubuk team photo
   :align: center
   :scale: 80%

   *Edubuk team*

In this edition of Developer Spotlight, we speak with the Edubuk team to understand how their platform is built from a technical perspective.
The conversation focuses on Edubuk’s experience developing blockchain-based credential solutions on Concordium, including products such as eSeal and TruCV.

We discuss how the team approaches development, which Concordium features are used in practice, and what challenges arise when building systems for real-world education and hiring use cases.
This interview is intended for developers who want to learn how a production-ready project is implemented on Concordium.

Introduction
============

Can you introduce yourself and tell us about your background in technology?
---------------------------------------------------------------------------

**Apoorva:** I'm part of the core engineering and product leadership team at Edubuk, working at the intersection of AI, blockchain, and digital credentials.
My background spans full-stack system design, blockchain protocol integration, and enterprise-grade application architecture, with a strong focus on building production-ready systems rather than experimental demos.

Before Edubuk, our team worked extensively on data systems, security-first architectures, and compliance-heavy environments, which naturally shaped how we approach decentralized systems today.
At Edubuk, we are responsible for designing and deploying TruCV --- a blockchain-based, verifiable CV and credential framework used by universities, employers, and governments.

How did you first get into blockchain or Web3?
----------------------------------------------

**Apoorva:** We entered blockchain not out of hype, but out of necessity. While working on credential verification and hiring workflows, we repeatedly encountered the same hard problems:

•	Credential forgery and unverifiable claims

•	Centralized databases acting as single points of failure

•	No cryptographic way to prove authenticity without exposing personal data

Traditional databases and PKI systems simply couldn't solve trust at scale across institutions.
Blockchain became compelling once we realized it could act as a neutral trust layer, where:

•	Issuers don't need to trust each other

•	Verifiers don't need direct integrations

•	Individuals retain ownership of their data

From there, Web3 became less about tokens and more about verifiable truth, privacy, and interoperability.

What motivated you --- from a technical standpoint --- to choose Concordium as your base chain? Was it performance, identity integrations, tooling, or something else?
----------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Apoorva:** Choosing Concordium was a very deliberate engineering decision, driven by production requirements rather than ideology. The key technical reasons were:

- **Protocol-level Identity**. For verifiable credentials, identity is not optional. Concordium's built-in ID layer allowed us to anchor real-world accountability while still preserving on-chain privacy. No custom KYC smart contracts. No fragmented identity logic. It's native to the protocol.

- **Privacy by Design using Cryptography**. Concordium's zero-knowledge proof support allows users to prove facts without revealing raw data. This aligned perfectly with our GDPR, DPDP, and CCPA compliance requirements.

- **Deterministic Finality & Predictable Fees**. Credential issuance and verification are real-world workflows --- they cannot fail randomly or become expensive overnight. Concordium's fast finality and stable, predictable transaction costs made it viable for mass issuance at institutional scale.

- **Mature Smart Contract Model**. The Rust-based smart contract environment allowed us to write secure, auditable, and deterministic logic, which is essential when credentials are long-lived and legally relevant.

- **Enterprise & Regulator Readiness**. Most chains optimize for DeFi or NFTs. Concordium optimizes for regulated use cases, which matches our users: universities, employers, public institutions, and cross-border partners.

About Edubuk Project
====================

Could you give us a brief summary of your project?
--------------------------------------------------

**Apoorva:** Edubuk is building **TruCV**, world's first blockchain-verified, tamper-proof digital CV and credential framework designed for real-world hiring and education ecosystems.
At a technical level, TruCV enables:

•	Issuance of academic and professional credentials by trusted institutions

•	On-chain verification of authenticity and integrity

•	Off-chain, user-controlled storage of documents

•	Privacy-preserving sharing of verifiable claims

The system combines blockchain anchoring, cryptographic proofs, and AI-driven job matching, allowing employers to verify credentials instantly while candidates retain full ownership of their data.

What problem does your project aim to solve, and for whom?
----------------------------------------------------------

**Apoorva:** The core problem is trust fragmentation in education and hiring. Today:

•	Employers cannot reliably verify CV claims

•	Universities struggle with costly, manual verification requests

•	Candidates lose control over their data

•	Governments face credential fraud at national scale

TruCV solves this for:

•	Students and professionals → portable, verifiable credentials they own

•	Universities and training institutions → secure issuance without managing verification infrastructure

•	Employers and recruiters → instant, cryptographically verifiable hiring signals

•	Governments and regulators → auditability without mass data exposure

The result is trust without centralization.

What makes your project built on the Concordium chain unique from other similar projects?
-----------------------------------------------------------------------------------------

**Apoorva:** Building TruCV on Concordium allowed us to address challenges that are extremely difficult to solve on identity-agnostic blockchains. What makes TruCV unique is not just that credentials are stored on-chain, but how identity, privacy, and accountability are combined at a system level.

TruCV is built around the idea that verifiable credentials must be issued by real, accountable institutions, while still protecting user privacy. Concordium’s protocol-level identity allows issuers to be cryptographically verified entities, which makes credential issuance auditable and legally defensible, without forcing users to expose personal data on-chain. This balance between accountability and privacy is essential for CVs and credentials to work in real-world, regulated environments.

At the same time, TruCV is designed so that verification can happen without disclosing underlying personal data. Credentials can be proven valid while sensitive information remains off-chain, with selective disclosure enforced cryptographically. This is a core requirement for operating across jurisdictions with regulations such as GDPR, DPDP, and CCPA.

Another key differentiator is reliability at scale. Credential issuance is not an experimental workflow — it is an operational process for universities and employers. Concordium’s deterministic finality and predictable transaction costs allow us to issue credentials in batches, avoid re-organization risks, and provide institutions with the level of reliability and guarantees they expect.

Finally, TruCV treats credentials as long-lived assets. CVs must remain verifiable years after issuance, support controlled revocation, and withstand audits over time. Concordium’s smart contract model enabled us to design contracts with clear state transitions and strong security properties, which is critical when credentials are meant to serve as durable proofs rather than short-lived tokens.

Taken together, these factors allow TruCV to function not just as a Web3-native product, but as infrastructure that universities, employers, and governments can realistically adopt.

Team and Background
===================

Could you share a bit about your team?
--------------------------------------

**Apoorva:** The leadership team is alumni from Indian IVY League colleges: IIT, IIM, GoldMedallist, CFA Charterholder, ex-Goldman Sachs,
JP Morgan, DE Shaw and ex-Professor from Indian Education Ecosystem, also Topper and Summa Cum Laude from their academics perspective.
Edubuk is built by a cross-functional team combining deep expertise in blockchain engineering, AI systems, and enterprise education technology.

From the beginning, the team has focused on building production-grade infrastructure rather than experimental prototypes.
This mindset comes from working closely with universities, employers, government bodies, and regulated ecosystems, where reliability, security, and compliance are essential.
The team operates with a product-first and engineering-led culture.

How many team members are participating in the project?
-------------------------------------------------------

**Apoorva:** The core team working on Edubuk and TruCV consists of 12 members, supported by extended contributors and advisors across technology, academia, and policy.
The core group includes blockchain and smart contract engineers, backend and platform engineers, AI and data science specialists, and product, compliance, and partnerships leads.

Where is your team based?
-------------------------

**Apoorva:** The team operates in a distributed setup, with a strong base in India, and active collaboration across and the Middle East.
This geographic distribution mirrors the cross-border nature of education credentials and hiring.

What are the areas of expertise represented in your team?
---------------------------------------------------------

**Apoorva:** Our team brings together expertise across several critical domains:

•	Blockchain & Smart Contracts: Design and deployment of secure, auditable smart contracts on Concordium.

•	AI & Data Systems: Building AI-driven CV-to-job matching, skill inference, and analytics on top of verified data.

•	Backend & Platform Engineering: Scalable APIs, off-chain storage orchestration, indexing services.

•	Security & Compliance: Designing systems compliant with GDPR, DPDP, and CCPA.

•	Education & HR Domain Expertise: Deep understanding of academic credentialing and hiring workflows.

Technology Deep Dive
====================

What key technologies, frameworks, or tools did you use to build your project?
------------------------------------------------------------------------------

**Apoorva:** Edubuk's TruCV and eSeal systems are built using a hybrid on-chain / off-chain architecture, optimized for privacy, compliance, and scale. Core stack highlights:

•	Blockchain Layer: Smart contracts written in Rust on Concordium. On-chain state used only for hash anchoring, metadata, issuer proofs, and revocation flags.

•	Identity & Wallet Layer: Concordium's protocol-level identity framework and CCD wallet.

•	Backend & APIs: Node.js / Python microservices, REST + event-driven services.

•	Off-Chain Storage: User-controlled storage. Only cryptographic hashes and proofs are recorded on-chain.

•	AI & Data Layer: NLP models for CV parsing, AI-driven JD-to-CV matching using verified credential signals.

This separation ensures the blockchain is used only where trust and immutability are required.

Are there technical insights or architectural decisions you'd highlight for other developers?
---------------------------------------------------------------------------------------------

**Apoorva:** Yes - three key takeaways:

1. Do not put personal data on-chain unless absolutely required. Use blockchain as a trust anchor, not a database.

2. Identity should be native, not bolted on. Protocol-level identity simplifies compliance and security enormously.

3. Design for 5-10 year durability. Credentials must remain verifiable long after technologies change.

Your eSeal system is central to how Edubuk issues tamper-proof certificates on-chain. Could you explain how eSeal works at a high level and why you chose to anchor these credentials on Concordium blockchain?
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Apoorva:** eSeal is Edubuk's tamper-proof digital sealing system for certificates, transcripts, CVs, and official documents. How it works at the high Level:

1.	Document Creation: Institution issues a digital document.

2.	Cryptographic Sealing: A cryptographic hash is generated and signed by the issuer's verified Concordium identity.

3.	On-Chain Anchoring: The hash, issuer signature, timestamp, and metadata are recorded on-chain. No document content is stored.

4.	Verification: Any verifier can re-hash the document and match it against the on-chain record to confirm authenticity.

We chose Concordium because eSeal requires three guarantees simultaneously: Authenticity (verified issuer identities), Privacy (no personal data on-chain), and Legal & Regulatory Readiness (lawful accountability). These are native protocol properties on Concordium.

TruCV is a powerful concept - a fully verifiable CV built from authenticated on-chain credentials. How do you envision TruCV improving trust between learners, institutions, and employers, and what opportunities does it unlock for the future of digital identity?
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Apoorva:** At its core, TruCV transforms the CV from a self-declared document into a cryptographically
verifiable trust object, replacing claims with verifiable truth by default. Improving Trust Across the Ecosystem:

- For Learners & Professionals: Gives ownership of credibility with a portable, verifiable profile, reducing friction and protecting privacy.

- For Institutions: Allows them to issue credentials once and have them verified globally, lowering overhead and increasing credibility.

- For Employers & Recruiters: Enables focus on candidate fit rather than authenticity, making hiring faster, fairer, and less risky.

TruCV represents a new model for digital identity that is privacy-preserving, accountable, and interoperable. It unlocks possibilities like:

- Minimal-Disclosure Identity: Proving attributes without revealing personal details.

- AI Systems That Trust Their Inputs: Models operating only on verified data for reliable outcomes.

- Cross-Border Credential Portability: Instant global verification and lifelong portability.

- Identity as a Public Good: Shifting ownership away from centralized platforms to individuals and institutions.

We see TruCV as a foundational layer for trusted digital identity, helping move the internet from a claims-based world to a proof-based one.

Community & Collaboration
=========================

How do you engage with your community, users, or partners, and what role do they play in your project's growth?
---------------------------------------------------------------------------------------------------------------

**Apoorva:** Community and partner engagement is a core input into our product design. We engage at three levels:

- Institutional Users - Universities, Employers, Governments. Their feedback influences credential formats, revocation workflows, and verification UX/SLAs. Early feedback is critical to avoid theoretical designs.

- Developers & Integrators: We work with them to stress-test APIs, identify friction in identity flows, and improve abstraction layers.

- End Users - Students & Professionals. They validate usability, privacy expectations, and data ownership models, influencing our off-chain storage and selective disclosure design.

How has our community supported you (Discord, forums, hackathons, grants, events)?
----------------------------------------------------------------------------------

**Apoorva:** The Concordium community has been supportive in concrete ways:

•	Developer Channels (Discord & Forums): Useful for clarifying identity flows and smart contract best practices. The signal-to-noise ratio is high.

•	Direct Technical Support & Knowledge Sharing: Benefited from documentation and example repos written for builders.

•	Ecosystem Alignment: Concordium's focus on identity, privacy, and regulatory readiness aligns closely with our mission, reducing friction with partners.

While hackathons/grants aren't our primary driver, the ecosystem's emphasis on long-term adoption over short-term hype is a strong cultural match.

Challenges & Lessons Learned
============================

What were the main technical challenges you encountered during development, and how did you address them?
---------------------------------------------------------------------------------------------------------

**Apoorva:** The main challenge was designing a system that balances three competing requirements: immutability, privacy, and real-world compliance.
Credentials must remain tamper-proof and long-lived, personal and academic data must not be exposed, and institutions and regulators need accountability and lawful auditability.
Reconciling these constraints required careful architectural separation.

We treat the blockchain strictly as a trust anchor, keep identity at the protocol level, and ensure that personal data remains off-chain under user control.
This approach became the foundation of the system after multiple iterations.

One concrete challenge was handling revocation without compromising immutability. While credential hashes remain permanently anchored on-chain,
revocation status is managed through issuer-controlled registries, allowing credentials to be invalidated in exceptional cases without altering historical records.

Another challenge was balancing privacy with verifiability. Storing full credentials on-chain was neither legally nor ethically acceptable,
so we adopted a hash-anchoring model where only cryptographic fingerprints and issuer signatures are recorded on-chain, while documents themselves remain off-chain.

Finally, institutional usability was a critical consideration. Most universities and employers are not Web3-native,
so we abstracted blockchain complexity behind familiar dashboards and APIs, minimizing the need for direct interaction with wallets or on-chain tooling.

What is the most important lesson you learned while building your project?
--------------------------------------------------------------------------

**Apoorva:** The most important lesson is: Blockchain should reduce complexity for real users - not increase it.
The most successful systems use blockchain sparingly and intentionally, hide complexity behind familiar interfaces,
and respect legal and usability constraints.

Another key lesson: identity and compliance cannot be bolted on later.
This is why building on Concordium worked so well—it allowed us to design for long-term trust and adoption from day one.

Future Plans and Vision
=======================

What's next for your project? What features or improvements are you planning?
-----------------------------------------------------------------------------

**Apoorva:** Our roadmap is focused on scaling trust, not just adding features. We are expanding the range of credentials supported by the platform,
including micro-credentials, employment history proofs, and government-issued certifications, so that TruCV can represent a broader and more complete professional profile.

At the same time, we are continuing to enhance AI-driven trust signals across the ecosystem.
This includes improving AI-based CV-to-job-description matching, skill gap analysis, and institution-level analytics, all built exclusively on verified data.
Together, these improvements are designed to make TruCV and eSeal easier to integrate, harder to misuse, and more valuable at scale.

Are there new capabilities you're excited to build using Concordium blockchain?
-------------------------------------------------------------------------------

**Apoorva:** Yes. Building on Concordium enables us to explore advanced selective disclosure and attribute proofs,
where specific attributes can be proven without revealing full credentials, enabling minimal-disclosure hiring scenarios.

We are also focused on verifiable credential interoperability by aligning with global standards for cross-platform verification,
which is essential as credentials move across systems and jurisdictions. In parallel, we are working on
governance-controlled credential lifecycles, introducing transparent and rule-based processes for credential updates and revocations.

Beyond credentials themselves, Concordium also enables ecosystem-level collaboration in areas such as identity-aware payments
and trusted data exchange between institutions, extending the value of verified identity across multiple use cases.

Final Question
==============
Is there anything important we haven't asked about? For example, would you like to share insights into how your AI job-matching system works or any other engineering elements behind Edubuk?
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Apoorva:** One important area is TruJobs - our AI-driven, trust-first job-matching system built on top of TruCV.
While TruCV establishes verifiable truth, TruJobs turns it into actionable intelligence.
Let me explain how TruJobs Works from an engineering perspective. Most job-matching systems operate on unverified, self-declared data. TruJobs is architected differently:

1.	Verified-Data-First AI Pipeline: Models only consume verified signals (on-chain credentials, institution-issued certificates), leading to proof-backed matching.

2.	CV-to-JD Matching with Explainability: Uses NLP and semantic similarity, weighting matches based on credential authenticity. Outputs an explainable match rationale.

3.	Privacy-Preserving Matching: AI inference runs on selectively disclosed attributes; raw documents remain off-chain.

4.	Trust-Aware Ranking: Ranks candidates based on credential trustworthiness, which is not possible on identity-agnostic platforms.

Why Concordium Matters for TruJobs ? It allows us to make AI systems accountable by anchoring them to cryptographic truth,
because identities are protocol-leveland issuers are real, verified entities. Engineering Insight: AI is only as good as the trustworthiness of its inputs.
By combining verifiable credentials (TruCV) with AI-driven matching (TruJobs), we design systems that are more accurate, fair, explainable, and compliant.

Closing
=======

Edubuk is building an end-to-end trust stack: eSeal (issuance), TruCV (identity), TruJobs (hiring).
Together, they represent a shift from claims-based digital systems to proof-based ones - essential for the future of education, employment, and digital identity.
