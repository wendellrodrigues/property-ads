import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Provider } from "react-redux";

import store from "./store";
import { loadUser } from "./actions/auth";
import { setAuthToken } from "./utils/setAuthToken";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App = () => {
  const [page, setPage] = useState("Login");

  //App first checks for loaded user by calling action
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  //Run this localStorage token check on page load
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  return (
    <Provider store={store}>
      <Router>
        <Wrapper>
          <Content>
            <Routes>
              <Route
                exact
                path="/"
                component={Register}
                page={(page) => setPage("Register")}
              />
              <Route
                exact
                path="/login"
                component={Login}
                page={(page) => setPage("Login")}
              />
            </Routes>
          </Content>
        </Wrapper>
      </Router>
    </Provider>
  );
};

const Wrapper = styled.div``;
const Content = styled.div``;

export default App;
