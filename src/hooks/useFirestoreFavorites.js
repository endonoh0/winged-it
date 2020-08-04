import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';


const useFirestoreFavorites = (dynamicDeleting) => {

  const type = 'favorites';
  const [docs, setDocs] = useState([]);

  // this email needs to be changed with current user
  const email = 'ghanbari@ualberta.ca';
  
  useEffect(() => {
    projectFirestore.collection(type)
    .where('user_email', '==', email)
    .get().then((snapshot) => {

      const document = [];
      snapshot.docs.forEach((doc) => {

        const item = doc.data();
        document.push({...doc.data(), id: doc.id});
        
      });
      return document;
    })
    .then((data) => { setDocs(data) });

  }, [dynamicDeleting]);

  return { docs };

}

export {useFirestoreFavorites} ;

