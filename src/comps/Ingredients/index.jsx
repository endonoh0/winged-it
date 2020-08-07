import React, { useEffect, useState, Fragment } from 'react';
// import useFirestore from '../../hooks/useFirestore'
import { projectFirestore } from '../../firebase/config'
import axios from 'axios'
import { createClient } from 'pexels'

const Ingredients = () => {
	const [photos, setPhotos] = useState([])

	const client = createClient('563492ad6f91700001000001fe3aeec344bd4449ac64360d87ecafed')

	useEffect(() => {
		const getIngredients = async () => {
			const month = new Date().getMonth().toString()
			const snapshot = await projectFirestore.collection('ingredients')
			.where(month, '==', true)
			.limit(2)
			.get()
			snapshot.forEach( async doc => {
				const query = doc.data().name
				client.photos.search({ query, per_page: 1 }).then(photos => {
					setPhotos(prev => [...prev, photos.photos[0].src.large])
					// photoUrls.push(photos.photos[0].src.original)
					// console.log("test");
					
				});
			})
		}
		
		getIngredients()

	}, [])

	return (
		<section className="photo__container">
			{photos.map(photo => (
				<Fragment>
					<img className="ingredient__photo"src={photo} alt="food"/>
					<a href="https://www.pexels.com">Photos provided by Pexels</a>
				</Fragment>
			))}
			
		</section>)

}

export default Ingredients;