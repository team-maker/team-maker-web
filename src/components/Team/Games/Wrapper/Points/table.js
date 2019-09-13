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
      teamGroupPlayers
    } = this.props;

    return (
      <table className="table points-table">
        <thead>
          <tr>
            <th scope="col">Player</th>
            <th scope="col">Goals Scored</th>
            <th scope="col">Points</th>
            <th className="text-center" scope="col">Team Ranking</th>
          </tr>
        </thead>
        <tbody>
          {
            teamGroupPlayers.map(teamGroupPlayer => (
              <tr className="tr-hover" key={teamGroupPlayer.id} onClick={() => this.rowClick(teamGroupPlayer.id)}>
                <td>{teamGroupPlayer.team_player.player.first_name + ' ' + teamGroupPlayer.team_player.player.last_name}</td>
                <td>{teamGroupPlayer.goals_scored}</td>
                <td>{teamGroupPlayer.points_amount}</td>
                <td className="text-center">
                  <Badge className={`ranking-badge ranking-badge--${this.getBadgeColor(teamGroupPlayer.team_player)}`} width={30} height={30} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default (Table)

