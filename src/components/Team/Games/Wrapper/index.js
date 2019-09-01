import React, { Component } from 'react';
import { connect } from 'react-redux';
import PrivateRoute from '../../../routes/PrivateRoute'
import ContentNavbar from '../../../shared/ContentNavbar';
import Summary from './Summary';
import TeamLineup from './TeamLineup';
import Points from './Points';
import { GameService } from '../../../../services';
import { startFetch, endFetch } from '../../../../actions/generalActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class GameWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      game: undefined
    }
   }

  componentDidMount() {
    const gameId = this.props.match.params.id;
    const teamId = this.props.team.id;
    this.getGetGame(teamId, gameId);
  }

  getGetGame(teamId, gameId) {
    this.props.startFetch();
    GameService.doGetGame(teamId, gameId)
      .then((response) => {
        this.setState({game: response.data});
      })
      .catch((error) => {
        cogoToast.error('ERROR');
      })
      .finally(() => {
        this.props.endFetch();
      })
  }

  getNavLinks(team, game) {
    return [
      {
        title: 'Summary',
        url: `/teams/${team.id}/games/${game.id}/summary`
      },
      {
        title: 'Teams',
        url: `/teams/${team.id}/games/${game.id}/lineup`
      },
      {
        title: 'Points',
        url: `/teams/${team.id}/games/${game.id}/points`
      },
      
    ]
  }

  render() {
    const {
      team,
      match
    } = this.props;

    const game = this.state.game;

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
          <PrivateRoute exact path={`${match.path}/summary`} component={Summary} team={team} game={game} />
          <PrivateRoute exact path={`${match.path}/lineup`} component={TeamLineup} team={team} game={game} />
          <PrivateRoute exact path={`${match.path}/points`} component={Points} team={team} game={game} />
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

export default connect(null, mapDispatchToProps)(GameWrapper)
