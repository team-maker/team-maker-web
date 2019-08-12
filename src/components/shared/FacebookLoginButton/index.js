import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux'
import { UserService, AuthenticationService } from '../../../services';
import { getGravatarImage } from '../../../utils';
import { saveUser } from '../../../actions/userActions'
import './styles.scss';

class FacebookLoginButton extends Component {

  responseFacebook = (response) => {
    const payload = {
      name: response.name,
      email: response.email
    }
    UserService.doFacebookLogin(payload).then((response) => {
      let dataResponse = response.data;
      if (!dataResponse.user.photo) {
        dataResponse.user.photo = getGravatarImage(dataResponse.user.email)
      }
      AuthenticationService.login(JSON.stringify(dataResponse.user), dataResponse.token);
      this.props.saveUser(dataResponse);
      console.log(this.props.redirectTo);
      this.props.history.push(this.props.redirectTo);
    })
  }

  render() {
    return (
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        cssClass="btn btn-secondary"
        icon="fa-facebook"
        callback={this.responseFacebook} />
    )
  }
}

function mapStateToProps(state){
  return {
    redirectTo: state.generalReducer.redirectTo
  }
}

function mapDispatchToProps(dispatch){
  return {
    saveUser: (user) => dispatch(saveUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookLoginButton)