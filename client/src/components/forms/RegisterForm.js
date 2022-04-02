import React, { useRef, useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import styled from "styled-components";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
import AlertText from "../layout/AlertText";

//Icons
import UserIcon from "../../static/icons/user.svg";
import MailIcon from "../../static/icons/mail.svg";
import KeyIcon from "../../static/icons/key.svg";
import KeyLockIcon from "../../static/icons/key-lock.svg";

//Styles
import {
  Wrapper,
  Form,
  Input,
  Icon,
  TextField,
  SubmitButton,
  SubmitText,
} from "../../styles/FormStyles";

const RegisterForm = (props) => {
  const { formData, setFormData, alerts } = props;
  let { name, email, password, confirmPassword } = formData;

  //Submitting the form
  const onSubmit = async (e) => {
    if (password !== confirmPassword)
      props.setAlert("Passwords do not match", "danger");
    else {
      props.register({ name, email, password });
    }
  };

  //Error messages
  const nameReq = "Name is required";
  const emailVal = "Please enter a valid email";
  const needPass = "Please enter a password with 6 or more characters";
  const passMatch = "Passwords do not match";
  const emailInUse = "Email account already in use";

  //To update form data
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Checks for alerts (to update component css)
  const checkAlerts = (type) => {
    if (type == "nameReq") type = "Name is required";
    if (type == "emailVal") type = "Please enter a valid email";
    if (type == "needPass")
      type = "Please enter a password with 6 or more characters";
    if (type == "passMatch") type = "Passwords do not match";

    for (alert of alerts) {
      console.log(alert.msg);
      if (alert.msg == type) {
        console.log("found");
        return true;
      }
    }
    return false;
  };

  return (
    <Wrapper>
      <Form>
        <Input name="name" alert={checkAlerts("nameReq")}>
          <Icon src={UserIcon} name="name" />
          <TextField
            type="text"
            placeholder="Name"
            //placeholder={checkAlerts("nameReq") == true ? nameReq : "Name"}
            alert={checkAlerts("nameReq")}
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </Input>
        <Input name="email" alert={checkAlerts("emailVal")}>
          <Icon src={MailIcon} name="email" />
          <TextField
            type="text"
            placeholder="Email"
            //placeholder={checkAlerts("emailVal") == true ? emailVal : "Email"}
            alert={checkAlerts("emailVal")}
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </Input>
        <Input name="password" alert={checkAlerts("needPass")}>
          <Icon src={KeyIcon} name="password" />
          <TextField
            type="password"
            placeholder="Password"
            // placeholder={
            //   checkAlerts("needPass") == true ? needPass : "Password"
            // }
            alert={checkAlerts("needPass")}
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </Input>
        <AlertText message={needPass} />
        <Input name="confirmPassword" alert={checkAlerts("passMatch")}>
          <Icon src={KeyLockIcon} name="confirmPassword" />
          <TextField
            type="password"
            placeholder={
              checkAlerts("passMatch") == true ? passMatch : "Confirm Password"
            }
            alert={checkAlerts("passMatch")}
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => onChange(e)}
            required
          />
        </Input>
        <AlertText message={passMatch} />
        <SubmitButton
          onClick={(formData) => {
            onSubmit(formData);
          }}
        >
          <SubmitText>Register</SubmitText>
        </SubmitButton>
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
