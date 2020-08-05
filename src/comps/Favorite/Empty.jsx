import React from 'react';

import { FaHome } from 'react-icons/fa';
import './Empty.scss'

const Empty = () => {
  return (
    <div>
      <div className="fav_empty">
        <h4 > You do not have any favorite recipe. Checkout the 
        </h4>
      </div>
      <div id='home_fav_page'>
          <a  href="/"><FaHome /></a>
      </div>
    </div>
    
  );
  
  
}

export default Empty;