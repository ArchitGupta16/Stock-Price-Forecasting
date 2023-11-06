import React, { useState } from 'react';
import { Container, Row, Col, Table, Card, Form, Button } from 'react-bootstrap';
import NavBar from './NavBar';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([
    { id: 1, symbol: 'AAPL', shares: 50, purchasePrice: 150.0, currentPrice: 160.0 },
    { id: 2, symbol: 'GOOGL', shares: 20, purchasePrice: 2500.0, currentPrice: 2600.0 },
  ]);

  const [newStock, setNewStock] = useState({ symbol: '', shares: 0, purchasePrice: 0, currentPrice: 0 });

  const totalValue = portfolioData.reduce((total, stock) => total + stock.shares * stock.currentPrice, 0);
  const totalPurchaseValue = portfolioData.reduce((total, stock) => total + stock.shares * stock.purchasePrice, 0);
  const gainLoss = totalValue - totalPurchaseValue;

  const addStock = () => {
    const newId = Math.max(...portfolioData.map((stock) => stock.id), 0) + 1;
    setPortfolioData([...portfolioData, { ...newStock, id: newId }]);
    setNewStock({ symbol: '', shares: 0, purchasePrice: 0, currentPrice: 0 });
  };

  const deleteStock = (id) => {
    setPortfolioData(portfolioData.filter((stock) => stock.id !== id));
  };

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
                  <td>{stock.shares}</td>
                  <td>${stock.purchasePrice.toFixed(2)}</td>
                  <td>${stock.currentPrice.toFixed(2)}</td>
                  <td>${(stock.shares * stock.currentPrice).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteStock(stock.id)}
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
