import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import { Redirect } from 'react-router';

class PrivateRoute extends Component {
  render() {
    const { component: Component, user, ...rest } = this.props;
    const redirectToFillData = !user.first_name || !user.last_name;
    const isLoggedIn = localStorage.getItem('jwtToken')
    
    return(
      <Route {...rest} render={(props) => { 
        if(!isLoggedIn) {
          return <Redirect to={{pathname: "/", state: { from: props.location }}} />
        }

        if (redirectToFillData && rest.location.pathname !== '/player/profile') {
          return <Redirect to={{pathname: '/player/profile', state: { from: rest.location }}} />  
        }

        return  <Component {...props} {...rest}/>
      }} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps, null)(PrivateRoute);

