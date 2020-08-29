import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';


const useFirestoreFavorites = (user) => {

  const type = 'favorites';
  const [docs, setDocs] = useState([]);
  const [dataFetchStatus, setDataFetchStatus] = useState(false)

  useEffect(() => {
    if(user.loggedIn){
      projectFirestore.collection(type)
      .where('user_email', '==', user.email)
      .orderBy('created_at', 'desc')
      .get().then((snapshot) => {
        const document = [];
        snapshot.docs.forEach((doc) => {
          document.push({...doc.data(), id: doc.id});
        });
        return document;
      })
      .then((data) => {
        setDocs(data);
        return docs;
      })
      .then(() => {
        setDataFetchStatus(true);
      })
    }

  }, [user]);


  return { docs, dataFetchStatus };

}

export {useFirestoreFavorites} ;
