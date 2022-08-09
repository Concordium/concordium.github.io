.. _wCCD-interacting:

========================================
Interacting with the wCCD token protocol
========================================

State-mutative functions
------------------------

The protocol has four state-mutative functions (``wrap``, ``unwrap``,
``transfer``, and ``updateOperator``) that have be invoked on the ``proxy`` contract.
These invokes will be passed through the fallback function on the ``proxy`` to the ``implementation`` contract.
You require a different schema and json file with your input parameters for every invoke.
These files are provided for download in each section.

The ``wrap`` function
=====================

Wrapping CCD refers to the process of converting the native currency CCD into
a CIS-2 compliant token (wCCD) at a 1:1 ratio by sending CCD to the wCCD smart
contract and getting wCCD in return.
You can specify with the ``--amount`` flag how much CCD you want to wrap.

`wrap_fallback_schema.bin file (ToDo: ask if I can upload the schemas at some links) <https://distribution.testnet.concordium/tutorials/wCCD/wrap_fallback_schema.bin>`

.. code-block:: json

    {
        "data": "",
        "to":  {
            "Account": [
                "4phD1qaS3U1nLrzJcgYyiPq1k8aV1wAjTjYVPE3JaqovViXS4j"
            ]
        }
    }

The below command wraps 1 CCD into 1 WCCD.

.. code-block:: console

    $./concordium-client contract update 652 --entrypoint wrap --schema wrap_fallback_schema.bin --parameter-json wrap.json --amount 1 --sender <YourAccount> --energy 25000 --grpc-port 10001

The ``unWrap`` function
=======================

Unwrapping CCD refers to the opposite process of converting the CIS-2
compliant wCCD token at a 1:1 ratio back to the native currency CCD by sending
wCCD to the wCCD smart contract and getting CCD in return.

The ``transfer`` function
=========================

The ``updateOperator`` function
===============================

Non-state-mutative functions
----------------------------

To continue with the tutorial click :ref:`here<wCCD-front-end-set-up>`.
