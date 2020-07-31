import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

// accepts image collection (string)
const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    projectFirestore.collection(collection)
    // fires callback everytime change occurs inside the collection
    // also fires once initially
    .orderBy('createdAt', 'desc')
    // takes a snapshot object which is snapshot in that moment in time of db collection  (basically real time updates)
      .onSnapshot((snap) => {
        // create array of docs
        let documents = [];
        // cycle through doc collection
        snap.forEach(doc => {
          // push data into document array
          // <doc.data()> access data inside that document
          documents.push({...doc.data(), id: doc.id}) // created_at and url, we'll use that id to output the image
        });
        setDocs(documents);
      })
  }, [collection])

  return { docs };

}
