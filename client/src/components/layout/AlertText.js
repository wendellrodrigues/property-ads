import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

const AlertText = ({ alerts, message }) => {
  if (alerts !== null && alerts.length > 0) {
    for (alert of alerts) {
      if (alert.msg == message) {
        return <AlertMsg key={alert.id}>{alert.msg}</AlertMsg>;
      } else return null;
    }
  } else return null;
};

const AlertMsg = styled.p`
  float: right;
  color: #e77b7b;
  font-size: 10px;
  font-weight: medium;
  line-height: normal;
`;

AlertText.propTypes = {
  alerts: PropTypes.array.isRequired,
};

//Mapping the redux state as a prop to the component
const mapStateToProps = (state) => ({
  alerts: state.alert, //From root reducer
});

export default connect(mapStateToProps)(AlertText);
