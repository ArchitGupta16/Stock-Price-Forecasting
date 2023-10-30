import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/stock/news', { symbol: 'AAPL' }); // Replace 'AAPL' with your desired symbol
        const newsData = response.data.news;
        setNews(newsData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <p>Loading news...</p>;
  }

  return (
    <div>
      <h2>News for AAPL</h2>
      <Row>
        {news.map((item, index) => (
          <Col key={index} md={6}>
            <Card className="news-card">
              {item.thumbnail && item.thumbnail.resolutions && (
                <Card.Img variant="top" src={item.thumbnail.resolutions[0].url} />
              )}
              <Card.Body>
                <Card.Title className="news-title">{item.title}</Card.Title>
                <Card.Text className="news-summary">{item.summary}</Card.Text>
                <Card.Text className="news-source">{item.publisher}</Card.Text>
                <Card.Link href={item.link} className="news-url" target="_blank" rel="noopener noreferrer">
                  Read more
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
