import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, CardBody,Nav,Navbar } from 'react-bootstrap';
import { useHistory, useNavigate } from 'react-router-dom';
import News from './News';

const StockPrice = () => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState('AAPL'); // Default symbol
  const [priceType, setPriceType] = useState('1. open');
  const [activeNavItem, setActiveNavItem] = useState('0'); // Track active item
  const [activeNav, setActiveNav] = useState('Daily'); // Track active item

  const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY';
  const navigate = useNavigate(); // Initialize history

  const priceTypes = ['1. open', '2. high', '3. low', '4. close', '5. volume'];

  const [symbols, setSymbols] = useState([]); 

  useEffect(() => {
    const hardcodedSymbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN','FB','NFLX','M&M'];
    setSymbols(hardcodedSymbols);
  }, []);

  const handleStatTable = () => {
    navigate(`/stock-chart/${symbol}`);
  }

  const handleNavItemClick = (eventKey) => {
    eventKey.preventDefault(); 
    if (eventKey.target.id === "a") {
      setActiveNavItem('1');
      setActiveNav('Daily');
    }
    else if (eventKey.target.id === "b") {
      setActiveNavItem('0');
      setActiveNav('Weekly');
    }
    else if (eventKey.target.id === "c") {
      setActiveNavItem('2');
      setActiveNav('Monthly');
    }
  };

  const handleCheckPrice = () => {
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`;

    axios.get(apiUrl)
      .then((response) => {
        const timeSeries = response.data['Time Series (1min)'];
        const lastRefreshed = response.data['Meta Data']['3. Last Refreshed'];
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
    <Navbar sticky="top" style={{ background: 'white' }}>
      <Navbar.Brand href="/" className="mr-auto" style={{fontSize: "25px",marginLeft:"1vw"}}>SPF Home</Navbar.Brand>
      {/* <Nav className="ml-auto"></Nav> */}
      <Nav className="ms-auto me-0" style={{fontSize: "20px"}}>
       
        <Nav.Link href="/" >Forecast</Nav.Link>
        <Nav.Link href="/other">About Us</Nav.Link>
        <Nav.Link href="/other">Register</Nav.Link>
        <Nav.Link href="/other" style={{marginRight:"1vw"}}>Login</Nav.Link>
        
      </Nav>
    </Navbar>
    <hr className="hr-custom" style={{ width: '85%', margin: '0 auto', marginTop: '15px',color: '#330066', borderWidth: '3px',opacity:'1' }} />
    <br/>
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col md={7}>
          <News />
        </Col>
        <Col md={5} style={{marginTop:"30vh"}}>
          <Card variant="primary" style={{ width: '25rem', padding: '15px' }}>
            <h2 className="text-center">Check Stock Price</h2>
            <Form>
              <Form.Group>
                <Form.Label>Symbol</Form.Label>
                <Form.Control as="select" value={symbol} onChange={(e) => setSymbol(e.target.value)}>
                  {symbols.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Price Type</Form.Label>
                <Form.Control as="select" value={priceType} onChange={(e) => setPriceType(e.target.value)}>
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
                    <Nav.Link eventKey="1" href="/" id="a" onClick={handleNavItemClick}>
                      Daily
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="0" href="/" id="b" onClick={handleNavItemClick}>
                      Weekly
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="2" href="/" id="c" onClick={handleNavItemClick}>
                      Monthly
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <br />
                <Button variant="primary" onClick={handleCheckPrice}>
                  Check Price
                </Button>
                <Button variant="primary" onClick={handleStatTable} style={{ marginLeft: "5px" }}>
                  Show Stats
                </Button>
              </div>
            </Form>
            {loading ? (
              <p className="text-center mt-3">Loading...</p>
            ) : (
              <p className="text-center mt-3">Price: {price}</p>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};
export default StockPrice;
