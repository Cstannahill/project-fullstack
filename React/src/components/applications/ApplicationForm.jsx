/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Container } from "react-bootstrap";
import applicationService from "../../services/applicationService";
import "../../css/appform.css";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useLocation } from "react-router-dom";

const ApplicationForm = () => {
  const [appFormData, setAppFormData] = useState({});
  const location = useLocation();
  useEffect(() => {
    // document.body.style.backgroundColor = "silver";
    // document.body.style.color = "black";
    if (location?.state?.type === "app_Data" && location?.state?.payload) {
      setAppFormData((prevState) => {
        let newAppFormData = { ...prevState };
        newAppFormData = location?.state?.payload;
        return newAppFormData;
      });
    }
  }, []);

  const onCreateAppSuccess = () => {
    toastr.success("Application Successfully Created!");
  };
  const onUpdateAppSuccess = () => {
    toastr.success("Application Succesfully Updated!");
  };
  const onAppError = () => {
    toastr.error("Something went wrong.");
  };
  const handleSubmit = (values) => {
    values.receivedCall = Boolean(values.receivedCall);
    values.receivedOffer = Boolean(values.receivedOffer);
    values.offeredInterview = Boolean(values.offeredInterview);
    const addPayload = {};
    addPayload.location = values.location;
    addPayload.company = values.company;
    addPayload.jobTitle = values.jobTitle;
    addPayload.salary = values.salary;
    values.id
      ? applicationService
          .updateApplication(values)
          .then(onUpdateAppSuccess)
          .catch(onAppError)
      : applicationService
          .createApplication(addPayload)
          .then(onCreateAppSuccess)
          .catch(onAppError);
  };
  return (
    <>
      <div className="my-2 text-center">
        <h1>Applications</h1>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={appFormData}
        onSubmit={handleSubmit}
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
                  Title
                </label>
                <Field
                  name="jobTitle"
                  type="text"
                  className="form-control my-1"
                  placeholder="Full Stack Software Engineer"
                />
                <label className="fw-bold" htmlFor="inputSummary">
                  Salary
                </label>
                <Field
                  name="salary"
                  type="text"
                  className="form-control my-1"
                  placeholder="100000"
                />
                <label className="fw-bold" htmlFor="inputSummary">
                  Location
                </label>
                <Field
                  name="location"
                  type="text"
                  className="form-control my-1"
                  placeholder="Kirkland, WA"
                />
                {appFormData.id && (
                  <>
                    <label className="fw-bold" htmlFor="inputSummary">
                      Date Modified
                    </label>
                    <Field
                      name="dateModified"
                      type="date"
                      className="form-control my-1"
                      placeholder="10/29/22"
                    />
                    {/* <label className="fw-bold" htmlFor="inputSummary">
                      Date Closed
                    </label>
                    <Field
                      name="dateClosed"
                      type="date"
                      className="form-control my-1"
                      placeholder="10/31/22"
                    /> */}
                    <label className="fw-bold" htmlFor="inputSummary">
                      Received Call
                    </label>
                    <Field
                      name="receivedCall"
                      type="text"
                      className="form-control my-1"
                      component="select"
                      disabled={!appFormData.id}
                      style={{
                        appearance: "menulist",
                      }}
                    >
                      <option value={Boolean(false)}>No</option>
                      <option value={Boolean(true)}>Yes</option>
                    </Field>
                    <label className="fw-bold" htmlFor="inputSummary">
                      Interview
                    </label>
                    <Field
                      name="offeredInterview"
                      type="text"
                      className="form-control my-1"
                      placeholder="Yes"
                      component="select"
                      disabled={!appFormData.id}
                      style={{
                        appearance: "menulist",
                      }}
                    >
                      <option value={Boolean(false)}>No</option>
                      <option value={Boolean(true)}>Yes</option>
                    </Field>
                    <label className="fw-bold" htmlFor="inputSummary">
                      Received Offer
                    </label>
                    <Field
                      name="receivedOffer"
                      type="text"
                      className="form-control my-1"
                      placeholder="Yes"
                      disabled={!appFormData.id}
                      component="select"
                      style={{
                        appearance: "menulist",
                      }}
                    >
                      <option value={Boolean(false)}>No</option>
                      <option value={Boolean(true)}>Yes</option>
                    </Field>
                  </>
                )}
                <div className="d-flex my-3">
                  <button
                    className="btn btn-primary px-4 mx-auto"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default ApplicationForm;
