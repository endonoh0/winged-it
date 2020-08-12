import React, { Fragment, useState,    } from 'react';
import Iframe from 'react-iframe'
import { motion } from 'framer-motion';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import './AnimatedGrid.scss';
import Button from 'react-bootstrap/Button';
import FavoriteAdd from '../Favorite/FavoriteAdd';

const AnimatedGrid = ({recipes, selectedRecipe, selectedImg, setSelectedRecipe, searchTags, componentProps, removeTag, health, diet, onSubmit, user, setFavoriteAlert}) => {
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
			console.log(recipe.recipe.label);
			setSelectedRecipe(recipe)
		} else {
			setSelectedRecipe(null)
		}
		setIsOpen(!isOpen)
	}
	return(
		<>
		<div className="grid__container">
			<div className="menubar">
        {/* Left-side recipe menu */}
				<div className="menubar_content">
         <h1>
            <Badge variant="dark">Health</Badge>
          </h1>

          {/* Health items */}
          {health && health.map(tag => {
            return (<ListGroup variant="flush">
              <ListGroup.Item
                variant="light"
                className="health-labels"
              >
                <Badge pill variant="success">
                  {tag.value}
                </Badge>
              </ListGroup.Item>
            </ListGroup>)
          })}

          <h1>
            <Badge variant="dark">Diet</Badge>
          </h1>
          {/* Diet items */}
          {diet && <ListGroup variant="flush">
            <ListGroup.Item
            variant="light"
            className="health-labels"
          >
            <Badge pill variant="info">
              {diet}
            </Badge>
            </ListGroup.Item>
          </ListGroup>}

          <h1>
            <Badge variant="dark">Ingredients</Badge>
          </h1>
          {/* Recipe Items */}
          {searchTags &&
            searchTags.map(tag => { return (
              <ListGroup variant="flush">
                <ListGroup.Item
                  action variant="light"
                  className="health-labels"
                  onClick={e => removeTag(tag)}
                >
                  <Badge pill variant="danger">
                    {tag}
                  </Badge>
              </ListGroup.Item>
            </ListGroup>)
          })}
      </div>
      </div>
			<div id="theGrid" className="main">
				<motion.div
					className="search_wrapper"
					animate={isOpen ? "exit" : "enter"}
					variants={variants}
				>
					<Button
        		id="btn"
        		variant="primary"
        		size="lg"
        		className="btn btn-primary waves-effect waves-light"
        		onClick={onSubmit}
      		>
        		Recipe Search
      		</Button>
					{searchbar}
				</motion.div>
				<section className="grid">
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
								<FavoriteAdd className="favorite_btn" recipe={ recipe } user={user} setFavoriteAlert={setFavoriteAlert} />
							</motion.a>
						)
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
				</section>
			</div>
		</div>
		</>
	)

}

export default AnimatedGrid;
