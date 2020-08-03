import React from 'react';
import { Link } from 'react-router-dom'
import './NavBar.scss'
import SideBar from '../SideBar/SideBar';
import { FaHome } from 'react-icons/fa';
import { MdFavoriteBorder } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';

const NavBar = () => {
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
        </div>
      </nav>
    </section>
    {/* <SideBar /> */}

    </>
	);
}

export default NavBar;
