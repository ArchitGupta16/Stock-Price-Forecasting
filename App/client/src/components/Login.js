import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Carousel, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import NavBar from './NavBar';
import { useNavigate  } from 'react-router-dom';

const UserAuth = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [showLogin, setShowLogin] = useState(true);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/user/login', loginData);
      console.log('Login ', response.data);
      // You can handle user login success here.
      // setName(response.data.name);
      localStorage.setItem('userName', loginData.email);
    // Redirect to the portfolio page
      navigate('/portfolio');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/user/register', registerData);
      console.log('Registration successful:', response.data);
      // You can handle user registration success here.
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const slideshowImages = [
    'https://media.licdn.com/dms/image/C5612AQHFS24TyOdTyA/article-cover_image-shrink_600_2000/0/1631788301339?e=2147483647&v=beta&t=oze0QUlnGVBZs59UrBYWBhgEId3IcgFgywlIB1t-B7s',
    'https://daxg39y63pxwu.cloudfront.net/images/blog/stock-price-prediction-using-machine-learning-project/Stock_Price_Prediction.webp',
    'https://miro.medium.com/v2/resize:fit:1400/0*o-qaF_Oovg26BoCd',
  ];

  return (
    <div >
      <NavBar />
      <Container className="bg-white p-4 border rounded-lg shadow-lg shadow-black" style={{marginTop:"10%"}}>
        <Row>
          <Col md={6} className="d-flex align-items-center">
            <Carousel interval={3000} className="slideshow">
              {slideshowImages.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`Slideshow Image ${index + 1}`}
                    style = {{borderRadius:"20px",height:"40vh"}}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col md={6}>
            <div className="d-flex justify-content-between mb-4">
              <Button
                variant={showLogin ? 'primary' : 'light'}
                onClick={handleToggle}
              >
                Login
              </Button>
              <Button
                variant={showLogin ? 'light' : 'success'}
                onClick={handleToggle}
              >
                Register
              </Button>
            </div>
            {showLogin ? (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <Form onSubmit={handleLoginSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <FormControl
                        type="email"
                        name="email"
                        onChange={handleLoginChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <FormControl
                        type="password"
                        name="password"
                        onChange={handleLoginChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Register</h2>
                <Form onSubmit={handleRegisterSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <InputGroup>
                      <FormControl
                        type="text"
                        name="name"
                        onChange={handleRegisterChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <FormControl
                        type="email"
                        name="email"
                        onChange={handleRegisterChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <FormControl
                        type="password"
                        name="password"
                        onChange={handleRegisterChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Button variant="success" type="submit">
                    Register
                  </Button>
                </Form>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserAuth;
