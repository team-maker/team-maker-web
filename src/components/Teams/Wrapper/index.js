import React, { Component } from 'react';
import PrivateRoute from '../../routes/PrivateRoute'
import { Container }  from 'react-bootstrap';
import { TeamService } from '../../../services';
import Sidebar from './Sidebar/index.js';
import Player from './Players/index.js';
import Game from './Games/index.js';
import Dashboard from './Dashboard/index.js';
import Invite from './Invites/index.js';
import Rules from './Rules/index.js';
import { connect } from 'react-redux'
import { saveTeamPlayers } from '../../../actions/playerActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class Wrapper extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      team: undefined
    }
   }

  componentDidMount() {
    const teamId = this.props.match.params.id;
    this.getGetTeam(teamId);
  }

  getGetTeam(teamId) {
    TeamService.doGetTeam(teamId).then((response) => {
      this.setState({team: response.data});
    })
    .catch((error) => {
      cogoToast.error('ERROR');
    })
  }

  render() {
    const {
      team,
      sidebarExpanded
    } = this.state;

    const {
      user,
      match
    } = this.props;

    if (!team) {
      return <></>
    }
    return (
      <div className={`team-dashboard toggled`}>
        <Sidebar 
          user={user}
          team={team}
        />
        <div className="page-content">
          <PrivateRoute path={`${match.path}/dashboard`} component={Dashboard} />
          <PrivateRoute path={`${match.path}/players`} component={Player} />
          <PrivateRoute path={`${match.path}/games`} component={Game} />
          <PrivateRoute path={`${match.path}/rules`} component={Rules} />
          <PrivateRoute path={`${match.path}/invites`} component={Invite} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    teamPlayers: state.playerReducer.teamPlayers,
    user: state.userReducer.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveTeamPlayers: (teamPlayers) => dispatch(saveTeamPlayers(teamPlayers))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)
