import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { getGravatarImage } from '../../../utils';
import { AuthenticationService } from '../../../services';
import { doLogout } from '../../../actions/userActions'
import { connect } from 'react-redux';
import './styles.scss';

class Sidebar extends Component {

  handleLogout() {
    AuthenticationService.logout();
    this.props.doLogout();
  }


  render() {
    const {
      links,
      user
    } = this.props;

    const shortcutLinks = this.props.shortcutLinks || []
    const photo = getGravatarImage(user.email)
    return (
      <nav id="sidebar" className={`sidebar-wrapper visible`}>
        <div className="sidebar-content">
          <div className="sidebar-header mb-2">
            <div className="user-pic mb-1">
              <img className="img-responsive rounded-circle" src={photo} alt="Current User"/>
            </div>
            <div className="user-info">
              <span className="user-name">{user.first_name}
                <strong>{` ${user.last_name}`}</strong>
              </span>
            </div>
          </div>
          {
            links &&
            <div className="sidebar-menu">
              <ul>
                {
                  links.map((link, index) => (
                    <li key={index} className="mb-2">
                      <NavLink className="link" activeClassName="active" to={link.url}>
                        <i className={`fa fa-${link.icon}`}></i>
                        <span>{link.title}</span>
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </div>
          }
          <div className="sidebar-menu">
            <ul>
              {
                shortcutLinks.map((link, index) => (
                  <li key={index} className="mb-2">
                    <NavLink exact className="link" activeClassName="active" to={link.url}>
                      <i className={`fa fa-${link.icon}`}></i>
                      <span>{link.title}</span>
                    </NavLink>
                  </li>
                )
              )}
              <li className="mb-2">
                <NavLink exact onClick={() => this.handleLogout()} to="/">
                  <i className='fa fa-sign-out-alt'></i>
                  <span>Logout</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    doLogout: () => dispatch(doLogout())
  }
}

export default connect(null, mapDispatchToProps)(Sidebar)

