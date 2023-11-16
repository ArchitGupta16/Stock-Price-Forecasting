import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Card} from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap'; // Assuming you are using react-bootstrap
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons'; 
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
        const closePrices = parsedData.data.map((item) => item[1]);

        setStockData(parsedData);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Open Stock Price',
              data: openPrices,
              fill: true,
              backgroundColor : 'rgb(75, 192, 75)',
              borderColor: 'rgb(75, 192, 75)',
            },
              {
                label: 'Close Stock Price',
                data: closePrices,
                fill: true,
                backgroundColor : 'rgb(75, 75, 192)',
                borderColor: 'rgb(75, 75, 192)',
              }
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
  const navItems = [
    { to: '/aboutUs', text: 'About Us' },
    { to: '/userAuth', text: 'Login' },
    { to: '/userAuth', text: 'Register' },
  ];

  return (
    <div>
      <Navbar sticky="top" className="bg-purple-900">
      <Navbar.Brand as={Link} to="/" className="flex items-center text-white text-xl font-bold ml-4">
        <FontAwesomeIcon icon={faChartLine} className="text-white text-xl me-2" />
        <span className="text-2xl">SPF Home</span>
      </Navbar.Brand>
      <div className="ml-auto mr-6">
        <Nav>
          {navItems.map((item, index) => (
            <Nav.Item key={index}>
              <Link to={item.to} className="nav-link font-semibold text-lg text-white px-4">
                {item.text}
              </Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </Navbar>
    <div className="mt-4 ml-4 mr-4">
      
      <Row>
        <Col lg={5}>
          <h2 className="text-2xl font-bold mb-4">Last 6 Stock Entries</h2>
          <Row xs={1} md={2} lg={2} className="g-4">
            {stockData.index.slice(-6).map((timestamp, index) => (
              <Col key={index}>
                <Card className="shadow-lg rounded-lg p-4 border border-gray-300 mb-4">
                <Card.Body className="text-gray-700">
                  <Card.Title className="text-lg font-semibold mb-2">
                    {new Date(timestamp).toLocaleString()}
                  </Card.Title>
                  <Card.Text className="text-sm">
                    <p><strong>Open:</strong> {stockData.data[index][0]}</p>
                    <p><strong>Close:</strong> {stockData.data[index][1]}</p>
                    <p><strong>Low:</strong> {stockData.data[index][2]}</p>
                    <p><strong>High:</strong> {stockData.data[index][3]}</p>
                    <p><strong>Volume:</strong> {stockData.data[index][4]}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col lg={7}>
          <h2 className="text-2xl font-bold mb-2">Stock Price Chart</h2>
          <div className="shadow-lg rounded-lg p-4 border border-gray-300 mb-4 mt-12">
            <div className="h-full ">
              <Line
                data={chartData}
                options={{
                  maintainAspectRatio: true,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Date',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Open Stock Price',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
    </div>
  );
};



export default StockTable;
