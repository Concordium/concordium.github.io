.. _accounts-view:

=========================
CCDScan Accounts overview
=========================

The Accounts overview shows information about accounts during the selected time range in the filter.

.. image:: images/ccd-scan-accounts.png
    :alt: dark screen with graphs at top, table at bottom of account information

|

The graphs show the **Cumulative accounts created** since genesis and the **Accounts created** during the selected time range in the filter.

Below the graphs, the table contains the following:

- **Address**: the first six characters of the account address. You can click Copy |copy| to copy the entire hash. Click the account address to see the :ref:`account details<accounts-view>`.
- **Account age**: how long the account has existed.
- **Transactions**: number of transactions the account has sent.
- **Delegated stake**: total amount of CCD the account has delegated.
- **Balance**: The publicly visible balance of the account.

You can sort the information in the table using the following sort options:

.. image:: images/ccd-scan-account-sort.png
    :alt: dark screen with options to sort the accounts overview

.. _home-screen-sender:

Sender/Account details
======================

When you select a sender or account, the following appears.

.. image:: images/ccd-scan-home-sender.png
    :alt: dark screen showing details of single account

|

The following information is shown in the account details:

- **Account**: the first six characters of the account address are shown. Click Copy |copy| to copy the entire account address. If the account is participating as a validator or delegator, the staked amount is displayed. Additional information is available on the account: a validator section for validators, a delegation section for delegators, and a rewards section for both validators and delegators.
- **Balance**: the current account balance is shown. If the account has a release schedule, the remaining locked amount is displayed here. The same applies if the account is participating as a validator or delegator then the amount staked is displayed under the account balance.
- **Age**: the age of the account including the exact timestamp for all individual accounts.
- **Transactions**: a list of all transactions associated with the account, including incoming and outgoing transfers. Use the navigation buttons at the bottom to navigate through transactions.
- **Release schedule**: shown only for accounts that have transfers with a release schedule to show the remainder of the schedule (non-released assets). The list of release dates and amounts is available, including a drill-through link to the :ref:`underlying transaction(s)<home-screen-transaction>`.
- **Account statement**: shows how the account balance has changed over time, including the types of changes that have impacted the balance of the account. Use the navigation buttons at the bottom to navigate through account statements. Click **Export** to download a CSV file of all balance changes on the account.
- **Validator**: if an account is also a validator, the validator ID and the staked amount are shown here. Click the validator ID to see :ref:`validator details<home-screen-baker>`.
- **Delegation**: shown for accounts that are delegating to a staking pool or passive delegation. Information includes the delegator ID of the account, the staked amount, if the earnings are restaked or not, and the delegation target (a validator's staking pool or passive delegation) including drill-though to the :ref:`validator<home-screen-baker>` or passive delegation information.
- **Rewards**: includes an overview graph that shows the aggregated rewards for an account based on the applied time range filter. The table shows reward details broken down by type. Click the block hash to see :ref:`block details<home-screen-block>` for the corresponding block where the reward payout occurred. Use the navigation buttons at the bottom to navigate through reward payouts.

.. |copy| image:: images/ccd-scan-copy.png
             :class: button
             :alt: Green document on top of another green document

.. |hamburger| image:: images/hamburger-menu.png
             :class: button
             :alt: Three horizontal lines on a dark background
