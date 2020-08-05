import React, { useState } from 'react';
import SearchBar from './SearchBar'

const SearchByIngredient = ({ searchTags, setSearchTags, writeTag, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');

	const pressEnter = (searchTerm) => {
		if(searchTerm && !searchTags.includes(searchTerm)){
			setSearchTags(prev => [...prev, searchTerm])
			writeTag(searchTerm)
			setSearchTerm("")
		}
	}

	return(
		<div className="search-container">
			<SearchBar
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				searchTags={searchTags}
				setSearchTags={setSearchTags}
				onKeyUp={pressEnter}/>

				<button class="btn btn-primary waves-effect waves-light" onClick={onSubmit}>Recipe Search</button>
		</div>

	);
}

export default SearchByIngredient;
