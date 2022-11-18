// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bg1 from "../../assets/img/generic/bg-2.jpg";
import CodingIcons from "../common/icon-custom/CodingIcons";
import Section from "../common/Section";
import { Alert, Col, Row } from "react-bootstrap";
import { Typewriter } from "react-simple-typewriter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../css/landing.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/appContext";

const Landing = () => {
  const { state } = useLocation();
  const user = useContext(UserContext);
  useEffect(() => {
    if (state?.type === "current_User_Information" && state?.payload) {
      user.changeUser && user.changeUser(state.payload);
    } else if (state?.type === "unknown_User" && state?.payload) {
      user.changeUser && user.changeUser(state.payload);
    }
    console.log("landing", user.changeUser);
  }, [state]);
  return (
    <Section
      className="py-4 overflow-hidden landing-section"
      image={bg1}
      position="center bottom"
      overlay
    >
      <Row className="justify-content-center align-items-center mt-4 pt-6 pt-lg-7 pb-lg-9 pb-xl-0">
        <Col
          md={11}
          lg={8}
          xl={5}
          className="pb-9 pb-xl-9 mt-3 text-center text-xl-start"
        >
          {/* <Alert className="text-center">
            This project is still very early in development. Most features are
            only currently framed out.
          </Alert> */}
          <CodingIcons />
          <h1 className="text-white fw-light">
            Made with <FontAwesomeIcon icon="fa-heart" /> using{" "}
            <span className="fw-bold">
              <Typewriter
                words={["SQL", "ReactJS", ".NET", "CSS3", "Bootstrap"]}
                loop={false}
                cursorStyle="|"
                typeSpeed={120}
                deleteSpeed={100}
                delaySpeed={1000}
              />
            </span>
            <br />
          </h1>
        </Col>
      </Row>
    </Section>
  );
};

export default Landing;
