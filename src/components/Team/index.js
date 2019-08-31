import React, { Component } from 'react';
import { connect } from 'react-redux';
import PrivateRoute from '../routes/PrivateRoute'
import { TeamService } from '../../services';
import Sidebar from '../shared/Sidebar/index.js';
import Player from './Players/index.js';
import PlayerStats from './Players/stats/index.js';
import GameWrapper from './Games/Wrapper';
import Game from './Games/index.js';
import Dashboard from './Dashboard/index.js';
import Invite from './Invites/index.js';
import Rules from './Rules/index.js';
import cogoToast from 'cogo-toast';
import './styles.scss';

class Team extends Component {
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
      team
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
      <div className={`content-wrapper toggled`}>
        <Sidebar 
          user={user}
          links={links}
          shortcutLinks={shortcutLinks}
        />
        <div className="page-content">
          <PrivateRoute exact path={`${match.path}/dashboard`} component={Dashboard} team={team} />
          <PrivateRoute exact path={`${match.path}/players`} component={Player} team={team} />
          <PrivateRoute exact path={`${match.path}/players/:id/stats`} component={PlayerStats} team={team} />
          <PrivateRoute exact path={`${match.path}/games`} component={Game} team={team} />
          <PrivateRoute path={`${match.path}/games/:id`} component={GameWrapper} team={team} />
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

export default connect(mapStateToProps, null)(Team)
