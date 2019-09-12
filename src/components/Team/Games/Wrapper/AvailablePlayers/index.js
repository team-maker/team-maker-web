import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './table'
import { GameService } from '../../../../../services';
import { startFetch, endFetch } from '../../../../../actions/generalActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class AvailablePlayers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teamAvailablePlayers: []
    }
   }

  componentDidMount() {
    const gameId = this.props.game.id;
    const teamId = this.props.team.id;
    this.doGetGameAvailablePlayers(teamId, gameId);
  }

  doGetGameAvailablePlayers(teamId, gameId) {
    this.props.startFetch();
    GameService.doGetGameAvailablePlayers(teamId, gameId)
      .then((response) => {
        this.setState({teamAvailablePlayers: response.data});
      })
      .catch((error) => {
        cogoToast.error('ERROR', { position: 'bottom-left' });
      })
      .finally(() => {
        this.props.endFetch();
      })
  }

  markPresence = (availablePlayer) => {
    this.updateTeamPlayerAvailabity(availablePlayer, 'going')
  }

  markCantGo = (availablePlayer) => {
    this.updateTeamPlayerAvailabity(availablePlayer, 'not_going')
  }

  markUnknownPresence = (availablePlayer) => {
    this.updateTeamPlayerAvailabity(availablePlayer, 'unknown')
  }

  updateTeamPlayerAvailabity(availablePlayer, availability){
    const gameId = this.props.game.id;
    const teamId = this.props.team.id;
    const payload = {
      availability: availability
    }
    GameService.doUpdateAvailablePlayer(teamId, gameId, availablePlayer.id, payload)
      .then((response) => {
        cogoToast.success('Player Availabilty Changed', { position: 'bottom-left' });
        this.doGetGameAvailablePlayers(teamId, gameId);
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
      teamAvailablePlayers
    } = this.state;

    return (
      <div className="player-points">
        <Table 
          teamAvailablePlayers={teamAvailablePlayers}
          markPresence={this.markPresence}
          markUnknownPresence={this.markUnknownPresence}
          markCantGo={this.markCantGo}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(AvailablePlayers)

