import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container }  from 'react-bootstrap';
import './styles.scss';

class Game extends Component {

  render() {
    const {
      team
    } = this.props
    return (
      <div>
        <h2 className="font-weight-bold">Games</h2>
      </div>
    )
  }
}

export default (Game)

