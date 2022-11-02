.. include:: ../../variables.rst
.. _tokens:

========================
Tokens in the wallet
========================

You can add, inspect, and send tokens in the |bw|.

.. dropdown:: |bw|

    To access tokens and token transactions, click Tokens |token-bw|. Tabs appear for tokens.
        
    **Add a token**

        Click **Manage**. (screenshot)

        Enter a smart contract address on which to look for tokens. Click **Choose contract**. If you get an error that says **Invalid contract address** this means that the smart contract doesn’t exist, the smart contract doesn’t live up to the CIS-2 standard, or the smart contract doesn’t contain any tokens.

        .. image:: ../images/browser-wallet/add-token-contract.png
            :width: 100%

        Select the token(s) you want to add. You can click on a token to see more information about it and then click **Back to list** to return to the list to select tokens. Click **Update tokens** once you have made your selection(s).

        .. image:: ../images/browser-wallet/select-tokens.png
            :width: 100%

        .. Note::

            You can add NFTs that are not owned by your account to your wallet. This does not mean that you have ownership of the NFT.

        Once the tokens are added you can see them on the relevant tab.

    **Inspect a token**

        Click the tab for the token you want to inspect. Then click on the token to see details for that token.

        You can click **Show raw metadata** to see the raw metadata for the token. You can also click **Don't show token in wallet** if you don't want the token to appear in your wallet.

    **Send a token**

        Tap Send |send-bw| in the Tokens overview.

        In the Search field tap to search for the token you want to send. (screenshot)

        In the amount field enter the amount of the token you want to send. The number of decimal places depends on the token.

        Add the receiver address. Paste the address, use the address book, or scan a QR code to add the address.

        .. note::
            If the token is a CCD token, you have the option to add a memo to the transaction. Remember that memos increase the transaction fee.

        Tap **Send funds**.

        Review the transaction. When satisfied, tap **Send funds**.

        Tap **Finish**.

.. |send-bw| image:: ../images/browser-wallet/send-ccd.png
             :alt: paper airplane
             :width: 50px

.. |token-bw| image:: ../images/browser-wallet/tokens.png
             :alt: coins
             :width: 50px
