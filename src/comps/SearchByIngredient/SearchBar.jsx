import React, { useState } from 'react';
import './searchBar.css'

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTags, setSearchTags] = useState([]);

  const searchTag = searchTags.map((e, index) => {
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
            props.onKeyUp(searchTerm)
            setSearchTags(prev => [...prev, searchTerm])
            setSearchTerm("")
          }
        }}/>
      </div>
      {searchTag}
    </section>
  );
}

export default SearchBar;