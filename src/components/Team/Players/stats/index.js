import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameStats from './gameStats';
import { TeamPlayerService } from '../../../../services';
import ContentNavbar from '../../../shared/ContentNavbar';
import { startFetch, endFetch } from '../../../../actions/generalActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class PlayerStats extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      teamPlayer: undefined
    }
   }

  componentDidMount() {
    const teamPlayerId = this.props.match.params.id;
    this.getGetTeamPlayerStats(teamPlayerId);
  }

  getGetTeamPlayerStats(teamPlayerId) {
    this.props.startFetch();
    TeamPlayerService.doGetTeamPlayerStats(teamPlayerId)
      .then((response) => {
        this.setState({teamPlayer: response.data});
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
      teamPlayer
    } = this.state;

    const {
      team
    } = this.props;

    if (teamPlayer === undefined) {
      return <></>
    }
    return (
      <>
        <ContentNavbar
          title={`${teamPlayer.player.first_name} Stats`}
          backLink={`/teams/${team.id}/players`}
        />
        <GameStats teamPlayer={teamPlayer}/>
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startFetch: () => dispatch(startFetch()),
    endFetch: () => dispatch(endFetch())
  }
}

export default connect(null, mapDispatchToProps)(PlayerStats)

