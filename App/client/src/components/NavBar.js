import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'; // Assuming you are using react-bootstrap
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar sticky="top" className="bg-blue-500 p-2">
      <Navbar.Brand as={Link} to="/" className="text-black text-xl font-bold">
        <span className="h3">SPF Home</span>
      </Navbar.Brand>
      <div className="ms-auto">
        <Nav>
          <Nav.Item>
            <Link to="/predict" className="nav-link text-xl text-black">Forecast</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/aboutUs" className="nav-link text-xl text-black">About Us</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/other" className="nav-link text-xl text-black">Register</Link>
          </Nav.Item>
          <Nav.Item style={{ marginRight: "1vw" }}>
            <Link to="/other" className="nav-link text-black">Login</Link>
          </Nav.Item>
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavBar;
