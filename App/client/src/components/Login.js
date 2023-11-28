import React, { useState } from "react";
import {Form, Button, Container, Row, Col, Carousel, InputGroup, FormControl} from "react-bootstrap";
import axios from "axios";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAlert } from "react-alert"; 

const UserAuth = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showLogin, setShowLogin] = useState(true);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const alert = useAlert(); 

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
      const response = await axios.post(
        "http://127.0.0.1:5000/user/login",
        loginData
      );
      console.log("Login ", response.data);
      // You can handle user login success here.
      // setName(response.data.name);
      if (response.data.message === "Incorrect password") {
        console.log("Invalid Password");
        alert.show("Incorrect password. Please check!",{type: 'error'})
        // alert.show("Invalid Credentials. Please try again!" ,{type: 'error'})
        return;
      }
      if (response.data.message === "User not found") {
        console.log("User not found");
        alert.show("User not found. Please register first!",{type: 'error'})
        // alert.show("Invalid Credentials. Please try again!" ,{type: 'error'})
        return;
      }

      localStorage.setItem("userName", loginData.email);
      // Redirect to the portfolio page
      navigate("/portfolio");
    } catch (error) {
      console.error("Login failed:", error);
      alert.show("Invalid Credentials. Please try again!",{type: 'error'})
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/user/register",
        registerData
      );
      console.log("Registration successful:", response.data);
      alert.show("Registration Successful. Please Login!")
      // You can handle user registration success here.
    } catch (error) {
      console.error("Registration failed:", error);
      alert.show("Registration failed. Please try again!")
    }
  };

  const decodeJwtResponse = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const credentialResponse = async (res) => {
    const decoded = decodeJwtResponse(res.credential);
    const result = {
      email: decoded.email,
      familyname: decoded.family_name, // last name
      name: decoded.name,
      givenName: decoded.given_name, // first name
      googleID: decoded.sub,
      imageUrl: decoded.picture,
      isAdmin: true,
      loginType: "google",
      cred: res.credential,
    };
    axios
      .post("http://127.0.0.1:5000/user/glogin", { email: result.email })
      .then((response) => {
        console.log(response.data);
        
        localStorage.setItem("userName", result.email);
        navigate("/portfolio");
      })
      .catch((error) => {
        console.log(error);
        alert.show("Please register first!")
      });
  };

  const credentialError = (error) => {
    alert.show("Something went wrong. Please try again!")
    console.error(error);
  };

  const slideshowImages = [
    "https://assets.nst.com.my/images/articles/stock-prices-bursa_1669292714.jpg",
    "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202309/qdnb38ow6s3arrhby4ttke-415-80_5_4-sixteen_nine.jpg?size=948:533",
    "https://miro.medium.com/v2/resize:fit:1400/0*o-qaF_Oovg26BoCd",
    "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202311/forex-vs-stocks_3_0-sixteen_nine.jpg?size=948:533"
  ];

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center h-screen">
        <Container
          className="bg-white p-6 border rounded-lg shadow-lg "
          style={{ marginTop: "-10vh" }}
        >
          <Row>
            <Col md={6} className="flex items-center">
              <Carousel interval={3000} className="slideshow">
                {slideshowImages.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={image}
                      alt={`Slideshow Image ${index + 1}`}
                      style={{ borderRadius: "20px", height: "40vh" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>

            <Col md={6}>
              <div className="flex justify-between mb-4">
                <Button
                  variant={showLogin ? "dark" : "light"}
                  className={`text-white border bg-purple-900 ${
                    showLogin ? "bg-purple-900" : "bg-black"
                  }`}
                  onClick={handleToggle}
                >
                  Login
                </Button>
                <Button
                  variant={showLogin ? "light" : "success"}
                  className={`text-white border bg-green-700 ${
                    showLogin ? "bg-black" : "bg-green-700"
                  }`}
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
                          required
                          onChange={handleLoginChange}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                        <FormControl
                          type="password"
                          required
                          name="password"
                          onChange={handleLoginChange}
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Button
                        variant="dark"
                        type="submit"
                        className="bg-purple-900 border border-purple-900 text-white"
                      >
                        Login
                      </Button>
                      <div className="flex items-center">
                        <hr className="w-32 border-gray-900" />
                        <span className="mx-4 text-gray-600 font-bold">OR</span>
                        <hr className="w-32 border-gray-900" />
                      </div>
                      <GoogleLogin
                        onSuccess={credentialResponse}
                        onError={credentialError}
                        className="border border-gray-300 p-2"
                      />
                    </div>
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
                          type="name"
                          name="name"
                          required
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
                          required
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
                          required
                          onChange={handleRegisterChange}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Button
                      variant="success"
                      type="submit"
                      className="bg-green-700 border border-green-700 text-white"
                    >
                      Register
                    </Button>
                  </Form>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default UserAuth;
