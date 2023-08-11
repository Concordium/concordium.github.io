.. include:: ../../../variables.rst
.. _gallery-setup:

=====================================
Running the example
=====================================

.. note::

    Before you can run this example, make sure you have:

    - access to :ref:`one of the supported Chromium web browsers<setup-browser-wallet>` on your computer

    - `git <https://git-scm.com/>`_ installed to be able to clone a repository from `GitHub <https://github.com/>`_

    - `node.js <https://nodejs.org/en/download/>`_ and `yarn <https://yarnpkg.com/getting-started/install>`_ installed

    ``Node.js`` is a JavaScript runtime environment and ``yarn`` is a package manager
    used in combination with ``node.js``. You can download `node.js <https://nodejs.org/en/download/>`_  and
    `yarn <https://yarnpkg.com/getting-started/install>`_  on their official websites.

    - `rustup <https://rustup.rs/>`_ installed to build the backend.

The front end needs the |bw| for interaction. Install the extension for your browser as described :ref:`here<setup-browser-wallet>`.

Clone this `repository <https://github.com/Concordium/concordium-dapp-examples>`_.

.. code-block:: console

    $git clone --recurse-submodules https://github.com/Concordium/concordium-dapp-examples.git

The minimal steps to run the example are as follows:

- Navigate to the gallery example folder.

.. code-block:: console

    $cd ./gallery/

- Run ``yarn`` in the gallery folder to install all dependencies.

.. code-block:: console

    $yarn

- Run ``yarn build`` in the gallery folder to build the frontend.

.. code-block:: console

    $yarn build

- Run ``yarn build-verifier`` in the gallery folder to build the backend.

.. code-block:: console

    $yarn build-verifier

- Run ``yarn start`` to run the example.

.. code-block:: console

    $yarn start --statement "$(<verifier/config/statement.json)" --names "$(<verifier/config/names.json)"

The statement and names flags must be provided and they specify the values for these static variables. This runs them with the default values found in the `gallery/verifier/config` folder.

The gallery is then available on http://127.0.0.1:8100, however this can be changed by setting the `port` flag.
