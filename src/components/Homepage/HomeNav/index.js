import React, { Component } from 'react'
import { Navbar, Nav, Button }  from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import './styles.scss';
import logo from '../../../assets/images/logo.png';

class HomeNav extends Component {

  render() {
    const {
      handleLoginShow,
      handleRegisterShow
    } = this.props;

    return (
      <Navbar className='home-nav p-1' collapseOnSelect expand="lg" fixed="top">
        <Navbar.Brand className="p-0">
          <NavLink to='/'>
            <img alt='Team Maker logo' className="logo" src={logo} />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto mr-5" >
            <Button className="nav-button mr-2" onClick={() => handleRegisterShow()}>
              Register
            </Button>
            <Button className="nav-button" onClick={() => handleLoginShow()}>
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default HomeNav;

