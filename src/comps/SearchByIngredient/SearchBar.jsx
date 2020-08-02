import React from 'react';
import './searchBar.css'

const SearchBar = (props) => {
  const {searchTerm, setSearchTerm, onKeyUp} = props;

	return(
    <section>
      <input
      type="search"
      placeholder="Add to list"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      onKeyUp={e => {
        if(e.key === 'Enter'){
          onKeyUp(searchTerm)
        }
      }}/>
    </section>
  );
}

export default SearchBar;