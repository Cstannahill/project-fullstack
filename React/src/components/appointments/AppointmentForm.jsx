import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Container } from "react-bootstrap";
import appointmentService from "../../services/appointmentService";
import toastr from "toastr";

const AppointmentForm = (props) => {
  const [appointment] = useState({});

  const onCreateAppointmentSuccess = (setIsSubmitting) => {
    toastr.success("Appointment Created Successfully!");
    setIsSubmitting(false);
  };
  const onCreateAppointmentErr = () => {
    toastr.error("Something went wrong creating your appointment.");
  };
  const handleSubmit = (values, setIsSubmitting) => {
    if (!values.id) {
      appointmentService
        .createAppointment(values)
        .then(onCreateAppointmentSuccess)
        .catch(onCreateAppointmentErr);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={appointment}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}
        // validationSchema={registrationValidation}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Container className="d-flex justify-content-center form-container mb-3">
            <div className="form-group col-5">
              <Form>
                <label className="fw-bold" htmlFor="inputSummary">
                  Company
                </label>
                <Field
                  name="company"
                  type="text"
                  className="form-control my-1"
                  placeholder="Amazon"
                />
                <label className="fw-bold" htmlFor="inputSummary">
                  Date and Time
                </label>
                <Field
                  name="date"
                  type="datetime-local"
                  className="form-control my-1"
                />
                <label className="fw-bold" htmlFor="inputSummary">
                  Contact Name
                </label>
                <Field
                  name="contactName"
                  type="text"
                  className="form-control my-1"
                  placeholder="Nancy Smith"
                />
                <label className="fw-bold" htmlFor="inputSummary">
                  ContactMethod
                </label>
                <Field
                  name="contactMethod"
                  type="text"
                  className="form-control my-1"
                  placeholder="Kirkland, WA"
                  component="select"
                  style={{
                    appearance: "menulist",
                  }}
                >
                  <option value={"Phone"}>Phone</option>
                  <option value={"Zoom"}>Zoom</option>
                  <option value={"In-Person"}>In-Person</option>
                  <option value={"Other"}>Other</option>
                </Field>
                <div className="d-flex my-3">
                  {isSubmitting ? (
                    <button
                      className="btn btn-primary px-4 mx-auto"
                      type="submit"
                      disabled={true}
                    >
                      <span className="spinner-border spinner-border-sm" />
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary px-3 mx-auto"
                      type="submit"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </Form>
            </div>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default AppointmentForm;
