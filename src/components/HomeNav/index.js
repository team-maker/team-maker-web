import React, { Component } from 'react'
import { Navbar, Nav, Button }  from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import './styles.scss';
import LoginModal from '../LoginModal';
import logo from '../../assets/images/logo.png';

export default class HomeNav extends Component {
  state = {
    showLogin: false
  }

  handleLoginClose = () => this.setState({showLogin: false});
  handleLoginShow = () => this.setState({showLogin: true});

  render() {

    return (
      <>
        <Navbar className='home-nav p-1' collapseOnSelect expand="lg" variant="dark" fixed="top">
          <Navbar.Brand className="p-0">
            <NavLink to='/'>
             <img alt='Team Maker logo' className="logo" src={logo} />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto mr-4" >
             <Button className="nav-button"  onClick={() => this.handleLoginShow()}>
               Login
             </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <LoginModal 
          handleLoginClose={this.handleLoginClose} 
          show={this.state.showLogin}
        />
      </>
    )
  }
}

