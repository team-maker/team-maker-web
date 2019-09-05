import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './table'
import { TeamGroupPlayerService } from '../../../../../services';
import { startFetch, endFetch } from '../../../../../actions/generalActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class Points extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teamGroupPlayers: []
    }
   }

  componentDidMount() {
    const gameId = this.props.game.id;
    const teamId = this.props.team.id;
    this.doGetTeamGroupPlayers(teamId, gameId);
  }

  doGetTeamGroupPlayers(teamId, gameId) {
    this.props.startFetch();
    TeamGroupPlayerService.doGetTeamGroupPlayers(teamId, gameId)
      .then((response) => {
        this.setState({teamGroupPlayers: response.data});
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
      teamGroupPlayers
    } = this.state;

    return (
      <div class="player-points">
        <Table teamGroupPlayers={teamGroupPlayers}/>
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

export default connect(null, mapDispatchToProps)(Points)

