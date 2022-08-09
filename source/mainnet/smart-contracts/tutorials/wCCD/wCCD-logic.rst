.. _Rust: https://www.rust-lang.org/

.. _wCCD-logic:

=========================================
Understanding the logic of the wCCD token
=========================================

The native currency on the Concordium chain is CCD. When other tokens are
built on the Concordium chain they often apply the recommended CIS-2
token standard. This has the advantage that other dApps (decentralized apps)
can rely on some basic rules on how to correctly interact with the CIS-2
tokens and on some basic rules on what events and data the apps can retrieve from the CIS-2 tokens.
Unfortunately, the native currency CCD has a special intention in the Concordium
blockchain network and does not comply with the CIS-2 token standard.

Implementing two interfaces (one for CCD and another for CIS-2 tokens)
within the same smart contract can be cumbersome for developers and adds
complexities. We need a process that converts CCD into a token that is CIS-2
compliant so dApps can interact with it easily. For example, decentralized
exchanges depend on the WCCD token because the WCCD token allows you to trade
your CCD for other CIS-2 tokens seamlessly.

Wrapping CCD refers to the process of converting the native currency CCD into
a CIS-2 compliant token (WCCD) at a 1:1 ratio by sending CCD to the WCCD smart
contract. Unwrapping CCD refers to the opposite process of converting the CIS-2
compliant WCCD token at a 1:1 ratio back to the native currency CCD by sending
WCCD to the WCCD smart contract.

WCCD is a token minted by the WCCD smart contract when you call the ``wrap`` function and burned
by the WCCD smart contract when you call the ``unwrap`` function.
The circulating  supply of WCCD token is backed 1:1
by the CCD balance on the WCCD smart contract.
