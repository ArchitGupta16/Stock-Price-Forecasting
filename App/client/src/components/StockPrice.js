import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, CardBody } from 'react-bootstrap';
import { useHistory, useNavigate } from 'react-router-dom';

const StockPrice = () => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState('AAPL'); // Default symbol
  const [priceType, setPriceType] = useState('1. open');
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
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Col md={6}>
        <Card variant="primary" style={{ width: '25rem',padding:'15px' }}>
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
            <br/>
            <Button variant="primary" onClick={handleCheckPrice}>
              Check Price
            </Button>
            <Button variant="primary" onClick={handleStatTable} style={{marginLeft:"5px"}}>
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
        
    </Container>
  );
};

export default StockPrice;
