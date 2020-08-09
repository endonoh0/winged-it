import React from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';

import { Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import className from 'classnames';

import "./NavbarTop.scss";

const NavbarTop = ({ user }) => {
  let location = useLocation();
  let row = className("row", {
    "hide" : location.pathname === '/map'
  })

  return (
    <Navbar className={row} fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Route>
        <Navbar.Brand id="logo" href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />


        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">

            <Link className="links line-height" to="/home">Home</Link>
            <NavDropdown.Divider />

            <NavDropdown title="Search" className="links" id="collasible-nav-dropdown">
              <Link className="dropdown-item" id="search" to="/search">Recipes</Link>
              <Link className="dropdown-item" to="/seasonal-ingredients">Ingredients</Link>
              <Link className="dropdown-item" id="map" to="/map">Market</Link>
            </NavDropdown>

            {user && <Link className="links line-height" to="/favorites">Favorites</Link>}
            <NavDropdown.Divider />


            {!user && <Link className="links line-height" id="sign-in" to="/signin">Sign in</Link> }
            { !user && !(
              <Button className="button sign-in" variant="secondary" size="lg" block>
                <a href="/signup">Sign up</a>
              </Button>
            )}

            { user && (
              <Button className="button sign-in display-none" variant="secondary" size="lg" block>
                <a href="/logout">Logout</a>
              </Button>
            )}
          </Nav>

        </Navbar.Collapse>
      </Route>

    </Navbar>
  );
}


export default NavbarTop;
