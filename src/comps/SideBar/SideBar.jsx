import React from 'react';
import { Link } from 'react-router-dom'
import SearchTag from '../SearchByIngredient/SearchTag';
// import SearchTag from './SearchByIngredient/SearchTag'
import Title from '../Title';
import classNames from 'classnames'

import './SideBar.scss'

const SideBar = ({searchTags, removeTag, create}) => {
  // const [searchTags, setSearchTags] = useState([]);

  const sidebarContainer = classNames('sidebar_container', {
    "sidebar_container--new" : create
  });

  return (
    <div className={sidebarContainer}>
      <div className="sidebar_header">
        <Link to='/' className="link">
          <Title />
        </Link>
        <hr className="sidebar__separator sidebar--centered" />
      </div>
      <div className="sidebar_content">
        {searchTags && <SearchTag searchTags={searchTags} removeTag={removeTag}/>}
      </div>
    </div>
  )
}

export default SideBar;
