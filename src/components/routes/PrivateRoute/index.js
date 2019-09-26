import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import { Redirect } from 'react-router';

class PrivateRoute extends Component{

  render() {
    const { component: Component, ...rest } = this.props;
    // const user = this.props.user;
    // const redirectToFillData = !user.first_name || !user.last_name;
    const isLoggedIn = localStorage.getItem('jwtToken')
    return(
      <Route {...rest} render={(props) => { 
        if(!isLoggedIn) {
          return <Redirect to={{
              pathname: "/",
              state: { from: props.location }
            }} />
        }
        if(isLoggedIn) {
          return  <Component {...props} {...rest}/>
        }
        // if(isLoggedIn && redirectToFillData) {
        //   return <Redirect to='/player/profile' />
        // }
        return <Redirect to='/player/teams' />
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

