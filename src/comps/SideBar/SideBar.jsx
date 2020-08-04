import React from 'react';
import { Link } from 'react-router-dom'
import SearchTag from '../SearchByIngredient/SearchTag';
// import SearchTag from './SearchByIngredient/SearchTag'
import Title from '../Title';

import './SideBar.scss'

const SideBar = ({searchTags}) => {
  // const [searchTags, setSearchTags] = useState([]);

  return (
    <div className="sidebar_container">
      <div className="sidebar_header">
        <Link to='/' className="link">
          <Title />
        </Link>
        <hr className="sidebar__separator sidebar--centered" />
      </div>
      {searchTags && <SearchTag searchTags={searchTags} />}
    </div>
  )
}

export default SideBar;
