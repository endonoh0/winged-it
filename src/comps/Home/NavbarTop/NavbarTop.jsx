import React from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';

import { Button, Navbar, Nav } from 'react-bootstrap';
import className from 'classnames';

import "./NavbarTop.scss";

const NavbarTop = ({ user }) => {
  let location = useLocation();
  let row = className("row", {
    "hide" : location.pathname === '/map'
  })

  // const ColoredLine = ({ color }) => (
  //   <hr
  //     style={{
  //       color: color,
  //       backgroundColor: color,
  //       height: 5
  //     }}
  //   />
  // );

  return (
    <Navbar className={row} fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Route>
        <Navbar.Brand id="logo" href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />


        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link className="links line-height" to="/home">Home</Link>
            {/* <ColoredLine color="white" /> */}

            <Link className="links line-height" id="search" to="/search">Search</Link>
            <Link className="links line-height" to="/seasonal-ingredients">Ingredients</Link>
            <Link className="links line-height" id="map" to="/map">Map</Link>

            {!user && <Link className="links line-height" id="sign-in" to="/signin">Sign in</Link> }
            { !user && !(
              <Button className="button sign-in" variant="secondary" size="lg" block>
                <a href="/signup">Sign up</a>
              </Button>
            )}

            { user && (
              <Button className="button sign-in display-none line-height-none" variant="secondary" size="lg" block>
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
