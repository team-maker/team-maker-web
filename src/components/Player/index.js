import React, { Component } from 'react';
import { connect } from 'react-redux';
import PrivateRoute from '../routes/PrivateRoute'
import { Switch } from "react-router-dom";
import Sidebar from '../shared/Sidebar/index.js';
import Teams from './Teams'
import CreateTeam from './Teams/Create'
import JoinTeam from './Teams/Join'
import Profile from './Profile'
import './styles.scss';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: true
    };
  }

  getSidebarLinks() {
    return [
      {
        url: `/player/teams`,
        icon: 'futbol',
        title: 'My Teams'
      },
      {
        url: `/player/teams/create`,
        icon: 'tachometer-alt',
        title: 'Create Team'
      },
      {
        url: `/player/profile`,
        icon: 'users-cog',
        title: 'Profile'
      }
    ]
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = e => {
    const toggled = window.innerWidth >= 992;
    this.setState({toggled: toggled});
  };

  render() {
    const {
      user,
      match
    } = this.props;

    const contentClass = this.state.toggled ? 'toggled' : '';

    if (!user) {
      return <></>
    }
    const links = this.getSidebarLinks();
    return (
      <div className={`player content-wrapper ${contentClass}`}>
        <Sidebar 
          user={user}
          links={links}
        />
        <div className="page-content">
          <Switch>
            <PrivateRoute exact path={`${match.path}/teams/create`} component={CreateTeam} />
            <PrivateRoute exact path={`${match.path}/teams/join`} component={JoinTeam} />
            <PrivateRoute exact path={`${match.path}/teams`} component={Teams} />
            <PrivateRoute exact path={`${match.path}/profile`} component={Profile} />
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

export default connect(mapStateToProps, null)(Player)
