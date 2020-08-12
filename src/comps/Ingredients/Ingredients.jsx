import React, { useEffect, useState, Fragment } from 'react';

/* Router DOM */
import { Link } from 'react-router-dom';

/* Firestore */
import { projectFirestore } from '../../firebase/config';

/* Bootstrap */
import Card from  'react-bootstrap/Card';

/* Material UI */
import Pagination from '@material-ui/lab/Pagination';

/* Custom Hooks */
import usePagination from '../../hooks/usePagination';

/* Styles */
import './Ingredients.scss';

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ];

const Ingredients = (props) => {

	const {
		searchTags,
    setSearchTags,
    writeTag
	} = props;

	const [ingredients, setIngredients] = useState([]) // State to load all the ingredients into from the database
	const [active , setActive] = useState(true) // Class toggle for the swipe animation on different pagination
	const { setCurrentPage, currentData, maxPage } = usePagination(ingredients, 12) // Pagination config

	// Toggle for the animation class
	const gridsContainer = active ? "grids_container-active" : "grids_container"

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
			})
		}
		getIngredients()

	}, [])

	// Class toggle for swipe animation on ingredients
	const toggleClass = () => {
		setActive(prev => !prev)
		setTimeout(() => {
			setActive(prev => !prev)
		}, 1000)
	}

	// Pagination button handler
	const onPageSwitch = (page) => {
		setCurrentPage(page)
		toggleClass()
	}

	//Add image to search list
	const imgGridClickHandler = (ingredientName) => {
		setSearchTags([...searchTags, ingredientName])
		writeTag(ingredientName, 'searchTags')
	};

	return (
		<Fragment>

			<div className="seasonal_banner">
				<div className="seasonal_revealer">
					<h1 className="banner_content" id="seasonal_title">Seasonal Ingredients</h1>
					<article className="banner_description">
						<p className="banner_content" id="description">
              Discover new and delicious recipes with local ingredients that are in season for {MONTHS[month]}.
						</p>
					</article>
				</div>
				<img className="banner_left" src="./ingredient-banner.jpg" alt="Ingredient banner"/>
			</div>

			<section className="seasonal_container">
        <Pagination count={maxPage} shape="rounded"
          onChange={(e, page) => onPageSwitch(page)}
        />
					<article className={gridsContainer}>
						<div className="fader"></div>
						{currentData().map(ingredient => (
							<Link className="ingredient" to="/results">
								<Card onClick={e => imgGridClickHandler(ingredient.name)} className="grid__card" style ={{width: '18rem'}}>
									<Card.Img className="grid__img" variant="top" src={ingredient.url} />
									<Card.Title className="grid__title" >{ingredient.name}</Card.Title>
								</Card>
							</Link>
						))}
					</article>
			</section>

		</Fragment>)
}

export default Ingredients;
