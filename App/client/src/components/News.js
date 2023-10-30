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

  const imageStyle = {
    maxWidth: '250px',   // Set the maximum image width
    maxHeight: '250px',  // Set the maximum image height
  };

  const newsItemStyle = {
    marginBottom: '10px', // Add margin between each news item
  };

  const titleStyle = {
    fontSize: '18px',    // Set the font size for the news title
  };

  const sourceStyle = {
    fontSize: '16px',    // Set the font size for the news title
  };

  const scrollableContainerStyle = {
    height: '75vh',  
    overflowY: 'scroll', // Add vertical scroll
    overflowX: 'hidden', // Hide horizontal scroll
  };

  



  return (
    <div>
      
      <div style={scrollableContainerStyle} className="shadow p-4 mb-5 bg-white rounded">
      <h4>News for AAPL</h4>
      <Row>
        {news.map((item, index) => (
          <Row key={index} className="news-item" style={newsItemStyle}>
            <Col md={3}>
              {item.thumbnail && item.thumbnail.resolutions && (
                <Card.Img variant="top" src={item.thumbnail.resolutions[0].url} style={imageStyle} />
              )}
            </Col>
            <Col md={7}>
              <Card.Body>
                <Card.Title className="news-title" style={titleStyle}>{item.title}</Card.Title>
                <Card.Text className="news-summary">{item.summary}</Card.Text>
                <Card.Text className="news-source" style={sourceStyle}>{item.publisher}</Card.Text>
                <Card.Link href={item.link} className="news-url" target="_blank" rel="noopener noreferrer">
                  Read more
                </Card.Link>
              </Card.Body>
            </Col>
          </Row>
        ))}
      </Row>
      </div>
    </div>
  );
};

export default News;
