.. _json-params:

===============
JSON parameters
===============

This guide explains how to interact with the CIS-2 smart contract functions by providing input JSON parameters. This guide uses the `cis2-multi smart contract <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/cis2-multi>`__ as a starting point, and then continues with a couple of custom input types.

.. seealso::

   For a guide on how to interact with a smart contract using JSON parameters see :ref:`interact-instance-json-parameters`.

A smart contract implementing CIS-2 must export the following functions: ``transfer()``, ``updateOperator()``, ``balanceOf()``, ``operatorOf()``, and ``tokenMetadata()``. This topic briefly describes what the required functions do and how to interact with them using JSON parameters one by one.

transfer() and TransferParams
=============================

Use the ``transfer()`` function to transfer some amount of token A from one account to another. The parameter to the transfer function is an array of ``Transfer`` s which is defined in CIS-2.

.. code-block:: rust

    pub struct Transfer<T: IsTokenId, A: IsTokenAmount> {
        /// The ID of the token being transferred.
        pub token_id: T,
        /// The amount of tokens being transferred.
        pub amount: A,
        /// The address owning the tokens being transferred.
        pub from: Address,
        /// The address receiving the tokens being transferred.
        pub to: Receiver,
        /// Additional data to include in the transfer.
        /// Can be used for additional arguments.
        pub data: AdditionalData,
    }

The data types are self-explanatory, but ``token_id`` is a generic type, meaning any ID type can be used. One last thing to note is that ``from`` and ``to`` can be **both contract and account addresses**.

.. code-block:: rust

    #[receive(
        contract = "cis-2",
        name = "transfer",
        parameter = "TransferParameter",
        error = "ContractError",
        enable_logger,
        mutable
    )]

In order to call the ``transfer()`` function, ``TransferParameter`` must provide the JSON object that includes the necessary elements of the ``Transfer`` struct.

.. code-block:: rust

    [
        {
            "token_id": "<TOKEN-ID>",
            "amount": "<AMOUNT>",
            "from": {
                "Account": [
                    "<OWNER-ADDRESS>"
                ]
            },
            "to": {
                "Account": [
                    "<RECIPIENT-ADDRESS>"
                ]
            },
            "data": ""
        },
        {
            "token_id": "<TOKEN-ID>",
            "amount": "<AMOUNT>",
            "from": {
                "Account": [
                    "<OWNER-ADDRESS>"
                ]
            },
            "to": {
                "Contract": [
                {
                "index": <CONTRACT-INDEX>,
                "subindex": <CONTRACT-SUBINDEX>
                },
                "onReceivingCIS2"
            ]
            },
            "data": ""
        },
    ]

updateOperator() and UpdateOperatorParams
=========================================

Use the ``updateOperator()`` function to assign/remove another address to act as an operator for an address.
``UpdateOperatorParams`` in ``updateOperator()`` function is an array of ``UpdateOperator`` values.

.. code-block:: rust

    /// A single update of an operator.
    #[derive(Debug, Serialize)]
    pub struct UpdateOperator {
        /// The update for this operator.
        pub update: OperatorUpdate,
        /// The address which is either added or removed as an operator.
        /// Note: The address for whom this will become an operator is the sender of
        /// the contract transaction.
        pub operator: Address,
    }

The ``OperatorUpdate`` (the action to execute) is either ``UpdateOperator::Add`` or ``UpdateOperator::Remove`` and the operator to either add or remove is any ``Address``.

.. code-block:: rust

    #[receive(
        contract = "cis-2",
        name = "updateOperator",
        parameter = "UpdateOperatorParams",
        error = "ContractError",
        enable_logger,
        mutable
    )]

In order to add a contract with index ``3`` and subindex ``0`` as an operator the following JSON parameter should be used.

.. code-block:: rust

    [
        {
            "update": {
                "Add": []
            },
            "operator": {
                "Contract": [
                    {
                        "index": 3,
                        "subindex": 0
                    }
                ]
            }
        }
    ]

balanceOf() and ContractBalanceOfQueryParams
============================================

Use the ``balanceOf()`` function to get a balance of a token in a given address. The ``balanceOf()`` function is essentially a view function that returns ``ContractBalanceOfQueryResponse`` which is an array of the token amounts of given addresses.

.. code-block:: rust

    #[derive(Debug, Serialize)]
    pub struct BalanceOfQuery<T: IsTokenId> {
        /// The ID of the token for which to query the balance of.
        pub token_id: T,
        /// The address for which to query the balance of.
        pub address: Address,
    }

``ContractBalanceOfQueryParams`` is essentially ``BalanceQueryParams`` which is an array of ``BalanceQuery`` structs. As you can see in the details above, it accepts a generic type of ``token_id`` and a type of address like an ``Account`` or ``Contract``.

.. code-block:: rust

    #[receive(
        contract = "cis-2",
        name = "balanceOf",
        parameter = "ContractBalanceOfQueryParams",
        return_value = "ContractBalanceOfQueryResponse",
        error = "ContractError"
    )]

In order to query the balance of account ``3kBx2h5Y2veb4hZgAJWPrr8RyQESKm5TjzF3ti1QQ4VSYLwK1G`` of token ``"ff`` and balance of account ``3kBx2h5Y2veb4hZgAJWPrr8RyQESKm5TjzF3ti1QQ4VSYLwK1G`` of token ``"aa"`` the following JSON parameter should be used.

.. code-block:: rust

    [
        {
            "address": {
                "Account": [
                    "3kBx2h5Y2veb4hZgAJWPrr8RyQESKm5TjzF3ti1QQ4VSYLwK1G"
                ]
            },
            "token_id": "ff"
        },
        {
            "address": {
                "Account": [
                    "3kBx2h5Y2veb4hZgAJWPrr8RyQESKm5TjzF3ti1QQ4VSYLwK1G"
                ]
            },
            "token_id": "aa"
        }
    ]

operatorOf() and OperatorOfQueryParams
======================================

Use the ``operatorOf()`` function to check whether an address is an operator of a given contract address added by the ``updateOperator()``. It is a view function that returns ``OperatorOfQueryResponse`` which is an array of booleans for the given addresses (if the address ``is_operator()`` of the given contract index ``true``, else ``false``).

.. code-block:: rust

    /// A query for the operator of a given address for a given token.
    #[derive(Debug, Serialize)]
    pub struct OperatorOfQuery {
        /// The ID of the token for which to query the balance of.
        pub owner: Address,
        /// The address for which to check for being an operator of the owner.
        pub address: Address,
    }

``OperatorOfQueryParams`` is a vector of the ``OperatorOfQuery`` struct shown above. It takes two arguments: the contract address, and the account address to check whether it is the operator or not.

.. code-block:: rust

    #[receive(
        contract = "cis-2",
        name = "operatorOf",
        parameter = "OperatorOfQueryParams",
        return_value = "OperatorOfQueryResponse",
        error = "ContractError"
    )]

In order to check whether the contract at index ``3`` and subindex ``0`` is an operator of account ``3kBx2h5Y2veb4hZgAJWPrr8RyQESKm5TjzF3ti1QQ4VSYLwK1G``  the following JSON should be used.

.. code-block:: rust

    [
        {
            "owner": {
                "Account": [
                    "3kBx2h5Y2veb4hZgAJWPrr8RyQESKm5TjzF3ti1QQ4VSYLwK1G"
                ]
            },
            "address": {
                "Contract": [
                    {
                        "index": 3,
                        "subindex":  0
                    }
                ]
            }
        }
    ]

tokenMetadata() and ContractTokenMetadataQueryParams
====================================================

Use the ``tokenMetadata()`` function to retrieve the metadata URL of a token. It is a view function that returns a vector of ``TokenMetadataQueryResponse`` which holds a ``MetadataUrl`` struct that stores the URL and the hash.

.. code-block:: rust

    /// The parameter type for the contract function `tokenMetadata`.
    #[derive(Debug, Serialize)]
    pub struct TokenMetadataQueryParams<T: IsTokenId> {
        /// List of balance queries.
        #[concordium(size_length = 2)]
        pub queries: Vec<T>,
    }

``ContractTokenMetadataQueryParams`` is an array of the ``TokenMetadataQueryParams`` struct shown above. It takes the ``tokenId`` as input, and since it is a generic type ``<T>`` the tokenId could be anything.

.. code-block:: rust

    #[receive(
        contract = "cis-2",
        name = "tokenMetadata",
        parameter = "ContractTokenMetadataQueryParams",
        return_value = "TokenMetadataQueryResponse",
        error = "ContractError"
    )]

In order to call the ``tokenMetadata()`` function, provide a JSON array of token IDs to query as shown below.

.. code-block:: rust

    [
        "0000",
        "ffac",
        ...
    ]
