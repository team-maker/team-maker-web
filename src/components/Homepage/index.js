import React, { Component } from 'react';
import { Container }  from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import './styles.scss';

export default class Homepage extends Component {

  responseFacebook = (response) => {
    console.log(response);
  }

  render() {
    return (
      <div className='homepage'>
        <Container className='content mt-5'>
          <h1 class="title">Join Your Friends and Create your own League!</h1>
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            cssClass="facebook-button"
            icon="fa-facebook"
            callback={this.responseFacebook} />
        </Container>
      </div>
    )
  }
}
