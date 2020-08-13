import React, { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import className from 'classnames';

/* Dependencies */
import Iframe from 'react-iframe';
import { motion } from 'framer-motion';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import variants from './animations'

/* Styles */
import './AnimatedGrid.scss';

/* Comps */
import Button from 'react-bootstrap/Button';
import FavoriteAdd from '../Favorite/FavoriteAdd';
import MenuBar from './MenuBar'
import SearchWrapper from './SearchWrapper'

const AnimatedGrid = ({recipes, selectedRecipe, setSelectedRecipe, searchTags, componentProps, removeTag, health, diet, onSubmit, user, setFavoriteAlert}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isExit, setIsExit] = useState(false)

  let location = useLocation();

  let searchWrapper = className("search_wrapper", {
    "column-rev": location.pathname === '/results'
  });
  
  const {searchbar} = componentProps
  
  const clickHandler = (recipe) => {
	  if(recipe){
	  	setSelectedRecipe(recipe)
	  } else {
	  	setSelectedRecipe(null);
	  }
	  setIsOpen(prev => !prev)
  }
  
  const buttonHanlder = () => {
	  onSubmit()
	  setIsExit(prev => !prev)
	  setTimeout(() => {
	  	setIsExit(prev => !prev)
	  },1000)
  }
  
  // Does an api call on first render
  useEffect(() => {
	  if (searchTags || health || diet) {
	  	const timeout = setTimeout(() =>{
	  		onSubmit()
	  	}, 0)
  
	  	return() => {
	  		clearTimeout(timeout)
	  	}
  }
  
  }, []);

  const firstLetterToUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

	return(
		<>
		<div className="grid__container">
			<MenuBar 
				health={health} 
				diet={diet}
				searchTags={searchTags}
				removeTag={removeTag}
				firstLetterToUpperCase={firstLetterToUpperCase}
				/>
			<div id="theGrid" className="main">
				<motion.div
					className={searchWrapper}
					// className="search_wrapper"
					animate={isOpen ? "exit" : "enter"}
					variants={variants}
				>
					<Button
        		id="btn"
        		variant="primary"
        		size="lg"
        		className="btn btn-primary waves-effect waves-light"
        		onClick={buttonHanlder}
      		>
        		Recipe Search
      		</Button>
					{searchbar}
				</motion.div>
				<motion.section
					className="grid"
					initial={{opacity: 0, x:0}}
					animate={isExit ? "slideExit" :"slideEnter"}
					variants={variants}
				>
					{recipes && recipes.map((recipe, index) => {
						return(
							<motion.a
								className="grid__item"
								key={index}
								animate={isOpen ? "exit": "enter"}
								variants={variants}
								onClick={e => {clickHandler(recipe)}}
								>
								<h2 className="title title--preview">{recipe.recipe.label}</h2>
								<div className="loader"></div>
								<div className="meta meta--preview">
									<img className="meta__food" src={recipe.recipe.image} alt="recipe" />
								</div>
							</motion.a>
						);
					})}
					{selectedRecipe &&
					<Fragment>
						<motion.div
							className="iframe_container"
							initial={{opacity:0}}
							animate={{opacity:1}}
							transition={{ delay: 1, duration: .5 }}
						>
						<Iframe className="recipe_content" url={selectedRecipe.recipe.url}/>
						<button className="modal_btn" onClick={e => {clickHandler()}}>
						  <AiOutlineCloseCircle size={32}/>
						</button>
						<FavoriteAdd className="favorite_btn modal_btn" recipe={ selectedRecipe } user={user} setFavoriteAlert={setFavoriteAlert} />
						</motion.div>
					</Fragment>
					}
				</motion.section>
			</div>
		</div>
		</>
	);
}

export default AnimatedGrid;
