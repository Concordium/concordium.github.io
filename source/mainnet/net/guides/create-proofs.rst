.. include:: ../../variables.rst
.. _create-proofs:

=============
Create proofs
=============

The |bw| supports secret proofs that allow dApps or services to request proof that the user meets some requirement, such as proof the user is over a certain age, or resides in a specific range of countries or area. The user can choose whether they want to reveal these :ref:`attributes<glossary-attribute>` to the dApp or service. The dApp or service uses a :ref:`zero knowledge proof<glossary-zero-knowledge-proof>` to request the attribute(s) necessary. The wallet owner chooses whether to prove or reveal these :ref:`attributes<glossary-attribute>` to the dApp or service.

General rules
=============

For the dApp or service developer there are some general rules about proofs that you have to follow.

- You can get up to four proofs at a time
- There is no limit to the amount of attributes that can be revealed.
- An attribute can only be used in one proof at a time.

The attributes that can be revealed are:

- First name
- Last name
- Sex
- Date of birth
- Country of residence
- Country of nationality
- ID document type
- ID document number
- ID document issuer
- ID valid from
- ID valid to
- National ID number
- Tax ID number

Range proofs
============

Range proofs allow you to present a range of values to the user's wallet to determine whether the user meets the required attribute. For example, you might want to know if a user over 18 years of age but under 30 years of age. You can present this as a range proof to be verified by the wallet.

Relevant attributes for range proofs are:

- Date of birth - Special helper
- ID valid to
- ID valid from (maybe?)

Structure a range proof
-----------------------



Membership proofs
=================

Membership proofs allow you to present a list of values to the user's wallet to determine whether the user has one of the required attributes in the list. For example, you might want to know if a user is a resident of the EU. You can present this as a membership proof to be verified by the wallet.

Relevant attributes for membership proofs are:

- Country of residence
- Country of nationality - Special EU helper
- Identity document type
- Identity document issuer

Structure a membership proof
----------------------------



Membership proofs can also prove that a user is NOT a member of an attribute or attributes. For example, if you need to know whether a user is a resident of a country that is subject to sanctions and cannot use your service, you might have a proof that determines whether the user resides in one or more of the countries.



Example
=======

Concordium provides the following example demo app and repo:

The app is a shop that requires the user to be over 18 years of age for some purchases.
