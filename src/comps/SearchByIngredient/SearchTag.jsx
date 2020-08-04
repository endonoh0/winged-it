import React, { useState, useEffect } from 'react';

const SearchTag = ({searchTags}) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(searchTags);
  },[searchTags]);

	return (
    <div>
      {tags.map((e, index) => <div key={index}>{e}</div>)}
    </div>
  )
}

export default SearchTag;
