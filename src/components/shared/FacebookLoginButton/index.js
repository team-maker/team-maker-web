import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux'
import { UserService, AuthenticationService } from '../../../services';
import { saveUser } from '../../../actions/userActions'
import './styles.scss';

class FacebookLoginButton extends Component {

  responseFacebook = (response) => {
    const payload = {
      name: response.name,
      email: response.email,
      image_url: response.picture.data.url
    }
    UserService.doFacebookLogin(payload).then((response) => {
      const dataResponse = response.data;
      AuthenticationService.login(JSON.stringify(dataResponse.user), dataResponse.token);
      this.props.saveUser(dataResponse);
    })
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

function mapDispatchToProps(dispatch){
  return {
    saveUser: (user) => dispatch(saveUser(user))
  }
}

export default connect(null, mapDispatchToProps)(FacebookLoginButton)