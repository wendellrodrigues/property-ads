import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MenuText } from "../../styles/TextStyles";

import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  //Menu for when app is at login screen
  const guestLinks = [
    { title: "Register", link: "/" },
    { title: "Login", link: "/login" },
  ];

  //Menu Items for when app is authenticated
  const authLinks = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Profile", link: "/profile" },
    { title: "Logout", action: logout, link: "/login" },
  ];

  const guestMenu = (
    <MenuWrapper count={guestLinks.length}>
      {guestLinks.map((item, index) => (
        <Link to={item.link}>
          <MenuItem>{item.title}</MenuItem>
        </Link>
      ))}
    </MenuWrapper>
  );

  const authMenu = (
    <MenuWrapper count={authLinks.length}>
      {authLinks.map((item, index) => (
        <Link to={item.link}>
          <MenuItem onClick={item.action}>{item.title}</MenuItem>
        </Link>
      ))}
    </MenuWrapper>
  );

  return (
    <Wrapper>
      <LogoImg src={""} />
      {!loading && (
        <Fragment>{isAuthenticated ? authMenu : guestMenu}</Fragment>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 44px auto;
  background: #000000;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  width: 100%;
  margin-top: 0;

  @media (max-width: 760px) {
    display: none;
  }
`;

const LogoImg = styled.img`
  padding-left: 50px;
  @media (max-width: 760px) {
    display: none;
  }
`;

const MenuWrapper = styled.div`
  display: grid;
  height: auto;
  gap: 30px;
  grid-template-columns: repeat(${(props) => props.count}, auto);
  padding-right: 50px;
  @media (max-width: 760px) {
    > a {
      display: none;
    }
    grid-template-columns: auto;
  }
`;

const MenuItem = styled(MenuText)``;

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
