import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import toastr from "toastr";
import { Button, Form, Row, Col } from "react-bootstrap";
import Divider from "../common/Divider";
import SocialAuthButtons from "./SocialAuthButtons";
import userService from "../../services/userService";
import Swal from "sweetalert2";
import { BiUser } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const RegistrationForm = ({ hasLabel }) => {
  // State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    isAccepted: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();
  // Handler
  const onRegisterAccount = (e) => {
    e.preventDefault();
    userService
      .registerAccount(formData)
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

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={onRegisterAccount}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>First Name</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? "First Name" : ""}
          value={formData.name}
          name="firstName"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Last Name</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? "Last Name" : ""}
          value={formData.name}
          name="lastName"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email Address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? "Email Address" : ""}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group>

      <Row className="g-2 mb-3">
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Password</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? "Password" : ""}
            value={formData.password}
            name="password"
            onChange={handleFieldChange}
            type={showPassword ? "text" : "password"}
          />
          {/* <div
            className="show-password input-group-text input-group-password"
            data-password={showPassword ? "true" : "false"}
          >
            {!showPassword ? (
              <BsEye onClick={onPasswordEyeClicked} />
            ) : (
              <BsEyeSlash onClick={onPasswordEyeClicked} />
            )}
          </div> */}
        </Form.Group>
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Confirm Password</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? "Confirm Password" : ""}
            value={formData.passwordConfirm}
            name="passwordConfirm"
            onChange={handleFieldChange}
            type={showPassword ? "text" : "password"}
          />
          {/* <div
            className="show-password input-group-text input-group-password"
            data-password={showPassword ? "true" : "false"}
          >
            {!showPassword ? (
              <BsEye onClick={onPasswordEyeClicked} />
            ) : (
              <BsEyeSlash onClick={onPasswordEyeClicked} />
            )}
          </div> */}
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Check type="checkbox" id="acceptCheckbox" className="form-check">
          <Form.Check.Input
            type="checkbox"
            name="isAccepted"
            checked={formData.isAccepted}
            onChange={(e) =>
              setFormData({
                ...formData,
                isAccepted: e.target.checked,
              })
            }
          />
          <Form.Check.Label className="form-label">
            I accept the <Link to="#!">terms</Link> and{" "}
            <Link to="#!">privacy policy</Link>
          </Form.Check.Label>
        </Form.Check>
      </Form.Group>

      <Form.Group className="mb-4">
        <Button
          className="w-100"
          type="submit"
          disabled={
            !formData.firstName ||
            !formData.email ||
            !formData.password ||
            !formData.passwordConfirm ||
            !formData.lastName ||
            !formData.isAccepted
          }
        >
          <BiUser className="m-1" />
          Register
        </Button>
      </Form.Group>
      <Divider>or register with</Divider>

      <SocialAuthButtons />
    </Form>
  );
};

RegistrationForm.propTypes = {
  hasLabel: PropTypes.bool,
};

export default RegistrationForm;
