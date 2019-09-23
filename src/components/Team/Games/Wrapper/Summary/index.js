import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, OverlayTrigger, Tooltip }  from 'react-bootstrap';
import { GameService } from '../../../../../services';
import { startFetch, endFetch } from '../../../../../actions/generalActions';
import { saveCurrentGame } from '../../../../../actions/gameActions';
import GoalSelector from './goalSelector';
import cogoToast from 'cogo-toast';
import './styles.scss';

class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      goals: [],
      showHomeTeamGoalSelector: false,
      showAwayTeamGoalSelector: false
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
        console.log(response.data)
        this.setState({goals: response.data});
      })
      .catch((error) => {
        cogoToast.error('ERROR', { position: 'bottom-left' });
      })
      .finally(() => {
        this.props.endFetch();
      })
  }

  FinishGame = () => {
    const gameId = this.props.game.id;
    const teamId = this.props.team.id;
    GameService.doMarkGameFinished(teamId, gameId)
      .then((response) => {
        this.props.saveCurrentGame(response.data);
        cogoToast.success('Game Finished', { position: 'bottom-left' });
      })
      .catch((error) => {
        cogoToast.error('ERROR', { position: 'bottom-left' });
      })
      .finally(() => {
        this.props.endFetch();
      })
  }

  handleOpenHomeTeamGoal  = () => this.setState({showHomeTeamGoalSelector: true});
  handleCloseHomeTeamGoal  = () => this.setState({showHomeTeamGoalSelector: false});

  handleOpenAwayTeamGoal  = () => this.setState({showAwayTeamGoalSelector: true});
  handleCloseAwayTeamGoal  = () => this.setState({showAwayTeamGoalSelector: false});

  render() {
    const {
      goals,
      showHomeTeamGoalSelector,
      showAwayTeamGoalSelector
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
        <div className="goals py-4 border-bottom">
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
          {
            goals.length === 0 &&
            <h3 className="m-auto font-weight-bold">No Goals Registered</h3>
          }
        </div>
        {
          !game.finished &&
          <div className="actions py-4">
            <div className="actions__wrapper actions__wrapper--home">
              <Button variant="secondary" className="font-weight-bold" onClick={() => this.handleOpenHomeTeamGoal()}>
                + Home Goal
              </Button>
              <GoalSelector 
                teamGroupPlayers={game.home_team.team_group_players}
                show={showHomeTeamGoalSelector}
                game={game}
                handleGoalSelectorClose={this.handleCloseHomeTeamGoal}
              />
            </div>
            <div className="actions__wrapper">
              <OverlayTrigger
                  placement='top'
                  overlay={
                    <Tooltip>
                      This will generate all points based on the goals added above.
                    </Tooltip>
                  }
                >
                <Button variant="primary" className="actions__wrapper__button font-weight-bold" onClick={() => this.FinishGame()}>
                  Finish Game
                </Button>
              </OverlayTrigger>
            </div>
            <div className="actions__wrapper actions__wrapper--away">
              <Button variant="secondary" className="font-weight-bold" onClick={() => this.handleOpenAwayTeamGoal()}>
                + Away Goal
              </Button>
              <GoalSelector 
                teamGroupPlayers={game.away_team.team_group_players}
                show={showAwayTeamGoalSelector}
                game={game}
                handleGoalSelectorClose={this.handleCloseAwayTeamGoal}
              />
            </div>
          </div>
        }
      </>
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
    endFetch: () => dispatch(endFetch()),
    saveCurrentGame: (game) => dispatch(saveCurrentGame(game))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary)

