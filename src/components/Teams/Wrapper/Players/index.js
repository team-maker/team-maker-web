import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container }  from 'react-bootstrap';
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

