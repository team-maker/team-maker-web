import React, { Component } from 'react'
import { Navbar, Nav, Button }  from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import './styles.scss';
import LoginModal from '../LoginModal';
import logo from '../../assets/images/logo.png';

export default class HomeNav extends Component {
  constructor(props){
    super(props)
    const user = localStorage.getItem('user');
    this.state = {
      showLoginModal: false,
      loggedIn: JSON.parse(user)
    }
  }

  handleLoginClose = () => this.setState({showLoginModal: false});
  handleLoginShow = () => this.setState({showLoginModal: true});

  render() {
    const {
      loggedIn,
      showLoginModal
    } = this.state;
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
              {
                loggedIn ?
                  <Button className="nav-button" onClick={() => this.handleLoginShow()}>
                    {loggedIn['user']['email']}
                  </Button>
                 : 
                  <Button className="nav-button" onClick={() => this.handleLoginShow()}>
                    Login
                  </Button>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <LoginModal 
          handleLoginClose={this.handleLoginClose} 
          show={showLoginModal}
        />
      </>
    )
  }
}

