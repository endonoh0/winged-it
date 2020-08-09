import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { projectFirestore } from '../../firebase/config'
import Card from  'react-bootstrap/Card'

import SearchBar from "../SearchByIngredient/SearchBar";
import "./Search.scss";



const Search = () => {
	const [suggestions, setSuggestions] = useState([])

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
		
	}, [])

  return (
    <div>
    
      <div className="search_page">
        <div className="title_bar">
					<div className="reveal__block"></div>
          <figure >
            <img className="img" src="./rosemary.png" alt="rosemary on wooden block"/>
          </figure>
          <div className="block">
            <div className="text">Search Over Millions of Recipes Based on Ingredients and Diets. </div>
            <SearchBar className="bar"/>
          </div>
        </div> 
      </div>

      <section className="suggestion_container">
			<h1 id="suggestion_title">Healthy Meals</h1>
			<article className="grids_container">
				{suggestions.map(suggestion => (
						<Link className="grid" to="/">
							<Card className="grid__card" style={{width: '18rem'}}>
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


