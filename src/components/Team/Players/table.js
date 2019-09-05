import React, { Component } from 'react';
import './styles.scss';

class Table extends Component {

  rowClick = (teamPlayerId) => {
    const teamId = this.props.team.id;
    this.props.history.push(`/teams/${teamId}/players/${teamPlayerId}/stats`);
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
            <th scope="col">Goals Conceded</th>
            <th scope="col">Points</th>
          </tr>
        </thead>
        <tbody>
          {
            teamPlayers.map(teamPlayer => (
              <tr className="tr-hover" key={teamPlayer.id} onClick={() => this.rowClick(teamPlayer.id)}>
                <td>{teamPlayer.player.first_name + ' ' + teamPlayer.player.last_name}</td>
                <td>{teamPlayer.points}</td>
                <td>{teamPlayer.points}</td>
                <td>{teamPlayer.points}</td>
                <th>{teamPlayer.points}</th>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default (Table)

