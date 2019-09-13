import React, { Component } from 'react';
import { ReactComponent as Badge } from '../../../assets/images/ranking_badge.svg'
import './styles.scss';

class GamesTable extends Component {

  rowClick = (gameId) => {
    const teamId = this.props.team.id;
    this.props.history.push(`/teams/${teamId}/games/${gameId}/summary`);
  }

  render() {
    const {
      games
    } = this.props;

    return (
      <table className="table games-table mb-0">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Goals Scored</th>
            <th scope="col">Points Generated</th>
            <th scope="col">MVP Players</th>
          </tr>
        </thead>
        <tbody>
          {
            games.map(game => (
              <tr className="tr-hover" key={game.id} onClick={() => this.rowClick(game.id)}>
                <th scope="row">{game.date}</th>
                <td>{game.num_goals}</td>
                <td>
                  { 
                    game.finished ?
                      game.generated_points
                    :
                    'Game not finished yet'
                  }
                </td>
                <td>
                  {
                    game.finished ?
                    game.mvps.map(mvp => (
                      <div key={mvp.id}>
                        <span className="mr-2 ">
                          {`${mvp.team_player.player.first_name} ${mvp.team_player.player.last_name}`}
                        </span>
                        <Badge className="ranking-badge ranking-badge--gold" width={30} height={30} />
                      </div>
                    ))
                    :
                    'Game not finished yet'
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default (GamesTable)

