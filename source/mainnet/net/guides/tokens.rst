.. include:: ../../variables.rst
.. _tokens:

========================
Tokens in the wallet
========================

You can add, inspect, and send tokens in the |bw|.

.. dropdown:: |bw|

    To access tokens and token transactions, click Tokens |token-bw|. Tabs appear for tokens.

    .. dropdown:: Add tokens

        #. Click **Manage**.

            .. image:: ../images/browser-wallet/manage-tokens.png
                :width: 50%

        #. Enter a smart contract address on which to look for tokens. Click **Look for tokens**. If you get an error this means that the smart contract doesn’t exist, the smart contract doesn’t live up to the CIS-2 standard, or the smart contract doesn’t contain any tokens.

            .. image:: ../images/browser-wallet/add-token-contract.png
                :width: 50%

        #. Select the token(s) you want to add. You can click on a token to see more information about it and then click **X** to return to the list to select tokens. You can also search by token ID at the top of the screen. Click **Update tokens** once you have made your selection(s).

            .. image:: ../images/browser-wallet/select-tokens.png
                :width: 50%

        If you have purchased tokens on a marketplace, you can add the tokens to your wallet. The screen below appears. Click **Add selected** to add the selected tokens to your wallet.

        (add screenshot)

        .. Note::

            You can add NFTs that are not owned by your account to your wallet. This does not mean that you have ownership of the NFT.

        Once the tokens are added you can see them on the relevant tab.

        An easy way to see how this works is to use the `wCCD example dApp hosted by Concordium <https://wccd.testnet.concordium.com/>`_. Connect it to your |bw| and convert some CCD to wrapped CCD. When you do this, you get the a smart contract index. You can then use this smart contract index to search for tokens on the contract and add them to your |bw|.

    .. dropdown:: Inspect tokens

        Click the tab for the type of token that you want to inspect. Then click on the token to see details for that token.

        You can click **Show raw metadata** to see the raw metadata for the token. You can also click **Don't show token in wallet** if you don't want the token to appear in your wallet.

    .. dropdown:: Send tokens

        #. Click Send |send-bw| in the Accounts overview.

        #. Click the field for what to send.

            .. image:: ../images/browser-wallet/send-tokens-select.png
                :width: 25%

            .. image:: ../images/browser-wallet/send-tokens-select2.png
                :width: 25%

        #. In the amount field enter the amount of the token you want to send. The number of decimal places depends on the token. To find the number of decimal places, you can click on the token as described in Inspect tokens.

        #. Add the receiver address.

        #. Click **Continue**.

        #. Review the transaction. When satisfied, click **Send**.

        #. Click **Finish**.

.. Warning::

    If you had previously configured your wallet to be able to view selected tokens and you recover your wallet, the tokens will not be recovered. You must add the tokens again to view them in your wallet.

.. |send-bw| image:: ../images/browser-wallet/send-ccd.png
             :alt: paper airplane
             :width: 50px

.. |token-bw| image:: ../images/browser-wallet/tokens.png
             :alt: coins
             :width: 50px
