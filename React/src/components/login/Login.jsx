import { Form, Formik, Field, ErrorMessage } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import userService from "../../services/userService";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";

const Login = ({ changeUser }) => {
  const [loginInfo] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();
  const onPasswordEyeClicked = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = (values) => {
    console.log(values);
    userService.login(values).then(onLoginSuccess).catch(onLoginError);
  };
  const onGetCurrentSuccess = (res) => {
    console.log(res);
    const curUser = res;
    curUser.isLoggedIn = true;
    changeUser(curUser);
  };
  const onGetCurrentErr = (err) => {
    console.log(err);
  };

  const onLoginSuccess = (response) => {
    toastr.success("You have successfully logged in.");
    userService.getCurrent().then(onGetCurrentSuccess).catch(onGetCurrentErr);
    nav("/");
  };
  const onLoginError = (err) => {
    console.log(err);
    toastr.error("Error Logging In");
  };

  return (
    <>
      <Container>
        <Formik
          enableReinitialize={true}
          initialValues={loginInfo}
          onSubmit={onLogin}
        >
          <div className="mx-auto mt-5 w-50 card px-5 py-3">
            <h3 className="text-center">Login</h3>
            <Form>
              <div className="mb-3">
                <label className="form-label fw-bold" name="email">
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
                <label className="form-label fw-bold">Password</label>
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
              <div className="d-flex">
                <button type="submit" className="btn btn-primary m-auto">
                  Login
                </button>
              </div>
            </Form>
          </div>
        </Formik>
      </Container>
    </>
  );
};
export default Login;
