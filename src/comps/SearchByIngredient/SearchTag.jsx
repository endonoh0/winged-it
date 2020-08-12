import React, { useState, useEffect } from 'react';
import './SearchTag.scss'

import { RiDeleteBin5Line } from 'react-icons/ri';

const SearchTag = ({searchTags, removeTag}) => {
  const [tags, setTags] = useState([]);
  
  useEffect(() => {
    setTags(searchTags);
  },[searchTags]);

  const firstLetterToUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


	return (
    <div className='tag-container'>
      {tags.map((tag, index) => 
      <div className='search-tag' key={index}>
        <div >
          {firstLetterToUpperCase(tag)}
        </div>
        <span className='remove' onClick={e => removeTag(tag)}><RiDeleteBin5Line/></span>
        
      </div>
      
      )}

    </div>
  )
}

export default SearchTag;
