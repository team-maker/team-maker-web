import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../../routes/PrivateRoute";
import ContentNavbar from "../../../shared/ContentNavbar";
import Summary from "./Summary";
import TeamLineup from "./TeamLineup";
import Points from "./Points";
import PointsAudit from "./Points/Audit";
import AvailablePlayers from "./AvailablePlayers";
import { GameService } from "../../../../services";
import { startFetch, endFetch } from "../../../../actions/generalActions";
import { saveCurrentGame } from "../../../../actions/gameActions";
import cogoToast from "cogo-toast";
import "./styles.scss";

class GameWrapper extends Component {
  componentDidMount() {
    const { game, team, match } = this.props;
    if (!game) {
      const gameId = match.params.game_id;
      const teamId = team.id;
      this.getGame(teamId, gameId);
    }
  }

  componentWillUnmount() {
    this.props.saveCurrentGame(undefined);
  }

  getGame = (teamId, gameId) => {
    this.props.startFetch();
    GameService.doGetGame(teamId, gameId)
      .then(response => {
        this.props.saveCurrentGame(response.data);
      })
      .catch(error => {
        cogoToast.error("ERROR");
      })
      .finally(() => {
        this.props.endFetch();
      });
  };

  getNavLinks(team, game) {
    let links = [];
    const home_team_players = game.home_team.team_group_players.length;
    const away_team_players = game.away_team.team_group_players.length;
    if (home_team_players > 0 && away_team_players > 0) {
      links.push({
        title: "Summary",
        url: `/teams/${team.id}/games/${game.id}/summary`
      });
      links.push({
        title: "Teams",
        url: `/teams/${team.id}/games/${game.id}/lineup`
      });
    }

    if (!game.finished) {
      links.push({
        title: `Available Players (${game.available_players_count})`,
        url: `/teams/${team.id}/games/${game.id}/available-players`
      });
    }

    if (game.finished) {
      links.push({
        title: "Points",
        url: `/teams/${team.id}/games/${game.id}/points`
      });
    }
    return links;
  }

  render() {
    const { team, match, game } = this.props;

    if (!game) {
      return <></>;
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
            <PrivateRoute
              exact
              path={`${match.path}/summary`}
              component={Summary}
              team={team}
            />
            <PrivateRoute
              exact
              path={`${match.path}/available-players`}
              component={AvailablePlayers}
              team={team}
              refreshGame={this.getGame}
            />
            <PrivateRoute
              exact
              path={`${match.path}/lineup`}
              component={TeamLineup}
              team={team}
            />
            <PrivateRoute
              exact
              path={`${match.path}/points`}
              component={Points}
              team={team}
              refreshGame={this.getGame}
            />
            <PrivateRoute
              exact
              path={`${match.path}/points/:id/audit`}
              component={PointsAudit}
              team={team}
            />
          </Switch>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    game: state.gameReducer.currentGame
  };
};

function mapDispatchToProps(dispatch) {
  return {
    startFetch: () => dispatch(startFetch()),
    endFetch: () => dispatch(endFetch()),
    saveCurrentGame: game => dispatch(saveCurrentGame(game))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameWrapper);
