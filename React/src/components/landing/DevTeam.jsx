import React from "react";
import { Button, Card, CardImg, Col, Image, Row } from "react-bootstrap";

const DevTeam = () => {
  const onClick = () => {
    console.log("working");
  };
  return (
    <>
      {/* <h1 className="text-center text-light">The Developers</h1> */}
      <Row className="d-flex justify-content-between">
        <Col lg={5}>
          <Card>
            <Card.Header className="text-center">
              Christian Tannahill
            </Card.Header>{" "}
            <CardImg
              src="https://ca.slack-edge.com/T08EKJ58F-U03MY6V26Q7-15118c79af78-512"
              fluid
            ></CardImg>
            <Card.Body className="overflow-hidden">
              <div className="d-flex justify-content-center">
                <Button variant="falcon-primary" onClick={onClick}>
                  View More
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col lg={4}>
          <Card>
            <Card.Header className="text-center">2-Containerz</Card.Header>{' '}
            <Image
              src="https://ca.slack-edge.com/T08EKJ58F-U03NF742G04-4693f5201d0b-512"
              fluid
              className="m-auto"
            ></Image>
            <Card.Body className="overflow-hidden">
              <div className="d-flex justify-content-center">
                <Button variant="falcon-primary" onClick={onClick}>
                  View More
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
        <Col lg={4}>
          <Card>
            <Card.Header className="text-center">Jared Dayoub</Card.Header>
            <Image
              src="https://ca.slack-edge.com/T08EKJ58F-U03NCNQ6QAX-000f89e745da-512"
              fluid
              className="m-auto"
            ></Image>
            <Card.Body className="overflow-hidden">
              <div className="d-flex justify-content-center">
                <Button variant="falcon-primary" onClick={onClick}>
                  View More
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        {/* <Col lg={4}>
          <Card>
            <Card.Header className="text-center">Little Tim Tim</Card.Header>
            <Image
              src="https://ca.slack-edge.com/T08EKJ58F-U03NYC6RXMF-d17602fe6e02-512"
              fluid
              className="m-auto"
            ></Image>
            <Card.Body className="overflow-hidden">
              <div className="d-flex justify-content-center">
                <Button variant="falcon-primary" onClick={onClick}>
                  View More
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
        {/* <Col lg={4}>
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
                <Button variant="falcon-primary" onClick={onClick}>
                  View More
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </>
  );
};

export default DevTeam;
