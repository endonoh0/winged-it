import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { projectFirestore } from '../../firebase/config'
import Card from  'react-bootstrap/Card'
import Pagination from '@material-ui/lab/Pagination'
import usePagination from '../../hooks/usePagination'
import { useVisualMode } from '../../hooks/useVisualMode'
import Loading from '../Favorite/Loading'
import './index.scss'

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ]
const SHOW = 'SHOW';
const LOADING = 'LOADING';


const Ingredients = () => {
	const [ingredients, setIngredients] = useState([])
	const [active , setActive] = useState(true)
  const { mode, transition } = useVisualMode(LOADING);

	const month = new Date().getMonth().toString()

	useEffect(() => {
		const getIngredients = () => {
			projectFirestore.collection('ingredients')
			.where(month, '==', true)
			// .limit(5)
			.get().then(snapshot =>{
				snapshot.forEach( async doc => {
					setIngredients(prev => [...prev, doc.data()])
				})
				transition(SHOW)
			})
		}
		getIngredients()
		
	}, [])

	const toggleClass = () => {
		setActive(prev => !prev)
		setTimeout(() => {
			setActive(prev => !prev)
		},1000)
	}

	const onPageSwitch = (page) => {
		setCurrentPage(page)
		toggleClass()
	}
	
	const { setCurrentPage, currentData, maxPage } = usePagination(ingredients, 12)

	const ingredientsContainer = active ? "ingredients_container-active" : "ingredients_container"

	return (
		<section className="seasonal_container">
			<h1 id="seasonal_title">Seasonal Ingredients</h1>
			<h2 id="month">{MONTHS[month]}</h2>
			<article className={ingredientsContainer}>
				{mode === LOADING &&
					<Loading />
				}
				{mode === SHOW &&
				 	currentData().map(ingredient => (
						<Link className="ingredient" to="/">
							<Card style ={{width: '18rem'}}>
								<Card.Img className="ingredient__img" variant="top" src={ingredient.url} />
								<Card.Title className="ingredient__title" >{ingredient.name}</Card.Title>
							</Card>
						</Link>
				))}
			</article>
			<Pagination count={maxPage} shape="rounded" 
			onChange={(e, page) => onPageSwitch(page)}
			/>
		</section>)

}

export default Ingredients;