.. include:: ../../variables.rst

.. _reference-principles-of-privacy:

=====================
Principles of privacy
=====================

Concordium's identity system has been designed to be privacy first and incorporates several key privacy principles.

Protection of personal identifiable information
-----------------------------------------------

Users personal identifiable information (PII) such as name, birthdate etc, are never available on chain, either encrypted or unencrypted. PII is only stored locally within the user's wallet and with the IDP for compliance purposes. For avoidance of doubt, Concordium does not have access to any of this user information.

Separation of powers
--------------------

No single party can link a user's Identity to the accounts they have on Concordium. This can only be done through the :doc:`Identity disclosure process <identity-disclosure-processes>`.

- IDPs cannot identify a user's account (or on chain wallet address). They cannot connect an identity to on chain activity or an address.

- A single Privacy Guardian cannot decrypt a user's Identity Disclosure Data. This means they cannot access the mapping between a user's identity and their on-chain presence. In addition they do not have access to the PII which is stored within the IDPs systems.

- It is only possible to connect a user's PII identity to an account by :doc:`following the identity disclosure process <identity-disclosure-processes>`.

Selective disclosure through zero-knowledge proofs
--------------------------------------------------

With Concordium users can choose to reveal :term:`zero-knowledge proof` verifications of attributes of their identity across both :ref:`Concordium ID <concordium-id>` and :ref:`Web3 ID <web3-id>`, without revealing the underlying data (e.g. proving they are over 18 without revealing their birth date).

