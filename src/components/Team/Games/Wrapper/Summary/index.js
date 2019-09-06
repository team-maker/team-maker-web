import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GameService } from '../../../../../services';
import { startFetch, endFetch } from '../../../../../actions/generalActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      goals: []
    }
   }

  componentDidMount() {
    const gameId = this.props.game.id;
    const teamId = this.props.team.id;
    this.getGetGameGoals(teamId, gameId);
  }

  getGetGameGoals(teamId, gameId) {
    this.props.startFetch();
    GameService.doGetGameGoals(teamId, gameId)
      .then((response) => {
        this.setState({goals: response.data});
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
      goals
    } = this.state;

    const {
      game
    } = this.props;
    
    const homeTeam = game.home_team;
    const awayTeam = game.away_team;
    return (
      <>
      <div className="summary p-2 border-bottom">
        <div className="summary__teams">
          <h3 className="font-weight-bold m-0" >Home Team</h3>
        </div>
        <div className="summary__teams summary__teams--score">
          <h2 className="font-weight-bold summary__teams__title">{`${homeTeam.goals} - ${awayTeam.goals}`}</h2>
        </div>
        <div className="summary__teams">
          <h3 className="font-weight-bold m-0" >Away Team</h3>
        </div>
      </div>
      <div className="goals py-4">
        {
          goals.map(goal => (
            <h4 
              key={goal.id}
              className={"py-2 goals__scorer " + (goal.scorer.team_group_id === homeTeam.id ? 'goals__scorer--left' : 'goals__scorer--right')}
              >
                <i className="fa fa-futbol mr-2"></i>
                {`${goal.scorer.team_player.player.first_name} ${goal.scorer.team_player.player.last_name}`}
            </h4>
          ))
        }
      </div>
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

export default connect(null, mapDispatchToProps)(Summary)

