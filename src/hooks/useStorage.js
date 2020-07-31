import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timeStamp } from '../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // reference saved file in db (default bucket)
    const storageRef = projectStorage.ref(file.name); // image.png

    // reference to collection saved
    const collectionRef = projectFirestore.collection('images'); // created automatically

    // take file and put it in reference location called file.name
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      // save url in db url collection and use to display on our app
        const url = await storageRef.getDownloadURL();
        const createdAt = timeStamp();
        collectionRef.add({ url: url, createdAt }); // create new document with url and created_at timestamp that matches 'images' ref
        setUrl(url);
    })
  }, [file]);

  return { progress, url, error }

}

export default useStorage;
