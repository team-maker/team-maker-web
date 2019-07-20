import React, { Component } from 'react'
import { Modal, Button }  from 'react-bootstrap';
import './loginModal.scss';


export default class LoginModal extends Component {

  render() {
    const {
      show,
      handleLoginClose
    } = this.props;

    return (
      <Modal show={show} onHide={() => handleLoginClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleLoginClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleLoginClose()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

