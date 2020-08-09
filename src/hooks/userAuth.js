import React, {useEffect} from 'react';
import { onAuthStateChange } from '../firebase/config';

// listen to Auth state change when app mounts
const useCurrentUser = (user) => {

  useEffect(() => {
    console.log(user);
    const unsubscribe = onAuthStateChange(user);
    return () => {
      unsubscribe();
    };
  }, []);
}

export { useCurrentUser }
