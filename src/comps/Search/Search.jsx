import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames'

import { projectFirestore, timeStamp } from '../../firebase/config'
import Card from  'react-bootstrap/Card'

import Suggestions from "./Suggestions";
import SearchByIngredient from "../SearchByIngredient/index";
import "./Search.scss";
import { healthItems, dietItems } from "../../db/foodfilter";
import useWriteToFirestore from '../../hooks/useWriteToFirestore';





const Search = (props) => {

	const {
		user,
		setDiet,
		setHealth,
		searchTags,
		setSearchTags,
		writeTag,
		onSubmit,
	} = props;



	// const { mode, transition } = useVisualMode(LOADING);
	const [suggestions, setSuggestions] = useState([])
	const [hideBlock, setHideBlock] = useState(false);

	// writing to db
	const { write } = useWriteToFirestore();

	// Styling the animation
	const revealBlock = className("reveal__block", {
		"hide" : hideBlock
	});

	setTimeout(() => setHideBlock(true), 2000);

	let output = [];

	useEffect(() => {
		const getSuggestions = () => {
			projectFirestore.collection('suggestions')
			.get()
			.then(snapshot =>{
				snapshot.forEach( async doc => {

					//this part of the code put all the data in suggestion field of database into an array of objects
					//object keys are the name of the category
					const data = doc.data();
					if (output[data.category] !== undefined) {
						output[data.category].push(data)
					} else {
						output[data.category] = [data]

					}

					setSuggestions(output);

				})

			})
		}
		getSuggestions()
		
	}, []);

	
	// //Write tags
	const writeFilterTag = (item, dbcollection) => {

	 if(user.loggedIn && dbcollection === "healthTags") {
		 const info = { healthTags: [item],  createdBy: user.email, editedAt: timeStamp() };
		 write("healthTags", info)
	 }

	 if(user.loggedIn && dbcollection === "dietTags") {
		const info = { dietTags: item,  createdBy: user.email, editedAt: timeStamp() };
		write("dietTags", info)
	}
 }



	const imgGridClickHandler = (filterTitle, category) => {

		const databaseSave = (filterTitle, category, dbcollection, items, setState) => {
			for (const item of items) {
				if (item.value === filterTitle) {

					if (category === "Healthy Meals") {
						setState([item])
					};
					if (category === "Diet Meals") {
						setState(item.value)
					};
					writeFilterTag(filterTitle, dbcollection);

				}
			}

		}

		if (category === "Healthy Meals") {
			databaseSave(filterTitle, "Healthy Meals", "healthTags", healthItems, setHealth);
		}
		if (category === "Diet Meals") {
			databaseSave(filterTitle, "Diet Meals", "dietTags", dietItems, setDiet);
		}

	};

  return (
    <div>
    
      <div className="search_page">
        <div className="title_bar">
					<div className={revealBlock}></div>
          <figure >
            <img className="img" src="./rosemary.png" alt="rosemary on wooden block"/>
          </figure>
					<div className="block">
						<div className="block__content">
							<div className="text">Search Over Millions of Recipes Based on Ingredients and Diets. </div>
							
								<SearchByIngredient
								searchButtonVisual={false}
								searchTags={searchTags}
								setSearchTags={setSearchTags}
								writeTag={writeTag}
								onSubmit={onSubmit}
							
							/>
						</div>
					</div>
        </div> 
      </div>

			<Suggestions 
			suggestions={suggestions["Healthy Meals"] ? suggestions["Healthy Meals"] : []}
			imgGridClickHandler={imgGridClickHandler}
			title={"Healthy Meals"}
			/>

			<Suggestions 
			suggestions={suggestions["Diet Meals"] ? suggestions["Diet Meals"] : []}
			imgGridClickHandler={imgGridClickHandler}
			title={"Diet Meals"}
			/>
    
    </div>
    );
}

export default Search; 