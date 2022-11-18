import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import cardDecks from "./CardDeck";
import PlayingCards from "./PlayingCards";

const CardView = () => {
  const [playerCards, setPlayerCards] = useState({
    activeCard: [],
    remainingCards: [],
  });
  const [enemyCards, setEnemyCards] = useState({
    activeCard: [],
    remainingCards: [],
  });

  var cardCounterPc = useRef(1);
  var cardCounterEc = useRef(1);
  // useEffect(() => {
  //   document.body.style.backgroundImage = `url(
  //     "https://external-preview.redd.it/ipmrVzxaY31_NFY07nrhDKA1dfEZ_of9MRnXEHcBb00.jpg?auto=webp&s=adc8d2be6595a68acd3f48f213ae8ff8b3e5e0a9"
  //   )`;
  // }, []);
  const onDealClicked = () => {
    setPlayerCards((prevState) => {
      let pc = { ...prevState };
      pc.remainingCards = cardDecks.playerCards.map(mapCards);
      console.table(cardDecks.playerCards);
      console.table(cardDecks.enemyCards);
      pc.activeCard = pc.remainingCards[0];
      return pc;
    });
    setEnemyCards((prevState) => {
      let ec = { ...prevState };
      ec.remainingCards = cardDecks.enemyCards.map(mapCards);
      ec.activeCard = ec.remainingCards[0];
      return ec;
    });
  };
  const onSwapRequest = (card) => {
    switch (card.type) {
      case "player":
        setPlayerCards((prevState) => {
          let pc = { ...prevState };
          pc.activeCard = pc.remainingCards[cardCounterPc.current];
          return pc;
        });
        break;
      default:
        setEnemyCards((prevState) => {
          let ec = { ...prevState };
          ec.activeCard = ec.remainingCards[cardCounterEc.current];
          return ec;
        });
    }
  };
  const mapCards = (card, index) => {
    return (
      <PlayingCards card={card} key={index} onSwapRequest={onSwapRequest} />
    );
  };
  return (
    <>
      <Container>
        <Row>
          <Col lg={5} xl={5}>
            <h2 className="text-center fw-bold mt-2">PLAYER 1</h2>
            <div className="d-flex">
              {playerCards?.activeCard && playerCards.activeCard}
            </div>
          </Col>
          <Col className="d-flex" lg={1} xl={1}>
            <div className="d-flex m-auto">
              <button
                type="button"
                className="btn btn-sm btn-dark mt-auto"
                onClick={onDealClicked}
              >
                Deal
              </button>
            </div>
          </Col>
          <Col lg={5} xl={5}>
            <h2 className="text-center fw-bold mt-2">PLAYER 2</h2>
            <div className="d-flex">
              {enemyCards?.activeCard && enemyCards.activeCard}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default CardView;
