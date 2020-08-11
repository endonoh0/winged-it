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

	const pressEnter = (searchTerm) => {
		if(searchTerm && !searchTags.includes(searchTerm)){
			setSearchTags([...searchTags, searchTerm])
			writeTag(searchTerm, 'searchTags')
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
			{/* {children} */}
		</>

	);
}

export default SearchByIngredient;
