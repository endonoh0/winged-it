import React, { Fragment, useState } from 'react';
import Iframe from 'react-iframe'
import { motion } from 'framer-motion';

import './AnimatedGrid.scss'

const AnimatedGrid = ({recipes, setRecipes, selectedImg, setSelectedImg, searchTags, componentProps, removeTag}) => {
	const [isOpen, setIsOpen] = useState(false)

	const {searchbar} = componentProps

	const variants = {
		enter: {
			transitionEnd: {
				display: "flex",},
			opacity: 1,
			transition: { duration: .5 },

		},
		exit: { opacity: 0,
			transitionEnd: {
			display: "none",}
		}
	}

	const clickHandler = (recipe) => {
		if(recipe){
			setSelectedImg(recipe.recipe.url)
			// setRecipes(null)
		} else {
			setSelectedImg(null)
		}
		setIsOpen(!isOpen)
	}
	return(
		<Fragment>
		<div className="grid__container">
			{/* <button id="menu-toggle" class="menu-toggle"><span>Menu</span></button> */}
			<div id="theSidebar" className="sidebar">
				{/* <button className="close-button fa fa-fw fa-close"></button> */}
				<h1>Winged It</h1>
				<div className="sidebar_content">
					<h3>Health Filter</h3>
					<h3>Diet Filter</h3>
					<h3>Ingredients</h3>
					{searchTags && searchTags.map(tag => <a className="tag" onClick={e => removeTag(tag)}>{tag}</a>)}
				</div>
			</div>
			<div id="theGrid" className="main">
				<div className="search_wrapper">
					{searchbar}
				</div>
				<section className="grid">
					{recipes && recipes.map((recipe, index) => {
						return(
							<motion.a 
								className="grid__item" 
								key={index} 
								// initial={{opacity: 0}}
								animate={isOpen ? "exit": "enter"}
								variants={variants}
								onClick={e => {clickHandler(recipe)}}
								

								>
								<h2 className="title title--preview">{recipe.recipe.label}</h2>
								<div className="loader"></div>
								{/* <span className="category">Stories for humans</span> */}
								<div className="meta meta--preview">
									<img className="meta__food" src={recipe.recipe.image} alt="recipe" /> 
								</div>
							</motion.a>
						)
					})}
					{selectedImg &&
					<Fragment>
						<motion.div 
							className="iframe_container"
							initial={{opacity:0}}
							animate={{opacity:1}}
							transition={{ delay: 1, duration: .5 }}
						>
						<Iframe className="recipe_content" url={selectedImg}/>
						<button className="recipe_btn" onClick={e => {clickHandler()}}>Hello</button>
						</motion.div>

					</Fragment>
					}
				</section>
			</div>
		</div>

		</Fragment>
	)

}

export default AnimatedGrid;