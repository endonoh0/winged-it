import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames'

import { projectFirestore, timeStamp } from '../../firebase/config'
import Card from  'react-bootstrap/Card'


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




	useEffect(() => {
		const getSuggestions = () => {
			projectFirestore.collection('suggestions')
			.where('category', '==', 'Healthy Meals')
			.get().then(snapshot =>{
				snapshot.forEach( async doc => {
					setSuggestions(prev => [...prev, doc.data()])
				})
			})
		}
		getSuggestions()
		
	}, []);



	

	
	// //Write tags
	const writeFilterTag = (item, category) => {


	//  if(user.loggedIn && category === "dietTags") {
	// 	 const info = { dietTags: filterSelection,  createdBy: user.email, editedAt: timeStamp() };
	// 	 write("dietTags", info)
	// 	 return;
	//  }
 
	//  const arr = [];
	//  if (filterSelection){
	// 	 for (const item of filterSelection) {
	// 		 if (item.value) arr.push(item.value);
	// 	 }
	//  }

	 if(user.loggedIn && category === "healthTags") {
		 const info = { healthTags: [item],  createdBy: user.email, editedAt: timeStamp() };
		 write("healthTags", info)
	 }
 }



	const imgGridClickHandler = (filterTitle) => {
		for (const healthItem of healthItems) {
			if (healthItem.value === filterTitle) {
				setHealth([healthItem]);
				writeFilterTag(filterTitle, "healthTags");

			}
			
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

      <section className="suggestion_container">
			<h1 id="suggestion_title">Healthy Meals</h1>
			<article className="grids_container">
				{suggestions.map(suggestion => (
						<Link className="grid" to="/results">
							<Card onClick={e => imgGridClickHandler(suggestion.name)} className="grid__card" style={{width: '18rem'}}>
								<Card.Img className="grid__img" variant="top" src={suggestion.url} />
								<Card.Title className="grid__title" >{suggestion.name}</Card.Title>
							</Card>
						</Link>
				))}
			</article>
    </section>
    
    
    </div>
    );
}

export default Search; 