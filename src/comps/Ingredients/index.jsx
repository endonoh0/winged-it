import React, { useEffect, useState, Fragment } from 'react';
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
	const [ingredients, setIngredients] = useState([]) // State to load all the ingredients into from the database
	const [active , setActive] = useState(true) // Class toggle for the swipe animation on different pagination
  const { mode, transition } = useVisualMode(LOADING); // Loading animation at the start
	const { setCurrentPage, currentData, maxPage } = usePagination(ingredients, 12) // Pagination config

	// Toggle for the animation class
	const ingredientsContainer = active ? "grids_container-active" : "grids_container"

	// To get the current month for the season food
	const month = new Date().getMonth().toString()

	// Use firebase database
	useEffect(() => {
		const getIngredients = () => {
			projectFirestore.collection('ingredients')
			.where(month, '==', true)
			.get().then(snapshot =>{
				snapshot.forEach( async doc => {
					setIngredients(prev => [...prev, doc.data()]) // Loading results from database to state
				})
				transition(SHOW)
			})
		}
		getIngredients()
		
	}, [])

	// Class toggle for swipe animation on ingredients
	const toggleClass = () => {
		setActive(prev => !prev)
		setTimeout(() => {
			setActive(prev => !prev)
		},1000)
	}

	// Pagination button handler
	const onPageSwitch = (page) => {
		setCurrentPage(page)
		toggleClass()
	}

	return (
		<Fragment>
			<div className="seasonal_banner">
				<div className="seasonal_revealer">
					<h1 className="banner_content" id="seasonal_title">Seasonal Ingredients</h1>
					<article className="banner_description">
						<h2 className="banner_content" id="month">{MONTHS[month]}</h2>
						<p className="banner_content" id="description">
							These are all the local ingredients that are currently in season. 
							Discover some new and delicious recipes and try out some great inseason foods!"
						</p> 
					</article>
				</div>
				<img className="banner_left" src="./ingredient-banner.jpg" alt="Ingredient banner"/>
			</div>
			<section className="seasonal_container">
				<article className={ingredientsContainer}>
					{mode === LOADING &&
						<Loading />
					}
					{mode === SHOW &&
						currentData().map(ingredient => (
							<Link className="ingredient" to="/">
								<Card className="grid__card" style ={{width: '18rem'}}>
									<Card.Img className="grid__img" variant="top" src={ingredient.url} />
									<Card.Title className="grid__title" >{ingredient.name}</Card.Title>
								</Card>
							</Link>
					))}
				</article>
				<Pagination count={maxPage} shape="rounded" 
				onChange={(e, page) => onPageSwitch(page)}
				/>
			</section>
		</Fragment>)

}

export default Ingredients;