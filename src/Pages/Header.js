import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Navbar className='border-bottom'>
              <Container>
                <Navbar.Brand as={NavLink} to="/">Registration And Login</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                     <NavLink to="/register">Register</NavLink> | <NavLink to="/login">Login</NavLink>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </div>
    );
};

export default Header;