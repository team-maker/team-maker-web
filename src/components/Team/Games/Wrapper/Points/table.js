import React, { Component } from 'react';
import './styles.scss';

class Table extends Component {

  rowClick = (teamGroupPlayerId) => {
    // this.props.history.push(`/teams/${teamId}/players/${teamPlayerId}/stats`);
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
            <th scope="col">Points</th>
          </tr>
        </thead>
        <tbody>
          {
            teamGroupPlayers.map(teamGroupPlayer => (
              <tr className="tr-hover" key={teamGroupPlayer.id} onClick={() => this.rowClick(teamGroupPlayer.id)}>
                <td>{teamGroupPlayer.team_player.player.first_name + ' ' + teamGroupPlayer.team_player.player.last_name}</td>
                <td>{teamGroupPlayer.points_amount}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default (Table)

