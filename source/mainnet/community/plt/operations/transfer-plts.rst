.. _plt-transfer:

=============
Transfer PLTs
=============

This guide shows how to transfer Protocol-Level Tokens (PLTs) to another account on DevNet.

About PLT transfer
==================

There is only one token-holder operation that is implemented in the MVP, which is the transfer operation. (In the future, other operations may include scheduled send and creating locks, for instance.) As with token-governance, there will be a single token-holder account transaction that supports cases for each token-holder operation. All token-holder operations will identify the token by its ticker symbol.

Token transfer requirements
===========================

The token transfer transaction specifies the destination (currently limited to an account), the amount, and an optional memo. The originating account must have a sufficient balance in the PLT to cover the transfer. The receiving account must exist. If there is an allow list for the PLT, both accounts must be on the allow list. If there is a deny list, neither account may be on the deny list.

Examples
========

- :ref:`Web SDK example<web-sdk-transfer-tokens>`
- :ref:`Rust SDK example<rust-transfer-tokens>`
- :ref:`Concordium Client CLI example<concordium-client-transfer-tokens>`

