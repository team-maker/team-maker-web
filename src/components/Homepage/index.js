import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container }  from 'react-bootstrap';
import { addRedirect } from '../../actions/generalActions';
import FacebookLoginButton from '../shared/FacebookLoginButton';
import './styles.scss';

class Homepage extends Component {

  componentDidMount() {
    this.validateRedirect();
  }

  validateRedirect() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    this.props.addRedirect(from);
  }

  render() {
    const jwtToken = this.props.jwtToken;

    if (jwtToken) {
      return <Redirect to='/teams'/>
    }
    return (
      <div className='homepage'>
        <Container className='content mt-5'>
          <h1 className="mb-3 text-uppercase font-weight-bold">Join Your Friends and Create your own League!</h1>
          <FacebookLoginButton history={this.props.history}/>
        </Container>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addRedirect: (redirectTo) => dispatch(addRedirect(redirectTo))
  }
}

function mapStateToProps(state){
  return {
    jwtToken: state.userReducer.jwtToken,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)