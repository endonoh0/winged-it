import React, { Fragment } from 'react';
import Iframe from 'react-iframe'
import { motion } from 'framer-motion';

import './AnimatedGrid.scss'

const AnimatedGrid = ({recipes, selectedImg, setSelectedImg, searchTags}) => {

	return(
		<Fragment>
		<div className="grid__container">
			<button id="menu-toggle" class="menu-toggle"><span>Menu</span></button>
			<div id="theSidebar" className="sidebar">
				<button className="close-button fa fa-fw fa-close"></button>
				<h1>Winged It</h1>
				<div className="sidebar_content">
					<h3>Health Filter</h3>
					<h3>Diet Filter</h3>
					<h3>Ingredients</h3>
					{searchTags && searchTags.map(tag => <a>{tag}</a>)}
				</div>
			</div>
			<div id="theGrid" className="main">
				<section className="grid">
					{selectedImg &&
					<Fragment>
						<Iframe className="recipe_content" url={selectedImg}/>
						<button className="recipe_btn" onClick={e => {setSelectedImg(null)}}>Hello</button>
					</Fragment>
					}
					{recipes && recipes.map((recipe, index) => {
						return(
							<motion.a className="grid__item" key={index} onClick={e => {setSelectedImg(recipe.recipe.url)}}>
								<h2 className="title title--preview">{recipe.recipe.label}</h2>
								<div className="loader"></div>
								{/* <span className="category">Stories for humans</span> */}
								<div className="meta meta--preview">
									<img className="meta__food" src={recipe.recipe.image} alt="recipe" /> 
								</div>
							</motion.a>
						)
					})}
				</section>
			</div>
		</div>

		</Fragment>
	)

}

export default AnimatedGrid;