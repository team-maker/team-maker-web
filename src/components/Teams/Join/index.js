import React, { Component } from 'react';
import { Container, Card, Button }  from 'react-bootstrap';
import CustomInput from '../../shared/CustomInput';
import Rating from 'react-rating';
import { PlayerService, TeamService } from '../../../services';
import { connect } from 'react-redux'
import { savePlayer } from '../../../actions/playerActions'
import cogoToast from 'cogo-toast';
import queryString from 'query-string'
import '../styles.scss';

class Join extends Component {

  constructor(props){
    super(props);
    const values = queryString.parse(this.props.location.search);
    const token = values.token
    this.state = {
      token: token,
      team: undefined 
    }
  }

  componentDidMount() {
    this.getGetTeam();
  }

  getGetTeam() {
    const { token } = this.state; 
    TeamService.doGetTeamByToken(token).then((response) => {
      this.setState({team: response.data })
    })
    .catch((error) => {
      cogoToast.error('ERROR');
    })
  }

  JoinTeamSubmit = () => {
    const {
      token,
    } = this.state;
    
    const payload = {
      team_token: token
    }
    PlayerService.doJoinTeam(payload).then((response) => {
      const teamId = response.data.team.id
      this.props.history.push(`/teams/${teamId}/dashboard`);
      cogoToast.success('Team joined');
    })
    .catch((error) => {
      const messages = error.response.data
      cogoToast.error('Request Error: ' + messages);
    })
  }

  render() {
    const { team } = this.state;

    if (!team) {
      return <></>
    }
    return (
      <div className='teams'>
        <Container className="center">
          <Card>
            <Card.Body className="text-center">
              <h3 className="font-weight-bold mb-5">{ team.name }</h3>
              <h4 className="font-weight-bold mt-5">Click to visit Team Dashboard</h4>
              <h5 className="font-weight-bold mt-5">{`Nº of Players: ${team.players.length}`}</h5>
              <h5 className="font-weight-bold my-5">{`Admin: ${team.players[0].first_name}`}</h5>
              <Button variant="secondary" onClick={() => this.JoinTeamSubmit()}>
                Join { team.name }
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  }
}

export default Join
