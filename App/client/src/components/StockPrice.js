import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useHistory, useNavigate } from "react-router-dom";
// import News from "./News";

const StockPrice = () => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState("AAPL"); // Default symbol
  const [priceType, setPriceType] = useState("1. open");
  const [activeNavItem, setActiveNavItem] = useState("0"); // Track active item
  const [activeNav, setActiveNav] = useState("Daily"); // Track active item

  const apiKey = "YOUR_ALPHA_VANTAGE_API_KEY";
  const navigate = useNavigate(); // Initialize history

  const priceTypes = ["1. open", "2. high", "3. low", "4. close", "5. volume"];

  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const hardcodedSymbols = [
      "AAPL",
      "GOOGL",
      "MSFT",
      "TSLA",
      "AMZN",
      "FB",
      "NFLX",
      "M&M",
    ];
    setSymbols(hardcodedSymbols);
  }, []);

  const handleStatTable = () => {
    navigate(`/stock-chart/${symbol}`);
  };

  const handleNavItemClick = (eventKey) => {
    eventKey.preventDefault();
    if (eventKey.target.id === "a") {
      setActiveNavItem("1");
      setActiveNav("Daily");
    } else if (eventKey.target.id === "b") {
      setActiveNavItem("0");
      setActiveNav("Weekly");
    } else if (eventKey.target.id === "c") {
      setActiveNavItem("2");
      setActiveNav("Monthly");
    }
  };

  const handleCheckPrice = () => {
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const timeSeries = response.data["Time Series (1min)"];
        const lastRefreshed = response.data["Meta Data"]["3. Last Refreshed"];
        const latestPrice = timeSeries[lastRefreshed][priceType];

        setPrice(latestPrice);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar sticky="top" className="bg-blue-500 p-2">
        <Navbar.Brand href="/" className="text-white text-2xl font-bold">
          SPF Home
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="/" className="text-white">
            Forecast
          </Nav.Link>
          <Nav.Link href="/other" className="text-white">
            About Us
          </Nav.Link>
          <Nav.Link href="/other" className="text-white">
            Register
          </Nav.Link>
          <Nav.Link
            href="/other"
            className="text-white"
            style={{ marginRight: "1vw" }}
          >
            Login
          </Nav.Link>
        </Nav>
      </Navbar>
      <hr className="my-4" />
      <Container className="flex justify-center items-center h-screen">
        <Row>
          <Col style={{ marginTop: "2%" }}>{/* <News /> */}</Col>
          <Col>
            <Card className="bg-white shadow-lg ">
              <CardBody className="flex justify-center items-center">
                <h2 className="text-center text-2xl font-semibold ">
                  Check Stock Price
                </h2>
                <Form>
                  <Form.Group>
                    <Form.Label>Symbol</Form.Label>
                    <Form.Control
                      as="select"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      {symbols.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Price Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={priceType}
                      onChange={(e) => setPriceType(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      {priceTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <div className="text-center">
                    <br />
                    <Nav justify variant="tabs" activeKey={activeNavItem}>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="1"
                          href="/"
                          id="a"
                          onClick={handleNavItemClick}
                          className="cursor-pointer"
                        >
                          Daily
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="0"
                          href="/"
                          id="b"
                          onClick={handleNavItemClick}
                          className="cursor-pointer"
                        >
                          Weekly
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="2"
                          href="/"
                          id="c"
                          onClick={handleNavItemClick}
                          className="cursor-pointer"
                        >
                          Monthly
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <br />
                    <Button
                      onClick={handleCheckPrice}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mx-2"
                    >
                      Check Price
                    </Button>
                    <Button
                      onClick={handleStatTable}
                      className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 ml-2 rounded"
                    >
                      Show Stats
                    </Button>
                  </div>
                </Form>
                {loading ? (
                  <p className="text-center mt-3">Loading...</p>
                ) : (
                  <p className="text-center mt-3">Price: {price}</p>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StockPrice;
