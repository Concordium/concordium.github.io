.. include:: ../../variables.rst
.. _IP address: https://en.wikipedia.org/wiki/IP_address
.. _port number: https://en.wikipedia.org/wiki/Port_(computer_networking)
.. _company-identities:

============================
Company identity creation
============================

A company identity is for companies that need an identity and accounts on the Concordium blockchain, but don't want that identity to belong to a specific person. Company identities are therefore issued with documents that identify the company and not an individual. Company identities are only relevant for a few companies, such as crypto exchanges.

You can't use the Desktop Wallet, |bw|, |mw-gen2|, or |mw-gen1| to create a company identity. You need to use the Company identity management tool, and you need to communicate directly with the identity provider (currently Notabene). `This page <https://notaben.notion.site/Entity-verification-next-1b4fbcd8e32042e1ac3b0018a3cc27bc>`_ describes Notabene's process, including recovery of company identities.

The information below describes how to create a company identity, how to create accounts with a company identity, and how to recover a company identity. If you experience issues with the Concordium Company ID tool, please contact Concordium’s technical support via support@concordium.software.

Using the company identity tool
===============================

Once you have dowloaded the Concordium Company ID tool for your platform and installed it, you should choose your network, either Mainnet or Testnet. A default Concordium node URL is used, but you can enter your node URL, if desired.

Request identity
----------------

#. Click **Request identity**.

#. Read the information and click **Proceed**.

#. Write down or save your seedphrase by clicking the copy button to copy your seedphrase to the clipboard and remember to go to the clipboard and save the file. Keep your seedphrase secure as you will need it to create accounts or recover the identity. Click **Proceed**.

   .. image:: ../images/company-id-request.png
      :alt: company id tool screen showing identities related to seedphrase and option to select

#. Enter your seedphrase to verify that you have recorded it correctly. Click **Proceed**.

#. Click **Generate request.json**. The command outputs the ``request.json`` file. The request should be sent to the identity provider through a trusted channel. Store the auxiliary output securely.

   - For **Mainnet** requests: Send the file to ania@notabene.id together with any other required identity data as described in the `entity verification instructions <https://notaben.notion.site/Entity-verification-next-1b4fbcd8e32042e1ac3b0018a3cc27bc>`_.

   - For **Testnet** requests: Send the file to support@concordium.software with the subject line "Test company identity".

When the identity has been verified successfully, you will receive an email with an identity object file named ``id-object.json``. Store this file securely as you need it to create accounts and regenerate account keys.

Create account
--------------

After obtaining the ``id-object.json`` identity object from the identity provider you can create additional accounts on the chain. The Concordium Company ID tool requires the identity object returned by the identity provider and generates a credential that can be sent to the chain to create an account.

**Create account** can also be used to regenerate the keys for an old account.

#. Click **Create Account**.

#. Enter your seedphrase in the Enter seedphrase field. In the Identity object file field click to navigate to the location of the stored ``id-object.json`` file. Click **Get Accounts**.

   .. image:: ../images/company-id-create-acct.png
      :alt: company id tool screen showing seedphrase field and file selection box

#. On the next screen, click **Create Account** to create an account with this company identity. When prompted, save the ``account-keys.json`` in a secure location as you will need them to interact with the accounts on-chain. You can click **Create account** again to create another account.

.. dropdown:: Format of the key files

   Both initial account keys and subsequent account keys are stored in JSON files. The unencrypted data is a JSON record with a number of fields. For sending transactions the fields that are relevant are:

   - ``accountKeys`` contains the account keys. It has the following format:

      .. code-block:: json

         "accountKeys": {
            "keys": {
               "0": {
               "keys": {
                  "0": {
                     "signKey": "1e16c2e2302023fc5235c60734981a2427004f95b6ace50a1d8a205ee9e5f9e7",
                     "verifyKey": "7e9983b292cf5e5822b48dbed1c2d498aca97c097f7116511f7dcf6187d218c4"
                  }
               },
               "threshold": 1
               }
            },
            "threshold": 1
         }

      which contains the account keys. In this example the account has a single credential with index 0, and that credential has a single key with index 0. The private key is 1e16c2e2302023fc5235c60734981a2427004f95b6ace50a1d8a205ee9e5f9e7 and its public key is 7e9983b292cf5e5822b48dbed1c2d498aca97c097f7116511f7dcf6187d218c4.

   - ``address`` is the address of the account, e.g.,

      .. code-block:: json

         "address": "2xe6cXEzBJZ8KXSYwb5uXJdHPZfAstbSZjfdAqsoF7VEq6q7AP"

   - keys for encrypted transfers. These are only needed for sending and receiving encrypted transfers.

      .. code-block:: json

         "encryptionPublicKey": "b14cbfe44a02c6b1f78711176d5f437295367aa4f2a8c2551ee10d25a03adc69d61a332a058971919dad7312e1fc94c58a2f44906bda77f42bc3503b53b604a851737829899ffd4895abc0184e2da448e673f5e87367991d4a453a7f562df974",
         "encryptionSecretKey": "b14cbfe44a02c6b1f78711176d5f437295367aa4f2a8c2551ee10d25a03adc69d61a332a058971919dad7312e1fc94c557da780304fba3b831439243201396e8c83daa83da1acc385a7a28519011e6da"

Import created accounts into ``concordium-client``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To use the accounts created in the Concordium Company ID tool, you must use Concordium Client. You can download it :ref:`here<concordium-node-and-client-download>`. For information about how to use it, see :ref:`concordium-client`.

The account keys are primarily meant for clients to integrate into their key management solution and their software, e.g., an exchange integrating their trading platform with the Concordium chain.

However, if the ``account-keys.json`` file is not encrypted it can be imported into ``concordium-client`` with the command:

.. code-block:: console

   concordium-client config account import account-keys.json --format=genesis --name my-account

where the ``--name`` option is optional, and if given, will name the account according to the given value ("my-account" in the example above).

If the account-keys.json file is encrypted then it must first be decrypted. This can be done with the :ref:`utils tool<downloads-auxiliary-tools>`.

The initial account keys cannot be directly imported into ``concordium-client``.

Once you have created accounts, you can request CCDs for testing. To request CCDs for testing, run the following command:

``curl -X PUT https://wallet-proxy.testnet.concordium.com/v0/testnetGTUDrop/3GXM6cEuAwEA47EEtFpax9PLhMWchWmkaPmNZmW1kbDaWaKBxV`` where you replace 3GXM6cEuAwEA47EEtFpax9PLhMWchWmkaPmNZmW1kbDaWaKBxV with the account address that should receive the CCDs.

Identity recovery
-----------------

If the identity object used to create credentials is lost, it can be recovered from the identity provider by generating a recovery request using the 24 words used when the identity was originally created. Recover identity generates an identity recovery request to be sent to the identity provider.

#. Click **Identity Recovery**.

#. Enter your seedphrase in the Enter seedphrase field. And click **Find identities**.

#. You see a list of identities associated with the seedphrase. In the Identities to recover drop-down, select the identity you want to recover. Click **Generate recovery request**. The command outputs the ``recovery-request.json`` file. The request should be sent to the identity provider through a trusted channel. Store the auxiliary output securely.

   .. image:: ../images/company-id-recover.png
      :alt: company id tool screen showing identities related to seedphrase and option to select

- For Mainnet requests: Send the file to ania@notabene.id together with any other required identity data as described in the `entity verification instructions <https://notaben.notion.site/Entity-verification-next-1b4fbcd8e32042e1ac3b0018a3cc27bc>`_.

- For Testnet requests: Send the file to support@concordium.software with the subject line "Recover company identity".

When the recovery request has been verified successfully, you will receive an email with the identity object file named ``id-object.json`` that you lost. Store this file securely as you need it to create accounts and regenerate account keys.
