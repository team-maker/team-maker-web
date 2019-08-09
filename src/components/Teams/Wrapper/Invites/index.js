import React, { Component } from 'react';
import { Container }  from 'react-bootstrap';
import './styles.scss';

class Invite extends Component {

  render() {
    const {
      team
    } = this.props
    return (
      <div>
        <h2 className="font-weight-bold">Invites</h2>
      </div>
    )
  }
}

export default (Invite)

