import React, { useState } from 'react';
import SearchBar from './SearchBar'
import recipeFinder from '../../helper/foodApi'
// import axios from 'axios'

import "./index.scss";

const SearchByIngredient = (props) => {

	const { 
		searchTags,
		setSearchTags,
		writeTag,
		onSubmit,
		children,
		searchButtonVisual = true
	} = props;

  const [searchTerm, setSearchTerm] = useState('');

	let searchButtonClass = searchButtonVisual? "" : "display_non";
	searchButtonClass += " btn btn-primary waves-effect waves-light";

	const pressEnter = (searchTerm) => {
		if(searchTerm && !searchTags.includes(searchTerm)){
			setSearchTags(prev => [...prev, searchTerm])
			writeTag(searchTerm)
			setSearchTerm("")
		}
	}

	// const onSubmit = async (e) => {
	// 	//Faking API call
	// 	const result = await axios.get('./recipe.json')
	// 	setRecipes(result.data.hits)

	// 	//Actual Api call
	// 	// recipeFinder(searchTags)
	// 	// .then(data => {
	// 	// 	console.log(data);
  //   //   setRecipes(data)
	// 	// })
	// }


	return(
		<div>
			<SearchBar
				
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				searchTags={searchTags}
				setSearchTags={setSearchTags}
				onKeyUp={pressEnter}/>

				<button className={searchButtonClass} onClick={onSubmit}>Recipe Search</button>
				{children}
		</div>

	);
}

export default SearchByIngredient;
