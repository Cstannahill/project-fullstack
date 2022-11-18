import Divider from "../../components/common/Divider";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import toastr from "toastr";
import SocialAuthButtons from "./SocialAuthButtons";
import userService from "../../services/userService";
import Swal from "sweetalert2";

const LoginForm = ({ hasLabel, layout }) => {
  // State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const saveCredentials = () => {
    localStorage.setItem("email_TFGX", formData.email);
    localStorage.setItem("password_TFGX", formData.password);
  };
  const removeCredentials = () => {
    localStorage.removeItem("email_TFGX");
    localStorage.removeItem("password_TFGX");
  };
  useEffect(() => {
    const savedEmail = localStorage.getItem("email_TFGX");
    const savedPassword = localStorage.getItem("password_TFGX");
    if (savedEmail) {
      setFormData((prevState) => {
        const data = { ...prevState };
        data.email = savedEmail;
        data.password = savedPassword;
        data.remember = true;
        return data;
      });
    }
    console.log("login1");
  }, []);
  useEffect(() => {
    formData.remember ? saveCredentials() : removeCredentials();
    console.log("login2");
  }, [formData.remember]);

  // Handler
  const handleChange = (e) => {
    setFormData((prev) => {
      const data = { ...prev };
      switch (e.target.name) {
        case "remember":
          data.remember = !data.remember;
          break;
        default:
          data[e.target.name] = e.target.value;
          break;
      }
      return data;
    });
  };
  // const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();
  // const onPasswordEyeClicked = () => {
  //   setShowPassword(!showPassword);
  // };

  const onLogin = (e) => {
    e.preventDefault();
    userService.login(formData).then(onLoginSuccess).catch(onLoginError);
  };
  const onGetCurrentSuccess = (res) => {
    console.log(res);
    const curUser = res;
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "success",
      title: `Signed in as ${res.firstName}`,
    });
    curUser.isLoggedIn = true;
    const state = { type: "current_User_Information", payload: curUser };
    nav("/", { state: state });
  };
  const onGetCurrentErr = (err) => {
    console.log(err);
  };

  const onLoginSuccess = () => {
    userService.getCurrent().then(onGetCurrentSuccess).catch(onGetCurrentErr);
  };
  const onLoginError = (err) => {
    console.log(err);
    toastr.error("Error Logging In");
  };

  return (
    <>
      <form>
        <div className="mb-3 form-group">
          {hasLabel && <label className="form-label">Email address</label>}
          <input
            className="form-control"
            placeholder={!hasLabel ? "Email address" : ""}
            onChange={handleChange}
            value={formData.email}
            name="email"
            type="email"
            autoComplete="true"
          />
        </div>

        <div className="form-group mb-3">
          {hasLabel && <label className="form-label">Password</label>}
          <input
            className="form-control"
            placeholder={!hasLabel ? "Password" : ""}
            value={formData.password}
            onChange={handleChange}
            name="password"
            type="password"
            autoComplete="true"
          />
        </div>
        <Row className="justify-content-between align-items-center">
          <Col xs="auto">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="form-check-input"
              style={{ marginRight: "0.5rem" }}
            />
            <label className="mb-0 text-700 form-check-label">
              Remember me
            </label>
          </Col>

          <Col xs="auto">
            <Link
              className="fs--1 mb-0"
              to={`/authentication/${layout}/forgot-password`}
            >
              Forgot Password?
            </Link>
          </Col>
        </Row>

        <div className="form-group">
          <Button
            type="submit"
            color="primary"
            className="mt-3 w-100"
            onClick={onLogin}
          >
            Log in
          </Button>

          {/* <Button
              className="mt-3 w-100 btn btn-primary"
              type="button"
              disabled
            >
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </Button>
          */}
        </div>
        <Divider className="mt-4">or log in with</Divider>
        <SocialAuthButtons />
      </form>
    </>
  );
};

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool,
};

LoginForm.defaultProps = {
  layout: "simple",
  hasLabel: false,
};

export default LoginForm;
