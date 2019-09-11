import React, { Component } from 'react';
import { getPlayerBadgeColor } from '../../../../../utils';
import { ReactComponent as Badge } from '../../../../../assets/images/ranking_badge.svg'
import './styles.scss';

class Table extends Component {

  rowClick = (teamGroupPlayerId) => {
    // this.props.history.push(`/teams/${teamId}/players/${teamPlayerId}/stats`);
  }

  getBadgeColor(teamPlayer) {
    return getPlayerBadgeColor(teamPlayer.position)
  }

  render() {
    const {
      teamAvailablePlayers
    } = this.props;

    return (
      <table className="table points-table">
        <thead>
          <tr>
            <th scope="col">Player</th>
            <th scope="col">Availability</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            teamAvailablePlayers.map(teamPlayers => (
              <tr className="tr-hover" key={teamAvailablePlayers.id} onClick={() => this.rowClick(teamAvailablePlayers.id)}>
                <td>{teamAvailablePlayers.team_player.player.first_name + ' ' + teamAvailablePlayers.team_player.player.last_name}</td>
                <td>{teamAvailablePlayers.availability}</td>
                <td></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default (Table)

