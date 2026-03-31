.. _verify-access-additional-steps:

Additional Steps
================

This section covers advanced topics including requesting different types of proofs, testing your integration, and understanding what you've built.

Requesting Additional Proofs
-----------------------------

Beyond age verification, you can request various identity attributes. There are two main types of statements:

1. **Range Proofs** (``AttributeInRange``) - Prove a value is within a range WITHOUT revealing it (zero-knowledge)
2. **Reveal Attributes** (``RevealAttribute``) - Ask user to share the actual value

Age Verification (Zero-Knowledge)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**What it does:** User proves they're 18+ without revealing their birthdate.

Already implemented in our tutorial! Here's how it works:

.. code-block:: typescript

   {
     type: "AttributeInRange",      // Range proof (zero-knowledge)
     attributeTag: "dob",            // Date of birth
     lower: "19000101",              // Must be after Jan 1, 1900
     upper: getDobUpperBound(),      // Must be before the age cutoff
   }

**Result:** Verifier knows user is 18+, but never sees the actual birthdate.

Verify EU Citizenship (Zero-Knowledge)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Use case:** Content restricted to EU residents only.

Add to ``src/lib/config.ts``:

.. code-block:: typescript

   // List of EU country codes (ISO 3166-1 alpha-2)
   const EU_COUNTRIES = [
     "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
     "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
     "PL", "PT", "RO", "SK", "SI", "ES", "SE",
   ];

   export function getEUResidencyStatement() {
     return [
       {
         type: "AttributeInSet" as const,
         attributeTag: "countryOfResidence",
         set: EU_COUNTRIES,
       },
     ];
   }

Use in ``verifier-service.ts``:

.. code-block:: typescript

   statements: [
     {
       type: "AttributeInRange",
       attributeTag: "dob",
       lower: "19000101",
       upper: dobUpperBound,
     },
     ...getEUResidencyStatement(),  // Add EU check
   ],

**Result:** Verifier knows user lives in the EU, but doesn't know which specific country.

Reveal National ID Number
~~~~~~~~~~~~~~~~~~~~~~~~~~

**Use case:** KYC (Know Your Customer) for financial services - you need the actual ID.

Add to ``src/lib/config.ts``:

.. code-block:: typescript

   export function getNationalIdRevealStatement() {
     return [
       {
         type: "RevealAttribute" as const,
         attributeTag: "nationalIdNo",
       },
     ];
   }

Use in ``verifier-service.ts``:

.. code-block:: typescript

   statements: [
     {
       type: "AttributeInRange",
       attributeTag: "dob",
       lower: "19000101",
       upper: dobUpperBound,
     },
     ...getNationalIdRevealStatement(),  // User will share their ID number
   ],

**Result:** User's actual national ID number is revealed and included in the verified proof.

.. warning::
   **Privacy Note:** Only request revealed attributes when absolutely necessary. Zero-knowledge proofs are always preferable.

Verify Document Type
~~~~~~~~~~~~~~~~~~~~~

**Use case:** Only accept passport holders (not national ID cards).

.. code-block:: typescript

   export function getPassportOnlyStatement() {
     return [
       {
         type: "AttributeInSet" as const,
         attributeTag: "idDocType",
         set: ["0"], // 0 = passport, 1 = national ID card
       },
     ];
   }

Reveal Name for Personalization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Use case:** Personalized greeting without full KYC.

.. code-block:: typescript

   export function getNameRevealStatements() {
     return [
       {
         type: "RevealAttribute" as const,
         attributeTag: "firstName",
       },
       {
         type: "RevealAttribute" as const,
         attributeTag: "lastName",
       },
     ];
   }

Use in ``verifier-service.ts``:

.. code-block:: typescript

   statements: [
     {
       type: "AttributeInRange",
       attributeTag: "dob",
       lower: "19000101",
       upper: dobUpperBound,
     },
     ...getNameRevealStatements(),  // Get first and last name
   ],

**How to access revealed attributes:**

After verification succeeds, the revealed values are in the proof:

.. code-block:: typescript

   // In your verify API route
   const result = await verifyPresentation({...});

   // Access revealed attributes from the credential subject
   const credentialSubject = result.verificationAuditRecord.presentation
     .verifiableCredential[0].credentialSubject;

   // credentialSubject.statement contains the revealed attributes
   const statements = credentialSubject.statement;

   // Find revealed attributes
   statements.forEach(stmt => {
     if (stmt.type === "AttributeValue") {
       console.log(`${stmt.attributeTag}: ${stmt.attributeValue}`);
       // Example output: "nationalIdNo: N-1234"
       // Example output: "firstName: John"
     }
   });

Available Attribute Tags
~~~~~~~~~~~~~~~~~~~~~~~~~

**Identity Attributes:**

- ``firstName`` - Given name (use with RevealAttribute)
- ``lastName`` - Family name (use with RevealAttribute)
- ``sex`` - ``0`` (female) or ``1`` (male) (use with AttributeInSet)
- ``dob`` - Date of birth in YYYYMMDD format (use with AttributeInRange)
- ``countryOfResidence`` - ISO 3166-1 alpha-2 code (use with AttributeInSet or RevealAttribute)
- ``nationality`` - ISO 3166-1 alpha-2 code (use with AttributeInSet or RevealAttribute)
- ``idDocType`` - ``0`` (passport) or ``1`` (national ID card) (use with AttributeInSet)
- ``idDocNo`` - ID document number (use with RevealAttribute)
- ``idDocIssuer`` - ISO 3166-1 alpha-2 issuing country (use with AttributeInSet or RevealAttribute)
- ``idDocIssuedAt`` - Issue date in YYYYMMDD format (use with AttributeInRange)
- ``idDocExpiresAt`` - Expiry date in YYYYMMDD format (use with AttributeInRange)
- ``nationalIdNo`` - National identification number (use with RevealAttribute)
- ``taxIdNo`` - Tax identification number (use with RevealAttribute)

**Statement Types:**

.. mermaid::

   graph TD
       A[Statement Types] --> B[AttributeInRange]
       A --> C[AttributeInSet]
       A --> D[RevealAttribute]
       A --> E[AttributeNotInSet]

       B --> B1[Zero-knowledge range proof]
       B --> B2[Example: dob between dates]

       C --> C1[Zero-knowledge set membership]
       C --> C2[Example: nationality in EU list]

       D --> D1[Reveals actual value]
       D --> D2[Example: show firstName]

       E --> E1[Zero-knowledge exclusion]
       E --> E2[Example: not from blocked countries]

**Combining Multiple Statements:**

You can combine multiple requirements in one verification:

.. code-block:: typescript

   statements: [
     // Age check (ZK)
     {
       type: "AttributeInRange",
       attributeTag: "dob",
       lower: "19000101",
       upper: getDobUpperBound(),
     },
     // Must be EU resident (ZK)
     {
       type: "AttributeInSet",
       attributeTag: "countryOfResidence",
       set: ["DE", "FR", "ES", "IT", "NL"],
     },
     // Must have passport (ZK)
     {
       type: "AttributeInSet",
       attributeTag: "idDocType",
       set: ["0"],
     },
     // Reveal name for personalization
     {
       type: "RevealAttribute",
       attributeTag: "firstName",
     },
   ],

Best Practices
~~~~~~~~~~~~~~

✅ **DO:**

- Use zero-knowledge proofs whenever possible (AttributeInRange, AttributeInSet)
- Only reveal attributes when absolutely necessary
- Clearly explain to users what you're requesting and why
- Store revealed attributes securely (encrypt, minimize retention)

❌ **DON'T:**

- Request more attributes than you need
- Use RevealAttribute for age verification (use AttributeInRange instead)
- Store sensitive revealed data indefinitely
- Share revealed attributes with third parties without consent

Testing Your Integration
-------------------------

Start Everything
~~~~~~~~~~~~~~~~

.. code-block:: bash

   # Terminal 1: Start verifier service
   docker compose up concordium-verifier

   # Terminal 2: Start your app
   npm run dev

Test the Flow
~~~~~~~~~~~~~

1. Open http://localhost:3000
2. Click "Verify Age with Concordium ID"
3. SDK modal appears with QR code
4. Scan QR with Concordium ID app
5. Approve the age proof request in the app
6. Your web app receives the proof
7. Verifier service validates it
8. User gains access

**Full Verification Flow:**

.. mermaid::

   sequenceDiagram
       autonumber
       participant Browser
       participant YourAPI
       participant Verifier
       participant Wallet
       participant Chain

       Browser->>Browser: User clicks "Verify Age"
       Browser->>YourAPI: POST /api/verification/create
       YourAPI->>Verifier: POST /create-verification-request
       Verifier->>Chain: Anchor VRA (tx hash stored)
       Verifier-->>YourAPI: Return VPR + audit record ID
       YourAPI-->>Browser: Return sessionId + VPR
       Browser->>Browser: SDK shows QR code modal
       Wallet->>Wallet: User scans QR code
       Browser->>Wallet: WalletConnect session established
       Browser->>Wallet: Send VPR (age ≥ 18 request)
       Wallet->>Wallet: User approves
       Wallet->>Wallet: Generate ZK proof locally
       Wallet-->>Browser: Send VP (verifiable presentation)
       Browser->>YourAPI: POST /api/verification/verify
       YourAPI->>Verifier: POST /verify (VP + VPR + audit ID)
       Verifier->>Verifier: Validate ZK proof
       Verifier->>Chain: Anchor VAA (verification audit)
       Verifier-->>YourAPI: "verified" + tx hash
       YourAPI-->>Browser: Success
       Browser->>Browser: Grant access

Debug Common Issues
~~~~~~~~~~~~~~~~~~~

**Issue: "Module not found" error with SDK**

Solution: Remove ``--webpack`` flag from ``package.json``:

.. code-block:: json

   "dev": "next dev"  // not "next dev --webpack"

**Issue: QR code not showing**

Solution: Check browser console for WalletConnect Project ID errors. Ensure ``.env.local`` is loaded.

**Issue: Verification fails**

Solution: Check verifier service logs:

.. code-block:: bash

   docker logs concordium-verifier

**Issue: Session persists across page reloads**

Solution: Clear WalletConnect IndexedDB in browser console:

.. code-block:: javascript

   indexedDB.deleteDatabase("WALLET_CONNECT_V2_INDEXED_DB");

What You've Built
-----------------

✅ **Docker-based verifier service** running locally

✅ **WalletConnect integration** for mobile wallet pairing

✅ **Zero-knowledge age verification** without revealing DOB

✅ **On-chain proof anchoring** for audit trails

✅ **Reusable verification hook** for any React app

What You Learned
----------------

This tutorial taught you:

- How zero-knowledge proofs work in practice
- How to integrate blockchain identity verification
- How to structure a Next.js app with proper SSR/CSR separation
- How WalletConnect enables mobile wallet pairing
- How to request different types of identity proofs

----

.. warning::
   ⚠️ Before going to production, consider adding security features and an audit
