import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import className from 'classnames'
import SearchTag from '../SearchByIngredient/SearchTag';
// import SearchTag from './SearchByIngredient/SearchTag'
import Title from '../Title';
import Directions from '../Directions/Directions';

import './SideBar.scss'

const SideBar = ({searchTags, removeTag, form, title, setTitle, directions}) => {
  // const [searchTags, setSearchTags] = useState([]);

  const sidebarContainer = className("sidebar__container", {
    'sidebar__container--form' : form
  })

  return (
    <div className={sidebarContainer}>
      <div className="sidebar__header">
        <Link to='/' className="link">
          <Title />
        </Link>
        <hr className="sidebar__separator sidebar--centered" />
        {directions && <Directions data={directions} />}

      </div>
      <div className="sidebar__content">
        {searchTags && <SearchTag searchTags={searchTags} removeTag={removeTag}/>}
        {form &&
        <div className="form">
          <label/>
          <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          />
        </div>
        }
      </div>
    </div>
  )
}

export default SideBar;
