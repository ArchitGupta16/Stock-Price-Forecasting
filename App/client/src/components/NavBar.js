import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'; // Assuming you are using react-bootstrap
import { Link, useLocation } from 'react-router-dom';
import "../styles/appTheme.css" 

const NavBar = () => {
  const location = useLocation();

  const navItems = {
    '/': [
      { to: '/predict', text: 'Forecast' },
      { to: '/userAuth', text: 'Register' },
      { to: '/userAuth', text: 'Login' },
      { to: '/aboutUs', text: 'About Us' },
    ],
    '/aboutUs': [
      { to: '/predict', text: 'Forecast' },
      { to: '/userAuth', text: 'Register' },
      { to: '/userAuth', text: 'Login' },
    ],
    '/predict': [
      { to: '/aboutUs', text: 'About Us' },
      { to: '/userAuth', text: 'Register' },
      { to: '/userAuth', text: 'Login' },
    ],
    '/userAuth': [
      { to: '/predict', text: 'Forecast' },
      { to: '/aboutUs', text: 'About Us' },
    ],
    '/portfolio': [
      { to: '/predict', text: 'Forecast' },
      { to: '/aboutUs', text: 'About Us' },
      { to: '/', text: 'Logout' },
    ],
  };

  const currentPage = location.pathname;

  return (
    <Navbar v sticky="fixed" className="open-sans theme" variant="dark" >
      <Navbar.Brand as={Link} to="/" className="text-white text-xl font-bold">
        <span className="h3" style={{marginLeft:"15%"}} >SPF Home</span>
      </Navbar.Brand>
      <div className="ms-auto" style={{marginRight:"1%"}}>
        <Nav >
          {navItems[currentPage].map((item, index) => (
            <Nav.Item key={index}>
              <Link to={item.to} className="nav-link font-sans text-xl text-white" >
                {item.text}
              </Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavBar;