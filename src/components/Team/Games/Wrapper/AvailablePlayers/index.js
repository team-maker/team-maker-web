import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import Table from "./table";
import { GameService } from "../../../../../services";
import { startFetch, endFetch } from "../../../../../actions/generalActions";
import cogoToast from "cogo-toast";
import "./styles.scss";

class AvailablePlayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamAvailablePlayers: []
    };
  }

  componentDidMount() {
    const gameId = this.props.game.id;
    const teamId = this.props.team.id;
    this.doGetGameAvailablePlayers(teamId, gameId);
  }

  doGetGameAvailablePlayers(teamId, gameId) {
    this.props.startFetch();
    GameService.doGetGameAvailablePlayers(teamId, gameId)
      .then(response => {
        this.setState({ teamAvailablePlayers: response.data });
      })
      .catch(error => {
        console.error(error);
        cogoToast.error("ERROR", { position: "bottom-left" });
      })
      .finally(() => {
        this.props.endFetch();
      });
  }

  markPresence = availablePlayer => {
    this.updateTeamPlayerAvailabity(availablePlayer, "going");
  };

  markCantGo = availablePlayer => {
    this.updateTeamPlayerAvailabity(availablePlayer, "not_going");
  };

  markUnknownPresence = availablePlayer => {
    this.updateTeamPlayerAvailabity(availablePlayer, "unknown");
  };

  generateTeams = () => {
    const gameId = this.props.game.id;
    const teamId = this.props.team.id;
    GameService.doGenerateTeams(teamId, gameId)
      .then(response => {
        cogoToast.success("Teams Generated", { position: "bottom-left" });
        this.props.refreshGame(teamId, gameId);
        this.props.history.push(`/teams/${teamId}/games/${gameId}/lineup`);
      })
      .catch(error => {
        console.error(error);
        cogoToast.error("ERROR", { position: "bottom-left" });
      })
      .finally(() => {
        this.props.endFetch();
      });
  };

  updateTeamPlayerAvailabity(availablePlayer, availability) {
    const gameId = this.props.game.id;
    const teamId = this.props.team.id;
    const payload = {
      availability: availability
    };
    GameService.doUpdateAvailablePlayer(
      teamId,
      gameId,
      availablePlayer.id,
      payload
    )
      .then(response => {
        this.doGetGameAvailablePlayers(teamId, gameId);
        this.props.refreshGame(teamId, gameId);
        cogoToast.success("Player Availabilty Changed", {
          position: "bottom-left"
        });
      })
      .catch(error => {
        cogoToast.error("ERROR", { position: "bottom-left" });
      })
      .finally(() => {
        this.props.endFetch();
      });
  }

  render() {
    const { teamAvailablePlayers } = this.state;

    const game = this.props.game;
    return (
      <div className="player-points">
        {game.available_players_count >= 10 ? (
          <Button variant="ternary mb-3" onClick={() => this.generateTeams()}>
            Generate Teams
          </Button>
        ) : (
          <h3 className="font-weight-bold mb-4">
            Gather at least 10 players to generate teams!
          </h3>
        )}
        <Table
          teamAvailablePlayers={teamAvailablePlayers}
          markPresence={this.markPresence}
          markUnknownPresence={this.markUnknownPresence}
          markCantGo={this.markCantGo}
        />
      </div>
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
    endFetch: () => dispatch(endFetch())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailablePlayers);
