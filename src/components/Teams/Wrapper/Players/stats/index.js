import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { TeamPlayerService } from '../../../../../services';
import { startFetch, endFetch } from '../../../../../actions/generalActions'
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
        console.log(response);
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
      <div className="player-stats">
        <Link to={`/teams/${team.id}/players`}>Back</Link>
        <h2 className="font-weight-bold border-bottom pb-3 mt-3">{`${teamPlayer.player.first_name} Stats`}</h2>
        <div class="row mt-4">
          <div class="col-12 text-center">
            <h3 className="font-weight-bold mb-4">Points</h3>
            <h3 className="font-weight-bold border-bottom pb-3">{teamPlayer.points}</h3>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-4">
            <h4 className="font-weight-bold mb-4">Games Played</h4>
            <h4 className="font-weight-bold">{teamPlayer.games_played}</h4>
          </div>
          <div class="col-4">
            <h4 className="font-weight-bold mb-4">Goals Scored</h4>
            <h4 className="font-weight-bold">{teamPlayer.goals}</h4>
          </div>
          <div class="col-4">
            <h4 className="font-weight-bold mb-4">Goals Conceded</h4>
            <h4 className="font-weight-bold">{teamPlayer.goals_conceded}</h4>
          </div>
        </div>
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

export default connect(null, mapDispatchToProps)(PlayerStats)

