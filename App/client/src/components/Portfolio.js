import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Card, Form, Button } from 'react-bootstrap';
import NavBar from './NavBar';
import axios from 'axios';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [newStock, setNewStock] = useState({ symbol: '', shares: 0, purchasePrice: 0, currentPrice: 0 });
  const emailId = localStorage.getItem('userName');
  const totalValue = portfolioData.reduce((total, stock) => total + stock.volume * stock.current_val, 0);
  const totalPurchaseValue = portfolioData.reduce((total, stock) => total + stock.volume * stock.price, 0);
  const gainLoss = totalValue - totalPurchaseValue;

  // Fetch the portfolio using emailId in the localstorage and set the portfolioData
  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    // const emailId = localStorage.getItem('userName');
    axios.post('http://127.0.0.1:5000/prf/getall', { email:emailId })
    .then((response) => {
      console.log(response.data.stocks);
      setPortfolioData(response.data.stocks);
    }
    )
    .catch((error) => {
      console.log(error);
    }
    );
  };

  const addStock = async () => {
    // const emailId = localStorage.getItem('userName');
    const newId = Math.max(...portfolioData.map((stock) => stock.id), 0) + 1;
    const newStockData = { ...newStock, id: newId, email: emailId };
    console.log(newStockData);
    axios.post('http://127.0.0.1:5000/prf/add', newStockData)
    .then((response) => {
      console.log(response.data);
      setPortfolioData([...portfolioData, newStockData]);
      fetchPortfolio();
    }
    )
    .catch((error) => {
      console.log(error);
    }
    );
  };
  
  const deleteStock = async (symbol) => {
    // const emailId = localStorage.getItem('userName');
    console.log(emailId);
    console.log(symbol);
    axios.post('http://127.0.0.1:5000/prf/remove', { email: emailId, symbol: symbol })
    .then((response) => {
      console.log(response.data);
      setPortfolioData(portfolioData.filter((stock) => stock.symbol !== symbol));
    }
    )
    .catch((error) => {
      console.log(error);
    }
    );
  };

  return (
    <div>
      <NavBar />
      <Container className="mt-5 h-screen w-screen">
        <Row md={12}>
          <Col md={8}>
            <h1 className="text-4xl font-bold mb-5">My Portfolio</h1>
          </Col>
          <Col md={4} className="flex items-end">
            <Card className="mb-5 bg-white">
              <Card.Body>
                <Card.Text>
                  <p className="text-center text-xl font-bold">{emailId}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Row>
              {portfolioData.length === 0 ? (
                <p>No stocks available</p>
              ) : (
                portfolioData.map((stock) => (
                  <Col md={6} key={stock.id}>
                    <Card className="mb-4 bg-white shadow-lg">
                      <Card.Body>
                        <Card.Title>{stock.symbol}</Card.Title>
                        <Card.Text>
                          <p className="font-bold">Shares: {stock.volume}</p>
                          <p className="font-bold">Purchase Price: ₹{stock.price}</p>
                          <p className="font-bold">Current Price: ₹{stock.current_val}</p>
                          <p className="font-bold">Current Value: ₹{(stock.volume * stock.current_val)}</p>
                        </Card.Text>
                        <Button
                          variant="dark"
                          onClick={() => deleteStock(stock.symbol)}
                          className="btn-sm"
                          style={{ backgroundColor: '#280278' }}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Col>

          <Col md={4}>
          <Card className=" bg-white shadow-lg">
            <Card.Body className="p-5">
              <Card.Title className="mb-4 text-2xl font-semibold">Portfolio Summary</Card.Title>
              <div className="text-center">
                <p className="font-semibold text-lg">Total Value</p>
                <h3 className="text-3xl">₹ {totalValue.toFixed(2)}</h3>
              </div>
              <hr className="my-3" />
              <div className="text-center">
                <p className="font-semibold text-lg">Total Gain / Loss</p>
                <h3 className="text-3xl">₹ {gainLoss.toFixed(2)}</h3>
              </div>
            </Card.Body>
          </Card>

            <Card className="mt-4 bg-white shadow-lg font-semibold">
              <Card.Body>
                <Card.Title className="mb-4">Add New Stock</Card.Title>
                <Form>
                  <Form.Group controlId="symbol">
                    <Form.Label>Stock Symbol</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Symbol"
                      value={newStock.symbol}
                      onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })}
                    />
                  </Form.Group>
                <Form.Group controlId="shares">
                  <Form.Label>Shares</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Shares"
                    value={newStock.shares}
                    onChange={(e) => setNewStock({ ...newStock, shares: parseInt(e.target.value, 10) })}
                  />
                </Form.Group>
                <Form.Group controlId="purchasePrice">
                  <Form.Label>Purchase Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Purchase Price"
                    value={newStock.purchasePrice}
                    onChange={(e) => setNewStock({ ...newStock, purchasePrice: parseFloat(e.target.value) })}
                  />
                </Form.Group>
                <Form.Group controlId="currentPrice">
                  <Form.Label>Current Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Current Price"
                    value={newStock.currentPrice}
                    onChange={(e) => setNewStock({ ...newStock, currentPrice: parseFloat(e.target.value) })}
                  />
                </Form.Group>
                <br />
                <Button
                    variant="dark"
                    onClick={addStock}
                    style={{ backgroundColor: '#280278' }}
                  >
                    Add Stock
                  </Button>
              </Form>
            </Card.Body>
          </Card>
          </Col>
          </Row>
         
        
      </Container>
    </div>
  );
};

export default Portfolio;
