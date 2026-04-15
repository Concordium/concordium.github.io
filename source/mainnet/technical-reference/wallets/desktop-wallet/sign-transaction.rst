.. _sign-proposal:

===========================
Sign a transaction proposal
===========================

As a co-signer on an account, you'll receive transaction proposals that you have to sign. You'll receive the proposals as files with the extension .json. Sometimes, you'll also receive a PDF file with the transaction information. You import the .json file into the Desktop Wallet and then you compare the transaction details with the contents of the PDF file. Some proposers also send a separate file with a copy of the identicon as an extra security measure.

.. Note::
    Every transaction has an expiry time. It's important that you return the signed proposal in time for the proposer to submit it to the blockchain before the expiry time has elapsed.

Import and sign a proposal
==========================

#. Go to **Multi signature transactions** and select **Sign a transaction**.

#. Select **Browse to file**, and then navigate to the location on your computer where you saved the .json file with transaction proposal. Select the file, and then select **OK**. Alternatively, you can drag and drop the proposal file from its location on the computer and on to the Desktop Wallet.

   The proposal is displayed, and you can see the security details, which include the identicon and the digest to sign, the transaction details, and the status of the LEDGER device. The transaction details will vary depending on the type of transaction.

#. If you haven't connected the LEDGER device yet, there's a message saying **Waiting for device. Please connect your Ledger**. Connect the LEDGER device to the computer and enter the PIN code on the LEDGER device. The Desktop Wallet says **Ledger device is ready**.

#. Verify that the transaction details are correct and match the information in the PDF you received. Once you're certain the information is correct, select the following in the: **The transaction details are correct**, **The identicon matches the one received exactly**, and **The hash matches the one received exactly**.

#. Select **Sign proposal**. The Desktop Wallet says **Waiting for user to finish the process on the device**.

#. The LEDGER device says **Review transaction**. Verify that the **Sender** information matches the **From account** information on the transaction, and then press both buttons to continue with the transaction.

#. The information that's displayed on the LEDGER device now will vary depending on the type of transaction, you're signing. Navigate through the information and verify that it matches the information in the Desktop Wallet. Use both buttons whenever you need to confirm information.

#. Select the printer icon in the upper right corner to print a PDF of the transaction and click the identicon to copy and paste it into a separate document.

#. Select **Export signature**, give the file a name and the extension .json, and then select **Save**.

#. Send the JSON file and the identicon through secure channels to the proposer of the transaction.
