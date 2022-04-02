import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { login } from "../../actions/auth";
import styled from "styled-components";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
