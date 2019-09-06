import React, { Component } from 'react'
import { Modal, Button, Form }  from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import './styles.scss';


export default class RegisterModal extends Component {

  render() {
    const {
      show,
      handleRegisterClose,
      handleRegister,
    } = this.props;

    return (
      <Modal className='login-modal' show={show} onHide={() => handleRegisterClose()}>
        <Modal.Body>
          <img alt='Team Maker logo' className="logo mb-3" src={logo} />
          <Form onSubmit={(e) => handleRegister(e) }>
            <Form.Group controlId="formGroupEmail">
              <Form.Control type="email" placeholder="Enter email" name="email" />
            </Form.Group>
            <Form.Group controlId="formGroupLastName">
              <Form.Control type="text" placeholder="Enter First Name" name="first_name" />
            </Form.Group>
            <Form.Group controlId="formGroupFirstName">
              <Form.Control type="text" placeholder="Enter Last Name" name="last_name" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Control type="password" placeholder="Password" name="password"/>
            </Form.Group>
            <Button className='m-auto' type='submit' variant="primary">
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

