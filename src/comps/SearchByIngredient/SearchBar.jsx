import React from 'react';
import './searchBar.css'

const SearchBar = (props) => {
  const {searchTags, searchTerm, setSearchTerm, onKeyUp} = props;

  const searchTag = searchTags && searchTags.map((e, index) => {
    return <span key={index}>{e}</span>
  })

	return(
    <section>
      <div>
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
      </div>
      {searchTag}
    </section>
  );
}

export default SearchBar;