import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Container, Button, Carousel } from "react-bootstrap";
import NavBar from "./NavBar";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useNavigate } from "react-router-dom";

Chart.register(CategoryScale);

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const symbols = ["AAPL", "GOOGL", "MSFT", "AMZN"];
  const navigate = useNavigate(); // Initialize history
  const [AAPLchartData, AAPLsetChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Open Stock Price",
        data: [],
        fill: false,
        borderColor: "rgba(123, 104, 238, 1)", // Adjusted border color for Apple (AAPL)
      },
    ],
  });

  const [GooglchartData, GooglsetChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Open Stock Price",
        data: [],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)", // Adjusted border color for Google (GOOGL)
      },
    ],
  });

  const [MSFTchartData, MSFTsetChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Open Stock Price",
        data: [],
        fill: false,
        borderColor: "rgba(138, 43, 226, 1)", // Adjusted border color for Microsoft (MSFT)
      },
    ],
  });

  const [AMZNchartData, AMZNsetChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Open Stock Price",
        data: [],
        fill: false,
        borderColor: "rgba(0, 0, 255, 1)", // Adjusted border color for Amazon (AMZN)
      },
    ],
  });

  const fetchData = async () => {
    try {
      for (const symbol of symbols) {
        console.log(symbol);
        const response = await axios.post(
          "http://127.0.0.1:5000/stock/monthly",
          { symbol: symbol }
        );
        const data = response.data.data;
        const parsedData = JSON.parse(data);
        const labels = parsedData.index.map((timestamp) =>
          new Date(timestamp).toLocaleDateString()
        );
        const openPrices = parsedData.data.map((item) => item[0]);

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: "Open Stock Price",
              data: openPrices,
              fill: true,
              fillOpacity: 0.3,
              backgroundColor: getChartbackColor(symbol),
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
      case "AAPL":
        return "rgba(123, 104, 238, 1)"; // Adjusted color for Apple (AAPL)
      case "GOOGL":
        return "rgba(75, 192, 192, 1)"; // Adjusted color for Google (GOOGL)
      case "MSFT":
        return "rgba(138, 43, 226, 1)"; // Adjusted color for Microsoft (MSFT)
      case "AMZN":
        return "rgba(0, 0, 255, 1)"; // Adjusted color for Amazon (AMZN)
      default:
        return "rgba(169, 169, 169, 1)"; // Default color (gray)
    }
  };

  const getChartbackColor = (symbol) => {
    switch (symbol) {
      case "AAPL":
        return "rgba(123, 104, 238, 0.3)"; // Adjusted color for Apple (AAPL)
      case "GOOGL":
        return "rgba(75, 192, 192, 0.3)"; // Adjusted color for Google (GOOGL)
      case "MSFT":
        return "rgba(138, 43, 226, 0.3)"; // Adjusted color for Microsoft (MSFT)
      case "AMZN":
        return "rgba(0, 0, 255, 0.3)"; // Adjusted color for Amazon (AMZN)
      default:
        return "rgba(169, 169, 169, 0.3)"; // Default color (gray)
    }
  };

  const updateChartDataState = (symbol, chartData) => {
    switch (symbol) {
      case "AAPL":
        AAPLsetChartData(chartData);
        break;
      case "GOOGL":
        GooglsetChartData(chartData);
        break;
      case "MSFT":
        MSFTsetChartData(chartData);
        break;
      case "AMZN":
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
      console.log(newsData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const handleStatTable = (symbol) => {
    navigate(`/stock-chart/${symbol}`);
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
          <Col
            md={6}
            className="d-flex flex-column align-items-center justify-content-center mt-6"
          >
            <div
              className="shadow-lg p-4 bg-white bg-opacity-75 rounded"
              style={{
                padding: "20px",
                minHeight: "80vh",
                boxShadow: "0 0 10px rgba(48, 14, 255, 0.5)",
              }}
            >
              <h4 className="text-xl font-semibold mb-4">Trending News</h4>
              <Carousel>
                {news.map((item, index) => (
                  <Carousel.Item key={index} className="news-item mb-4">
                    <Card className="bg-light text-dark">
                      {item.thumbnail &&
                      item.thumbnail.resolutions &&
                      item.thumbnail.resolutions[0] ? (
                        <Card.Img
                          variant="top"
                          src={item.thumbnail.resolutions[0].url}
                          alt="Image"
                          className="img-fluid rounded mx-auto d-block"
                        />
                      ) : (
                        <div className="image-placeholder">
                          No Image Available
                        </div>
                      )}
                      <Card.Body>
                        <Card.Title className="text-lg font-semibold">
                          {item.title}
                        </Card.Title>
                        <Card.Text className="news-summary text-gray-700">
                          {item.summary}
                        </Card.Text>
                        <Card.Text className="news-source text-gray-500">
                          {item.publisher}
                        </Card.Text>
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

          <Col
            md={6}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <Container>
              <Row>
                <Col md={6} className="d-flex flex-wrap justify-content-center">
                  <Card className="mb-4 bg-white shadow-lg w-full">
                    <Card.Body>
                      <Card.Title className="text-lg font-semibold mb-2"></Card.Title>
                      <Card.Text>
                        <Col>
                          <h2 className="text-xl font-semibold mb-4">
                            Microsoft
                          </h2>
                          <Line data={MSFTchartData} />
                        </Col>
                      </Card.Text>
                      <Button
                        variant="dark"
                        onClick={() => handleStatTable("MSFT")}
                        style={{ backgroundColor: "#280278", opacity: "93%" }}
                        className="mt-2"
                      >
                        Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6} className="d-flex flex-wrap justify-content-center">
                  <Card className="mb-4 bg-white shadow-lg w-full">
                    <Card.Body>
                      <Card.Title className="text-lg font-semibold mb-2"></Card.Title>
                      <Card.Text>
                        <Col>
                          <h2 className="text-xl font-semibold mb-4">Apple</h2>
                          <Line data={AAPLchartData} />
                        </Col>
                      </Card.Text>
                      <Button
                        variant="dark"
                        onClick={() => handleStatTable("AAPL")}
                        style={{ backgroundColor: "#280278", opacity: "93%" }}
                        className="mt-2"
                      >
                        Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6} className="d-flex flex-wrap justify-content-center">
                  <Card className="mb-4 bg-white shadow-lg w-full">
                    <Card.Body>
                      <Card.Title className="text-lg font-semibold mb-2"></Card.Title>
                      <Card.Text>
                        <Col>
                          <h2 className="text-xl font-semibold mb-4">Google</h2>
                          <Line data={GooglchartData} />
                        </Col>
                      </Card.Text>
                      <Button
                        variant="dark"
                        onClick={() => handleStatTable("GOOGL")}
                        style={{ backgroundColor: "#280278", opacity: "93%" }}
                        className="mt-2"
                      >
                        Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6} className="d-flex flex-wrap justify-content-center">
                  <Card className="mb-4 bg-white shadow-lg w-full">
                    <Card.Body>
                      <Card.Title className="text-lg font-semibold mb-2"></Card.Title>
                      <Card.Text>
                        <Col>
                          <h2 className="text-xl font-semibold mb-4">Amazon</h2>
                          <Line data={AMZNchartData} />
                        </Col>
                      </Card.Text>
                      <Button
                        variant="dark"
                        onClick={() => handleStatTable("AMZN")}
                        style={{ backgroundColor: "#280278", opacity: "93%" }}
                        className="mt-2"
                      >
                        Details
                      </Button>
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
