.. _grpc2-documentation:

===============
gRPC V2 API
===============

The gRPC v2 API has a much more detailed schema definition, and does not rely on JSON responses as the now deprecated gRPC v1 API did. It also supports streaming responses in cases where there is a lot of data, and supports subscribing to new blocks.

The V2 interface enables access to the same data as the now deprecated V1 interface, but in addition supports new endpoints, such as the ability to retrieve the entire smart contract state.

The original gRPC interface has been deprecated in all node distributions as of December 5th, 2023.

The `in-depth documentation <http://developer.concordium.software/concordium-grpc-api/#v2%2fconcordium%2fservice.proto>`_ of the new interface lists and documents all the endpoints.

For best experience, use the interface through one of the :ref:`Concordium SDKs <technical-reference>`.
