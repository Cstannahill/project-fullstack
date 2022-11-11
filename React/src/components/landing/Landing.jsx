// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bg1 from "../../assets/img/generic/bg-2.jpg";
import CodingIcons from "../common/icon-custom/CodingIcons";
import Section from "../common/Section";
import { Col, Row } from "react-bootstrap";
import { Typewriter } from "react-simple-typewriter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../css/landing.css";

const Landing = () => {
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
          <CodingIcons />
          {/* <Image src="https://wakatime.com/badge/user/53d17b1d-1fdb-4c23-85c0-d6d31377b62f.svg"></Image> */}
          <h1 className="text-white fw-light">
            Made with <FontAwesomeIcon icon="fa-heart" /> &{" "}
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
            to your team
          </h1>
          <div className="d-grid">
            <button type="button" className="btn btn-primary">
              Development Team
            </button>
          </div>
        </Col>
      </Row>
    </Section>
  );
};

export default Landing;
