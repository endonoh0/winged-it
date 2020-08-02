import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar'
import recipeFinder from '../../helper/foodApi'

const SearchByIngredient = ({searchTags, setSearchTags }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const pressEnter = (searchTerm) => {
		setSearchTags(prev => [...prev, searchTerm])
		setSearchTerm("")
	}

	const onSubmit = () => {
		recipeFinder(searchTags)
		.then(e => {
			console.log(e)
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


				<button onClick={onSubmit}>Submit</button>
		</div>

	);
}

export default SearchByIngredient;
