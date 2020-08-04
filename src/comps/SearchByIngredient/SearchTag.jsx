import React, { useState, useEffect } from 'react';
import useReadFromFireStore from '../../hooks/useReadFromFirestore'
import { projectFirestore } from '../../firebase/config'

const SearchTag = ({searchTags, user}) => {
  const [tags, setTags] = useState([]);

  // const {results} = useReadFromFireStore('searchTags')
  // let results = [];
  // // if(user.loggedIn){
  //   projectFirestore.collection('searchTags')
  //   .doc('akhJROt11mbAciKch4quVrFTg012')
  //   .get()
  //   .then(doc => {
  //     results = doc.data().searchTags;
  //     console.log(results);
  //   })
  // }
  
  
  useEffect(() => {
    setTags(searchTags);
  },[searchTags]);

	return (
    <div>
      {/* {console.log(tags)} */}
      {tags.map((e, index) => <div key={index}>{e}</div>)}
    </div>
  )
}

export default SearchTag;
