import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container }  from 'react-bootstrap';
import { PlayerService } from '../../../../services';
import { connect } from 'react-redux'
import { saveTeamPlayers } from '../../../../actions/playerActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class TeamDashboard extends Component {

  // componentDidMount() {
  //   this.getGetTeam();
  // }

  // getGetTeam(teamId) {
  //   TeamService.doGetTeam(teamId).then((response) => {
  //     this.props.saveTeam(response.data);
  //   })
  //   .catch((error) => {
  //     cogoToast.error('ERROR');
  //   })
  // }

  render() {
    const {
      teams
    } = this.props;

    return (
      <div className='team-dashboard'>
        <Container className='mt-5'>
          <h1>Team Page</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamDashboard)
