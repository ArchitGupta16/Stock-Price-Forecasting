import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import NavBar from './NavBar';

const AboutUs = () => {
  const cardButtonStyle = {
    backgroundColor: '#280278',
    borderColor: '#280278',
    opacity: '0.93',
    width: '50%',
  };


  return (
    <div>
      <NavBar />

      <Container className="my-16">
        <h1 className="text-4xl font-bold text-center mb-12">Built for Traders</h1>

        <p className="text-center text-xl mb-16">
          Look First | Then Leap. It's what you'd call our philosophy, <br />
          that it doesn't matter who you are or what you trade, <br />
          preparing then committing is the best way of maximizing <br />
          life's returns.
        </p>

        <Row className="gap-8 justify-center">
          <Col md>
            <Card className="bg-white shadow-lg boxShadow rounded-lg p-6 hover:shadow-xl" style={{ boxShadow: '0 4px 6px -1px #280278' }}>
              <Card.Body>
                <Card.Title className="text-2xl font-semibold mb-4">Our Users are our investors</Card.Title>
                <Card.Text className="text-lg">
                  We don't care if you trade or not. For us, objectivity is excellence.
                </Card.Text>
                <div className="flex justify-center">
                  <Button variant="dark" style={cardButtonStyle} className="mt-4">Explore</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md>
            <Card className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl">
              <Card.Body>
                <Card.Title className="text-2xl font-semibold mb-4">It's not charts, It's not freedom</Card.Title>
                <Card.Text className="text-lg">
                  We never lose sight of the fact millions of traders invest their
                  hard-won capital based on what they see on our platform. The better
                  we do, the better they can do.
                </Card.Text>
                <div className="flex justify-center">
                  <Button variant="dark" style={cardButtonStyle} className="mt-4">Explore</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md>
            <Card className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl">
              <Card.Body>
                <Card.Title className="text-2xl font-semibold mb-4">Finance should be social</Card.Title>
                <Card.Text className="text-lg">
                  For us, open discussion and self-expression are the greatest
                  keys to unlocking understanding.
                </Card.Text>
                <div className="flex justify-center">
                  <Button variant="dark" style={cardButtonStyle} className="mt-4">Explore</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="flex justify-center mt-16">
          <div className="bg-gray-300 h-px w-4/5"></div>
        </div>

        <p className="text-center text-lg mt-8">
          Connect with us to discover more about our community and trading insights.
        </p>

        <div className="flex justify-center mt-8">
          <Button variant="dark" style={cardButtonStyle}>Join our Community</Button>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
