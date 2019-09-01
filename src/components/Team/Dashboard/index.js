import React, { Component } from 'react';
import './styles.scss';

class Dashboard extends Component {

  render() {
    const {
      team
    } = this.props
    return (
      <div>
        <h2 className="font-weight-bold">Dashboard</h2>
      </div>
    )
  }
}

export default (Dashboard)

