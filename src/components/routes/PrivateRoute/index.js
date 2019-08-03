import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import { Redirect } from 'react-router';

class PrivateRoute extends Component{

  render() {
    const {component: Component, ...rest} = this.props
    const has_filled_data = true
    return(
      <Route {...rest} render={(props) => {
        const isLoggedIn = localStorage.getItem('jwtToken')
        console.log(has_filled_data)
        if(isLoggedIn && has_filled_data) {
          return  <Component {...props}/>
        }
        if(isLoggedIn && !has_filled_data) {
          return <Redirect to={'/player-profile'} />
        }
        return <Redirect to={'/'} />
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

