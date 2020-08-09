import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { projectFirestore } from '../../firebase/config'
import Card from  'react-bootstrap/Card'

import usePagination from '../../hooks/usePagination'
import { useVisualMode } from '../../hooks/useVisualMode'
import Loading from '../Favorite/Loading'


import SearchBar from "../SearchByIngredient/SearchBar";
import SearchByIngredient from "../SearchByIngredient/index";
import "./Search.scss";


const SHOW = 'SHOW';
const LOADING = 'LOADING';







const Search = (props) => {


	const [suggestions, setSuggestions] = useState([])
  const { mode, transition } = useVisualMode(LOADING);

	//this is to make sure when add button pressed in the search page it re-redirect to home pahe
	const addRedirect = true;

	useEffect(() => {
		const getSuggestions = () => {
			projectFirestore.collection('suggestions')
			
			// .limit(5)
			.get().then(snapshot =>{
				snapshot.forEach( async doc => {
					setSuggestions(prev => [...prev, doc.data()])
				})
				transition(SHOW)
			})
		}
		getSuggestions()
		
	}, [])
	
	const { currentData } = usePagination(suggestions,4);

  return (
    <div>
    
      <div className="search_page">
        <div className="title_bar">
          <figure >
            <img className="img" src="./rosemary.png"/>
          </figure>
          <div className="block">
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

      <section className="suggestion_container">
			<h1 id="suggestion_title">Healthy Meals</h1>
			<article className="suggestions_container">
				{mode === LOADING &&
					<Loading />
				}
				{mode === SHOW &&
          currentData().map(suggestion => (
						<Link className="suggestion" to="/">
							<Card style ={{width: '18rem'}}>
								<Card.Img className="suggestion__img" variant="top" src={suggestion.url} />
								<Card.Title className="suggestion__title" >{suggestion.name}</Card.Title>
							</Card>
						</Link>
				))}
			</article>
    </section>
    
    
    </div>
    );
}

export default Search; 


