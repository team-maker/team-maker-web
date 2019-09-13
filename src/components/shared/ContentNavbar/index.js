import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav }  from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import './styles.scss';

export default class ContentNavbar extends Component {

  render() {
    const {
      title,
      backLink,
      links
    } = this.props;
    return (
      <Navbar className='content-navbar p-0' collapseOnSelect expand="lg">
        <div className="header p-3">
          <h4 className="m-0 font-weight-bold">{title}</h4>
          {
            backLink &&
            <Link className="back-link" to={backLink}>{'< Back'}</Link>
          }
        </div>
        {
          links
          &&
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              {
                links.map((link, index) => (
                    <NavLink key={index} className="nav-link px-5 py-2 font-weight-bold" to={link.url}>
                      {link.title}
                    </NavLink>
                  )
                )
              }
            </Nav>
          </Navbar.Collapse>
        }   
      </Navbar>
    )
  }
}
