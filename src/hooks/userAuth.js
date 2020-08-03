import React, {useEffect} from 'react';
import { onAuthStateChange } from '../firebase/config';

const useCurrentUser = (user) => {

  useEffect(() => {
    const unsubscribe = onAuthStateChange(user);
    return () => {
      unsubscribe();
    };
  }, []);
}

export { useCurrentUser }
