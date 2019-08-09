import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container }  from 'react-bootstrap';
import './styles.scss';

class Rules extends Component {

  render() {
    const {
      team
    } = this.props
    return (
      <div>
        <h2 className="font-weight-bold">Rules</h2>
      </div>
    )
  }
}

export default (Rules)

