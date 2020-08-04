import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import SearchByIngredient from '../SearchByIngredient/index';
// import SearchTag from './SearchByIngredient/SearchTag'
import Title from '../Title';

import './SideBar.scss'

const SideBar = ({setRecipes}) => {
  // const [searchTags, setSearchTags] = useState([]);

  return (
    <div className="sidebar_container">
      <div className="sidebar_header">
        {/* <Link to='/' className="link"><h3>Winged It</h3></Link> */}
        <Link to='/' className="link">
          <Title />
        </Link>
        <hr className="sidebar__separator sidebar--centered" />
      </div>
      <SearchByIngredient setRecipes={setRecipes} />
    </div>
  )
}

export default SideBar;
