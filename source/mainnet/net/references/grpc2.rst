.. _grpc2-documentation:

======================
 gRPC V2 documentation
======================

Since version 4.5.0 the Concordium node, in addition to the legacy :ref:`gRPC
API<grpc-documentation>`, supports a new API that has a much more detailed
schema definition, and does not rely on JSON responses. It also supports
streaming responses in cases where there is a lot of data, and supports
subscribing to new blocks and finalizations.

The new V2 interface enables access to the same data as the original V1 interface,
but in addition supports new endpoints, such as the ability to retrieve the
entire smart contract state.

The original gRPC interface is going into maintenance mode and will
be deprecated in the future.

The `in-depth documentation
<http://developer.concordium.software/concordium-grpc-api/#v2%2fconcordium%2fservice.proto>`_
of the new interface lists and documents all the endpoints.

As with the V1 interface, for best experience the interface should be used
through an SDK. However the new interface makes it substantially easier to build
an SDK since there is a canonical schema of responses.

At present the `Concordium Rust SDK
<https://github.com/Concordium/concordium-rust-sdk>`_ has support for the new
interface. Other SDKs will be migrated in the future, before the V1
interface is deprecated.
