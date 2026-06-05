import React, { useState, useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { PasswordToggle } from "../utils/general.js";
import { showSystemPopup } from "../services/CustomSystemPopupService.js";
import { loginUser } from "../services/AuthService.js";

const LoginPage: React.FC = () => {
  const [loginInputData, setLoginInputData] = useState<any>({});
  const [errMsg, setErrMsg] = useState<any>({});
  const passwordInput = useRef(null);
  const navigate = useNavigate();

  const updateFormInput = (events) => {
    const { id, value } = events.target;
    setLoginInputData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const triggerLogin = () => {
    setErrMsg({});
    loginUser(loginInputData, loginCallback, setErrMsg);
  };

  const loginCallback = () => {
    showSystemPopup("Successfully logged in. Redirecting to dashboard.", "success");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      triggerLogin();
      const inputs = event.currentTarget.querySelectorAll("input");
      inputs.forEach((input) => input.blur());
    }
  };

  return (
    <Container fluid className="page-content-container login-page-container">
      <Row className="justify-content-center align-items-center full-page-row h-100">
        <Col xs={12} md={7} lg={5} xl={3}>
          <div className="w-100 d-flex flex-column justify-content-center align-items-center mb-3">
            <div className="mb-3">
              <FontAwesomeIcon icon={faChartLine} className="logo-icon" />
            </div>
            <div className="mb-2">
              <h1 className="mb-0 font-size-xl font-weight-bold text-center primary-text-color">
                Finance Dashboard
              </h1>
            </div>
            <div>
              <h3 className="mb-0 font-size-md font-weight-thin secondary-text-color text-center">
                Track your expenses with ease
              </h3>
            </div>
          </div>
          <Row className="login-tab-container mx-0 mb-3">
            <Col xs={6} className="px-1">
              <Button className="login-tab-btn active" onClick={() => navigate("/")}>
                Login
              </Button>
            </Col>
            <Col xs={6} className="px-1">
              <Button className="login-tab-btn" onClick={() => navigate("/registration")}>
                Register
              </Button>
            </Col>
          </Row>
          <div className="login-form-container">
            <h2 className="mb-0 font-size-lg font-weight-thick primary-text-color">Welcome back</h2>
            <p className="font-size-sm font-weight-thin secondary-text-color">
              Sign in to manage your expenses.
            </p>
            <Form id="loginForm" className="mb-4" onKeyDown={handleKeyDown}>
              <Form.Group className="form-group" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={updateFormInput} />
                {errMsg?.email && <div className="form-error-msg">{errMsg.email}</div>}
              </Form.Group>
              <Form.Group className="form-group" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control ref={passwordInput} type="password" onChange={updateFormInput} />
                <PasswordToggle passwordRef={passwordInput} />
                {errMsg?.password && <div className="form-error-msg">{errMsg.password}</div>}
              </Form.Group>
            </Form>
            <Button variant="primary" className="w-100" onClick={triggerLogin}>
              Login
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
