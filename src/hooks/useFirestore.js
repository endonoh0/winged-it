// import { useState, useEffect } from 'react';
// import { projectFirestore, projectAuth } from '../firebase/config';


// const useFirestore = (type) => {

  
//   const [error, setError] = useState(null);
//   const [favoriteRecipe, setFavoriteRecipe] = useState([]);

//   // const email = projectAuth.currentUser.Identifier;
//   const email = "ghanbari@ualberta.ca";

//   // useEffect(() => {

//   //   const collectionRef = projectFirestore.collection(type); // created automatically
//   //   // const email = projectAuth.currentUser.Identifier;
//   //   const email = "ghanbari@ualberta.ca";

//   //   collectionRef.add({
//   //     user_email: email, recipe: {
//   //       name: "Pizza",
//   //       img: "https://www.simplyrecipes.com/wp-content/uploads/2019/09/easy-pepperoni-pizza-lead-4.jpg"} });
//   // }, [])

//   useEffect(() => {
//     const collectionRef = projectFirestore.collection(type)
//     .where('user_email', '==', email)
//     .onSnapshot(snap => {
//       snap.forEach(doc => {
//         console.log(doc.data());
//       });
//     });
//     // setFavoriteRecipe(favorite);
//   }, [])
  

//   return { favoriteRecipe }

// }

// export default useFirestore;

import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

// accepts image collection (string)
const useFirestore = (type) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore.collection(type)
    // fires callback everytime change occurs inside the collection
    // also fires once initially
    // .orderBy('createdAt', 'desc')
    .where('user_email', '==', 'ghanbari@ualberta.ca')
    // takes a snapshot object which is snapshot in that moment in time of db collection  (basically real time updates)
      .onSnapshot((snap) => {
        snap.forEach(doc => console.log(doc.data()))
        if(type === "images"){
          // create array of docs
          let documents = [];
          // cycle through doc collection
          snap.forEach(doc => {
            // push data into document array
            // <doc.data()> access data inside that document
            documents.push({...doc.data(), id: doc.id}) // created_at and url, we'll use that id to output the image
          });
          setDocs(documents);
        }

      })
    // cleanup
        // we can unsubcribe or stop retrieving from collection if we unmount image-grid page component
    return () => unsub();

  }, [type])

  return { docs };

}

export default useFirestore;