import React, { Component } from 'react';
import { Modal, Button, Form }  from 'react-bootstrap';
import './styles.scss';

class GoalSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scorerId: props.teamGroupPlayers[0].id
    }
  }

  handleAddGoal = () => {
    const payload = {
      scorer_id: this.state.scorerId
    }
    this.props.doCreateGameGoal(payload);
  }

  handleScorerChange = (e) => {
    this.setState({scorerId: e.target.value})
  }

  render() {
    const {
      show,
      teamGroupPlayers,
      handleGoalSelectorClose
    } = this.props;

    return (
      <Modal className='login-modal' centered show={show} onHide={() => handleGoalSelectorClose()}>
        <Modal.Body className='p-5'>
          <Form onSubmit={() => this.handleAddGoal() }>
            <Form.Group controlId="formGroupEmail">
              <h3 className="font-weight-bold mb-3">Goal Scorer</h3>
                <Form.Control as="select" value={this.state.scorerId} onChange={(e) => this.handleScorerChange(e)}>
                  {
                    teamGroupPlayers.map((teamGroupPlayer, index) => (
                        <option key={index} value={teamGroupPlayer.id}>
                          {`${teamGroupPlayer.team_player.player.first_name} ${teamGroupPlayer.team_player.player.last_name}`}
                        </option>
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

