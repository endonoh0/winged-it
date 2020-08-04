import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';


const useFirestoreFavorites = () => {

  console.log('dynamic')
  const type = 'favorites';
  const [docs, setDocs] = useState([]);

  const [databasePromise, setDatabasePromise] = useState({});

  // this email needs to be changed with current user
  const email = 'ghanbari@ualberta.ca';
  

  useEffect(() => {
    const unsub = projectFirestore.collection(type)
    .where('user_email', '==', email)
    .get().then((snapshot) => {

      const document = [];
      snapshot.docs.forEach((doc) => {

        const item = doc.data();
        document.push({...doc.data(), id: doc.id});
        
      });
      return document;
    })
    .then((data) => {
      setDocs(data);
      return docs;
    });
    
    setDatabasePromise(unsub);
    
  }, []);


  
  return { docs, databasePromise };

}

export {useFirestoreFavorites} ;

