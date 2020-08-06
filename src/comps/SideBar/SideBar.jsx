import React from 'react';
import { Link } from 'react-router-dom'
import SearchTag from '../SearchByIngredient/SearchTag';
// import SearchTag from './SearchByIngredient/SearchTag'
import Title from '../Title';
import Directions from '../Directions/Directions';

import './SideBar.scss'

const SideBar = ({searchTags, user, removeTag, directions}) => {
  // const [searchTags, setSearchTags] = useState([]);
  if (directions) {
    console.log('directions work:', directions);
  }
  return (
    <div className="sidebar_container">
      <div className="sidebar_header">
        {directions && <Directions data={directions} />}

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
