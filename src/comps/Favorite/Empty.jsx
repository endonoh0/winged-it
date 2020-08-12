import React from 'react';

import { FaHome } from 'react-icons/fa';
import './Empty.scss'

//Showing message when you do not have any fav selected
const Empty = () => {
  return (
    <div>
      <div className="fav_empty">
        <h4 > You do not have any favorite recipe. Checkout the 
        </h4>
      </div>
      <div id='home_fav_page'>
          <a id='home_fav_page_href' href="/"><FaHome /></a>
      </div>
    </div>
    
  );
  
  
}

export default Empty;