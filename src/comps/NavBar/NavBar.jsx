import React from 'react';
import { Link } from 'react-router-dom'
import './NavBar.scss'

const NavBar = () => {
	return(
		<section className="sidebar">
			<Link to='/' className="link"><h1>Winged It</h1></Link>
			<hr className="sidebar__separator sidebar--centered" />
			<nav className="sidebar__menu">
				<ul className="nabvar-nav">
					<li className="nav-item">
						<Link to='signup' className='link'>
							Sign Up
						</Link>
					</li>

					<li className="nav-item">
						<Link to='signin' className='link'>
							Sign In
						</Link>
					</li>

					<li className="nav-item">
						<Link to='favorites' className='link'>
							Favorites
						</Link>
					</li>
				</ul>
			</nav>
		</section>
	);
}

export default NavBar;
