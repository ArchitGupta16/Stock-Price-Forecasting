import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; 

const StockTable = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name,setName] = useState('AAPL'); 
  const [period,setperiod] = useState('1mo'); 
  const { symbol } = useParams();
  console.log(symbol);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/stock_data',{symbol}); 
        const data = response.data.data;
        const parsedData = JSON.parse(data);
        setStockData(parsedData);
        setLoading(false);
        console.log(data)
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const headers = ['Date', 'Open', 'Close', 'Low', 'High', 'Volume'];

  return (
    <Container>
      <Row>
        <Col>
          <h2>Stock Price Table</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stockData.index.map((timestamp, index) => (
                <tr key={index}>
                  <td>{new Date(timestamp).toLocaleString()}</td>
                  <td>{stockData.data[index][0]}</td>
                  <td>{stockData.data[index][1]}</td>
                  <td>{stockData.data[index][2]}</td>
                  <td>{stockData.data[index][3]}</td>
                  <td>{stockData.data[index][4]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
     
    </Container>
  );
};

export default StockTable;
