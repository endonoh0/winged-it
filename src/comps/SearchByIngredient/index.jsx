import React, { useState, useEffect } from 'react';
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
		searchButtonVisual = true,
		searchTagsFetchStatus,
		filter
	} = props;

	const [searchTerm, setSearchTerm] = useState('');

	// useEffect(() => {
	// 	if(searchTagsFetchStatus){
	// 		document.getElementById("search_recipe_btn").click();
	// 	}

	// }, [searchTagsFetchStatus])

	// this class hide the search button on the search page
	let searchButtonClass = searchButtonVisual? "" : "display_non";
	searchButtonClass += " btn btn-primary waves-effect waves-light";

	const pressEnter = (searchTerm) => {
		if(searchTerm && !searchTags.includes(searchTerm)){
			setSearchTags(prev => [...prev, searchTerm])
			writeTag(searchTerm)
			setSearchTerm("")
		}
	}

	return(
		<>
			<button id="search_recipe_btn" className={searchButtonClass} onClick={onSubmit}>Recipe Search</button>
			{filter}
			<div>
				<SearchBar
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					searchTags={searchTags}
					setSearchTags={setSearchTags}
					onKeyUp={pressEnter}/>
			</div>
			{children}
		</>

	);
}

export default SearchByIngredient;
