import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "./codingicons.css";
import icon1 from "../../../assets/img/CodeIcon/react-icon.jpg";
import icon2 from "../../../assets/img/CodeIcon/csharp.svg";
import icon3 from "../../../assets/img/CodeIcon/dotnet.svg";
import icon4 from "../../../assets/img/CodeIcon/SQL.svg";
import javaScript from "../../../assets/img/CodeIcon/javascript-logo.svg";
import bootstrap from "../../../assets/img/CodeIcon/Bootstrap-2.svg";
import htmlIcon from "../../../assets/img/CodeIcon/html-5.png";
import cssIcon from "../../../assets/img/CodeIcon/css3.png";
// import axiosIcon from "../../../assets/img/CodeIcon/axios-vector-logo.png";
// import githubIcon from "../../../assets/img/CodeIcon/github.svg";
// import stripeIcon from "../../../assets/img/CodeIcon/Stripe-Emblem.png";
// import jQueryIcon from "../../../assets/img/CodeIcon/jQ.png";

const CodingIcons = () => {
  return (
    <>
      <Row className="mb-1">
        <Col>
          <Card col={3} className="pt-1" style={{ height: "100%" }}>
            <Card.Img
              src={icon1}
              className="mt-2 mx-auto pt-1"
              style={{ height: "70%", width: "90%" }}
            ></Card.Img>
            <Card.Body></Card.Body>
          </Card>
        </Col>
        <Col>
          <Card col={3} className="pt-1" style={{ height: "100%" }}>
            <Card.Img src={icon2} className="mt-2 pt-1"></Card.Img>
            <Card.Body></Card.Body>
          </Card>
        </Col>
        <Col>
          <Card col={3} className="pt-2" style={{ height: "100%" }}>
            <Card.Img src={icon3} className="mt-2 px-1 pt-3"></Card.Img>
            <Card.Body></Card.Body>
          </Card>
        </Col>
        <Col>
          <Card col={3} className="pt-3 pb-3" style={{ height: "100%" }}>
            <Card.Img
              src={icon4}
              className="mt-2"
              style={{ height: "100%" }}
            ></Card.Img>
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <Card col={3} className="pt-3 " style={{ height: "100%" }}>
            <Card.Img src={javaScript} className="mt-3 px-1 js-icon"></Card.Img>
            <Card.Body></Card.Body>
          </Card>
        </Col>
        <Col>
          <Card col={3} className="pt-2" style={{ height: "100%" }}>
            <Card.Img src={bootstrap} className="mt-2 px-1 pt-3"></Card.Img>
            <Card.Body></Card.Body>
          </Card>
        </Col>
        <Col>
          <Card col={3} className="pt-2" style={{ height: "100%" }}>
            <Card.Img src={htmlIcon} className="mt-2 px-1 pt-3"></Card.Img>
            <Card.Body></Card.Body>
          </Card>
        </Col>
        <Col>
          <Card col={3} className="pt-2" style={{ height: "100%" }}>
            <Card.Img
              src={cssIcon}
              className="mt-3 px-2 pt-1 mx-auto"
              style={{ height: "70%", width: "75%" }}
            ></Card.Img>
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-2">
        {/* <Col>
          <Card col={3} className="pt-2"  style={{ height: '100%' }}>
            <Card.Img src={axiosIcon} className="px-1 mt-4"></Card.Img>
            <Card.Body></Card.Body>
          </Card>
        </Col>
        <Col>
          <Card col={3} className="pt-2" bg="dark" style={{ height: '100%' }}>
            <Card.Img src={githubIcon} className="mt-2 px-1 "></Card.Img>
            <Card.Body></Card.Body>
          </Card>
        </Col>
        <Col>
          <Card col={3} className="pt-2" bg="dark" style={{ height: '100%' }}>
            <Card.Img src={stripeIcon} className="mt-3 px-1 pt-3"></Card.Img>
            <Card.Body></Card.Body>
          </Card>
        </Col>
        <Col>
          <Card col={3} className="pt-3" bg="dark" style={{ height: '100%' }}>
            <Card.Img
              src={jQueryIcon}
              className="mt-3 px-1 pt-1 mx-auto j-Query-icon"
              style={{ height: '90%', width: '92%' }}
            ></Card.Img>
            <Card.Body></Card.Body>
          </Card>
        </Col> */}
      </Row>
    </>
  );
};

export default CodingIcons;
