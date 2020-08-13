import { useEffect } from 'react'
import { onAuthStateChange, projectFirestore } from '../firebase/config'

const useWriteToFirestore = () => {
	
	const write = (collection, data) => {
		onAuthStateChange(user => {
			// Makes sure that a user is logged in to perform this function
      if(user && data) {
        projectFirestore.collection(collection)
				.doc(user.uid) // Creates a document in firebase and names it after user's UID
				.set(data) // An object that will be added to DB under the user uid
      }
    })
	}

	return {write}
}

export default useWriteToFirestore