import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination'

import { projectFirestore } from '../../firebase/config'
import Card from  'react-bootstrap/Card'
import './index.scss'
import usePagination from '../../hooks/usePagination'

const Ingredients = () => {
	const [ingredients, setIngredients] = useState([])

	useEffect(() => {
		const getIngredients = async () => {
			const month = new Date().getMonth().toString()
			const snapshot = await projectFirestore.collection('ingredients')
			.where(month, '==', true)
			.get()
			snapshot.forEach( async doc => {
				setIngredients(prev => [...prev, doc.data()])
			})
		}
		
		getIngredients()
		
	}, [])
	
	const { setCurrentPage, currentData, currentPage, maxPage } = usePagination(ingredients, 12)

	return (
		<section className="seasonal_container">
			<h1 id="seasonal_title">Seasonal Ingredients</h1>
			<h2 id="month">August</h2>
			<article className="ingredients_container">
				{currentData().map(ingredient => (
					<Link to="/">
						<Card style ={{width: '18rem'}}>
							<Card.Img className="ingredient__img" variant="top" src={ingredient.url} />
							<Card.Title className="ingredient__title" >{ingredient.name}</Card.Title>
						</Card>
					</Link>
					
				))}
			</article>
			<Pagination count={maxPage} shape="rounded" 
			onChange={(e, page) => {
				setCurrentPage(page)
				console.log(`Real page ${page} pagination page ${currentPage}`)}}
			/>
		</section>)

}

export default Ingredients;