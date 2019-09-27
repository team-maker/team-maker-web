import React, { Component } from 'react';
import { Container, Card, Button }  from 'react-bootstrap';
import { PlayerService, TeamService } from '../../../../services';
import { connect } from 'react-redux';
import { startFetch, endFetch } from '../../../../actions/generalActions';
import cogoToast from 'cogo-toast';
import queryString from 'query-string'
import './styles.scss';

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
    this.props.startFetch();
    TeamService.doGetTeamByToken(token)
      .then((response) => {
        this.setState({team: response.data })
      })
      .catch((error) => {
        cogoToast.error('ERROR');
      })
      .finally(() => {
        this.props.endFetch();
      })
  }

  JoinTeamSubmit = () => {
    const {
      token,
    } = this.state;
    
    const payload = {
      team_token: token
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

  render() {
    const { team } = this.state;

    if (!team) {
      return <></>
    }
    console.log(team)
    return (
      <div className='content team-join'>
        <Container className="center">
          <Card>
            <Card.Body className="text-center">
              <h3 className="font-weight-bold mb-5">{ team.name }</h3>
              <h5 className="font-weight-bold mt-5">{`Nº of Players: ${team.team_players.length}`}</h5>
              <Button variant="secondary" onClick={() => this.JoinTeamSubmit()}>
                Join
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startFetch: () => dispatch(startFetch()),
    endFetch: () => dispatch(endFetch())
  }
}

export default connect(null, mapDispatchToProps)(Join)
