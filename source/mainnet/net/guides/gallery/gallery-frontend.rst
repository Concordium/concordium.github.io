.. _gallery-frontend:

=====================================
Create the public front-end
=====================================

The front-end is a simple webpage in React that can display the images of the gallery and let the user authenticate.

When the page is initially opened, it displays the items of the gallery but without the actual images.

To do that the names of the items must be fetched from the backend. To fetch the items from the backend the `api/names` endpoint of the backend is used. Below is a snippet that shows how the `Gallery` component does that when it loads, given that ``getNames`` is a function that fetches the names from the backend.

.. code-block:: typescript

   interface ItemData {
       name: string;
       location: string;
   }

   export default function Gallery() {
       const [items, setItems] = useState<ItemData[]>([]);
       ...
       useEffect(() => {
           getNames(VERIFIER_URL).then((names) =>
               setItems(names.map((name) => (
                   { name, location: `${VERIFIER_URL}/image/${name}`}
               )))
           );
       }, []);
       ...
   }

Then there is a component to show the items. In addition to taking the ``itemData`` as input, it also takes the ``authToken`` needed to access the images as an optional parameter, and when it is present, the component fetches the image at the location with the token:

.. code-block:: jsx

   function Item({ name, location, authToken, onError }) {
       return (
           <div className="item">
               {authToken && (
                   <img
                       className="restricted-image"
                       alt="restricted"
                       src={`${location}?auth=${authToken}`}
                       onError={onError}
                  />
               )}
               {!authToken && <div className="placeholder">Unauthorized</div>}
               <p className="item-name">{name}</p>
           </div>
       );

In order to obtain the token, the user has to authenticate. The `Connection component <https://github.com/Concordium/concordium-dapp-examples/blob/main/gallery/src/Connection.tsx>`_ allows the user to do that.

The component allows the user to first connect to the wallet, and then to initiate the authentication process that consists of the following steps:
- Send the connected account address to the backend and get a challenge
- Fetch the statement from the backend
- Request the wallet for a proof for the statement and challenge
- Send the proof and challenge to the backend to get a token

The steps that communicate with the backend are done using the ``fetch`` function. To request the wallet for a proof, the provider from the `browser-wallet-api-helpers <https://www.npmjs.com/package/@concordium/browser-wallet-api-helpers>`_  calls the ``requestIdProof`` function.
The wallet expects to be given the challenge, statement, and a connected account, all of which is obtained in previous steps.

Then the ``Item`` component is given the acquired token, and it fetches each gallery item's image from the backend.

To see the actual implementation, see `here <https://github.com/Concordium/concordium-dapp-examples/blob/main/gallery/src/Root.tsx>`_.

:ref:`Continue to the final part<gallery-setup>` to learn how to run your gallery.
