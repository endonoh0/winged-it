import React from 'react';
import { Link } from 'react-router-dom'
import './NavBar.scss'

const NavBar = () => {
	return(
		<section className="sidebar">
			<Link to='/' className="link"><h1>Winged It</h1></Link>
			<hr className="sidebar__separator sidebar--centered" />
			<nav className="sidebar__menu">
				<ul>
					<li>
						<Link to='signup' className='link'>
							Sign Up
						</Link>
					</li>
					<li>
						<Link to='signin' className='link'>
							Sign In
						</Link>
					</li>
					<li>
						<Link to='favorites' className='link'>
							Favorites
						</Link>
					</li>
					<li>
						<Link to='search' className='link'>
							Search
						</Link>
					</li>
				</ul>
			</nav>
		</section>
	);
}

export default NavBar;