import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from "react-router-dom";
import PrivateRoute from '../../../routes/PrivateRoute'
import ContentNavbar from '../../../shared/ContentNavbar';
import Summary from './Summary';
import TeamLineup from './TeamLineup';
import Points from './Points';
import AvailablePlayers from './AvailablePlayers';
import { GameService } from '../../../../services';
import { startFetch, endFetch } from '../../../../actions/generalActions'
import { saveCurrentGame } from '../../../../actions/gameActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class GameWrapper extends Component {

  componentDidMount() {
    const {
      game,
      team,
      match,
    } = this.props;
    if (!game) {
      const gameId = match.params.game_id;
      const teamId = team.id;
      this.getGetGame(teamId, gameId);
    }
  }

  componentWillUnmount() {
    this.props.saveCurrentGame(undefined);
  }


  getGetGame(teamId, gameId) {
    this.props.startFetch();
    GameService.doGetGame(teamId, gameId)
      .then((response) => {
        console.log("game Fetch", response.data)
        this.props.saveCurrentGame(response.data);
      })
      .catch((error) => {
        cogoToast.error('ERROR');
      })
      .finally(() => {
        this.props.endFetch();
      })
  }

  getNavLinks(team, game) {
    let links = [
      {
        title: 'Summary',
        url: `/teams/${team.id}/games/${game.id}/summary`
      },
      {
        title: 'Teams',
        url: `/teams/${team.id}/games/${game.id}/lineup`
      },
    ]

    if (game.finished) {
      links.push(
        {
          title: 'Points',
          url: `/teams/${team.id}/games/${game.id}/points`
        }
      )
    }
    else {
      links.push(
        {
          title: 'Available Players',
          url: `/teams/${team.id}/games/${game.id}/available-players`
        }
      )
    }
    return links
  }

  render() {
    const {
      team,
      match,
      game
    } = this.props;

    if (!game) {
      return <></>
    }

    const links = this.getNavLinks(team, game);
    return (
      <>
        <ContentNavbar
          title={`Game at ${game.date}`}
          backLink={`/teams/${team.id}/games`}
          links={links}
        />
        <div className="content game-details">
          <Switch>
            <PrivateRoute exact path={`${match.path}/summary`} component={Summary} team={team} />
            <PrivateRoute exact path={`${match.path}/available-players`} component={AvailablePlayers} team={team} />
            <PrivateRoute exact path={`${match.path}/lineup`} component={TeamLineup} team={team} />
            <PrivateRoute exact path={`${match.path}/points`} component={Points} team={team} />
          </Switch>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GameWrapper)
