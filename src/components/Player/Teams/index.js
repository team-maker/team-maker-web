import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Container, Card, Button, Form }  from 'react-bootstrap';
import CustomInput from '../../shared/CustomInput';
import { PlayerService } from '../../../services';
import { savePlayerTeams } from '../../../actions/playerActions'
import { startFetch, endFetch } from '../../../actions/generalActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class Teams extends Component {

  componentDidMount() {
    this.getGetPlayerTeams();
  }

  getGetPlayerTeams() {
    const playerId = this.props.user.player.id;
    this.props.startFetch();
    PlayerService.doGetPlayerTeams(playerId)
      .then((response) => {
        this.props.savePlayerTeams(response.data);
      }).catch((error) => {
        cogoToast.error('ERROR');
      })
      .finally(() => {
        this.props.endFetch();
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
    this.props.startFetch();
    PlayerService.doJoinTeam(payload)
      .then((response) => {
        const teamId = response.data.team_id
        this.props.history.push(`/teams/${teamId}/dashboard`);
        cogoToast.success('Team joined');
      })
      .catch((error) => {
        const messages = error.response.data
        cogoToast.error('Request Error: ' + messages);
      })
      .finally(() => {
        this.props.endFetch();
      })
  }

  renderTeamCards(teams) {
    return teams.map((team) => {
      return(
        <Link className="text-decoration-none" to={`/teams/${team.id}/dashboard`}>
          <Card className="team shadow">
            <Card.Body className="text-center">
              <h3 className="font-weight-bold mb-5">{ team.name }</h3>
              <h4 className="font-weight-bold mt-5">Click to visit Team Dashboard</h4>
              <h5 className="font-weight-bold mt-5">{`Nº of Players: ${team.team_players.length}`}</h5>
              <h5 className="font-weight-bold mt-5">{`Admin: ${team.team_players[0].player.first_name}`}</h5>
            </Card.Body>
          </Card>
        </Link>
      )
    })
  }

  render() {
    const {
      teams
    } = this.props;

    const hasTeams = teams && teams.length !== 0;
    return (
      <div className='content teams'>
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
              <Link className="btn btn-secondary" to={`/player/teams/create`}>
                Create your own League
              </Link>
            </Card.Body>
           </Card>
           { 
              hasTeams && 
              this.renderTeamCards(teams)
            }
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    teams: state.playerReducer.teams,
    user: state.userReducer.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    savePlayerTeams: (teams) => dispatch(savePlayerTeams(teams)),
    startFetch: () => dispatch(startFetch()),
    endFetch: () => dispatch(endFetch())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams)
