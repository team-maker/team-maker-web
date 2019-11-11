import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameStats from './gameStats';
import EvaluateForm from './evaluateForm';
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
    this.getTeamPlayerStats(teamPlayerId);
  }

  getTeamPlayerStats(teamPlayerId) {
    this.props.startFetch();
    const {
      team
    } = this.props;
    TeamPlayerService.doGetTeamPlayerStats(team.id, teamPlayerId)
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

  submitRating = (payload) =>  {
    const {
      team,
      teamPlayer
    } = this.props;

    this.props.startFetch();
    TeamPlayerService.doEvaluateTeamPlayer(team.id, teamPlayer.id, teamPlayer.evaluation.id, payload)
      .then((response) => {
        cogoToast.success(`Thanks for evaluating ${teamPlayer.player.first_name}`);
        this.getTeamPlayerStats(teamPlayer.id);
      })
      .catch((error) => {
        if (error.response) {
          cogoToast.error(error.response.data);
        }
        else {
          cogoToast.error('Request Error');
        }
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
        <GameStats teamPlayer={teamPlayer} />
        <EvaluateForm teamPlayer={teamPlayer} submitRating={this.submitRating}/>
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

