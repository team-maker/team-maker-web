import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from './table'
import { TeamGroupPlayerService } from '../../../../../../services';
import { startFetch, endFetch } from '../../../../../../actions/generalActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class PointsAudit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teamGroupPlayer: undefined
    }
   }

  componentDidMount() {
    const gameId = this.props.game.id;
    const teamId = this.props.team.id;
    const groupPlayerId = this.props.match.params.id;
    this.doGetTeamGroupPlayerWithPoints(teamId, gameId, groupPlayerId);
  }

  doGetTeamGroupPlayerWithPoints(teamId, gameId, groupPlayerId) {
    this.props.startFetch();
    TeamGroupPlayerService.doGetTeamGroupPlayerPoints(teamId, gameId, groupPlayerId)
      .then((response) => {
        this.setState({teamGroupPlayer: response.data});
      })
      .catch((error) => {
        cogoToast.error('ERROR', { position: 'bottom-left' });
      })
      .finally(() => {
        this.props.endFetch();
      })
  }

  header(teamGroupPlayer) {
    const player = teamGroupPlayer.team_player.player;
    return `${player.first_name} ${player.last_name} - ${teamGroupPlayer.points_amount} Points`
  }

  render() {
    const {
      teamGroupPlayer
    } = this.state;

    const gameId = this.props.game.id;
    const teamId = this.props.team.id;

    if (!teamGroupPlayer) {
      return <></>
    }
    return (
      <div className="player-points">
        <div className="header">
        <h4 className="m-0 font-weight-bold">{this.header(teamGroupPlayer)}</h4>
          <Link className="back-link mb-4" to={`/teams/${teamId}/games/${gameId}/points`}>{'< Points Table'}</Link>
        </div>
        <Table points={teamGroupPlayer.points}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.gameReducer.currentGame,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startFetch: () => dispatch(startFetch()),
    endFetch: () => dispatch(endFetch())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PointsAudit)

