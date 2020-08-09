import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.scss'

import { FaHome } from 'react-icons/fa';
import { MdFavoriteBorder, MdCreate } from 'react-icons/md';
import { FiLogOut, FiMap } from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const NavBar = () => {

  const renderTooltip = (props) => (
    <Tooltip className="tooltip-top" id={props} >
      {props}
    </Tooltip>
  );

	return(
    <>
      <div className="sidebar iWlhAO">
        <div className="sidebar__menu">
          <div className="sidebar__items">

            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              color="white"
              overlay={renderTooltip('home')}
            >
              <Link to='/' className='link'>
                <FaHome size={32} />
              </Link>
            </OverlayTrigger>

            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              color="white"
              overlay={renderTooltip('Favorites')}
            >
              <Link to='favorites' className='link'>
                <MdFavoriteBorder size={32} />
              </Link>
            </OverlayTrigger>

            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              color="white"
              overlay={renderTooltip('Map')}
            >
              <Link to='map' className='link'>
                <FiMap size={32}/>
              </Link>
            </OverlayTrigger>

            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              color="white"
              overlay={renderTooltip('Ingredients')}
            >
              <Link to='seasonal-ingredients' className='link'>
                <GiWheat size={32}/>
              </Link>
            </OverlayTrigger>

            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              color="white"
              overlay={renderTooltip('Logout')}
            >
              <Link to='logout' className='link'>
                <FiLogOut size={32} />
              </Link>
            </OverlayTrigger>

          </div>
        </div>
      </div>
    </>
	);
}

export default NavBar;
