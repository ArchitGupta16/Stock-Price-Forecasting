import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/stock/news", {
          symbol: "AAPL",
        }); // Replace 'AAPL' with your desired symbol
        const newsData = response.data.news;
        setNews(newsData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // if (loading) {
  //   return <p>Loading news...</p>;
  // }

  return (
    <div className="flex">
      {/* Left side for news */}
      <div className="w-1/2 p-4">
        <div>
          <Navbar sticky="top" className="">
            <Navbar.Brand href="/" className="">
              SPF Home
            </Navbar.Brand>
            <Nav>
              <Nav.Link href="/">Forecast</Nav.Link>
              <Nav.Link href="/other">About Us</Nav.Link>
              <Nav.Link href="/other">Register</Nav.Link>
              <Nav.Link href="/other" style={{ marginRight: "1vw" }}>
                Login
              </Nav.Link>
            </Nav>
          </Navbar>
        </div>
        <div className="shadow p-4 mb-5 bg-white rounded">
          <h4>News for AAPL</h4>
          <Row>
            {news.map((item, index) => (
              <Row key={index} className="news-item">
                <Col md={3}>
                  {item.thumbnail && item.thumbnail.resolutions && (
                    <Card.Img
                      variant="top"
                      src={item.thumbnail.resolutions[0].url}
                    />
                  )}
                </Col>
                <Col md={7}>
                  <Card.Body>
                    <Card.Title className="news-title">{item.title}</Card.Title>
                    <Card.Text className="news-summary">
                      {item.summary}
                    </Card.Text>
                    <Card.Text className="news-source">
                      {item.publisher}
                    </Card.Text>
                    <Card.Link
                      href={item.link}
                      className="news-url"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more
                    </Card.Link>
                  </Card.Body>
                </Col>
              </Row>
            ))}
          </Row>
        </div>
      </div>

      {/* Right side for cards */}
      <div className="w-1/2 p-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Four card components */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            {/* Card content */}
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            {/* Card content */}
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            {/* Card content */}
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            {/* Card content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
