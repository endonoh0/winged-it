import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames'

import { projectFirestore } from '../../firebase/config'
import Card from  'react-bootstrap/Card'

import SearchBar from "../SearchByIngredient/SearchBar";
import SearchByIngredient from "../SearchByIngredient/index";
import "./Search.scss";

import { healthItems, dietItems } from "../../db/foodfilter";


const Search = (props) => {


	// const { mode, transition } = useVisualMode(LOADING);
	const [suggestions, setSuggestions] = useState([])
	const [hideBlock, setHideBlock] = useState(false);

	
	const revealBlock = className("reveal__block", {
		"hide" : hideBlock
	})

	setTimeout(() => setHideBlock(true), 2000)

	useEffect(() => {
		const getSuggestions = () => {
			projectFirestore.collection('suggestions')
			.get().then(snapshot =>{
				snapshot.forEach( async doc => {
					setSuggestions(prev => [...prev, doc.data()])
				})
			})
		}
		getSuggestions()
		
	}, []);

	const imgGridClickHandler = (filterTitle) => {
		for (const healthItem of healthItems) {
			if (healthItem.value === filterTitle) props.setHealth([healthItem]);
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
								searchTags={props.searchTags}
								setSearchTags={props.setSearchTags}
								writeTag={props.writeTag}
								onSubmit={props.onSubmit}
							
							/>
						</div>
					</div>
        </div> 
      </div>

      <section className="suggestion_container">
			<h1 id="suggestion_title">Healthy Meals</h1>
			<article className="grids_container">
				{suggestions.map(suggestion => (
						<Link className="grid" to="/">
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