import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.scss'

import { FaHome } from 'react-icons/fa';
import { MdFavoriteBorder } from 'react-icons/md';
import { FiLogOut, FiMap } from 'react-icons/fi';


const NavBar = ({setRecipes, setSelectedImg}) => {
	return(
    <>
      <section className="sidebar iWlhAO">
        <nav className="sidebar__menu">
          <div className="sidebar__items">
            <Link to='/' className='link'>
              <FaHome size={32} />
            </Link>

            <Link to='favorites' className='link'>
              <MdFavoriteBorder size={32} />
            </Link>
            <Link to='logout' className='link'>
              <FiLogOut size={32} />
            </Link>
            <Link to='map' className='link'>
              <FiMap size={32}/>
            </Link>
          </div>
        </nav>
      </section>
    </>
	);
}

export default NavBar;
