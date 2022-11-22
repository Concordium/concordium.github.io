.. include:: ../../variables.rst
.. _secret-proofs:

================================
Proofs and revealing information
================================

Some dApps or services may require you to prove that you are over a certain age, or that you reside in a specific range of countries or area. Sometimes they can request that you only prove that you meet the requirement without revealing the actual information. In cryptography this is called a :ref:`zero knowledge proof<glossary-zero-knowledge-proof>`; in Concordium this is called **ID information to prove**(?) and it appears as shown below in the wallet.

You can see the icon next to the information is the hidden icon (screenshot).

Other times the dApp or service may request that you reveal the information to them, such as your nationality or exact age. This is called **ID information to reveal**(?) and it appears as shown below in the wallet.

You can see the icon next to the information is the show icon (screenshot).

You can choose whether you want to prove or reveal these :ref:`attributes<glossary-attribute>` to the dApp or service. The dApp or service uses a :ref:`secret proof<glossary-secret-proof>` to request the information necessary for their service.

.. Warning::

    By **proving** information to a third-party, it may become possible for them to deduce precise information about you. When you **reveal** information to a third-party, you effectively hand over your information to them. This means that you should only do this if you have absolute trust in them, and if you are familiar with their data usage and protection procedures.

|bw|
==================================

When the wallet receives a request, you see a screen similiar to below.

Click **Accept** to allow the dApp or service to complete the proof or click **Reject** if you do not want to share this information.
