import React from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import img2 from 'assets/img/generic/MooMoo.png';
import { toast } from 'react-toastify';

const Starter = () => {
  const onClickAndShit = () => {
    toast('You Clicked and Shit', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    });
  };
  return (
    <>
      <h1 className="text-center">The Developers + Dog</h1>
      <Row>
        <Col lg={4}>
          <Card>
            <Card.Header className="text-center">Ternary Tannahill</Card.Header>{' '}
            <Image
              src="https://ca.slack-edge.com/T08EKJ58F-U03MY6V26Q7-15118c79af78-512"
              fluid
              className="m-auto"
            ></Image>
            <Card.Body className="overflow-hidden">
              <div className="d-flex justify-content-center">
                <Button variant="falcon-primary" onClick={onClickAndShit}>
                  CLICK AND SHIT
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Header className="text-center">2-Containerz</Card.Header>{' '}
            <Image
              src="https://ca.slack-edge.com/T08EKJ58F-U03NF742G04-4693f5201d0b-512"
              fluid
              className="m-auto"
            ></Image>
            <Card.Body className="overflow-hidden">
              <div className="d-flex justify-content-center">
                <Button variant="falcon-primary" onClick={onClickAndShit}>
                  CLICK AND SHIT
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Header className="text-center">The Message Man</Card.Header>
            <Image
              src="https://ca.slack-edge.com/T08EKJ58F-U03NCNQ6QAX-000f89e745da-512"
              fluid
              className="m-auto"
            ></Image>
            <Card.Body className="overflow-hidden">
              <div className="d-flex justify-content-center">
                <Button variant="falcon-primary" onClick={onClickAndShit}>
                  CLICK AND SHIT
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={4}>
          <Card>
            <Card.Header className="text-center">Little Tim Tim</Card.Header>
            <Image
              src="https://ca.slack-edge.com/T08EKJ58F-U03NYC6RXMF-d17602fe6e02-512"
              fluid
              className="m-auto"
            ></Image>
            <Card.Body className="overflow-hidden">
              <div className="d-flex justify-content-center">
                <Button variant="falcon-primary" onClick={onClickAndShit}>
                  CLICK AND SHIT
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Header className="text-center">Moo-Moo</Card.Header>
            <Image
              src={img2}
              fluid
              className="mx-auto"
              style={{ maxHeight: '378.66px' }}
            ></Image>
            <Card.Body className="overflow-hidden">
              <div className="d-flex justify-content-center">
                <Button variant="falcon-primary" onClick={onClickAndShit}>
                  CLICK AND SHIT
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Starter;
