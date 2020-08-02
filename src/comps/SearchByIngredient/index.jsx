import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar'
import recipeFinder from '../../helper/foodApi'

const SearchByIngredient = ({setRecipes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTags, setSearchTags] = useState([]);



	const pressEnter = (searchTerm) => {
		setSearchTags(prev => [...prev, searchTerm])
		setSearchTerm("")
	}

	const onSubmit = (e) => {

		recipeFinder(searchTerm)
		.then(data => {
      setRecipes(data)
			// console.log(data.recipe)
		})
	}



	return(
		<div>
			<SearchBar
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				searchTags={searchTags}
				setSearchTags={setSearchTags}
				onKeyUp={pressEnter}/>

        { searchTags }
				<button onClick={onSubmit}>Submit</button>
		</div>

	);
}

export default SearchByIngredient;
