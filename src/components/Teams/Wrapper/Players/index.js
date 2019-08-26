import React, { Component } from 'react';
import Table from './table'
import './styles.scss';

class Player extends Component {

  render() {
    const {
      team
    } = this.props;
    return (
      <div className="players">
        <h2 className="font-weight-bold mb-4">{`${team.name} Players`}</h2>
        <Table team={team} history={this.props.history}/>
      </div>
    )
  }
}

export default (Player)

