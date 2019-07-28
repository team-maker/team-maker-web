import React, { Component } from 'react'
import { Navbar, Nav, Button, NavDropdown }  from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux'
import LoginModal from '../LoginModal';
import './styles.scss';
import { UserService, AuthenticationService } from '../../services';
import { saveUser, doLogout } from '../../actions/userActions'
import logo from '../../assets/images/logo.png';

class HomeNav extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      showLoginModal: false
    }
  }

  handleLoginClose = () => this.setState({showLoginModal: false});
  handleLoginShow = () => this.setState({showLoginModal: true});

  handleLogout() {
    UserService.logOut().then((response) => {
      AuthenticationService.logout();
      this.props.doLogout();
    })
    .catch((error) => {
      alert("Não foi possível fazer logout");
    })
  }

  handleLogin = (e) => {
    e.preventDefault();
    const payload = { 
      email: e.target.email.value,
      password: e.target.password.value 
    };
    UserService.doLogin(payload).then((response) => {
      const dataResponse = response.data;
      AuthenticationService.login(JSON.stringify(dataResponse.user), dataResponse.token);
      this.props.saveUser(dataResponse);
      this.handleLoginClose();
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
      showLoginModal
    } = this.state;
    const {
      user,
      jwtToken
    } = this.props;

    return (
      <>
        <Navbar className='home-nav p-1' collapseOnSelect expand="lg" fixed="top">
          <Navbar.Brand className="p-0">
            <NavLink to='/'>
             <img alt='Team Maker logo' className="logo" src={logo} />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto mr-4" >
              {
                jwtToken ?
                  <NavDropdown title={user.first_name || user.email} id="basic-nav-dropdown">
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

function mapDispatchToProps(dispatch){
  return {
    saveUser: (user) => dispatch(saveUser(user)),
    doLogout: () => dispatch(doLogout())
  }
}
function mapStateToProps(state){
  return {
    user: state.userReducer.user,
    jwtToken: state.userReducer.jwtToken
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeNav)

