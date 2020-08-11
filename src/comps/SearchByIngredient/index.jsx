import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar'
import recipeFinder from '../../helper/foodApi';
import Button from 'react-bootstrap/Button';
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

	//This make sure that click the search button once you load the search page
	useEffect(() => {
		if(searchTagsFetchStatus){

			setTimeout(() => {
				document.getElementById("search_recipe_btn").click();
			}, );

		}
	}, [searchTagsFetchStatus]);

	// this class hide the search button on the search page
	let searchButtonClass = searchButtonVisual? "" : "display_non";
	searchButtonClass += " btn btn-primary waves-effect waves-light";


	const pressEnter = (searchTerm) => {
		if(searchTerm && !searchTags.includes(searchTerm)){
			setSearchTags(prev => [...prev, searchTerm])
			writeTag(searchTerm, 'searchTags')
			setSearchTerm("")
		}
	};

	return(
		<>
      <Button
        id="btn"
        variant="primary"
        size="lg"
        className={searchButtonClass}
        onClick={onSubmit}
      >
        Recipe Search
      </Button>
			{/* <button id="search_recipe_btn" className={searchButtonClass} onClick={onSubmit}>Recipe Search</button> */}
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
