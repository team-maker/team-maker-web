import React, { Component } from 'react';
import { Container }  from 'react-bootstrap';
import FacebookLoginButton from '../shared/FacebookLoginButton';
import './styles.scss';

export default class Homepage extends Component {

  render() {

    return (
      <div className='homepage'>
        <Container className='content mt-5'>
          <h1 className="mb-3 text-uppercase font-weight-bold">Join Your Friends and Create your own League!</h1>
          <FacebookLoginButton/>
        </Container>
      </div>
    )
  }
}
