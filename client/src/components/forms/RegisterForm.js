import React, { useRef, useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import styled from "styled-components";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";

//Hook
import useOnClickOutside from "../../helpers/hooks";

//Icons
import UserIcon from "../../static/icons/user.svg";
import MailIcon from "../../static/icons/mail.svg";
import KeyIcon from "../../static/icons/key.svg";
import KeyLockIcon from "../../static/icons/key-lock.svg";

//Styles
import {
  Wrapper,
  Form,
  InputWrapper,
  Input,
  Icon,
  TextField,
  ButtonWrapper,
  SubmitButton,
  SubmitText,
  AlertWrapper,
  AlertText,
} from "../../styles/FormStyles";

const RegisterForm = (props) => {
  const { formData, setFormData, alerts } = props;
  let { name, email, password, confirmPassword } = formData;

  //Errors
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  //For page clicking
  const [clicked, setClicked] = useState("");

  //Custom email validation function
  const validateEmail = (email) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(email) == false) return false;
    return true;
  };

  //Submitting the form (set client-side errors)
  const onSubmit = async (e) => {
    let hasErrors = false;
    if (name.length == 0) {
      setNameError("Name is Required");
      hasErrors = true;
    }
    if (validateEmail(email) == false) {
      setEmailError("Please enter a valid email");
      hasErrors = true;
      setFormData({
        ...formData,
        password: "",
        confirmPassword: "",
        email: "",
      });
    }
    if (password.length < 6) {
      setPasswordError("Please enter a password with 6 or more characters");
      hasErrors = true;
      setFormData({
        ...formData,
        password: "",
        confirmPassword: "",
      });
    }

    if (password !== confirmPassword || confirmPassword == "") {
      setConfirmPasswordError("Passwords do not match");
      hasErrors = true;
      setFormData({
        ...formData,
        password: "",
        confirmPassword: "",
      });
    }

    if (hasErrors == false && alerts.length == 0)
      props.register({ name, email, password });
  };

  //Use Effect hook for clearing form data upon server side form error
  useEffect(() => {
    if (alerts.length > 0) {
      setFormData({
        ...formData,
        email: "",
        password: "",
        confirmPassword: "",
      });
      ref_input_email.current.focus();
      setClicked("email");
    }
  });

  //Clears all client-side errors
  const clearErrors = () => {
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
  };

  //To update form data
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //To handle UI animations for clicked fields
  const handleClicked = (e) => {
    setClicked(e);
  };

  //For enter clicks
  const ref_input_name = useRef();
  const ref_input_email = useRef();
  const ref_input_password = useRef();
  const ref_input_confirmPassword = useRef();

  //For Outside Clicks
  const ref = useRef();
  const insideRef = useRef();

  useOnClickOutside(ref, () => {
    setClicked("");
  });

  useOnClickOutside(insideRef, () => {
    setClicked("");
  });

  return (
    <Wrapper alerts={alerts}>
      <Form>
        <InputWrapper>
          <Input
            name="name"
            error={nameError}
            stateName={clicked}
            ref={insideRef}
          >
            <Icon src={UserIcon} name="email" error={nameError} />
            <TextField
              type="text"
              placeholder="Name"
              error={nameError}
              name="name"
              value={name}
              onClick={(name) => {
                handleClicked("name");
                clearErrors();
              }}
              onChange={(e) => onChange(e)}
              stateName={clicked}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  ref_input_email.current.focus();
                  handleClicked("email");
                }
              }}
              required
            />
          </Input>
          <AlertText>{nameError}</AlertText>
        </InputWrapper>
        <InputWrapper>
          <Input
            name="email"
            error={emailError}
            stateName={clicked}
            ref={insideRef}
          >
            <Icon src={MailIcon} name="email" error={emailError} />
            <TextField
              type="text"
              placeholder="Email"
              error={emailError}
              name="email"
              value={email}
              onClick={(name) => {
                handleClicked("email");
                clearErrors();
              }}
              onChange={(e) => onChange(e)}
              stateName={clicked}
              ref={ref_input_email}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  ref_input_password.current.focus();
                  handleClicked("password");
                }
              }}
              required
            />
          </Input>
          <AlertText>{emailError}</AlertText>
        </InputWrapper>
        <InputWrapper>
          <Input
            name="password"
            error={passwordError}
            stateName={clicked}
            ref={insideRef}
          >
            <Icon src={KeyIcon} name="password" error={passwordError} />
            <TextField
              type="password"
              placeholder="Password"
              error={passwordError}
              name="password"
              value={password}
              onClick={(name) => {
                handleClicked("password");
                clearErrors();
              }}
              onChange={(e) => onChange(e)}
              stateName={clicked}
              ref={ref_input_password}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  ref_input_confirmPassword.current.focus();
                  handleClicked("confirmPassword");
                }
              }}
              required
            />
          </Input>
          <AlertText>{passwordError}</AlertText>
        </InputWrapper>
        <InputWrapper>
          <Input
            name="confirmPassword"
            error={confirmPasswordError}
            stateName={clicked}
            ref={insideRef}
          >
            <Icon
              src={KeyLockIcon}
              name="confirmPassword"
              error={confirmPasswordError}
            />
            <TextField
              type="password"
              placeholder="Confirm Password"
              error={confirmPasswordError}
              name="confirmPassword"
              value={confirmPassword}
              onClick={(name) => {
                handleClicked("confirmPassword");
                clearErrors();
              }}
              onChange={(e) => onChange(e)}
              stateName={clicked}
              ref={ref_input_confirmPassword}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onSubmit(formData);
                }
              }}
              required
            />
          </Input>
          <AlertText>{confirmPasswordError}</AlertText>
        </InputWrapper>
        <AlertWrapper>
          <Alert />
        </AlertWrapper>

        <ButtonWrapper>
          <SubmitButton
            onClick={(formData) => {
              onSubmit(formData);
            }}
          >
            <SubmitText>Register</SubmitText>
          </SubmitButton>
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
};

RegisterForm.propTypes = {
  alerts: PropTypes.array.isRequired,
};

RegisterForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert, //From root reducer
});

export default connect(mapStateToProps, { setAlert, register })(RegisterForm);
