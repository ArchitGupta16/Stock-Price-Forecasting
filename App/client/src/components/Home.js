import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Container, Button, Carousel } from "react-bootstrap";
import NavBar from "./NavBar";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const symbols = ["AAPL", "GOOGL", "MSFT", "AMZN"];
  const [AAPLchartData, AAPLsetChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Open Stock Price',
        data: [],
        fill: false,
        borderColor: 'border-indigo-500',
      },
    ],
  });
  const [GooglchartData, GooglsetChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Open Stock Price',
        data: [],
        fill: false,
        borderColor: 'border-green-500',
      },
    ],
  });

  const [MSFTchartData, MSFTsetChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Open Stock Price',
        data: [],
        fill: false,
        borderColor: 'border-purple-500',
      },
    ],
  });

  const [AMZNchartData, AMZNsetChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Open Stock Price',
        data: [],
        fill: false,
        borderColor: 'border-blue-500',
      },
    ],
  });

  const fetchData = async () => {
    try {
      for (const symbol of symbols) {
        console.log(symbol);
        const response = await axios.post('http://127.0.0.1:5000/stock/monthly', { symbol: symbol });
        const data = response.data.data;
        const parsedData = JSON.parse(data);
        const labels = parsedData.index.map((timestamp) => new Date(timestamp).toLocaleDateString());
        const openPrices = parsedData.data.map((item) => item[0]);

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Open Stock Price',
              data: openPrices,
              fill: false,
              borderColor: getChartColor(symbol),
            },
          ],
        };

        // Save chart data in local storage
        localStorage.setItem(`${symbol}ChartData`, JSON.stringify(chartData));

        // Update state if needed (optional)
        updateChartDataState(symbol, chartData);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getChartColor = (symbol) => {
    switch (symbol) {
      case 'AAPL':
        return 'border-indigo-500';
      case 'GOOGL':
        return 'border-green-500';
      case 'MSFT':
        return 'border-purple-500';
      case 'AMZN':
        return 'border-blue-500';
      default:
        return 'border-gray-500';
    }
  };

  const updateChartDataState = (symbol, chartData) => {
    switch (symbol) {
      case 'AAPL':
        AAPLsetChartData(chartData);
        break;
      case 'GOOGL':
        GooglsetChartData(chartData);
        break;
      case 'MSFT':
        MSFTsetChartData(chartData);
        break;
      case 'AMZN':
        AMZNsetChartData(chartData);
        break;
      default:
        break;
    }
  };

  const fetchNews = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/stock/news", {
        symbol: "AAPL",
      });
      const newsData = response.data.news;
      setNews(newsData);
      console.log(newsData)
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchNews();
  }, []);

  return (
    <div>
      <NavBar />
      <br />
      <Container fluid>
        
        <Row>
        <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
          <div className="shadow-lg p-4 mb-5 bg-[#300EFF] bg-opacity-75 rounded" style={{ marginLeft: "10px", padding: "20px", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", boxShadow: "0 0 10px rgba(48, 14, 255, 0.5)" }}>
            <h4 className="text-xl font-semibold mb-4">Trending News</h4>
            <Carousel>
              {news.map((item, index) => (
                <Carousel.Item key={index} className="news-item mb-4">
                <Card className="bg-light text-dark">
                  {item.thumbnail && item.thumbnail.resolutions && item.thumbnail.resolutions[0] ? (
                    <Card.Img
                      variant="top"
                      src={item.thumbnail.resolutions[0].url}
                      alt="Image"
                      className="img-fluid rounded mx-auto d-block"
                    />
                  ) : (
                    <div className="image-placeholder">No Image Available</div>
                  )}
                  <Card.Body>
                    <Card.Title className="text-lg font-semibold">{item.title}</Card.Title>
                    <Card.Text className="news-summary text-gray-700">{item.summary}</Card.Text>
                    <Card.Text className="news-source text-gray-500">{item.publisher}</Card.Text>
                    <Card.Link
                      href={item.link}
                      className="news-url text-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "13px" }}
                    >
                      Read more
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Carousel.Item>
              
              ))}
            </Carousel>
          </div>
        </Col>


          <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
            <Container>
              <Row>

                <Col md={6}>
                  <Card className="mb-4 bg-[#300EFF] shadow-lg w-full">
                    <Card.Body>
                      <Card.Title className="text-lg font-semibold mb-2"></Card.Title>
                      <Card.Text>
                        <Col>
                          <h2 className="text-xl font-semibold mb-4">Microsoft</h2>
                          <Line data={MSFTchartData} />
                        </Col>
                      </Card.Text>
                      <Button variant="dark" style={{ backgroundColor: '#280278',opacity:"93%" }} className="mt-2">Details</Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="mb-4 bg-white shadow-lg w-full">
                    <Card.Body>
                      <Card.Title className="text-lg font-semibold mb-2"></Card.Title>
                      <Card.Text>
                        <Col>
                          <h2 className="text-xl font-semibold mb-4">Apple</h2>
                          <Line data={AAPLchartData} />
                        </Col>
                      </Card.Text>
                      <Button variant="dark" style={{ backgroundColor: '#280278',opacity:"93%" }} className="mt-2">Details</Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="mb-4 bg-white shadow-lg w-full">
                    <Card.Body>
                      <Card.Title className="text-lg font-semibold mb-2"></Card.Title>
                      <Card.Text>
                        <Col>
                          <h2 className="text-xl font-semibold mb-4">Google</h2>
                          <Line data={GooglchartData} />
                        </Col>
                      </Card.Text>
                      <Button variant="dark" style={{ backgroundColor: '#280278',opacity:"93%" }} className="mt-2">Details</Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="mb-4 bg-white shadow-lg w-full">
                    <Card.Body>
                      <Card.Title className="text-lg font-semibold mb-2"></Card.Title>
                      <Card.Text>
                        <Col>
                          <h2 className="text-xl font-semibold mb-4">Amazon</h2>
                          <Line data={AMZNchartData} />
                        </Col>
                      </Card.Text>
                      <Button variant="dark" style={{ backgroundColor: '#280278',opacity:"93%" }} className="mt-2">Details</Button>
                    </Card.Body>
                  </Card>
                </Col>

              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

