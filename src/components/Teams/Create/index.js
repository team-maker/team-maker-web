import React, { Component } from 'react';
import { Container, Form, Button }  from 'react-bootstrap';
import CustomInput from '../../shared/CustomInput';
import Rating from 'react-rating';
import { PlayerService, TeamService } from '../../../services';
import { connect } from 'react-redux'
import { savePlayer } from '../../../actions/playerActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class CreateTeam extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      name,
    } = event.target;
    const error = !(name.value)

    if (error) {
      cogoToast.error('Please fill all fields');
    }
    
    const payload = {
      name: name.value,
    }

    TeamService.doCreateTeam(payload).then((response) => {
      const teamId = response.data.team.id
      cogoToast.success('Team created');
      this.props.history.push(`/teams/${teamId}/dashboard`);
    })
    .catch((error) => {
      cogoToast.error('Request Error :(');
    })
  }

  render() {
    
    return (
      <div className='team-create'>
        <Container className='mt-5'>
          <h2 className="text-center mb-5">Create your own Team</h2>
          <Form className="form" onSubmit={this.handleSubmit}>
            <CustomInput
              name="name"
              value={''}
              required={true}
              label="Name"
            />
            <Button variant="secondary" type="submit">
              Create
            </Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default CreateTeam
