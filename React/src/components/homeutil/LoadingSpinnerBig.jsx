import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Lottie from "lottie-react";
import infiniteLoop from "../../assets/img/animated-icons/infinite-loop.json";

const LoadingSpinnerBig = () => {
  return (
    <Container>
      <Row className="align-items-center">
        <Col
          lg={12}
          xxl={12}
          xl={12}
          s={12}
          md={12}
          xs={12}
          className="d-flex justify-content-center"
        >
          <Lottie
            animationData={infiniteLoop}
            loop={true}
            style={{ height: "30vh", width: "30vw" }}
            className="my-auto"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LoadingSpinnerBig;
