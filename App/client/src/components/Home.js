import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import NavBar from "./NavBar";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);
const Home = () => {
  const [stockData, setStockData] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const symbols = ["AAPL", "GOOGL", "MSFT", "AMZN"];
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

  const fetchData = async () => {
    try {
      
      const response = await axios.post('http://127.0.0.1:5000/stock/monthly', { symbols });
      const data = response.data.data;
      const parsedData = JSON.parse(data);

      // Extract labels (dates) and data points for the chart
      const labels = parsedData.index.map((timestamp) => new Date(timestamp).toLocaleDateString());
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

  const fetchNews = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/stock/news", {
        symbol: "AAPL",
      }); // Replace 'AAPL' with your desired symbol
      const newsData = response.data.news;
      setNews(newsData);
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
    <div >
      <Container fluid>
        <NavBar />
        <Row >
          <Col md={6} >
            <div className="shadow p-4 mb-5 bg-white rounded" style={{ marginLeft:"10px",maxHeight: "90vh", overflowY: "auto", padding: "20px" }}>
              <h4>Trending News</h4>
              {news.map((item, index) => (
                <Row key={index} className="news-item">
                  <Col md={3}>
                    {item.thumbnail && item.thumbnail.resolutions && (
                      <Card.Img
                        variant="top"
                        src={item.thumbnail.resolutions[0].url}
                        
                      />
                    )}
                  </Col>
                  <Col md={9}>
                    <Card.Body>
                      <Card.Title className="news-title" >{item.title}</Card.Title>
                      <Card.Text className="news-summary">{item.summary}</Card.Text>
                      <Card.Text className="news-source" >{item.publisher}</Card.Text>
                      <Card.Link
                        href={item.link}
                        className="news-url"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{fontSize:"13px"}}
                      >
                        Read more
                      </Card.Link>
                    </Card.Body>
                  </Col>
                </Row>
              ))}
            </div>
          </Col>

          <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
            <Container>
              <Row>
                <Col md={6}>
                  <Card className="mb-3" style={{ width: "100%" }}>
                    <Card.Body>
                      <Card.Title>Card 1</Card.Title>
                      <Card.Text>This is the content for Card 1.</Card.Text>
                      <Button variant="primary">Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="mb-3" style={{ width: "100%" }}>
                    <Card.Body>
                      <Card.Title>Card 2</Card.Title>
                      <Card.Text>This is the content for Card 2.
                      <Col>
                        <h2>Stock Price Chart</h2>
                        <Line data={chartData} />
                      </Col>
                      </Card.Text>
                      <Button variant="primary">Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="mb-3" style={{ width: "100%" }}>
                    <Card.Body>
                      <Card.Title>Card 3</Card.Title>
                      <Card.Text>This is the content for Card 3.</Card.Text>
                      <Button variant="primary">Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="mb-3" style={{ width: "100%" }}>
                    <Card.Body>
                      <Card.Title>Card 4</Card.Title>
                      <Card.Text>This is the content for Card 4.</Card.Text>
                      <Button variant="primary">Details</Button>
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

export default Home;
