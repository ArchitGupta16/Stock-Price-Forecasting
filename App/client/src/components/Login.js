import React, { useState } from "react";
import {
  Toast,
  Form,
  Button,
  Container,
  Row,
  Col,
  Carousel,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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
      localStorage.setItem("userName", loginData.email);
      // Redirect to the portfolio page
      navigate("/portfolio");
    } catch (error) {
      console.error("Login failed:", error);
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
      // You can handle user registration success here.
    } catch (error) {
      console.error("Registration failed:", error);
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
        if (response.data.message == "User not found") {
          setShowToast(true);
          setToastMessage("Please Register First");
          return;
        }
        localStorage.setItem("userName", result.email);
        navigate("/portfolio");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const credentialError = (error) => {
    setShowToast(true);
    console.error(error);
  };

  const slideshowImages = [
    "https://media.licdn.com/dms/image/C5612AQHFS24TyOdTyA/article-cover_image-shrink_600_2000/0/1631788301339?e=2147483647&v=beta&t=oze0QUlnGVBZs59UrBYWBhgEId3IcgFgywlIB1t-B7s",
    "https://daxg39y63pxwu.cloudfront.net/images/blog/stock-price-prediction-using-machine-learning-project/Stock_Price_Prediction.webp",
    "https://miro.medium.com/v2/resize:fit:1400/0*o-qaF_Oovg26BoCd",
  ];

  return (
    <div>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={5000}
        autohide
        className="position-absolute top-0"
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Error Login</strong>
          <small>Just Now</small>
        </Toast.Header>
        <Toast.Body>Please Register First</Toast.Body>
      </Toast>

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
