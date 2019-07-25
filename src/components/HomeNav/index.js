import React, { Component } from 'react'
import { Navbar, Nav, Button, NavDropdown }  from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import LoginModal from '../LoginModal';
import './styles.scss';
import { UserService, AuthenticationService } from '../../services';
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

  handleLogout() {
    UserService.logOut().then((response) => {
      AuthenticationService.logout();
      this.setState({loggedIn: false})
    })
    .catch((error) => {
      alert("Não foi possível fazer logout");
    })
  }

  handleLogin = (e) => {
    e.preventDefault();
    const payload = { 
      username: e.target.email.value,
      password: e.target.password.value 
    };
    UserService.doLogin(payload).then((response) => {
      const user = response.data
      localStorage.setItem('user', JSON.stringify(user));
      // this.props.saveUser(user);
      if (response.headers.authorization) {
        localStorage.setItem('jwt', response.headers.authorization);
        // this.props.saveLogIn(localStorage.getItem('jwt'));
      }
      this.handleLoginClose();
      this.setState({loggedIn: user})
      // this.props.history.push(`/`)
    })
    .catch((error) => {
      switch (error.response.status) {
        case 400:
          alert("Email/Password incorrectos");
          break;
        case 404:
          alert("Utilizador não encontrado");
          break;
        default: 
          alert("Something went wrong");
      }
    })
  }


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
                  <NavDropdown title={loggedIn['user']['email']} id="basic-nav-dropdown">
                    <NavLink className="dropdown-item" to='/profile'>
                      Perfil
                    </NavLink>
                    <NavDropdown.Item onClick={() => this.handleLogout()}>Logout</NavDropdown.Item>
                  </NavDropdown>
                 : 
                  <Button className="nav-button" onClick={() => this.handleLoginShow()}>
                    Login
                  </Button>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <LoginModal 
          handleLogin={this.handleLogin}
          handleLoginClose={this.handleLoginClose} 
          show={showLoginModal}
        />
      </>
    )
  }
}

