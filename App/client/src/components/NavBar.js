import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'; // Assuming you are using react-bootstrap
import { Link, useLocation } from 'react-router-dom';

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
    <Navbar sticky="fixed" className="bg-blue-500 p-2">
      <Navbar.Brand as={Link} to="/" className="text-black text-xl font-bold">
        <span className="h3">SPF Home</span>
      </Navbar.Brand>
      <div className="ms-auto">
        <Nav>
          {navItems[currentPage].map((item, index) => (
            <Nav.Item key={index}>
              <Link to={item.to} className="nav-link text-xl text-black">
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
