.. include:: ../../variables.rst
.. _key-derivation:

=========================
Key derivation and usage
=========================

Concordium uses a SLIP-10/BIP32 style key derivation scheme to generate all the cryptographic key material necessary to open and operate accounts on the blockchain.

Here, each account is associated with an identity credential issued to the user by an identity provider (IDP).
This structure (see the Figure on top) is also reflected in the derivation tree where there is a subtree for each identity provider, which itself contains a subtree for each identity credential the user got issued from that IDP.
The subtree of a single identity credential consists of a) a subtree dedicated to account signature keys (those are the ones used to sign transfers) and b) multiple subtrees that generate cryptographic material for the ID object itself.
Secrets in the ID related subtrees have to be exported either due to the complexity of the involved cryptographic operations (e.g. Bulletproofs) or as they need to be sent to an external party (in encrypted form).
Note that even if all ID related secrets get leaked, the account keys can not be compromised¹.

Derivation Structure
====================

All cryptographic keys related to an identity object and the related accounts are generated from a subtree with prefix=m/44'/919'/IDP'/ID' where IDP is the index of the identity provider and ID is the index of the ID, e.g. ID=0 for the first identity issued to the user.


Account Keys
------------

Subtree 0' is used to derive signature keys for accounts related to the ID objects. That is, prefix/0'/cred' is the key for the account with index cred' (starting at 0).

**Impact of Potential Leakage:** An attacker could control accounts related to the given ID.

**Important:** We never export secrets from this subtree! Therefore, no crypto assets can be moved (without having access to secure key storage).