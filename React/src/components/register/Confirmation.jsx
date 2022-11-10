import React, { useEffect, useState } from "react";
import * as emailConfirm from "../../services/userService";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import * as AiOutlineMail from "react-icons/ai";

function Confirmation() {
  const search = useLocation().search;
  console.log("search", search);
  const token = new URLSearchParams(search).get("token");
  console.log("token", token);

  const [isConfirmed, setIsConfirmed] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    if (token !== null) {
      emailConfirm(token).then(onConfirmSuccess).catch(onConfirmError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onConfirmError = (err) => {
    console.log("confirm err ->", err);

    Swal.fire({
      title: "Email Not Confirmed",
      icon: "error",
      button: "close",
    });
  };

  const onConfirmSuccess = (response) => {
    setIsConfirmed(!isConfirmed);
    console.log("confirm success ->", response);

    Swal.fire({
      title: "Email Confirmed",
      text: "Thanks for confirming you account!",
      icon: "success",
      button: "close",
    });
  };

  const onBtnClicked = (e) => {
    e.preventDefault();
    nav("/login");
  };
  return (
    <React.Fragment>
      <div className="email-confirm-background">
        <div className="container">
          <div className="confirm-email-msg">
            <AiOutlineMail />
            {isConfirmed ? (
              <div>
                <h3>Email Confirmed!</h3>
                <p>
                  Thanks for confirming your account! Click the button below to
                  login.
                </p>
                <Button className="user-btn" onClick={onBtnClicked}>
                  Back to Login
                </Button>
              </div>
            ) : (
              <div>
                <h3>Please Check Your Email</h3>
                <p>
                  An email has been sent to your inbox. Please click on the link
                  provided within the email to confirm your account.
                </p>
                <Button className="user-btn" disabled>
                  Waiting For Confirmation...
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Confirmation;
