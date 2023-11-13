import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import NavBar from './NavBar';

const AboutUs = () => {
  return (
    <div>
    <NavBar />
   

    <h1 className="text-center">Built for Traders</h1>
      <br/>
      <br/>
      <br/>

      <p className="mt-4 text-center h3">
        Look First | Then Leap. It's what you'd call our philosophy,<br />
            that it doesn't matter who you are or what you trade,<br />
           preparing then committing is the best way of maximizing<br />
                            life's returns.<br />
      </p>
        <br/>
        <br/>
        <br/>
      <Row className="mt-4 content-center">
        <Col md={3}>
          <Card className='bg-white shadow-lg '>
            <Card.Body>
              <Card.Title>Our Users are our investors</Card.Title>
              <Card.Text>
                We don't care if you trade or not. For us, objectivity is excellence.
              </Card.Text>
              <Button variant="primary">Explore</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className='bg-white shadow-lg '>
            <Card.Body>
              <Card.Title>It's not charts,It's not freedom</Card.Title>
              <Card.Text>
                We never lose sight of the fact millions of traders invest their
                hard won capital based on what they see on our platform. The better
                we do, the better they can do.
              </Card.Text>
              <Button variant="primary">Explore</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className='bg-white shadow-lg '>
            <Card.Body>
              <Card.Title>Finance should be social</Card.Title>
              <Card.Text>
                For us, open discussion and self-expression are the greatest
                keys to unlocking understanding
              </Card.Text>
              <Button variant="primary">Explore</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
