.. _verify-access-ui-integration:

UI Integration
==============

.. admonition:: At a glance

   This part of the tutorial shows you how to build the React verification UI using the @concordium/verification-web-ui SDK. You will need the scaffolding from the previous step and the @concordium/verification-web-ui package installed. When you are done, you will have a working frontend that prompts users to prove their age with a zero-knowledge proof and gates content on success.

This section covers building the verification user interface, including configuration, backend services, React hooks, and UI components.

Install SDK
-----------

.. code-block:: bash

   npm install @concordium/verification-web-ui

Create Configuration
--------------------

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
    * Default is localhost:8000 (the service we started earlier)
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

- Defines which identity providers we trust
- Sets which blockchain network to use (testnet/mainnet)
- Configures the minimum age requirement
- Calculates date boundaries for age verification

Create Verifier Service Client
-------------------------------

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

- Creates proof requests ("prove you're 18+")
- Sends requests to Docker verifier service
- Verifies proofs submitted by users
- Handles all communication with the blockchain (via verifier service)

**Key Concepts:**

- **VPR (Verifiable Presentation Request)**: "Please prove X about yourself"
- **VP (Verifiable Presentation)**: "Here's my proof of X" (the user's response)
- **Zero-knowledge**: User proves age without revealing birthdate
- **Blockchain anchoring**: Every request and verification is recorded on-chain for auditing

Create Verification Hook
-------------------------

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

Import SDK Styles
-----------------

In ``src/app/layout.tsx``, add:

.. code-block:: typescript

   import "@concordium/verification-web-ui/styles";

Create API Routes
-----------------

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

- ``/create`` - Creates proof requests when wallet connects
- ``/verify`` - Validates proofs submitted by users
- Both routes are server-side (secure, can't be bypassed by users)

Create UI Component
-------------------

**Purpose:** This component shows a blocking overlay until the user verifies their age. It uses the ``useVerification`` hook we created earlier.

Create ``src/components/AgeGate.tsx``:

.. code-block:: jsx

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
             We will verify your age using zero-knowledge proofs - your birthdate stays private.
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

- Blocks content until user is verified
- Shows "Verify Age" button
- Updates button text based on state (idle/connecting/verifying)
- Displays errors if verification fails
- Disappears when verification succeeds

Use in Your Page
----------------

In ``src/app/page.tsx``:

.. code-block:: jsx

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

**Checkpoint:** UI integrated, verification flow ready
