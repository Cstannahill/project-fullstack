import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import loweryhill from "../../images/lowerhill.jpeg";
import HHR from "../../images/hhr.jpeg";
import "./loweryhill.css";

const LoweryHillView = () => {
  const [show, setShow] = useState(false);
  const [facts] = useState([
    {
      title: "Pimpin'",
      question: "Is pimpin' in fact easy?",
      answer: "If you are these gents it is",
      img: loweryhill,
    },
    {
      title: "The Definition of Class",
      question: "What is the classiest means of transportation?",
      answer: "A pair of turbines under the hood of God's Greatest: the HHR",
      img: HHR,
    },
    {
      title: "Finish This Phrase",
      question: "To the substantial ... ... ... ... to come!",
      answer:
        "To the substantial profits to be had in the global economic market in years to come!",
      img: null,
    },
    {
      title: "Ode to Pasty-Legs",
      question: (
        <div>
          Lament for he who hath not sun upon his lower extremities
          <br /> for now his gaze shows not even brevities. <br /> No longer
          will he wander upon the skies <br /> for ol' pasty-legs has lost his
          ____.
        </div>
      ),
      answer: "Eyes",
      img: null,
    },
  ]);
  const showFact = () => {
    setShow(!show);
  };
  useEffect(() => {
    document.body.style.backgroundColor = "rgba(23, 22, 22, 0.935)";
  }, []);
  const counter = useRef(0);
  const onNextClicked = () => {
    setShow(false);
    counter.current++;
  };
  return (
    <>
      <Container>
        <Row className="mt-3">
          <div className="d-flex">
            <button
              type="button"
              className="mx-auto btn btn-dark bordered border-light"
              onClick={onNextClicked}
            >
              Next
            </button>
          </div>
          <Col lg={5} xl={5} className="mt-4 mx-2">
            <Card>
              <Card.Header as="h5" className="text-center">
                {facts[counter.current].title}
              </Card.Header>
              <Card.Body>{facts[counter.current].question}</Card.Body>
              <Card.Footer className="d-flex">
                <button
                  type="button"
                  className="btn btn-block btn-primary m-auto"
                  onClick={showFact}
                >
                  Show Answer
                </button>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg={5} xl={5} className="mt-4 mx-2">
            {show && (
              <Card>
                <Card.Header>
                  <h5 className="text-center">
                    {facts[counter.current].answer}
                  </h5>
                </Card.Header>
                {facts[counter.current].img && (
                  <Card.Img
                    className="facts-img"
                    src={facts[counter.current].img}
                  ></Card.Img>
                )}
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoweryHillView;
