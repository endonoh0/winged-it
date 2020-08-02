import React, { useState } from 'react';
import SearchBar from './SearchBar'
import SearchTags from './SearchTag'
import recipeFinder from '../../helper/foodApi'

const SearchByIngredient = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchTags, setSearchTags] = useState([]);
	
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
	
	const searchTag = searchTags.map((tag, index) => {
		return(
			<SearchTags key={index}>{tag}</SearchTags>
		)
	})

	return(
		<div>
			<SearchBar 
				searchTerm={searchTerm} 
				setSearchTerm={setSearchTerm}
				searchTags={searchTags} 
				setSearchTags={setSearchTags}
				onKeyUp={pressEnter}/>
				{searchTag}
				<button onClick={onSubmit}>Submit</button>
		</div>
		
	);
}

export default SearchByIngredient;