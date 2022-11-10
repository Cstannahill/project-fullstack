import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import appointmentService from "../../services/appointmentService";
import toastr from "toastr";

const AppointmentsView = () => {
  const [appointments, setAppointments] = useState({
    appointments: [],
    appointmentComponents: [],
  });
  const onGetAppointmentsSuccess = (response) => {
    console.log(response);
    setAppointments((prevState) => {
      const app = { ...prevState };
      app.appointments = response.data.items;
      app.appointments.forEach((app) => {
        var day = new Date(app?.date).getDay();
        console.log(day);
        switch (day) {
          case 0:
            app.dayOfWeek = "Sunday";
            break;
          case 1:
            app.dayOfWeek = "Monday";
            break;
          case 2:
            app.dayOfWeek = "Tuesday";
            break;
          case 3:
            app.dayOfWeek = "Wednesday";
            break;
          case 4:
            app.dayOfWeek = "Thursday";
            break;
          case 5:
            app.dayOfWeek = "Friday";
            break;
          case 6:
            app.dayOfWeek = "Saturday";
            break;
          default:
            app.dayOfWeek = "Sunday";
        }
      });

      app.appointmentComponents = app.appointments.map(mapAppointments);
      return app;
    });
  };
  const mapAppointments = (app) => {
    return (
      <Col lg={3} sm={6} md={4} key={app.id}>
        <Card className="text-center">
          <Card.Header className="text-center">{app.company}</Card.Header>
          <Card.Body>
            <h5>{app.contactName}</h5>
            <h6>
              <strong>{app?.dayOfWeek}</strong>
            </h6>
            <p>
              <strong>{new Date(app.date).toLocaleString()}</strong>
            </p>
            <p>{app.contactMethod}</p>
          </Card.Body>
        </Card>
      </Col>
    );
  };
  const onGetAppErr = () => {
    toastr.error("Error retrieving your appointments.");
  };
  useEffect(() => {
    appointmentService
      .getAppointments()
      .then(onGetAppointmentsSuccess)
      .catch(onGetAppErr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center mt-3">
          {appointments?.appointmentComponents &&
            appointments?.appointmentComponents}
        </Row>
      </Container>
    </>
  );
};

export default AppointmentsView;
