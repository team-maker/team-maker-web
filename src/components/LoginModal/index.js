import React, { Component } from 'react'
import { Modal, Button, Form }  from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import FacebookLoginButton from '../shared/FacebookLoginButton';
import './styles.scss';


export default class LoginModal extends Component {

  render() {
    const {
      show,
      handleLoginClose,
      handleLogin
    } = this.props;

    return (
      <Modal className='login-modal' show={show} onHide={() => handleLoginClose()}>
        <Modal.Body>
          <img alt='Team Maker logo' className="logo mb-3" src={logo} />
          <Form onSubmit={(e) => handleLogin(e) }>
            <Form.Group controlId="formGroupEmail">
              <Form.Control type="email" placeholder="Enter email" name="email" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Control type="password" placeholder="Password" name="password"/>
            </Form.Group>
            <Button className='m-auto' type='submit' variant="primary">
              Login
            </Button>
            <p className="mt-2">Or</p>
            <FacebookLoginButton/>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

