import React from 'react';
import { Link } from 'react-router-dom'
import className from 'classnames'
import SearchTag from '../SearchByIngredient/SearchTag';
// import SearchTag from './SearchByIngredient/SearchTag'
import Title from '../Title';

import './SideBar.scss'

const SideBar = ({searchTags, removeTag}) => {
  // const [searchTags, setSearchTags] = useState([]);

  const sidebarContainer = className("sidebar_container")

  return (
    <div className={sidebarContainer}>
      <div className="sidebar_header">
        <Link to='/' className="link">
          <Title />
        </Link>
        <hr className="sidebar__separator sidebar--centered" />
      </div>
      {searchTags && <SearchTag searchTags={searchTags} removeTag={removeTag}/>}
    </div>
  )
}

export default SideBar;
