import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import TeamLineup from '../TeamLineup';
import { GameService } from '../../../../../services';
import { startFetch, endFetch } from '../../../../../actions/generalActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class GameSummary extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      game: undefined
    }
   }

  componentDidMount() {
    const gameId = this.props.match.params.id;
    const teamId = this.props.team.id;
    this.getGetGame(teamId, gameId);
  }

  getGetGame(teamId, gameId) {
    this.props.startFetch();
    GameService.doGetGame(teamId, gameId)
      .then((response) => {
        this.setState({game: response.data});
      })
      .catch((error) => {
        cogoToast.error('ERROR');
      })
      .finally(() => {
        this.props.endFetch();
      })
  }

  render() {
    const {
      game
    } = this.state;

    const {
      team
    } = this.props;

    if (game === undefined) {
      return <></>
    }
    
    return (
      <div className="game-details">
        <Link to={`/teams/${team.id}/games`}>Back</Link>
        <h2 className="font-weight-bold border-bottom pb-3 mt-3">{`Game at ${game.date}`}</h2>
        <TeamLineup homeTeam={game.home_team} awayTeam={game.away_team}/>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startFetch: () => dispatch(startFetch()),
    endFetch: () => dispatch(endFetch())
  }
}

export default connect(null, mapDispatchToProps)(GameSummary)

