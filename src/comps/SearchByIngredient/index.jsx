import React, { useState} from 'react';
import SearchBar from './SearchBar'
import "./index.scss";

const SearchByIngredient = (props) => {

	const {
		searchTags,
		setSearchTags,
		writeTag,
		filter
	} = props;

	const [searchTerm, setSearchTerm] = useState('');

	// Formating the search term 
  const firstLetterUpperCaseRestLowerCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

	const pressEnter = (searchTerm) => {
		
		let formatSearchTerm = "";
		if(searchTerm) {
			formatSearchTerm = firstLetterUpperCaseRestLowerCase(searchTerm);
		} 

		if(formatSearchTerm && !searchTags.includes(formatSearchTerm)){
			
			setSearchTags([...searchTags, formatSearchTerm])
			writeTag(formatSearchTerm, 'searchTags')
			setSearchTerm("")
		}
	};

	return(
		<>
			{filter}
			<div>
				<SearchBar
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					searchTags={searchTags}
					setSearchTags={setSearchTags}
					onKeyUp={pressEnter}/>
			</div>
		</>

	);
}

export default SearchByIngredient;
