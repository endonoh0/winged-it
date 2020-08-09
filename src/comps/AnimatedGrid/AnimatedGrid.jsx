import React, { Fragment } from 'react';
import Iframe from 'react-iframe'

import './AnimatedGrid.scss'

const AnimatedGrid = ({recipes, selectedImg, setSelectedImg}) => {

	return(
		<Fragment>
		<div className="grid__container">
			<button id="menu-toggle" class="menu-toggle"><span>Menu</span></button>
			<div id="theSidebar" className="sidebar">
				<button className="close-button fa fa-fw fa-close"></button>
				<h1>Winged It</h1>
			</div>
			<div id="theGrid" className="main">
				<section className="grid">
				{selectedImg && <Iframe className="recipe_content"
         			 	url={selectedImg}
        			/>}
					{recipes && recipes.map((recipe, index) => {
						return(
							<a className="grid__item" href="#" key={index} onClick={e => {setSelectedImg(recipe.recipe.url)}}>
								<h2 className="title title--preview">{recipe.recipe.label}</h2>
								<div className="loader"></div>
								<span className="category">Stories for humans</span>
								<div className="meta meta--preview">
									<img className="meta__food" src={recipe.recipe.image} alt="recipe" /> 
								</div>
							</a>
						)
					})}
				</section>
			</div>
		</div>

		</Fragment>
	)

}

export default AnimatedGrid;