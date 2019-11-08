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
      points: []
    }
   }

  componentDidMount() {
    const gameId = this.props.game.id;
    const teamId = this.props.team.id;
    const groupPlayerId = this.props.match.params.id;
    this.doGetTeamGroupPlayers(teamId, gameId, groupPlayerId);
  }

  doGetTeamGroupPlayers(teamId, gameId, groupPlayerId) {
    this.props.startFetch();
    TeamGroupPlayerService.doGetTeamGroupPlayerPoints(teamId, gameId, groupPlayerId)
      .then((response) => {
        this.setState({points: response.data});
      })
      .catch((error) => {
        cogoToast.error('ERROR', { position: 'bottom-left' });
      })
      .finally(() => {
        this.props.endFetch();
      })
  }

  render() {
    const {
      points
    } = this.state;

    const gameId = this.props.game.id;
    const teamId = this.props.team.id;
    return (
      <div className="player-points">
        <Link className="back-link mb-4" to={`/teams/${teamId}/games/${gameId}/points`}>{'< Points'}</Link>
        <Table points={points}/>
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

