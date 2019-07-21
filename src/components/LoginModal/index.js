import React, { Component } from 'react'
import { Modal, Button, Form }  from 'react-bootstrap';
import { UserService } from '../../services';
import logo from '../../assets/images/logo.png';
import './loginModal.scss';


export default class LoginModal extends Component {

  handleLogin(e) {
    e.preventDefault();
    const payload = { 
      user: { 
        username: e.target.email.value,
        password: e.target.password.value 
      }
    };
    UserService.doLogin(payload).then((response) => {
      const user = response.data
      localStorage.setItem('user', JSON.stringify(user));
      // this.props.saveUser(user);
      if (response.headers.authorization) {
        localStorage.setItem('jwt', response.headers.authorization);
        this.props.saveLogIn(localStorage.getItem('jwt'));
      }
      // this.props.history.push(`/`)
    })
    .catch((error) => {
      switch (error.response.status) {
        case 401:
          alert("Password incorreta");
          break;
        case 404:
          alert("Utilizador não encontrado");
          break;
        default: 
          alert("Something went wrong");
      }
    })
  }

  render() {
    const {
      show,
      handleLoginClose
    } = this.props;

    return (
      <Modal className='login-modal' show={show} onHide={() => handleLoginClose()}>
        <Modal.Body>
          <img alt='Team Maker logo' className="logo mb-3" src={logo} />
          <Form onSubmit={(e)=> this.handleLogin(e) }>
            <Form.Group controlId="formGroupEmail">
              <Form.Control type="email" placeholder="Enter email" name="email" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Control type="password" placeholder="Password" name="password"/>
            </Form.Group>
            <Button className='m-auto' type='submit' variant="primary">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

