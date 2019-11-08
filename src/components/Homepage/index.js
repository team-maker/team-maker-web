import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Button }  from 'react-bootstrap';
import { addRedirect } from '../../actions/generalActions';
import { saveUser, doLogout } from '../../actions/userActions'
import { UserService, AuthenticationService } from '../../services';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';
import { getGravatarImage } from '../../utils';
import HomeNav from './HomeNav'
import FacebookLoginButton from '../shared/FacebookLoginButton';
import cogoToast from 'cogo-toast';
import './styles.scss';

class Homepage extends Component {
  constructor(props){
    super(props)
    this.state = {
      showLoginModal: false
    }
  }

  componentDidMount() {
    this.validateRedirect();
  }

  validateRedirect() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    this.props.addRedirect(from);
  }

  handleLogin = (e) => {
    e.preventDefault();
    const payload = { 
      email: e.target.email.value,
      password: e.target.password.value 
    };
    UserService.doLogin(payload).then((response) => {
      let dataResponse = response.data;
      if (!dataResponse.user.photo) {
        dataResponse.user.photo = getGravatarImage(dataResponse.user.email)
      }
      AuthenticationService.login(JSON.stringify(dataResponse.user), dataResponse.token);
      this.props.saveUser(dataResponse);
      this.handleLoginClose();
      cogoToast.success('Welcome Back!', { position: 'bottom-left' });
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

  handleRegister = (e) => {
    e.preventDefault();
    const payload = { 
      email: e.target.email.value,
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      password: e.target.password.value 
    };
    UserService.doRegister(payload).then((response) => {
      let dataResponse = response.data;
      if (!dataResponse.user.photo) {
        dataResponse.user.photo = getGravatarImage(dataResponse.user.email)
      }
      AuthenticationService.login(JSON.stringify(dataResponse.user), dataResponse.token);
      this.props.saveUser(dataResponse);
      this.handleRegisterClose();
      cogoToast.success('Welcome to Team Maker!', { position: 'bottom-left' });
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


  handleLoginClose = () => this.setState({showLoginModal: false});
  handleLoginShow = () => this.setState({showLoginModal: true});

  handleRegisterClose = () => this.setState({showRegisterModal: false});
  handleRegisterShow = () => this.setState({showRegisterModal: true});


  render() {
    const jwtToken = localStorage.getItem('jwtToken');
    const {
      showLoginModal,
      showRegisterModal
    } = this.state;

    if (jwtToken) {
      return <Redirect to='/player/teams'/>
    }
    return (
      <>
        <HomeNav handleLoginShow={this.handleLoginShow} handleRegisterShow={this.handleRegisterShow} />
        <div className='homepage'>
          <Container className='content mt-5'>
            <h1 className="mb-3 homepage__title text-uppercase font-weight-bold">Join Your Friends and Create your own League!</h1>  
            <Button className="btn-secondary mr-3" onClick={() => this.handleRegisterShow()}>
              Register
            </Button>
            <FacebookLoginButton history={this.props.history}/>
          </Container>
        </div>
        <LoginModal 
          handleLogin={this.handleLogin}
          handleLoginClose={this.handleLoginClose} 
          show={showLoginModal}
        />
        <RegisterModal 
          handleRegister={this.handleRegister}
          handleRegisterClose={this.handleRegisterClose} 
          show={showRegisterModal}
        />
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addRedirect: (redirectTo) => dispatch(addRedirect(redirectTo)),
    saveUser: (user) => dispatch(saveUser(user)),
    doLogout: () => dispatch(doLogout())
  }
}

function mapStateToProps(state){
  return {
    jwtToken: state.userReducer.jwtToken,
    redirectTo: state.generalReducer.redirectTo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)