import React, { Component } from 'react'
import { Navbar, Nav }  from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import './homeNav.scss';

export default class HomeNav extends Component {

  render() {
    return (
     <Navbar className='home-nav p-1' collapseOnSelect expand="lg" variant="dark" fixed="top">
       <Navbar.Brand className="p-0">
        <NavLink to='/'>
          <img alt='Team Maker logo' className="logo" src={logo} />
        </NavLink>
       </Navbar.Brand>
       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
       <Navbar.Collapse id="responsive-navbar-nav">
         <Nav className="ml-auto mr-4" >
          <NavLink className="nav-button" to='/login'>
            Login
          </NavLink>
         </Nav>
       </Navbar.Collapse>
     </Navbar>
    )
  }
}

