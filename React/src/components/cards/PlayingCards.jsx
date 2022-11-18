import React from "react";
import { Card, Col } from "react-bootstrap";
import "./card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { GiBroadsword } from "react-icons/gi";

const PlayingCards = ({ card, onSwapRequest }) => {
  const onSwap = () => {
    onSwapRequest(card);
  };
  return (
    <>
      <Card>
        <Card.Header>
          <h3 className="text-center">{card.name}</h3>
          <div className="text-end">
            <FontAwesomeIcon icon={faHeart} className="align-self-start" />{" "}
            {"  "} {card.hp}
          </div>
        </Card.Header>
        <Card.Img className="playing-card-img" src={card.img} alt=""></Card.Img>
        <Card.Body></Card.Body>
        <Card.Footer className="d-flex">
          <Col>
            <GiBroadsword /> {card.attack}
          </Col>
          <Col>
            <FontAwesomeIcon icon={faShieldAlt} />
            {"  "}
            {card.defense}
          </Col>
          <Col className="d-flex float-right">
            <button
              type="button"
              className="btn btn-sm btn-warning"
              onClick={onSwap}
            >
              Swap
            </button>
          </Col>
        </Card.Footer>
      </Card>
    </>
  );
};

export default PlayingCards;
