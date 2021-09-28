
**Verify checksum of download**

In a terminal:

#. Navigate to the download.
#. Then paste the first line of the following block into the terminal.
#. Verify that the output matches the second line in the block.

.. code-block:: console
    :substitutions:

    $shasum -a 256 |client-mac|
    |client-mac-checksum|
