import React, { Component } from 'react';
import './styles.scss';

class Player extends Component {

  render() {
    const {
      team
    } = this.props
    return (
      <div>
        <h2 className="font-weight-bold">Players</h2>
      </div>
    )
  }
}

export default (Player)

