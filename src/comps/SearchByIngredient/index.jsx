import React, { useState } from 'react';
import SearchBar from './SearchBar'
import recipeFinder from '../../helper/foodApi'
// import axios from 'axios'

const SearchByIngredient = ({ searchTags, setSearchTags, writeTag, onSubmit, children }) => {
  const [searchTerm, setSearchTerm] = useState('');

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
		<div className="search-container">
			<SearchBar
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				searchTags={searchTags}
				setSearchTags={setSearchTags}
				onKeyUp={pressEnter}/>

				<button className="btn btn-primary waves-effect waves-light" onClick={onSubmit}>Recipe Search</button>
				{children}
		</div>

	);
}

export default SearchByIngredient;
