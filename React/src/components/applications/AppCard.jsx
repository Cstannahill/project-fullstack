import React from "react";
import { Card, Col } from "react-bootstrap";

const AppCard = ({ app, onEditRequest, onCloseRequest }) => {
  const formatDate = (date) => {
    if (date.includes("T")) {
      let newDate = date.split("T")[0].split("-");
      newDate = `${newDate[1]}-${newDate[2]}-${newDate[0]}`;
      return newDate;
    }
  };
  const handleEdit = () => {
    onEditRequest(app);
  };

  const handleClose = () => {
    onCloseRequest(app.id);
  };
  return (
    <>
      <Col lg={3} className="my-3 d-flex justify-content-center">
        <Card className="text-dark col-10">
          <Card.Header className="text-center fw-bold">
            {app.company}
          </Card.Header>
          <Card.Body>
            <p className="card-job-title">
              <strong>Title: </strong>
              {app.jobTitle}
            </p>
            <p>
              <strong>Salary: </strong>${app.salary}
            </p>
            <p>
              <strong>Location: </strong>
              {app.location}
            </p>
            <p>
              <strong>Date Applied: </strong>
              {formatDate(app.dateCreated)}
            </p>
            <p>
              <strong>Date Co. Responded: </strong>
              {app.dateModified !== "0001-01-01T00:00:00" || null
                ? formatDate(app.dateModified)
                : "No Response"}
            </p>
            <p>
              <strong>Closed: </strong>
              {app.closed === true ? "Yes" : "No"}
            </p>
            <p>
              <strong>Received Call: </strong>
              {app.receivedCall === true ? "Yes" : "No"}
            </p>
            <p>
              <strong>Offered Interview: </strong>
              {app.offeredInterview === true ? "Yes" : "No"}
            </p>
            <p>
              <strong>Received Offer: </strong>
              {app.receivedOffer === true ? "Yes" : "No"}
            </p>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-around">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleClose}
            >
              Close App
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleEdit}
            >
              Edit Status
            </button>
          </Card.Footer>
        </Card>
      </Col>
    </>
  );
};

export default AppCard;
