.. include:: ../../variables.rst
.. _set-up-doc-env-MacOs:

Set up Concordium documentation environment on MacOs
====================================================

- Step 1: Install Python3 and Pip
  Ensure Python 3 and pip are installed. Check with:

  .. code-block:: console

    python3 --version

  If not installed, run:

  .. code-block:: console

    brew install python


- Step 2: Step 2: Install Pipenv

  You need ``pipenv`` for managing Python dependencies:

  .. code-block:: console

    pip3 install pipenv

  If you get the error “command not found: pipenv”, it is because the PATH for pipenv is not set.
  In order to set it, run the following command to see where the user based bin directory is located:

  .. code-block:: console

    python3 -m site --user-base

  Then, copy the resulting location, it will be used to set the path.
  Now, open the .zshrc file with your preferred editor, in this tutorial we shall use nano:

  .. code-block:: console

    nano ~/.zshrc


  Next, write the following line, which will include the location you copied previously, followed by /bin in order to export the PATH:

  .. code-block:: console

    export PATH="$PATH:/Users/<your_user_name>/Library/Python/3.9/bin"


  Save the file, restart your terminal and run the following command to check if pipenv is installed:


  .. code-block:: console

    pipenv --version

  You should get the installed version outputted now.
  Finally, it is also a good idea to install pyenv in order for pipenv to work properly:


  .. code-block:: console

    brew install pyenv


- Step 3: Clone the Concordium Documentation Repository

  .. code-block:: console

    git clone https://github.com/Concordium/concordium.github.io
    cd concordium.github.io


- Step 4: Install Dependencies
  Use ``pipenv`` to install the required dependencies:

  .. code-block:: console

    pipenv sync --dev

- Step 5: Install Graphviz
  Graphviz is needed to render diagrams:

  .. code-block:: console

    brew install graphviz

- Step 6: Build the Documentation (Text Version)
  For building the "mainnet" documentation”:

  .. code-block:: console

    pipenv run make dev-mainnet


For building the “academy” version:


  .. code-block:: console

    pipenv run make dev-academy

Open your browser and visit http://localhost:8000 to view the documentation. To stop the server, you can use CRTL+C.


- Step 8: Building Documentation for Deployment
  To build the final version of the documentation:(optional)

  .. code-block:: console

    pipenv run ./scripts/build.sh

  This compiles the documentation into a format that can be hosted and accessed by users.

- Step 9: Checking for Dead Links
  This step focuses specifically on ensuring that all hyperlinks within the documentation are functional and lead to valid pages. You can run this command:

.. code-block:: console

    pipenv run make linkcheck-mainnet


How to Modify the documentation
-------------------------------

The documentation is written in reStructuredText ``(.rst files)`` and lives in the ``source/`` directory, with separate folders for the mainnet and academy documentation:

- Mainnet documentation: ``source/mainnet/``
- Concordium Academy documentation: ``source/academy/``


Editing the Documentation
^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Locate the relevant ``.rst`` file in either source/mainnet or source/academy to edit the corresponding text.
2. Edit ``.rst`` files using reStructuredText syntax, which supports Sphinx directives for code snippets, warnings, notes, etc. Reference materials for reStructuredText basics can be found here:
   https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html

Handling TODOs
^^^^^^^^^^^^^^

 To display TODO items as warnings when building the documentation, uncomment this line in the ``source/mainnet/conf.py`` file:

.. code-block:: console

    # todo_emit_warnings = True


When writing a TODO directive, use:


.. code-block:: console

  .. todo::
     Add details here.


Writing Style Guide
^^^^^^^^^^^^^^^^^^^^

Before contributing please read and follow the principles outlined in:

- the Divio documentation guide:
  https://docs.divio.com/documentation-system/
- our style guide:
  https://github.com/Concordium/concordium.github.io?tab=readme-ov-file#style-guide



How to Contribute Changes and Open a PR
---------------------------------------

Now that you have the Concordium development environment set up, follow these steps to make changes to the documentation and open a pull request (PR) to contribute your updates.

- Step 1: Create a New Branch

  Before making any changes, create a new branch in your local repository. This ensures that your changes are isolated from the ``main`` branch.

  .. code-block:: console

    git checkout -b <your-branch-name>

  Replace ``<your-branch-name>`` with a descriptive name related to the changes you plan to make (e.g., ``update-installation-guide``).


- Step 2: Make changes

  #. Navigate to the appropriate ``.rst`` file in the ``source/mainnet/`` or ``source/academy/`` directory, depending on the documentation you want to update.
  #. Edit the ``.rst`` files using any text editor. Follow the reStructuredText syntax and the Concordium style guide.


- Step 3: Run Linter and Check Links

  Before committing your changes, ensure the documentation passes linting and contains no dead links.

  1. Linting the documentation:

  .. code-block:: console

    pipenv run make lint


  2. Checking for dead links (for the mainnet version):

  .. code-block:: console

    pipenv run make linkcheck-mainnet



  Resolve any issues that appear during linting or link checking.

- Step 4: Commit & Push your Changes

  Once you are satisfied with your changes, commit them to your branch with a descriptive message.

  .. code-block:: console

    git checkout -b '<your-branch-name>'
    git add .
    git commit -m "Updated installation guide and fixed issues"

  Now, you can push your changes:

  .. code-block:: console

    git push origin <your-branch-name>


- Step 5: Open a Pull Request

  1. Go to the Concordium documentation `repository <https://github.com/Concordium/concordium.github.io>`_ on GitHub.
  2. You should see a prompt to create a pull request for your recently pushed branch. Click on the "Compare & pull request" button.
  3. Add a title and a clear description of the changes you’ve made, including references to any issues or guidelines.
  4. Submit the pull request.


- Step 6: Address Review Feedback

  After submitting the pull request, a reviewer may leave feedback or request changes. Follow the feedback to make any necessary adjustments, then push the changes to your branch:

  .. code-block:: console

    git add .
    git commit -m "Fixed review comments"
    git push origin <your-branch-name>

  Once all changes are approved, the pull request will be merged, and your contributions will be included in the official documentation.
