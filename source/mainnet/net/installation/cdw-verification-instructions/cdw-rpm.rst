

**Verify checksum of download**

In a terminal:

#. Navigate to the download.
#. Then paste the first line of the following block into the terminal.
#. Verify that the output matches the second line in the block.

.. code-block:: console
    :substitutions:

    $sha256sum |cdw-rpm|
    |cdw-rpm-checksum|

**Verify download with signature**

To verify that the downloaded file is an official Concordium release, you can verify that the file is signed by Concordium. To do this, you need a signature of the release and a public key.

* :cdw-sig:`Download signature <rpm>`
* :cdw-pubkey:`Download public key <>`

With the **signature**, the **public key**, and the **downloaded file** all in the same directory, executing the following steps will verify that the file has been signed by Concordium.

In a terminal:

#. Navigate to the directory containing the assets needed to verify.
#. Then paste the first line of the following block into the terminal
#. The command should output **Verified OK** as a result, as inidicated by the second line in the block.

.. code-block:: console
    :substitutions:

    $openssl dgst -sha256 -verify cdw-public.pem -signature |cdw-rpm|.sig |cdw-rpm|
    Verified OK
