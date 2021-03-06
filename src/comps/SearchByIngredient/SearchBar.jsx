import React, {useState, useEffect} from 'react';
import { Redirect, Link } from "react-router-dom";

import './SearchBar.scss'

const SearchBar = (props) => {

  const {searchTerm, setSearchTerm, onKeyUp, searchTagsFetchStatus} = props;
  useEffect(() => {
    if (searchTagsFetchStatus) {
      document.getElementById("search_recipe_btn").click();
    }

  }, [searchTagsFetchStatus])
	return (
    <>
    <div class="custom-search ml-18">
      <input
        className="custom-search-input"
        placeholder="Add Ingredients"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyUp={e => {
          if(e.key === 'Enter'){
            document.getElementById("add_btn").click();
          }
      }}
      />
      <Link to="/results">
        <button id="add_btn" className="custom-search-botton" type="submit" onClick={e => {onKeyUp(searchTerm)}}>Add</button>
      </Link>
    </div>
    </>
  );
}

export default SearchBar;


































//****************** backup */

// import React from 'react';
// import './SearchBar.scss'

// const SearchBar = (props) => {
//   const {searchTerm, setSearchTerm, onKeyUp} = props;

// 	return(
//     <div className="card card-sm">
//       <div className="row no-gutters align-items-center">
//         <div className="col">
//           <input
//           type="search"
//           placeholder="Add to list"
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           onKeyUp={e => {
//             if(e.key === 'Enter'){
//               onKeyUp(searchTerm)
//             }
//           }}/>
//         </div>
//         <div className="col-auto">
//           <button className="btn btn-lg btn-success" onClick={e => onKeyUp(searchTerm)}>Add</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SearchBar;
