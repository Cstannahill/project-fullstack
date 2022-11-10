import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BiUser } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Button } from "react-bootstrap";
import registerSchema from "../../schemas/registerSchema";
import userService from "../../services/userService";
import "../../css/validation.css";

const Registration = () => {
  const [userInfo] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    avatarUrl: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    document.body.style.backgroundImage = `url(
      "https://www.freecodecamp.org/news/content/images/2021/06/w-qjCHPZbeXCQ-unsplash.jpg"
    )`;
  }, []);
  const onRegisterAccount = (values) => {
    userService
      .registerAccount(values)
      .then(onRegisterSuccess)
      .catch(onRegisterError);
  };
  const onRegisterSuccess = (response) => {
    console.log("Register Success ->", response);
    Swal.fire({
      title: "Registered New User!",
      text: "Please confirm email before logging in",
      icon: "success",
      button: "close",
    }).then(nav("/confirm"));
  };
  const onRegisterError = (err) => {
    console.log("Register User Error ->", err.response);
    if (err.response?.data.errors[0].includes("unique_Email")) {
      Swal.fire({
        title: "Email Already Exists",
        text: "Go to login page to sign in or reset password",
        icon: "warning",
        button: "Close",
      });
    } else {
      Swal.fire({
        title: "Registration Failed!",
        text: "Check if all fields are correct",
        icon: "error",
        button: "Close",
      });
    }
  };
  const onPasswordEyeClicked = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={userInfo}
        onSubmit={onRegisterAccount}
        validationSchema={registerSchema}
      >
        {({ values }) => (
          <div className="mx-auto mt-4 w-25">
            <Form>
              <div className="mb-3">
                <label className="form-label" name="email">
                  Email Address
                </label>
                <Field
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="has-error"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" name="email">
                  First Name
                </label>
                <Field
                  type="text"
                  name="firstName"
                  className="form-control "
                  placeholder="Enter your first name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" name="email">
                  Last Name
                </label>
                <Field
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Enter your last name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" name="email">
                  Avatar URL
                </label>
                <Field
                  type="url"
                  name="avatarUrl"
                  className="form-control"
                  placeholder="Enter URL for avatar"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="d-flex">
                  <Field
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                  />
                  <div
                    className="show-password input-group-text input-group-password"
                    data-password={showPassword ? "true" : "false"}
                  >
                    {!showPassword ? (
                      <BsEye onClick={onPasswordEyeClicked} />
                    ) : (
                      <BsEyeSlash onClick={onPasswordEyeClicked} />
                    )}
                  </div>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="has-error"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <div className="d-flex">
                  <Field
                    name="passwordConfirm"
                    className="form-control"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                  />
                  <div
                    className="show-password input-group-text input-group-password"
                    data-password={showPassword ? "true" : "false"}
                  >
                    {!showPassword ? (
                      <BsEye onClick={onPasswordEyeClicked} />
                    ) : (
                      <BsEyeSlash onClick={onPasswordEyeClicked} />
                    )}
                  </div>
                </div>
                <ErrorMessage
                  name="passwordConfirm"
                  component="div"
                  className="has-error"
                />
              </div>
              <div className="mb-0 d-flex">
                <Button
                  type="submit"
                  className="user-btn mx-auto"
                  //   onClick={onRegisterAccount}
                >
                  <BiUser className="m-1" />
                  {"Sign Up"}
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Registration;
