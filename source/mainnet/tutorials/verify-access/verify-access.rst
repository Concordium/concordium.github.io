=========================================
Concordium Age Verification Tutorial
=========================================

A beginner-friendly guide to integrating privacy-preserving age verification using Concordium's zero-knowledge proofs.

.. contents:: Table of Contents
   :depth: 2
   :local:

----

What You'll Build
=================

An age-gated application where users prove they're 18+ **without revealing their actual birthdate**. The verification happens through:

- **Zero-knowledge proofs** (user proves age without sharing date of birth (DOB))
- **Concordium ID wallet** (user's phone holds their credentials, ID information private)
- **On-chain anchoring** (verification is recorded on blockchain for audit or transparency purposes)

.. mermaid::

   sequenceDiagram
       participant User
       participant YourApp
       participant VerifierService
       participant ConcordiumWallet
       participant Blockchain

       User->>YourApp: Clicks "Verify Age"
       YourApp->>VerifierService: Create verification request
       VerifierService->>Blockchain: Anchor VRA (Verification Request Anchor)
       VerifierService-->>YourApp: Return VPR (Verifiable Presentation Request)
       YourApp->>ConcordiumWallet: Send VPR via WalletConnect
       ConcordiumWallet->>User: Show "Prove age 18+"
       User->>ConcordiumWallet: Approve
       ConcordiumWallet->>ConcordiumWallet: Generate ZK proof (age ≥ 18)
       ConcordiumWallet-->>YourApp: Return VP (Verifiable Presentation)
       YourApp->>VerifierService: Verify presentation
       VerifierService->>Blockchain: Anchor VAA (Verification Audit Anchor)
       VerifierService-->>YourApp: "Verified ✓"
       YourApp->>User: Grant access

----

⚠️ Important: Tutorial Code Disclaimer
========================================

**This tutorial is designed for learning and development purposes.** The code examples prioritize clarity and education over production-readiness.

What this tutorial provides:
----------------------------

- ✅ Correct cryptographic implementation (zero-knowledge proofs work properly)
- ✅ Clean architecture (separation of concerns, reusable components)
- ✅ Educational comments (learn how everything works)
- ✅ Working integration (fully functional age verification)

**Use this as a foundation to learn the concepts, then harden it for production use.**

----

Prerequisites
=============

- **Next.js 16+** application (this tutorial uses Next.js App Router with React Server Components)
- **Docker Desktop** installed (`download <https://www.docker.com/products/docker-desktop>`_)
- **Node.js 18+** and npm
- **Concordium account** with keys (`get testnet keys <https://developer.concordium.software/en/mainnet/net/guides/create-account.html>`_)
- **Concordium ID wallet** app (`iOS <https://apps.apple.com/app/concordium-id/id1549313170>`_ / `Android <https://play.google.com/store/apps/details?id=software.concordium.mobilewallet.seedmobile>`_)

----

Part 0: Project Setup
=====================

Let's create a fresh Next.js project and set up the basic structure.

Step 0.1: Create Next.js App
-----------------------------

.. code-block:: bash

   # Create a new Next.js app with TypeScript and Tailwind CSS
   npx create-next-app@latest age-verification-app

   # You'll be prompted with these options - select:
   # ✔ Would you like to use TypeScript? … Yes
   # ✔ Would you like to use ESLint? … Yes
   # ✔ Would you like to use Tailwind CSS? … Yes
   # ✔ Would you like your code inside a `src/` directory? … Yes
   # ✔ Would you like to use App Router? … Yes
   # ✔ Would you like to use Turbopack for `next dev`? … Yes
   # ✔ Would you like to customize the import alias? … No

   # Navigate into the project
   cd age-verification-app

Step 0.2: Install Dependencies
-------------------------------

.. code-block:: bash

   # Install the Concordium verification SDK
   npm install @concordium/verification-web-ui

   # Install iron-session for session management (optional, for production)
   npm install iron-session

**Your package.json should now include:**

.. code-block:: json

   {
     "dependencies": {
       "@concordium/verification-web-ui": "^0.1.0",
       "iron-session": "^8.0.3",
       "next": "^16.0.0",
       "react": "^19.0.0",
       "react-dom": "^19.0.0"
     }
   }

Step 0.3: Create Folder Structure
----------------------------------

.. code-block:: bash

   # Create the required folders
   mkdir -p src/lib
   mkdir -p src/hooks
   mkdir -p src/components
   mkdir -p src/app/api/verification/create
   mkdir -p src/app/api/verification/verify

**Your project structure should look like:**

.. code-block:: text

   age-verification-app/
   ├── src/
   │   ├── app/
   │   │   ├── api/
   │   │   │   └── verification/
   │   │   │       ├── create/
   │   │   │       │   └── route.ts          (we'll create this later)
   │   │   │       └── verify/
   │   │   │           └── route.ts          (we'll create this later)
   │   │   ├── layout.tsx                    (already exists)
   │   │   └── page.tsx                      (already exists)
   │   ├── components/
   │   │   └── AgeGate.tsx                   (we'll create this later)
   │   ├── hooks/
   │   │   └── useVerification.ts            (we'll create this later)
   │   └── lib/
   │       ├── config.ts                     (we'll create this later)
   │       ├── session.ts                    (optional, for production)
   │       └── verifier-service.ts           (we'll create this later)
   ├── keys/                                 (we'll create this for Docker)
   ├── docker-compose.yml                    (we'll create this next)
   ├── .env.local                            (we'll create this now)
   └── package.json

Step 0.4: Set Up Environment Variables
---------------------------------------

Create a ``.env.local`` file in the root of your project:

.. code-block:: bash

   # Create .env.local file
   touch .env.local

Add the following content to ``.env.local``:

.. code-block:: bash

   # Concordium Network (testnet or mainnet)
   NEXT_PUBLIC_CONCORDIUM_NETWORK=testnet

   # Required age (default: 18)
   REQUIRED_AGE=18

   # Verifier Service URL (Docker container)
   VERIFIER_SERVICE_URL=http://localhost:8000

   # WalletConnect Project ID (get from https://cloud.walletconnect.com)
   # For now, use a placeholder - we'll get a real one in Part 2
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

   # App URL (your Next.js app)
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Session Secret (generate a random 32+ character string)
   # You can generate one with: openssl rand -base64 32
   SESSION_SECRET=change-me-to-a-random-string-at-least-32-characters

.. important::
   - Never commit ``.env.local`` to git (it's already in ``.gitignore``)
   - We'll update ``NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`` in Part 2
   - For production, use proper secrets management (AWS Secrets Manager, Vault, etc.)

Step 0.5: Test Your Setup
--------------------------

.. code-block:: bash

   # Start the Next.js development server
   npm run dev

Open http://localhost:3000 in your browser. You should see the default Next.js welcome page.

**Press Ctrl+C to stop the server.** We'll start it again after we add our verification code.

----

✅ **Checkpoint:** Next.js app created, dependencies installed, folder structure ready

----

Part 1: Running the Verifier Service
=====================================

The Concordium Verifier Service handles proof creation and verification. It runs as a Docker container.

Step 1.1: Get Your Account Keys
--------------------------------

You need a Concordium testnet account with keys exported. If you don't have one:

1. Follow the `Concordium account guide <https://developer.concordium.software/en/mainnet/net/guides/create-account.html>`_
2. Export your private key as ``private.export``
3. Save it in a ``keys/`` folder in your project root

Step 1.2: Create Docker Compose File
-------------------------------------

Create ``docker-compose.yml`` in your project root:

.. code-block:: yaml

   services:
     concordium-verifier:
       image: concordium/credential-verification-service:0.1.0
       platform: linux/amd64
       container_name: concordium-verifier
       restart: unless-stopped
       ports:
         - "8000:8000" # API endpoint
         - "8001:8001" # Monitoring endpoint
       environment:
         CREDENTIAL_VERIFICATION_SERVICE_NODE_GRPC_ENDPOINT: "https://grpc.testnet.concordium.com:20000"
         CREDENTIAL_VERIFICATION_SERVICE_API_ADDRESS: "0.0.0.0:8000"
         CREDENTIAL_VERIFICATION_SERVICE_MONITORING_ADDRESS: "0.0.0.0:8001"
         LOG_LEVEL: "info"
         CREDENTIAL_VERIFICATION_SERVICE_ACCOUNT: "/keys/private.export"
       volumes:
         - ./keys/private.export:/keys/private.export:ro

Step 1.3: Start the Verifier Service
-------------------------------------

.. code-block:: bash

   # Start the service
   docker compose up -d concordium-verifier

   # Check if it's running
   curl http://localhost:8000/health
   # Expected: {"status":"healthy"}

**Architecture:**

.. mermaid::

   graph LR
       A[Your App :3000] -->|HTTP| B[Verifier Service :8000]
       B -->|SDK-gRPC| C[Concordium Testnet]
       B -->|Reads| D[Private Keys]
       C -->|On-chain| E[Blockchain Anchors]

✅ **Checkpoint:** Verifier service running at http://localhost:8000

----

Part 2: Setting Up WalletConnect
=================================

WalletConnect enables mobile wallet pairing via QR codes.

Step 2.1: Get a Project ID
---------------------------

1. Visit `WalletConnect Cloud <https://cloud.walletconnect.com>`_
2. Sign up for a free account
3. Create a new project
4. Copy your **Project ID**

Step 2.2: Update Environment Variables
---------------------------------------

Open ``.env.local`` and update:

.. code-block:: bash

   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_actual_project_id_here

✅ **Checkpoint:** WalletConnect configured

----

Part 3: Integrating the Verification UI
========================================

Step 3.1: Install Dependencies
-------------------------------

.. code-block:: bash

   npm install @concordium/verification-web-ui

Step 3.2: Create Configuration
-------------------------------

**Purpose:** This file holds all the configuration constants your app needs. Think of it as a central settings file that other parts of your app can reference.

Create ``src/lib/config.ts``:

.. code-block:: typescript

   /**
    * TRUSTED_ISSUERS: The official identity providers that Concordium trusts.
    * When someone creates a Concordium ID, they do it through one of these
    * official providers. We only accept proofs from these trusted sources.
    *
    * Each "did:ccd:testnet:idp:X" is like a trusted government passport office.
    * The "did" stands for "Decentralized Identifier" - a blockchain address.
    */
   export const TRUSTED_ISSUERS = {
     testnet: [
       "did:ccd:testnet:idp:0", // Testnet identity provider 0
       "did:ccd:testnet:idp:1", // Testnet identity provider 1
       "did:ccd:testnet:idp:2", // Testnet identity provider 2
       "did:ccd:testnet:idp:3", // Testnet identity provider 3
     ],
     mainnet: [
       "did:ccd:mainnet:idp:0", // Mainnet identity provider 0
       "did:ccd:mainnet:idp:1", // Mainnet identity provider 1
       "did:ccd:mainnet:idp:2", // Mainnet identity provider 2
       "did:ccd:mainnet:idp:3", // Mainnet identity provider 3
     ],
   } as const;

   // Type definition: tells TypeScript we only accept "testnet" or "mainnet" as values
   export type ConcordiumNetwork = "testnet" | "mainnet";

   /**
    * NETWORK: Which blockchain network are we using?
    * - testnet: For development and testing (fake money, test identities)
    * - mainnet: For production (real money, real identities)
    *
    * This reads from your .env.local file, defaults to "testnet" if not set.
    */
   export const NETWORK = (process.env.NEXT_PUBLIC_CONCORDIUM_NETWORK ||
     "testnet") as ConcordiumNetwork;

   /**
    * ISSUERS: Gets the list of trusted identity providers for our current network.
    * If we're on testnet, this will be the testnet issuers.
    * If we're on mainnet, this will be the mainnet issuers.
    */
   export const ISSUERS = [...TRUSTED_ISSUERS[NETWORK]];

   /**
    * REQUIRED_AGE: The minimum age users must be.
    * Default is 18, but you can change this in .env.local
    */
   export const REQUIRED_AGE = parseInt(process.env.REQUIRED_AGE || "18", 10);

   /**
    * VERIFIER_SERVICE_URL: Where is our Docker verifier service running?
    * Default is localhost:8000 (the service we started in Part 1)
    */
   export const VERIFIER_SERVICE_URL =
     process.env.VERIFIER_SERVICE_URL || "http://localhost:8000";

   /**
    * getDobUpperBound(): Calculates the latest birthdate that qualifies as "old enough"
    *
    * How it works:
    * 1. Get today's date
    * 2. Subtract REQUIRED_AGE years from it
    * 3. Anyone born ON or BEFORE that date is at least REQUIRED_AGE years old
    *
    * Example: If today is Feb 17, 2026 and REQUIRED_AGE is 18:
    * - Cutoff date = Feb 17, 2008
    * - Returns: "20080217" (YYYYMMDD format)
    * - Anyone born before/on Feb 17, 2008 is 18+ years old
    */
   export function getDobUpperBound(): string {
     const now = new Date(); // Today's date

     // Create a date that's REQUIRED_AGE years ago
     const cutoff = new Date(
       now.getFullYear() - REQUIRED_AGE, // Subtract years
       now.getMonth(), // Keep same month
       now.getDate(), // Keep same day
     );

     // Format the date as YYYYMMDD string (e.g., "20080217")
     const year = cutoff.getFullYear().toString();
     const month = (cutoff.getMonth() + 1).toString().padStart(2, "0"); // +1 because months are 0-indexed
     const day = cutoff.getDate().toString().padStart(2, "0");

     return `${year}${month}${day}`;
   }

**What this file does:**

- ✅ Defines which identity providers we trust
- ✅ Sets which blockchain network to use (testnet/mainnet)
- ✅ Configures the minimum age requirement
- ✅ Calculates date boundaries for age verification

Step 3.3: Create Verifier Service Client
-----------------------------------------

**Purpose:** This file is your communication bridge to the Docker verifier service. It has two main jobs:

1. **Create proof requests** - "Hey user, please prove you're 18+"
2. **Verify proofs** - "Let me check if this proof is valid"

Create ``src/lib/verifier-service.ts``:

.. code-block:: typescript

   // Import our configuration settings from the previous step
   import { VERIFIER_SERVICE_URL, ISSUERS, getDobUpperBound } from "./config";

   /**
    * createVerificationRequest()
    *
    * This function asks the verifier service to create a "proof request" (VPR).
    * Think of it like creating a form that says "Please prove you're 18+ without
    * telling me your exact birthdate."
    *
    * The verifier service will:
    * 1. Create the proof request
    * 2. Record it on the blockchain (for audit purposes)
    * 3. Return the request so we can send it to the user's wallet
    */
   export async function createVerificationRequest(params: {
     connectionId: string; // WalletConnect session ID (links to user's wallet)
     resourceId: string; // What are they trying to access? (e.g., "/news")
     contextString: string; // Human-readable description (e.g., "Age verification")
   }) {
     // Calculate the cutoff date for age verification
     // Example: If we need 18+, this returns "20080217" (Feb 17, 2008)
     const dobUpperBound = getDobUpperBound();

     /**
      * Build the request body that we'll send to the verifier service.
      * This is the "form" we're asking the user to fill out.
      */
     const body = {
       // connectionId: Links this request to the user's WalletConnect session
       connectionId: params.connectionId,

       // resourceId: What resource needs age verification?
       resourceId: params.resourceId,

       // contextString: Human-readable explanation shown to the user
       contextString: params.contextString,

       // public_info: Extra metadata (shown in the proof, public on blockchain)
       public_info: { merchant: "my app" },

       /**
        * requestedClaims: This is the MOST IMPORTANT part.
        * It defines EXACTLY what we're asking the user to prove.
        */
       requestedClaims: [
         {
           // type: We want identity claims (from their Concordium ID)
           type: "identity",

           // source: Where should the proof come from? Their ID credential.
           source: ["identityCredential"],

           /**
            * issuers: We only accept proofs from these trusted identity providers.
            * This prevents fake IDs - only official Concordium identity providers
            * can issue valid credentials.
            */
           issuers: ISSUERS,

           /**
            * statements: The actual requirements we're checking.
            * This is where we define "prove you're 18+"
            */
           statements: [
             {
               /**
                * type: "AttributeInRange" means "prove this value is within a range"
                * This is ZERO-KNOWLEDGE - the user proves age WITHOUT revealing DOB
                */
               type: "AttributeInRange",

               // attributeTag: Which attribute? "dob" = date of birth
               attributeTag: "dob",

               /**
                * lower: Minimum birthdate (Jan 1, 1900)
                * This prevents errors for very old users
                */
               lower: "19000101",

               /**
                * upper: Maximum birthdate (the cutoff we calculated)
                * Example: "20080217" means born on/before Feb 17, 2008
                * Anyone with dob <= 20080217 is at least 18 years old today
                */
               upper: dobUpperBound,
             },
           ],
         },
       ],
     };

     /**
      * Send the request to our verifier service (running in Docker).
      * The service will create the VPR and anchor it on the blockchain.
      */
     const response = await fetch(
       `${VERIFIER_SERVICE_URL}/verifiable-presentations/create-verification-request`,
       {
         method: "POST", // POST request to create a new verification
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(body), // Convert our request to JSON
       },
     );

     // If something went wrong, throw an error with details
     if (!response.ok) {
       const text = await response.text();
       throw new Error(`Verifier Service failed: ${response.status} ${text}`);
     }

     /**
      * Success! Return the VPR (Verifiable Presentation Request).
      * This contains:
      * - The proof request to send to the user's wallet
      * - An audit record ID (for tracking)
      * - A blockchain transaction hash (proof this request was recorded)
      */
     return response.json();
   }

   /**
    * verifyPresentation()
    *
    * This function checks if a proof submitted by the user is valid.
    * Think of it like checking a signed document - we verify:
    * 1. The signature is real
    * 2. It was signed by a trusted authority
    * 3. The content matches what we asked for
    *
    * The verifier service will:
    * 1. Validate the cryptographic proof
    * 2. Check it matches our original request
    * 3. Record the verification result on the blockchain
    * 4. Return "verified" or "failed"
    */
   export async function verifyPresentation(params: {
     auditRecordId: string; // The ID from when we created the request
     presentation: unknown; // The proof submitted by the user
     verificationRequest: unknown; // The original request we made (VPR)
   }) {
     /**
      * The wallet might wrap the proof in an extra layer.
      * We need to unwrap it to get the actual proof.
      *
      * Example input: { verifiablePresentationJson: { actual proof } }
      * We extract: { actual proof }
      */
     const rawPresentation = params.presentation as Record<string, unknown>;
     const presentation =
       rawPresentation.verifiablePresentationJson ?? rawPresentation;

     /**
      * Build the verification request body.
      * We send:
      * 1. auditRecordId - Links to the original request
      * 2. presentation - The proof to verify
      * 3. verificationRequest - The original VPR (so service knows what to check)
      */
     const body = {
       auditRecordId: params.auditRecordId,
       presentation,
       verificationRequest: params.verificationRequest,
     };

     /**
      * Send to verifier service for validation.
      * The service will:
      * - Verify the cryptographic proof
      * - Check the age range statement
      * - Anchor the verification result on blockchain
      */
     const response = await fetch(
       `${VERIFIER_SERVICE_URL}/verifiable-presentations/verify`,
       {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(body),
       },
     );

     // If verification failed, throw an error
     if (!response.ok) {
       const text = await response.text();
       throw new Error(`Verification failed: ${response.status} ${text}`);
     }

     /**
      * Success! Return the verification result.
      * This contains:
      * - result: "verified" or "failed"
      * - anchorTransactionHash: Blockchain proof of this verification
      * - The verified claims (but NOT the user's actual DOB!)
      */
     return response.json();
   }

**What this file does:**

- ✅ Creates proof requests ("prove you're 18+")
- ✅ Sends requests to Docker verifier service
- ✅ Verifies proofs submitted by users
- ✅ Handles all communication with the blockchain (via verifier service)

**Key Concepts:**

- **VPR (Verifiable Presentation Request)**: "Please prove X about yourself"
- **VP (Verifiable Presentation)**: "Here's my proof of X" (the user's response)
- **Zero-knowledge**: User proves age without revealing birthdate
- **Blockchain anchoring**: Every request and verification is recorded on-chain for auditing

Step 3.4: Create Verification Hook
------------------------------------

**Purpose:** This is the "brain" of your verification UI. It's a React hook that:

- Manages the verification workflow (connecting → verifying → verified)
- Handles communication between your app, the SDK, and the user's wallet
- Listens for events from the SDK (like "user scanned QR code" or "proof received")

Think of it as an orchestrator that coordinates all the pieces.

Create ``src/hooks/useVerification.ts``:

.. code-block:: typescript

   "use client";

   import { useState, useCallback, useRef, useEffect } from "react";
   import { NETWORK } from "@/lib/config";

   /**
    * getSDK() - Dynamic Import Function
    *
    * Why do we use `await import()` instead of `import` at the top?
    *
    * 1. **SSR Compatibility**: The SDK uses browser APIs (window, localStorage, DOM)
    *    that don't exist during Server-Side Rendering. Next.js tries to render
    *    components on the server first, which would crash if we import the SDK normally.
    *
    * 2. **Lazy Loading**: The SDK is only loaded when the user clicks "Verify Age".
    *    This keeps your initial page load fast and small.
    *
    * 3. **Code Splitting**: Next.js automatically creates a separate chunk for the SDK,
    *    so users who never verify don't download it at all.
    *
    * Think of it like: "Only load the SDK when we're in the browser AND when we need it."
    */
   async function getSDK() {
     const { ConcordiumVerificationWebUI, resetSDK } =
       await import("@concordium/verification-web-ui");
     return { ConcordiumVerificationWebUI, resetSDK };
   }

   export function useVerification() {
     /**
      * State Management (useState):
      * - Tracks the current verification flow step
      * - Causes re-renders when state changes (updates UI automatically)
      */
     const [state, setState] = useState<
       "idle" | "connecting" | "verifying" | "verified" | "failed"
     >("idle");
     const [error, setError] = useState<string | null>(null);

     /**
      * Refs (useRef):
      * - Store values that persist between renders WITHOUT causing re-renders
      * - Like "memory" that survives when React updates the UI
      *
      * sdkRef: Holds the SDK instance so we can call methods like closeModal()
      * sessionIdRef: Remembers the audit record ID from /api/verification/create
      * vprRef: Stores the Verifiable Presentation Request to send to /verify later
      */
     const sdkRef = useRef<any>(null);
     const sessionIdRef = useRef<string | null>(null);
     const vprRef = useRef<unknown>(null);

     /**
      * useEffect: Runs ONCE when component mounts (because of empty [] dependency)
      * Sets up the event listener to receive events from the SDK.
      *
      * The SDK emits CustomEvents that we listen to here. This is like a
      * messaging system where the SDK says "something happened!" and we respond.
      */
     useEffect(() => {
       const handleSDKEvent = async (event: Event) => {
         // Extract the event type and data from the SDK's CustomEvent
         const { type, data } = (event as CustomEvent).detail;

         /**
          * Event Flow (what happens in order):
          *
          * 1. User scans QR code with wallet
          * 2. SDK emits "session_approved" → we create VPR and send to wallet
          * 3. Wallet creates proof and sends back
          * 4. SDK emits "presentation_received" → we verify the proof
          * 5. If successful, we show "verified" state
          */
         switch (type) {
           case "session_approved": {
             // User successfully connected their wallet via WalletConnect
             const { topic } = data; // WalletConnect session ID
             setState("verifying");

             try {
               /**
                * Step 1: Call our API to create a Verifiable Presentation Request (VPR)
                * This also anchors the request on-chain via the Verifier Service.
                * The "topic" is the WalletConnect session that links to the user's wallet.
                */
               const createRes = await fetch("/api/verification/create", {
                 method: "POST",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({ connectionId: topic }),
               });

               if (!createRes.ok) throw new Error("Failed to create VPR");

               const { sessionId, vpr } = await createRes.json();

               // Save these for later use in the "presentation_received" event
               sessionIdRef.current = sessionId; // Audit record ID (for /verify endpoint)
               vprRef.current = vpr; // The VPR (also needed for /verify)

               /**
                * Step 2: Send the VPR to the user's wallet
                * The wallet will show the user what we're asking for ("Prove you're 18+")
                * and create a zero-knowledge proof if they agree.
                */
               await sdkRef.current!.sendPresentationRequest(vpr, topic);
             } catch (err: any) {
               setError(err.message);
               setState("failed");
             }
             break;
           }

           case "presentation_received": {
             /**
              * The wallet created a proof and sent it back!
              * Now we need to verify it using the Verifier Service.
              *
              * The "data" here is the Verifiable Presentation (VP) - the actual proof.
              */
             try {
               const verifyRes = await fetch("/api/verification/verify", {
                 method: "POST",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({
                   sessionId: sessionIdRef.current, // Links to our audit record
                   presentation: data, // The proof from the wallet
                   verificationRequest: vprRef.current, // The original VPR we sent
                 }),
               });

               if (!verifyRes.ok) throw new Error("Verification failed");

               // Success! The user is verified as 18+
               setState("verified");

               // Close the modal after 2 seconds to let user see success message
               setTimeout(() => sdkRef.current?.closeModal(), 2000);
             } catch (err: any) {
               setError(err.message);
               setState("failed");
             }
             break;
           }

           case "error": {
             // SDK encountered an error (network issue, user rejected, etc.)
             setError(data?.message || "An error occurred");
             setState("failed");
             break;
           }
         }
       };

       // Register the event listener
       window.addEventListener("verification-web-ui-event", handleSDKEvent);

       // Cleanup function: remove listener when component unmounts
       // (Prevents memory leaks and duplicate listeners)
       return () =>
         window.removeEventListener("verification-web-ui-event", handleSDKEvent);
     }, []);

     /**
      * startVerification() - Called when user clicks "Verify Age" button
      *
      * useCallback: Memoizes the function so it doesn't get recreated on every render.
      * This prevents unnecessary re-renders if this function is passed to child components.
      */
     const startVerification = useCallback(async () => {
       try {
         setState("connecting");
         setError(null);

         // Dynamically import the SDK (only runs in browser, not during SSR)
         const { ConcordiumVerificationWebUI, resetSDK } = await getSDK();

         // Reset SDK state to clear any previous sessions
         // (Important if user verifies multiple times without refreshing)
         resetSDK();

         /**
          * Initialize the SDK with:
          * - network: Which Concordium network (testnet/mainnet)
          * - projectId: Your WalletConnect project ID from cloud.walletconnect.com
          * - metadata: Information shown in the wallet when connecting
          */
         const sdk = new ConcordiumVerificationWebUI({
           network: NETWORK,
           projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
           metadata: {
             name: "My Age Verification App",
             description: "Privacy-preserving age verification",
             url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
             icons: [
               `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/logo.svg`,
             ],
           },
         });

         // Save SDK instance to ref so we can use it in event handlers
         sdkRef.current = sdk;

         /**
          * renderUIModals(): Shows the QR code modal
          * - The callback runs when the modal closes
          * - We reset to "idle" if user closed modal without completing verification
          */
         await sdk.renderUIModals(() => {
           if (state !== "verified") setState("idle");
         });
       } catch (err: any) {
         setError(err.message);
         setState("failed");
       }
     }, []);

     /**
      * Return values used by the UI component:
      * - state: Current step in the flow (idle/connecting/verifying/verified/failed)
      * - error: Error message if something went wrong
      * - startVerification: Function to start the verification process
      */
     return { state, error, startVerification };
   }

Step 3.5: Import SDK Styles
----------------------------

In ``src/app/layout.tsx``, add:

.. code-block:: typescript

   import "@concordium/verification-web-ui/styles";

Step 3.6: Create API Routes
----------------------------

**Purpose:** These are your backend endpoints that the frontend calls. They act as a secure layer between your frontend and the verifier service.

**Why use API routes?**

- Keeps your backend logic server-side (more secure)
- Hides verifier service details from the browser
- Can add authentication, rate limiting, etc.

**Create** ``src/app/api/verification/create/route.ts``:

.. code-block:: typescript

   import { NextRequest, NextResponse } from "next/server";
   import { createVerificationRequest } from "@/lib/verifier-service";

   // POST /api/verification/create
   // Called when: User scans QR code and WalletConnect session is established
   // Purpose: Create a proof request (VPR) and return it to the frontend
   export async function POST(request: NextRequest) {
     try {
       // Extract the WalletConnect session ID from the request
       const { connectionId } = await request.json();

       // Call the verifier service to create a VPR
       const result = await createVerificationRequest({
         connectionId, // Links to user's wallet
         resourceId: "/protected-content", // What they're accessing
         contextString: "Age verification", // Shown to user
       });

       // Return the session ID and VPR to the frontend
       // Frontend will send the VPR to the user's wallet
       return NextResponse.json({
         sessionId: result.id, // Audit record ID (for tracking)
         vpr: result.request, // The proof request to send to wallet
       });
     } catch (error: any) {
       return NextResponse.json({ error: error.message }, { status: 500 });
     }
   }

**Create** ``src/app/api/verification/verify/route.ts``:

.. code-block:: typescript

   import { NextRequest, NextResponse } from "next/server";
   import { verifyPresentation } from "@/lib/verifier-service";

   // POST /api/verification/verify
   // Called when: User approves proof request and wallet sends back the proof
   // Purpose: Verify the proof is valid and return the result
   export async function POST(request: NextRequest) {
     try {
       // Extract the proof data from the request
       const { sessionId, presentation, verificationRequest } =
         await request.json();

       // Call the verifier service to validate the proof
       const result = await verifyPresentation({
         auditRecordId: sessionId, // Links to original request
         presentation, // The proof from wallet
         verificationRequest, // Original VPR (for validation)
       });

       // Check if verification succeeded
       if (result.result !== "verified") {
         throw new Error("Verification failed");
       }

       // Return success with blockchain transaction hash
       return NextResponse.json({
         verified: true,
         anchorTransactionHash:
           result.verificationAuditRecord.anchorTransactionHash, // Proof it's on-chain
       });
     } catch (error: any) {
       return NextResponse.json({ error: error.message }, { status: 500 });
     }
   }

**What these routes do:**

- ✅ ``/create`` - Creates proof requests when wallet connects
- ✅ ``/verify`` - Validates proofs submitted by users
- ✅ Both routes are server-side (secure, can't be bypassed by users)

Step 3.7: Create UI Component
------------------------------

**Purpose:** This component shows a blocking overlay until the user verifies their age. It uses the ``useVerification`` hook we created earlier.

Create ``src/components/AgeGate.tsx``:

.. code-block:: typescript

   "use client";

   import { useVerification } from "@/hooks/useVerification";

   export function AgeGate() {
     // Get verification state and functions from our hook
     const { state, error, startVerification } = useVerification();

     // If user is verified, hide the gate (return nothing)
     if (state === "verified") {
       return null;
     }

     // Show a modal overlay blocking the content
     return (
       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
         <div className="bg-white rounded-lg p-8 max-w-md">
           <h2 className="text-2xl font-bold mb-4">Age Verification Required</h2>
           <p className="text-gray-600 mb-6">
             You must be 18 or older to access this content.
             We'll verify your age using zero-knowledge proofs—your birthdate stays private.
           </p>

           {/* Main verification button - calls startVerification() when clicked */}
           <button
             onClick={startVerification}
             disabled={state === "connecting" || state === "verifying"}
             className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
           >
             {/* Show different text based on current state */}
             {state === "connecting" && "Connecting..."}
             {state === "verifying" && "Verifying..."}
             {state === "idle" && "Verify Age with Concordium ID"}
             {state === "failed" && "Retry Verification"}
           </button>

           {/* Show error message if something went wrong */}
           {error && (
             <p className="text-red-600 text-sm mt-4">{error}</p>
           )}
         </div>
       </div>
     );
   }

**What this component does:**

- ✅ Blocks content until user is verified
- ✅ Shows "Verify Age" button
- ✅ Updates button text based on state (idle/connecting/verifying)
- ✅ Displays errors if verification fails
- ✅ Disappears when verification succeeds

Step 3.8: Use in Your Page
---------------------------

In ``src/app/page.tsx``:

.. code-block:: typescript

   import { AgeGate } from "@/components/AgeGate";

   export default function Home() {
     return (
       <>
         <AgeGate />
         <main className="p-8">
           <h1>Protected Content</h1>
           <p>This content is only accessible to verified users 18+</p>
         </main>
       </>
     );
   }

✅ **Checkpoint:** UI integrated, verification flow ready

----

Part 4: Requesting Additional Proofs
=====================================

Beyond age verification, you can request various identity attributes. There are two main types of statements:

1. **Range Proofs** (``AttributeInRange``) - Prove a value is within a range WITHOUT revealing it (zero-knowledge)
2. **Reveal Attributes** (``RevealAttribute``) - Ask user to share the actual value

Example 1: Age Verification (Zero-Knowledge)
---------------------------------------------

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

Example 2: Verify EU Citizenship (Zero-Knowledge)
--------------------------------------------------

**Use case:** Content restricted to EU residents only.

Add to ``src/lib/config.ts``:

.. code-block:: typescript

   // List of EU country codes (ISO 3166-1 alpha-2)
   const EU_COUNTRIES = [
     "AT",
     "BE",
     "BG",
     "HR",
     "CY",
     "CZ",
     "DK",
     "EE",
     "FI",
     "FR",
     "DE",
     "GR",
     "HU",
     "IE",
     "IT",
     "LV",
     "LT",
     "LU",
     "MT",
     "NL",
     "PL",
     "PT",
     "RO",
     "SK",
     "SI",
     "ES",
     "SE",
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

Example 3: Reveal National ID Number
-------------------------------------

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

Example 4: Verify Document Type
--------------------------------

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

Example 5: Reveal Name for Personalization
-------------------------------------------

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
-------------------------

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
--------------

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

----

Testing Your Integration
=========================

Step 1: Start Everything
-------------------------

.. code-block:: bash

   # Terminal 1: Start verifier service
   docker compose up concordium-verifier

   # Terminal 2: Start your app
   npm run dev

Step 2: Test the Flow
----------------------

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

Step 3: Debug Common Issues
----------------------------

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

----

What You've Built
=================

✅ **Docker-based verifier service** running locally

✅ **WalletConnect integration** for mobile wallet pairing

✅ **Zero-knowledge age verification** without revealing DOB

✅ **On-chain proof anchoring** for audit trails

✅ **Reusable verification hook** for any React app

----

What You Learned
================

This tutorial taught you:

- How zero-knowledge proofs work in practice
- How to integrate blockchain identity verification
- How to structure a Next.js app with proper SSR/CSR separation
- How WalletConnect enables mobile wallet pairing
- How to request different types of identity proofs

----

.. warning::
   ⚠️ Before going to production, consider adding security features and an audit

----

Resources
=========

- `Concordium Docs <https://developer.concordium.software/>`_
- `Verification Web UI SDK <https://www.npmjs.com/package/@concordium/verification-web-ui>`_
- `WalletConnect Docs <https://docs.walletconnect.com/>`_
- `Verifier Service GitHub <https://github.com/Concordium/concordium-dapp-examples>`_

**Questions?** Open an issue on `GitHub <https://github.com/Concordium/concordium-dapp-examples/issues>`_
