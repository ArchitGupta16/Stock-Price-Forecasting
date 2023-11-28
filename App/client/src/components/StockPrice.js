import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Image, Row, Col, Card,  Nav} from "react-bootstrap";
import { useHistory, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const StockPrice = () => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState("AAPL"); // Default symbol
  const [priceType, setPriceType] = useState("1. open");
  const [activeNavItem, setActiveNavItem] = useState("0");
  const [activeNav, setActiveNav] = useState("Daily");
  const [selectedModel, setSelectedModel] = useState(""); 
  const [stockSymbol, setStockSymbol] = useState(""); 
  const [predictSymbol, setpredictSymbol] = useState(""); 
  const [value, setValue] = useState(""); 
  const [newLoading, setNewLoading] = useState(true); 
  const apiKey = "YOUR_ALPHA_VANTAGE_API_KEY";
  const navigate = useNavigate(); // Initialize history

  const priceTypes = ["1. open", "2. high", "3. low", "4. close", "5. volume"];

  const [symbols, setSymbols] = useState([
    "AAPL", "GOOGL", "MSFT", "TSLA", "KOTAK", "FB", "NFLX", "M&M","HDFC"]);
  const [predictedSymbol, setpredictedSymbol] = useState([
    "HCLTECH", "KOTAK", "BPCL", "GAIL", "RELIANCE", "IOC","HDFC"]);

  

  const handleStatTable = () => {
    navigate(`/stock-chart/${symbol}`);
  };

  const handlePredict = () => {
    console.log(predictSymbol);
    console.log(selectedModel);
    axios.post('http://localhost:5000/stock/predict', { symbol: predictSymbol, model: selectedModel })
      .then((response) => {
        console.log(response);
        setValue(response.data.prediction[0].toFixed(2));
        setNewLoading(false);
        console.log(value);
      })
      .catch((error) => {
        console.error(error);
      });
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
      <NavBar/>
      <div className="mt-4 ">
        <Row>
          <Col md={6} className="mb-8 ml-20">
            <Card className="bg-white shadow-lg rounded-lg ">
              <Card.Body className="p-10 ">
              <h2 className="text-4xl font-semibold mb-6 text-purple-900 text-center">
                Welcome to Stock Price Prediction
              </h2>
              <div className="d-flex justify-content-center align-items-center w-100 h-100">
              <Image
                src="https://predictivehacks.com/wp-content/uploads/2021/01/image-11.png"
                alt="Stock Prediction Image"
                className="object-cover border-3 border-purple-900"
                style={{ maxHeight: "80%", maxWidth: "75%" }}
              />
        </div>
            <br/>
            <ul className="text-xl mb-6">
              <li className="mb-4 flex items-start">
                <span className="mr-3 text-xl text-purple-900 align-middle inline-block w-6">&#8226;</span>
                Select a model from the dropdown list provided.
              </li>
              <li className="mb-4 flex items-start">
                <span className="mr-3 text-xl text-purple-900 align-middle inline-block w-6">&#8226;</span>
                Next, choose a stock symbol you want to predict the price for.
              </li>
              <li className="mb-4 flex items-start">
                <span className="mr-3 text-xl text-purple-900 align-middle inline-block w-6">&#8226;</span>
                Click the "Predict" button to fetch the predicted price.
              </li>
              <li className="mb-4 flex items-start">
                <span className="mr-3 text-xl text-purple-900 align-middle inline-block w-6">&#8226;</span>
                The predicted price will be displayed below the button.
              </li>
            </ul>


            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Col className="mb-8 mr-3">
            <Card className="bg-white shadow-lg">
              <Card.Body className="p-8">
                <Form.Group>
                  <Form.Label className="font-semibold">Select Model</Form.Label>
                  <Form.Select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Model</option>
                    <option value="ARIMA">ARIMA</option>
                    <option value="RandomForest">Random Forest</option>
                    <option value="RandomForest">Decision Tree</option>
                    <option value="LSTM">LSTM</option>
                  </Form.Select>
                </Form.Group>
                <br/>
                <Form.Group>
                  <Form.Label className="font-semibold">Stock Symbol</Form.Label>
                  <Form.Control
                    as="select"
                    value={predictSymbol}
                    onChange={(e) => setpredictSymbol(e.target.value)}
                    className="w-full p-2 border rounded "
                    placeholder="Enter Stock Symbol"
                  >
                   {predictedSymbol.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
                <div className="text-center">
                  <br />
                  <Button
                    onClick={handlePredict}
                    className="bg-purple-900 border-purple-900 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full mx-2"
                  >
                    Predict
                  </Button>
                </div>
                {newLoading ? (
                  <p className="text-center mt-3 "></p>
                ) : (
                  <p className="text-center mt-3 font-semibold">Predicted Price : Rs {value}</p>
                )}
              </Card.Body>
            </Card>
          </Col>
          
        <Col  className="mb-4 mr-3">
            <Card className="bg-white shadow-lg ">
            <Card.Body className="p-8">
            <h2 className="text-center text-2xl font-semibold mb-6">
                  Check Stock Price
                </h2>
                <Form>
                  <Form.Group>
                    <Form.Label className="font-semibold">Symbol</Form.Label>
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
                  <br/>
                  <Form.Group>
                    <Form.Label className="font-semibold">Price Type</Form.Label>
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
                    className="bg-purple-900 border-purple-900 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full mx-2"
                  >
                    Check Price
                  </Button>
                  <Button
                    onClick={handleStatTable}
                    className="bg-purple-900 border-purple-900 hover:bg-purple-700 text-white font-semibold py-2 px-6 ml-2 rounded-full"
                  >
                    Show Stats
                  </Button>
                  </div>
                </Form>
                {loading ? (
                  <p className="text-center mt-3"></p>
                ) : (
                  <p className="text-center mt-3 font-semibold">Price: {price}</p>
                )}
              </Card.Body>
            </Card>
          </Col>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default StockPrice;

