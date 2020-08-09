import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.scss'

import { FaHome } from 'react-icons/fa';
import { MdFavoriteBorder, MdCreate } from 'react-icons/md';
import { FiLogOut, FiMap } from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi'


const NavBar = ({setRecipes, setSelectedImg}) => {
	return(
    <>
      <div className="sidebar iWlhAO">
        <div className="sidebar__menu">
          <div className="sidebar__items">
            <Link to='/' className='link'>
              <FaHome size={32} />
            </Link>
            <Link to='favorites' className='link'>
              <MdFavoriteBorder size={32} />
            </Link>
            <Link to='map' className='link'>
              <FiMap size={32}/>
            </Link>
            <Link to='seasonal-ingredients' className='link'>
              <GiWheat size={32}/>
            </Link>
            <Link to='logout' className='link'>
              <FiLogOut size={32} />
            </Link>

          </div>
        </div>
      </div>
    </>
	);
}

export default NavBar;
