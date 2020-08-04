import { useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config'

const useReadFromFireStore = (collection) => {
	const [results, setResults] = useState([]);
	
	useEffect(() => {
		let unsub = projectFirestore.collection(collection)
		.get().then( doc => {
			doc.forEach(data => {
				setResults(prev => [...prev, data.data()])
			})
		})
		return () => unsub();
	},[])

	return { results }
}

export default useReadFromFireStore