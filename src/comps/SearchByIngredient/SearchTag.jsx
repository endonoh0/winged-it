import React, { useState, useEffect } from 'react';

const SearchTag = ({searchTags}) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(searchTags);
  },[searchTags]);

  const onChange = (item) => {
    console.log("item", item); // [eggs, chocolate]
  }

	return (
    <div>
      {tags && <div onChange={onChange(tags)}>{tags}</div>}
    </div>
  )
}

export default SearchTag;
