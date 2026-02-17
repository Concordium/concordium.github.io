.. include:: ../../variables.rst
.. _tokens:

========================
Tokens in the wallet
========================

You can add, inspect, and send tokens in |cryptox| and |bw|.

.. dropdown:: |cryptox|

    To access this functionality, tap **Manage token list** at the bottom of the token list.

    .. dropdown:: Add tokens

        #. Tap **Manage**.

            .. image:: ../images/cryptoX/Cryptox-manage-tokens.png
                :width: 50%

        #. Enter a smart contract address on which to look for tokens. Tap **Look for tokens**. If you get an error this means that the smart contract doesn’t exist, the smart contract doesn’t live up to the CIS-2 standard, or the smart contract doesn’t contain any tokens.

            .. image:: ../images/cryptoX/cryptox-look-for-tokens.png
                :width: 50%

        #. Select the token(s) you want to add. You can tap on a token to see more information about it and then tap **Back to list** to return to the list. Tap **Apply** once you have made your selection(s).

            .. image:: ../images/cryptoX/cryptox-select-token.png
                :width: 50%


        .. Note::

            You can add NFTs that are not owned by your account to your wallet. This does not mean that you have ownership of the NFT.

        Once the tokens are added you can see them in the wallet.

        An easy way to see how this works is to use the `wCCD example dApp hosted by Concordium <https://wccd.testnet.concordium.com/>`_. Connect it to your |cryptox| and convert some CCD to wrapped CCD. When you do this, you get a smart contract index. You can then use this smart contract index to search for tokens on the contract and add them to your |cryptox|.

    .. dropdown:: Inspect tokens

        Tap on the tokens tab and then tap the token to see details.

         .. image:: ../images/cryptoX/cryptox-inspect-tokens.png
                :width: 50%

        You can also tap **Don't show token in wallet** if you don't want the token to appear in your wallet.

    .. dropdown:: Send tokens

        To access send, either:

        - Tap Send |cryptoX-send| on an account in the accounts overview or in the account balance screen.

        or

        - Tap the token under the Tokens tab in the account balance screen and tap |cryptoX-send|.

        #. Tap the field for what to send.

            .. image:: ../images/cryptoX/cryptox-send-tokens.png
                :width: 50%

        #. In the amount field enter the amount of the token you want to send. The number of decimal places depends on the token. To find the number of decimal places, you can inspect the token as described in Inspect tokens.

        #. Add the receiver address.

        #. Tap **Continue**.

        #. Review the transaction. When satisfied, tap **Send funds**.

            .. image:: ../images/cryptoX/cryptox-send-tokens2.png
                :width: 50%

        #. Enter your passcode.

        #. Tap **Finish**.

            .. image:: ../images/cryptoX/cryptox-send-tokens3.png
                :width: 50%

    .. dropdown:: Remove tokens

        If you do not want the token to appear in your wallet you can remove it. This does not change the ownership of the token.

        There are two ways to do this.

        In the account balance screen:

        - Tap on the Token tab and then tap on the token you want to remove. Tap **Don't show token in wallet**.

        or

        - Tap the **Manage** tab. Search for the token by the Contract index. Once the tokens on the contract are shown the tokens that are in your account have a checkmark next to them. Remove the check and tap **Apply**.



.. dropdown:: |bw|

    Select the account that you want to manage tokens for in the dropdown menu.

    .. dropdown:: Add tokens

        #. Click **Manage token list** at the bottom of the screen.

        #. Click the **+** at the Manage token list screen.

           .. image:: ../images/browser-wallet/new/manage_token_list.png
                :width: 50%

        #. Enter a smart contract address on which to look for tokens. If you get an error this means that the smart contract doesn’t exist, the smart contract doesn’t live up to the CIS-2 standard, or the smart contract doesn’t contain any tokens.

        #. Select the token(s) you want to add. You can click on a token to see more information about it and then click the back arrow to return to the list to select tokens. Click **Add selected tokens** once you have made your selection(s).

           .. image:: ../images/browser-wallet/new/add_token2.png
                :width: 50%

        If you have purchased tokens on a marketplace, it can suggest tokens to be added directly without going through the steps above. In this case the screen below appears when your wallet is connected and the service suggests the tokens to be added. Click **Finish** to add the selected tokens to your wallet.

        .. image:: ../images/browser-wallet/new/add_tokens.png
            :width: 50%

        .. Note::

            You can add NFTs that are not owned by your account to your wallet. This does not mean that you have ownership of the NFT.

        Once the tokens are added you can see them on the account.

        An easy way to see how this works is to use the `wCCD example dApp hosted by Concordium <https://wccd.testnet.concordium.com/>`_. Connect it to your |bw| and convert some CCD to wrapped CCD. When you do this, you get a smart contract index. You can then use this smart contract index to search for tokens on the contract and add them to your |bw|.

    .. dropdown:: Inspect tokens

        Click on the token you want to inspect.

        You can click **Show raw metadata** to see the raw metadata for the token. You can also click **Hide token from account** if you don't want the token to appear in your wallet.

    .. dropdown:: Send tokens

        #. Click **Send** and select the token type in the dropdown list, or click on the token type and then, click **Send**.

        #. Enter the amount you want to send. The number of decimal places depends on the token and is specified for each token when clicking on it.

        #. Add the receiver address.

        #. Click **Continue**.

           .. image:: ../images/browser-wallet/new/send_tokens1.png
               :width: 50%


        #. Review the transaction. When satisfied, click **Send funds**.

        #. The success screen shows the sent amount. You can now view transaction details or return to the account.

           .. image:: ../images/browser-wallet/new/send_tokens2.png
               :width: 50%

    .. dropdown:: Remove tokens

        If you do not want the token to appear in your wallet, you can remove it. This does not change the ownership of the token.

        There are two ways to remove tokens.

        1. Click on the token. Then, click **Hide token from account**.
        2. Click **Manage token list** at the bottom of the screen. Then, click **Hide token** for the token type you want to hide.


.. Warning::

    If you had previously configured your wallet to be able to view selected tokens and you recover your wallet, the tokens will not be recovered. You must add the tokens again to view them in your wallet.




.. |send| image:: ../images/send.png
         :alt: Paper airplane
         :width: 50px

.. |cryptoX-send| image:: ../images/cryptoX/cryptoX-send.png
         :alt: Paper airplane
         :width: 50px
