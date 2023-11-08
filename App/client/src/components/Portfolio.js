import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Card, Form, Button } from 'react-bootstrap';
import NavBar from './NavBar';
import axios from 'axios';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [newStock, setNewStock] = useState({ symbol: '', shares: 0, purchasePrice: 0, currentPrice: 0 });

  const totalValue = portfolioData.reduce((total, stock) => total + stock.volume * stock.current_val, 0);
  const totalPurchaseValue = portfolioData.reduce((total, stock) => total + stock.volume * stock.price, 0);
  const gainLoss = totalValue - totalPurchaseValue;

  // Fetch the portfolio using emailId in the localstorage and set the portfolioData
  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    const emailId = localStorage.getItem('userName');
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
    const emailId = localStorage.getItem('userName');
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
    const emailId = localStorage.getItem('userName');
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


  // const deleteStock = (id) => {
  //   setPortfolioData(portfolioData.filter((stock) => stock.id !== id));
  // };

  return (
    <div>
    <NavBar />
    <Container className="mt-4">
      <h1 className="mb-4">My Portfolio</h1>
      <Row>
        <Col md={8}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Stock Symbol</th>
                <th>Shares</th>
                <th>Purchase Price</th>
                <th>Current Price</th>
                <th>Current Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.map((stock) => (
                <tr key={stock.id}>
                  <td>{stock.symbol}</td>
                  <td>{stock.volume}</td>
                  <td>${stock.price}</td>
                  <td>${stock.current_val}</td>
                  <td>${(stock.volume * stock.current_val)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteStock(stock.symbol)}
                      className="btn-sm"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">Portfolio Summary</Card.Title>
              <div className="text-center">
                <p className="font-weight-bold">Total Value</p>
                <h3>${totalValue.toFixed(2)}</h3>
              </div>
              <hr />
              <div className="text-center">
                <p className="font-weight-bold">Total Gain/Loss</p>
                <h3>${gainLoss.toFixed(2)}</h3>
              </div>
            </Card.Body>
          </Card>
          <Card className="mt-4">
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
                <Button variant="primary" onClick={addStock}>
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
