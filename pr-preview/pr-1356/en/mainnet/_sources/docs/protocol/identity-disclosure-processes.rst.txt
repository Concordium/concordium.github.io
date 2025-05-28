.. include:: ../../variables.rst

.. _reference-identity-disclosure-processes:

=============================
Identity disclosure processes
=============================

An important feature of Concordium is the ability to disclose a user's identity and any associated accounts if there is a legal need. This is reserved for exceptional cases of malpractice, and requires a court order to authorise the request. A disclosure can take two forms, one identifying a person from an on-chain account, and the other a person identified via their registered document to all their accounts on-chain.

From an account on Concordium Blockchain to a real-world identity
=================================================================

Individually, a :term:`PG<Privacy Guardian (PG)>` or the :term:`IDP<Identity Provider>` cannot reveal the identity of a user mapped to a :doc:`Concordium account <manage-accounts>`. But using the identity disclosure process, PGs and the Authority work together to decrypt an identifier in the account. With this identifier the identity provider can find the user's identity record that contains information on the real-world identity.

A detailed breakdown of the process to reveal a user's identity from an account address is as follows:

1. The Authority initiates the identity disclosure process by presenting an official court order, along with the corresponding encrypted Identity Disclosure Data to the Privacy Guardians (PGs).

2. Each PG uses its private decryption key to decrypt its share of the Identity Disclosure Data and transmits the resulting partial data back to the Authority.

3. Upon receiving a threshold number of valid responses (i.e n out of t), the Authority combines the decrypted shares to reconstruct the unencrypted Identity Disclosure Data.

4. The Authority issues a formal request and submits the reconstructed Identity Disclosure Data to the relevant Identity Provider (IDP).

5. The Identity Provider searches its internal database for a match to the provided public Identity Credential. Upon locating the associated Identity Credentials which matches the unencrypted Identity Disclosure Data, the IDP returns the identifying information and linking information key to the Authority. At this point, the disclosure process has successfully revealed a verified identity for an account or wallet address.

6. To find all accounts associated with the identity, the Authority forwards the encrypted linking information to the PGs, requesting decryption shares.

7. Each PG processes the encrypted linking information and returns its partial decryption share to the Authority.

8. Once the Authority obtains the required threshold of decryption shares (minimum two out of three), it reconstructs the complete linking information required to connect the account to an identity document. This linking information allows the Authority to identify all accounts linked to the individual created with the same Identity Credential.

.. image:: ./images/account-to-person-disclosure.png
   :alt: graphic drawing showing the process for identity disclosure from account to person


From a real-world identity to Concordium accounts
=================================================

It is possible to find account addresses associated with a user's identity. Typically this process would only reveal identities created with the same document. In certain cases a wider scope could be required, such as all identities matching the name and birthdate. This would be specified in the court order.

The following approach discloses an account from an identity document:

1. Again, a court order is required to start the disclosure process. The Authority sends the identifying data of a real-life person together with the official request to all IDPs.

2. IDPs check their system for users that match the identity data they received from the Authority.

3. If the IDP is able to identify a matching user within its system, then the IDP sends the account holder's identity, including the encrypted linking information to the Authority.

4. This encrypted linking information is then sent to the PGs, who decrypt their share of the linking information and return it to the Authority.

5. Once the Authority collects the minimum (at least n out of t) shares from the PGs, it reconstructs the full linking information.

6. Using all decrypted linking information, the Authority retrieves the list of all accounts associated with the identified user across all IDPs.

.. image:: ./images/person-to-account-disclosure.png
   :alt: graphic drawing showing the process for identity disclosure from person to account

