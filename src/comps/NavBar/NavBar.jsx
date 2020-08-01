import React from 'react';
import './NavBar.scss'

const NavBar = () => {
	return(
		<section className="sidebar">
			<h1>Winged It</h1>
			<hr className="sidebar__separator sidebar--centered" />
			<nav className="sidebar__menu">
			</nav>
		</section>
	);
}

export default NavBar;