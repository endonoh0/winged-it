import React, { Fragment, useState, useEffect } from 'react';
import Iframe from 'react-iframe'
import { motion } from 'framer-motion';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import './AnimatedGrid.scss';



const AnimatedGrid = ({recipes, setRecipes, selectedImg, setSelectedImg, searchTags, componentProps, removeTag, health, diet, onSubmit}) => {
	const [isOpen, setIsOpen] = useState(false)

	const {searchbar} = componentProps

	// useEffect(() => {
	// 	onSubmit();
	// },[searc])

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
		<>
		<div className="grid__container">
			<div className="menubar">

        {/* Left-side recipe menu */}
				<div className="menubar_content">

        {/* <ListGroup>
          <ListGroup.Item variant="dark">Health</ListGroup.Item>
        </ListGroup> */}
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
					{/* <button id="search_recipe_btn" className="btn btn-primary waves-effect waves-light" onClick={onSubmit}>Recipe Search</button> */}
					{searchbar}
				</motion.div>
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
						<button className="recipe_btn" onClick={e => {clickHandler()}}>
						  <AiOutlineCloseCircle size={32}/>
						</button>
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
