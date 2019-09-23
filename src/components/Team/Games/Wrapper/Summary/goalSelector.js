import React, { Component } from 'react';
import { Modal, Button, Form }  from 'react-bootstrap';
import './styles.scss';

class GoalSelector extends Component {

  handleAddGoal = (playerId) => {
    
    
  }

  render() {
    const {
      game,
      show,
      teamGroupPlayers,
      handleGoalSelectorClose
    } = this.props;

    return (
      <Modal className='login-modal' show={show} onHide={() => handleGoalSelectorClose()}>
        <Modal.Body>
          <Form onSubmit={(e) => this.handleAddGoal(e) }>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Example select</Form.Label>
                <Form.Control as="select">
                  {
                    teamGroupPlayers.map((teamGroupPlayer, index) => (
                        <option key={index} >{teamGroupPlayer.first_name}</option>
                      )
                    )
                  }
                </Form.Control>
            </Form.Group>
            <Button className='m-auto' type='submit' variant="primary">
              Add Goal
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default (GoalSelector)

