import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar'
import recipeFinder from '../../helper/foodApi'
import SearchTag from '../SearchByIngredient/SearchTag'

const SearchByIngredient = ({setRecipes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTags, setSearchTags] = useState([]);


	const pressEnter = (searchTerm) => {
		setSearchTags(prev => [...prev, searchTerm])
		setSearchTerm("")
	}

	const onSubmit = (e) => {
		console.log(searchTags);
		recipeFinder(searchTags)
		.then(data => {
      setRecipes(data)
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

        {/* returns an array of ingredients */}
        {searchTags && <SearchTag searchTags={searchTags} />}

				<button onClick={onSubmit}>Submit</button>
		</div>

	);
}

export default SearchByIngredient;
