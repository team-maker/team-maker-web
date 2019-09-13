import React, { Component } from 'react';
import './styles.scss';
import { ReactComponent as Badge } from '../../../assets/images/ranking_badge.svg'
import { getPlayerBadgeColor } from '../../../utils';

class Table extends Component {

  rowClick = (teamPlayerId) => {
    const teamId = this.props.team.id;
    this.props.history.push(`/teams/${teamId}/players/${teamPlayerId}/stats`);
  }

  getBadgeColor(teamPlayer) {
    return getPlayerBadgeColor(teamPlayer.position)
  }

  render() {
    const {
      team
    } = this.props;

    const teamPlayers = team.team_players;
    return (
      <table className="table players-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Games Played</th>
            <th scope="col">Goals Scored</th>
            <th scope="col">Points</th>
            <th className="text-center" scope="col">Ranking</th>
          </tr>
        </thead>
        <tbody>
          {
            teamPlayers.map(teamPlayer => (
              <tr className="tr-hover" key={teamPlayer.id} onClick={() => this.rowClick(teamPlayer.id)}>
                <td>{teamPlayer.player.first_name + ' ' + teamPlayer.player.last_name}</td>
                <td>{teamPlayer.games_played}</td>
                <td>{teamPlayer.goals_scored}</td>
                <th>{teamPlayer.points_total}</th>
                <th className="text-center">
                  <Badge className={`ranking-badge ranking-badge--${this.getBadgeColor(teamPlayer)}`} width={30} height={30} />
                </th>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default (Table)

