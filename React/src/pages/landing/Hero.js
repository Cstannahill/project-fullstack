// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bg1 from 'assets/img/generic/bg-2.jpg';
// import bg1 from '../../../assets/video/beach.webm';
// import dashboardDark from 'assets/img/generic/dashboard-alt-dark.png';
// import dashboard from 'assets/img/generic/dashboard-alt.png';
import CodingIcons from 'components/common/icon-custom/CodingIcons';
import Section from 'components/common/Section';
import AppContext from 'context/Context';
import React, { useContext } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  const {
    config: { isRTL }
  } = useContext(AppContext);

  return (
    <Section
      className="py-0 overflow-hidden light"
      image={bg1}
      position="center bottom"
      overlay
    >
      <Row className="justify-content-center align-items-center pt-6 pt-lg-7 pb-lg-9 pb-xl-0">
        <Col
          md={11}
          lg={8}
          xl={5}
          className="pb-7 pb-xl-9 text-center text-xl-start"
        >
          <CodingIcons />

          {/* <Button
            as={Link}
            variant="outline-danger"
            className="mb-4 fs--1 border-2 rounded-pill"
            to="#!"
          >
            <span className="me-2" role="img" aria-label="Gift">
              🎁
            </span>
            Become a pro
          </Button> */}
          <Image src="https://wakatime.com/badge/user/53d17b1d-1fdb-4c23-85c0-d6d31377b62f.svg"></Image>
          <h1 className="text-white fw-light">
            Bring{' '}
            <span className="fw-bold">
              <Typewriter
                words={[
                  'endless containers',
                  'a concerning lack of concern for security',
                  'a ferocious mullet'
                ]}
                loop={false}
                cursor={!isRTL ? true : false}
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
            <br />
            to your team
          </h1>
          <p className="lead text-white opacity-75">
            If you'd like to know more about me or get in touch with me, please
            contact me at christiantannahill2@gmail.com or by using one of the
            methods below.{'  '}
          </p>
          {/* <Button
            as={Link}
            variant="outline-light"
            size="lg"
            className="border-2 rounded-pill mt-4 fs-0 py-2"
            to="#!"
          >
            Start building with the falcon
            <FontAwesomeIcon icon="play" transform="shrink-6 down-1 right-5" />
          </Button> */}
        </Col>
        <Col
          xl={{ span: 7, offset: 1 }}
          className="align-self-end mt-4 mt-xl-0"
        >
          {/* <Link to="/" className="img-landing-banner">
            <img
              className="img-fluid"
              src={isDark ? dashboardDark : dashboard}
              alt=""
            />
          </Link> */}
        </Col>
      </Row>
    </Section>
  );
};

export default Hero;
