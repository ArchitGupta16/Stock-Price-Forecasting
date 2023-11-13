import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

const StockTable = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { symbol } = useParams();

  const [chartData, setChartData] = useState({
    labels: [], // This will be filled with date labels
    datasets: [
      {
        label: 'Open Stock Price',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/stock/monthly', { symbol });
        const data = response.data.data;
        const parsedData = JSON.parse(data);

        // Extract labels (dates) and data points for the chart
        const labels = parsedData.index.map((timestamp) => new Date(timestamp).toLocaleString());
        const openPrices = parsedData.data.map((item) => item[0]);

        setStockData(parsedData);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Open Stock Price',
              data: openPrices,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
            },
          ],
        });

        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

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
      <Col>
      <h2>Stock Price Chart</h2>
      <Line data={chartData} />
    </Col>
    </Container>
  );
};

export default StockTable;
