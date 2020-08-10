
import React, {useState} from 'react';
import './SearchBar.scss'
import { Redirect, Link } from "react-router-dom";


const SearchBar = (props) => {

  const {searchTerm, setSearchTerm, onKeyUp} = props;
	return(
    
    
    <div class="custom-search">
    <input
    className="custom-search-input"
    type="search"
    placeholder="Add Ingredients"
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
    onKeyUp={e => {

      
      if(e.key === 'Enter'){
      
        // onKeyUps(searchTerm)
        document.getElementById("add_btn").click();
        
       
      }
    }}/>

    <Link to="/">
      <button id="add_btn" class="custom-search-botton" type="submit" onClick={e => {onKeyUp(searchTerm)}}>Add</button>
    </Link>

  </div> 
    
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