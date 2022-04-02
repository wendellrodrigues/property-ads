import React, { useRef, useState, Fragment } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import styled from "styled-components";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";

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
  const { formData, setFormData } = props;
  let { name, email, password, confirmPassword } = formData;

  //Submitting the form
  const onSubmit = async (e) => {
    if (password !== confirmPassword)
      props.setAlert("Passwords do not match", "danger");
    else {
      props.register({ name, email, password });
    }
  };

  //To update form data
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Wrapper>
      <Form>
        <Input name="name">
          <Icon src={UserIcon} name="name" />
          <TextField
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </Input>
        <Input name="email">
          <Icon src={MailIcon} name="email" />
          <TextField
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </Input>
        <Input name="password">
          <Icon src={KeyIcon} name="password" />
          <TextField
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </Input>
        <Input name="confirmPassword">
          <Icon src={KeyLockIcon} name="confirmPassword" />
          <TextField
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => onChange(e)}
            required
          />
        </Input>
        <Alert />
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
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(RegisterForm);
