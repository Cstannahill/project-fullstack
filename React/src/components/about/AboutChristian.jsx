import React from "react";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import {
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import img1 from "../../assets/img/christian.jpeg";
import "./aboutchristian.css";
import github from "../../assets/img/nav-icons/github-light.png";
import linkedin from "../../assets/img/nav-icons/linkedin.png";

const AboutChristian = () => {
  return (
    <>
      <Container className="mb-2">
        <Row>
          <Col xl={4} lg={4} className="my-5">
            <Card bg="dark" className="my-auto pb-2 about-me-card">
              <Image
                src={img1}
                alt=""
                className="my-auto about-me-image rounded rounded-2"
              />
              <Card.Body>
                <h4 className="text-center text-light">Christian Tannahill</h4>
                <h6 className="text-center text-light">
                  Full Stack Software Engineer
                </h6>
                <div className="d-flex justify-content-center">
                  <a
                    href="https://github.com/Cstannahill"
                    className="mt-2 mx-3"
                  >
                    <img src={github} alt="github" height={50}></img>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/christian-tannahill/"
                    className="mt-2 mx-3"
                  >
                    <img src={linkedin} height={50} alt="linkedin"></img>
                  </a>
                </div>
                <p className="text-center text-light mt-2">
                  Email - christiantannahill2@gmail.com
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={4} lg={4} className="my-5">
            <Card bg="dark" className="pb-1 about-me-card">
              <Card.Header as="h3" className="text-center text-light">
                About Me
              </Card.Header>
              <Card.Body className="text-light">
                <p>
                  I am a USAF veteran. During my time of service I worked in the
                  Fuels Information Service Center, and as a Laboratory
                  Technician. Among many other tasks as a part of these
                  positions, I dealt with data entry and queries utilizing FMD
                  and BSM-E.
                </p>
                <p>
                  I began to pursue and study software development on my own in
                  2020, while working a full time position, and I immediately
                  found that I had a passion for writing code.
                </p>
                <p>
                  I continued to spend my free time learning new languages,
                  frameworks, libraries, and concepts until I left my job to
                  pursue software development full time.
                </p>
                <p>
                  In July of 2022 I was selected as a member of a team to design
                  an MVP for Carte, a start up company focusing on providing
                  digital menus as an alternative to traditional menus.
                </p>
                <p>
                  I am a quick and dedicated learner, passionate about software
                  development, and I am more than willing to and confident in my
                  ability learn new languages, frameworks, libraries, and tools.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={4} lg={4} className="my-5">
            <Card bg="dark" className="about-me-card">
              <Card.Header as="h3" className="text-center text-light mb-0">
                Skills
              </Card.Header>
              <Card.Body className="text-light pt-0">
                <ListGroup variant="flush">
                  <ListGroupItem
                    className="list-group-item-bg fw-bold rounded"
                    variant="dark"
                  >
                    <BadgeCheckIcon className="check-badge-icon text-success" />
                    SQL
                  </ListGroupItem>
                  <ListGroupItem
                    className="list-group-item-bg fw-bold rounded my-1"
                    variant="dark"
                  >
                    <BadgeCheckIcon className="check-badge-icon text-success" />
                    Microsoft SQL Server
                  </ListGroupItem>
                  {/* <ListGroupItem
                    className="list-group-item-bg fw-bold rounded my-1"
                    variant="dark"
                  ><BadgeCheckIcon className="check-badge-icon text-success" />
                    Stored-Procedure Design
                  </ListGroupItem> */}
                  <ListGroupItem
                    className="list-group-item-bg fw-bold rounded"
                    variant="dark"
                  >
                    <BadgeCheckIcon className="check-badge-icon text-success" />
                    C#
                  </ListGroupItem>
                  {/* <ListGroupItem
                    className="list-group-item-bg fw-bold rounded my-1"
                    variant="dark"
                  ><BadgeCheckIcon className="check-badge-icon text-success" />
                    .NET Core
                  </ListGroupItem> */}
                  <ListGroupItem
                    className="list-group-item-bg fw-bold rounded my-1"
                    variant="dark"
                  >
                    <BadgeCheckIcon className="check-badge-icon text-success" />
                    ADO.NET
                  </ListGroupItem>
                  <ListGroupItem
                    className="list-group-item-bg fw-bold rounded"
                    variant="dark"
                  >
                    <BadgeCheckIcon className="check-badge-icon text-success" />
                    RESTful API
                  </ListGroupItem>
                  <ListGroupItem
                    className="list-group-item-bg fw-bold rounded my-1"
                    variant="dark"
                  >
                    <BadgeCheckIcon className="check-badge-icon text-success" />
                    ASP.NET
                  </ListGroupItem>
                  <ListGroupItem
                    className="list-group-item-bg fw-bold rounded"
                    variant="dark"
                  >
                    <BadgeCheckIcon className="check-badge-icon text-success" />
                    JavaScript
                  </ListGroupItem>
                  <ListGroupItem
                    className="list-group-item-bg fw-bold rounded my-1"
                    variant="dark"
                  >
                    <BadgeCheckIcon className="check-badge-icon text-success" />
                    ReactJS
                  </ListGroupItem>
                  <ListGroupItem
                    className="list-group-item-bg fw-bold rounded"
                    variant="dark"
                  >
                    <BadgeCheckIcon className="check-badge-icon text-success" />
                    jQuery
                  </ListGroupItem>

                  <ListGroupItem
                    className="list-group-item-bg fw-bold rounded my-1"
                    variant="dark"
                  >
                    <BadgeCheckIcon className="check-badge-icon text-success" />
                    HTML5
                  </ListGroupItem>
                  <ListGroupItem
                    className="list-group-item-bg fw-bold rounded"
                    variant="dark"
                  >
                    <BadgeCheckIcon className="check-badge-icon text-success" />
                    CSS3
                  </ListGroupItem>
                  <ListGroupItem
                    className="list-group-item-bg fw-bold rounded my-1"
                    variant="dark"
                  >
                    <BadgeCheckIcon className="check-badge-icon text-success" />
                    Bootstrap
                  </ListGroupItem>
                </ListGroup>
                <ListGroup>
                  <ListGroupItem
                    className="list-group-item-bg fw-bold rounded"
                    variant="dark"
                  >
                    <BadgeCheckIcon className="check-badge-icon text-success" />
                    Version Source Control
                  </ListGroupItem>
                  <ListGroupItem
                    className="list-group-item-bg fw-bold rounded my-1"
                    variant="dark"
                  >
                    <BadgeCheckIcon className="check-badge-icon text-success" />
                    AGILE
                  </ListGroupItem>
                  <ListGroupItem
                    className="list-group-item-bg fw-bold rounded"
                    variant="dark"
                  >
                    <BadgeCheckIcon className="check-badge-icon text-success" />
                    Postman
                  </ListGroupItem>
                  <ListGroupItem
                    className="list-group-item-bg fw-bold rounded my-1"
                    variant="dark"
                  >
                    <BadgeCheckIcon className="check-badge-icon text-success" />
                    Axios
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="dark">
              <Card.Body>
                <h6 className="text-center text-light fw-bold">
                  Open to relocation anywhere provided relocation assistance or
                  ability to work remote temporarily.
                </h6>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AboutChristian;
