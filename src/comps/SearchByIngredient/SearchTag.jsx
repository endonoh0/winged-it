import React, { useState, useEffect } from 'react';
import './SearchTag.scss'

const SearchTag = ({searchTags, removeTag}) => {
  const [tags, setTags] = useState([]);
  
  useEffect(() => {
    setTags(searchTags);
  },[searchTags]);

	return (
    <div className='tag-container'>
      {tags.map((tag, index) => 
      <div className='search-tag'key={index}>
        <div>
          {tag}
          
        </div>
        <span className='remove' onClick={e => removeTag(tag)}>x</span>
      </div>
      )}
    </div>
  )
}

export default SearchTag;
