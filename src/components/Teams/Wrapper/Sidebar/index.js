import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import './styles.scss';

class Sidebar extends Component {

  render() {
    const {
      team
    } = this.props
    return (
      <nav id="sidebar " className="sidebar-wrapper visible">
        <div className="sidebar-content">
          <div className="sidebar-menu">
            <ul>
              <li className="">
                <NavLink className="link" activeClassName="active" to={`/teams/${team.id}/dashboard`}>
                  <i className="fa fa-tachometer-alt"></i>
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li className="mt-4">
                <NavLink className="link" activeClassName="active" to={`/teams/${team.id}/players`}>
                  <i className="fa fa-users"></i>
                  <span>Players</span>
                </NavLink>
              </li>
              <li className="mt-4">
                <NavLink className="link" activeClassName="active" to={`/teams/${team.id}/games`}>
                  <i className="fas fa-futbol"></i>
                  <span>Games</span>
                </NavLink>
              </li>
              <li className="mt-4">
                <NavLink className="link" activeClassName="active" to={`/teams/${team.id}/rules`}>
                  <i className="fas fa-users-cog"></i>
                  <span>Rules</span>
                </NavLink>
              </li>
              <li className="mt-4">
                <NavLink className="link" activeClassName="active" to={`/teams/${team.id}/invites`}>
                  <i className="fas fa-envelope"></i>
                  <span>Invite</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default (Sidebar)

