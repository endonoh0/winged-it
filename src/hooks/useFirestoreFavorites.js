import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';


const useFirestoreFavorites = (check) => {


  const type = 'favorites';
  const [docs, setDocs] = useState([]);
  const [dataFetchStatus, setDataFetchStatus] = useState(false)

  // this email needs to be changed with current user
  const email = 'ghanbari@ualberta.ca';

  useEffect(() => {
    projectFirestore.collection(type)
    .where('user_email', '==', email)
    .orderBy('created_at', 'desc')
    .get().then((snapshot) => {

      const document = [];
      snapshot.docs.forEach((doc) => {

        const item = doc.data();
        document.push({...doc.data(), id: doc.id});
        
      });
      return document;
    })
    .then((data) => {
      console.log(docs)
      setDocs(data);
      return docs;
    })
    .then(() => {
      setDataFetchStatus(true);
    })
 
    
  }, []);


  return { docs, dataFetchStatus };

}

export {useFirestoreFavorites} ;

