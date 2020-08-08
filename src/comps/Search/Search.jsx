import React from 'react';

import "./Search.scss";

import SearchBar from "../SearchByIngredient/SearchBar";

const Search = () => {

  return (
    <div className="search_page">
      <div className="title_bar">
          <figure >
            <img className="img" src="./rosemary.png"/>
          </figure>
            <div className="block">
              <div className="text">Search Over Millions of Recipes Based on Ingredients and Diets. </div>
              <SearchBar className="bar"/>
            </div>
      </div> 
    </div>
  );
}

export default Search; 


