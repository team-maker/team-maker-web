import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from "react-router-dom";
import PrivateRoute from '../routes/PrivateRoute'
import { TeamService } from '../../services';
import { startFetch, endFetch } from '../../actions/generalActions'
import Sidebar from '../shared/Sidebar/index.js';
import Player from './Players/index.js';
import PlayerStats from './Players/stats/index.js';
import GameWrapper from './Games/Wrapper';
import Game from './Games/index.js';
import Dashboard from './Dashboard/index.js';
import Invite from './Invites/index.js';
import Rules from './Rules/index.js';
import GameNew from './Games/new.js'
import cogoToast from 'cogo-toast';
import './styles.scss';

class Team extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      team: undefined,
      teamPlayer: undefined
    }
   }

  componentDidMount() {
    const teamId = this.props.match.params.team_id;
    this.getTeam(teamId);
    this.getCurrentTeamPlayer(teamId);
  }

  getTeam(teamId) {
    this.props.startFetch();
    TeamService.doGetTeam(teamId).then((response) => {
      this.setState({team: response.data});
    })
    .catch((error) => {
      cogoToast.error('ERROR');
    })
    .finally(() => {
      this.props.endFetch();
    })
  }

  getCurrentTeamPlayer(teamId) {
    this.props.startFetch();
    TeamService.doGetCurrentTeamPlayer(teamId).then((response) => {
      this.setState({teamPlayer: response.data});
    })
    .catch((error) => {
      cogoToast.error('ERROR');
    })
    .finally(() => {
      this.props.endFetch();
    })
  }

  getSidebarLinks(team) {
    return [
      {
        url: `/teams/${team.id}/dashboard`,
        icon: 'tachometer-alt',
        title: 'Dashboard'
      },
      {
        url: `/teams/${team.id}/players`,
        icon: 'users',
        title: 'Players'
      },
      {
        url: `/teams/${team.id}/games`,
        icon: 'futbol',
        title: 'Games'
      },
      {
        url: `/teams/${team.id}/rules`,
        icon: 'users-cog',
        title: 'Rules'
      },
      {
        url: `/teams/${team.id}/invites`,
        icon: 'envelope',
        title: 'Invites'
      }
    ]
  }

  getSidebarShortcutLinks() {
    return [
      {
        url: `/player/teams`,
        icon: 'columns',
        title: 'My Teams'
      }
    ]
  }

  render() {
    const {
      team,
      teamPlayer
    } = this.state;

    const {
      user,
      match
    } = this.props;

    if (!team) {
      return <></>
    }

    const links = this.getSidebarLinks(team);
    const shortcutLinks = this.getSidebarShortcutLinks();
    return (
      <div className={`player-team content-wrapper toggled`}>
        <Sidebar 
          user={user}
          links={links}
          shortcutLinks={shortcutLinks}
        />
        <div className="page-content">
          <Switch>
            <PrivateRoute exact path={`${match.path}/dashboard`} component={Dashboard} team={team} teamPlayer={teamPlayer} />
            <PrivateRoute exact path={`${match.path}/players`} component={Player} team={team} teamPlayer={teamPlayer} />
            <PrivateRoute exact path={`${match.path}/players/:id/stats`} component={PlayerStats} team={team} teamPlayer={teamPlayer} />
            <PrivateRoute exact path={`${match.path}/games/new`} component={GameNew} team={team} teamPlayer={teamPlayer} />
            <PrivateRoute exact path={`${match.path}/games`} component={Game} team={team} teamPlayer={teamPlayer} />
            <PrivateRoute path={`${match.path}/games/:game_id`} component={GameWrapper} team={team} teamPlayer={teamPlayer} />
            <PrivateRoute exact path={`${match.path}/rules`} component={Rules} team={team} teamPlayer={teamPlayer} />
            <PrivateRoute exact path={`${match.path}/invites`} component={Invite} team={team} teamPlayer={teamPlayer} />
          </Switch>
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

function mapDispatchToProps(dispatch) {
  return {
    startFetch: () => dispatch(startFetch()),
    endFetch: () => dispatch(endFetch())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Team)
