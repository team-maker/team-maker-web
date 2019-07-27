import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import './styles.scss';

export default class Homepage extends Component {

  responseFacebook = (response) => {
    console.log(response);
  }

  render() {
    return (
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        cssClass="facebook-button"
        icon="fa-facebook"
        callback={this.responseFacebook} />
    )
  }
}
