import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "../forms/LoginForm";
import PropTypes from "prop-types";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Redirect if logged in
  if (props.isAuthenticated) {
    console.log("Authenticated");
    //return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <Fragment>
      <Wrapper>
        <Content>
          <LoginForm
            formData={formData}
            setFormData={(formData) => setFormData(formData)}
          />
        </Content>
      </Wrapper>
    </Fragment>
  );
};

const Wrapper = styled.div`
  height: auto;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const Content = styled.div`
  position: relative;
  display: grid;
  margin: auto;
  width: 90%;
  justify-content: center;
  align-items: top;
  margin-top: 100px;
  margin-bottom: 100px;
  padding: 20px;
`;

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Login);
