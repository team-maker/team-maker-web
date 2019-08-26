import React, { Component } from 'react';
import { connect } from 'react-redux';
import PrivateRoute from '../../routes/PrivateRoute'
import { TeamService } from '../../../services';
import Sidebar from './Sidebar/index.js';
import Player from './Players/index.js';
import PlayerStats from './Players/stats/index.js';
import GameSummary from './Games/summary/index.js';
import Game from './Games/index.js';
import Dashboard from './Dashboard/index.js';
import Invite from './Invites/index.js';
import Rules from './Rules/index.js';
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
      team
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
          <PrivateRoute exact path={`${match.path}/dashboard`} component={Dashboard} team={team} />
          <PrivateRoute exact path={`${match.path}/players`} component={Player} team={team} />
          <PrivateRoute exact path={`${match.path}/players/:id/stats`} component={PlayerStats} team={team} />
          <PrivateRoute exact path={`${match.path}/games`} component={Game} team={team} />
          <PrivateRoute exact path={`${match.path}/games/:id`} component={GameSummary} team={team} />
          <PrivateRoute exact path={`${match.path}/rules`} component={Rules} team={team} />
          <PrivateRoute exact path={`${match.path}/invites`} component={Invite} team={team} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps, null)(Wrapper)
