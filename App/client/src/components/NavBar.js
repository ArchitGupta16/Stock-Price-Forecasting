import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'; // Assuming you are using react-bootstrap
import { Link, useLocation } from 'react-router-dom';
import "../styles/appTheme.css" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons'; 

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
    <Navbar sticky="top" className="bg-purple-900">
      <Navbar.Brand as={Link} to="/" className="flex items-center text-white text-xl font-bold ml-4">
        <FontAwesomeIcon icon={faChartLine} className="text-white text-xl me-2" />
        <span className="text-2xl">SPF Home</span>
      </Navbar.Brand>
      <div className="ml-auto mr-6">
        <Nav>
          {navItems[currentPage].map((item, index) => (
            <Nav.Item key={index}>
              <Link to={item.to} className="nav-link font-semibold text-lg text-white px-4">
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