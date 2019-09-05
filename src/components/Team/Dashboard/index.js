import React, { Component } from 'react';
import GameStats from '../Players/stats/gameStats';
import ContentNavbar from '../../shared/ContentNavbar';
import './styles.scss';

class Dashboard extends Component {

  render() {
    const {
      team,
      teamPlayer
    } = this.props
    return (
      <div>

        <ContentNavbar
          title={`${team.name} Dashboard`}
          backLink={`/player/teams`}
        />
        <GameStats teamPlayer={teamPlayer}/>
      </div>
    )
  }
}

export default (Dashboard)
