.. _gallery:


==================================
The gallery with ID authentication
==================================

In this tutorial, we are going to describe how to write a gallery, which requires the user to prove something using their id to access the images on the site.
The gallery consists of a basic react web front-end example that displays the images and communicates with a wallet and a rust backend that can verify the proofs given by the wallet.

In the :ref:`first part<gallery-backend>`, you will learn about how the backend works.

In the :ref:`second part<gallery-frontend>`, you will learn about the frontend that interacts with the browser wallet and backend.

In the :ref:`third part<gallery-setup>`, you will learn how to build and run the example.

.. warning::

   It is suggested to read about :ref:`creating proofs<create-proofs>` and that the reader is assumed to have basic knowledge of rust development and some experience with web front-end development.

To start the tutorial click :ref:`here<gallery-backend>`.

.. toctree::
   :hidden:
   :maxdepth: 1

   Writing the verifying backend <./gallery-backend>
   Interacting with a wallet <./gallery-frontend>
   Setting up the front-end <./gallery-setup>
