import React, { Component } from 'react';
import './styles.scss';

class GamesTable extends Component {

  rowClick = (gameId) => {
    const teamId = this.props.team.id;
    this.props.history.push(`/teams/${teamId}/games/${gameId}`);
  }

  render() {
    const {
      team,
      games
    } = this.props;

    return (
      <table className="table games-table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Goals Scored</th>
            <th scope="col">Points Generated</th>
            <th scope="col">Star Player</th>
          </tr>
        </thead>
        <tbody>
          {
            games.map(game => (
              <tr className="tr-hover" key={game.id} onClick={() => this.rowClick(game.id)}>
                <th scope="row">{game.date}</th>
                <td>{game.num_goals}</td>
                <td></td>
                <td></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default (GamesTable)

