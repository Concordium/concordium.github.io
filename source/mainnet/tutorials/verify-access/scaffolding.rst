.. _verify-access-scaffolding:

Scaffolding the Project
========================

This section covers setting up your development environment, including the Next.js application, Docker-based verifier service, and WalletConnect integration.

Project Setup
-------------

Let's create a fresh Next.js project and set up the basic structure.

Create Next.js App
~~~~~~~~~~~~~~~~~~~

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

Install Dependencies
~~~~~~~~~~~~~~~~~~~~

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

Create Folder Structure
~~~~~~~~~~~~~~~~~~~~~~~

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

Set Up Environment Variables
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
   # For now, use a placeholder - we'll get a real one in the WalletConnect section
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

   # App URL (your Next.js app)
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Session Secret (generate a random 32+ character string)
   # You can generate one with: openssl rand -base64 32
   SESSION_SECRET=change-me-to-a-random-string-at-least-32-characters

.. important::
   - Never commit ``.env.local`` to git (it's already in ``.gitignore``)
   - We'll update ``NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`` in the WalletConnect section
   - For production, use proper secrets management (AWS Secrets Manager, Vault, etc.)

Test Your Setup
~~~~~~~~~~~~~~~

.. code-block:: bash

   # Start the Next.js development server
   npm run dev

Open http://localhost:3000 in your browser. You should see the default Next.js welcome page.

**Press Ctrl+C to stop the server.** We'll start it again after we add our verification code.

✅ **Checkpoint:** Next.js app created, dependencies installed, folder structure ready

Running the Verifier Service
-----------------------------

The Concordium Verifier Service handles proof creation and verification. It runs as a Docker container.

Get Your Account Keys
~~~~~~~~~~~~~~~~~~~~~~

You need a Concordium testnet account with keys exported. If you don't have one:

1. Follow the `Concordium account guide <https://developer.concordium.software/en/mainnet/net/guides/create-account.html>`_
2. Export your private key as ``private.export``
3. Save it in a ``keys/`` folder in your project root

Create Docker Compose File
~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

Start the Verifier Service
~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

Setting Up WalletConnect
-------------------------

WalletConnect enables mobile wallet pairing via QR codes.

Get a Project ID
~~~~~~~~~~~~~~~~

1. Visit `WalletConnect Cloud <https://cloud.walletconnect.com>`_
2. Sign up for a free account
3. Create a new project
4. Copy your **Project ID**

Update Environment Variables
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Open ``.env.local`` and update:

.. code-block:: bash

   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_actual_project_id_here

✅ **Checkpoint:** WalletConnect configured
