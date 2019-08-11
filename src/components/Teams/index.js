import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Card, Button, Form }  from 'react-bootstrap';
import CustomInput from '../shared/CustomInput';
import { PlayerService } from '../../services';
import { connect } from 'react-redux'
import { saveTeamPlayers } from '../../actions/playerActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class Teams extends Component {

  componentDidMount() {
    this.getGetTeamPlayers();
  }

  getGetTeamPlayers() {
    PlayerService.doGetTeamPlayers().then((response) => {
      this.props.saveTeamPlayers(response.data);
    })
    .catch((error) => {
      cogoToast.error('ERROR');
    })
  }

  JoinTeamSubmit = (event) => {
    event.preventDefault();
    const {
      token,
    } = event.target;
    const error = !token.value

    if (error) {
      cogoToast.error('Please insert Token');
    }
    
    const payload = {
      team_token: token.value
    }
    PlayerService.doJoinTeam(payload).then((response) => {
      const teamId = response.data.id
      this.props.history.push(`/teams/${teamId}/dashboard`);
      cogoToast.success('Team joined');
    })
    .catch((error) => {
      const messages = error.response.data
      cogoToast.error('Request Error: ' + messages);
    })
  }

  renderTeamCards(teamPlayers) {
    return teamPlayers.map((teamPlayer) => {
      const team = teamPlayer.team
      return(
        <Link className="text-decoration-none" to={`/teams/${team.id}/dashboard`}>
          <Card className="team shadow">
            <Card.Body className="text-center">
              <h3 className="font-weight-bold mb-5">{ team.name }</h3>
              <h4 className="font-weight-bold mt-5">Click to visit Team Dashboard</h4>
              <h5 className="font-weight-bold mt-5">{`Nº of Players: ${team.players.length}`}</h5>
              <h5 className="font-weight-bold mt-5">{`Admin: ${team.players[0].first_name}`}</h5>
            </Card.Body>
          </Card>
        </Link>
      )
    })
  }

  render() {
    const {
      teamPlayers
    } = this.props;

    const hasTeams = teamPlayers && teamPlayers.length !== 0;
    return (
      <div className='teams'>
        <Container>
          <Card>
            <Card.Body className="text-center">
              <h3 className="font-weight-bold mb-5">Join Team:</h3>
              <Form className="form mb-4" onSubmit={this.JoinTeamSubmit}>
                <CustomInput
                  name="token"
                  value={''}
                  required={true}
                  label="Token"
                />
                <Button className="primary font-weight-bold" type="submit">
                  Join
                </Button>
              </Form>
              <h4 className="font-weight-bold mb-4">Or</h4>
              <Link className="btn btn-secondary" to={`/teams/create`}>
                Create your own League
              </Link>
            </Card.Body>
           </Card>
           { 
              hasTeams && 
              this.renderTeamCards(teamPlayers)
            }
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    teamPlayers: state.playerReducer.teamPlayers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveTeamPlayers: (teamPlayers) => dispatch(saveTeamPlayers(teamPlayers))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams)
