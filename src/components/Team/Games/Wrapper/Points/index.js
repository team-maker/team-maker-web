import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "./table";
import { Button } from "react-bootstrap";
import { TeamGroupPlayerService, GameService } from "../../../../../services";
import { startFetch, endFetch } from "../../../../../actions/generalActions";
import cogoToast from "cogo-toast";
import "./styles.scss";

class Points extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamGroupPlayers: []
    };
  }

  componentDidMount() {
    const gameId = this.props.game.id;
    const teamId = this.props.team.id;
    this.doGetTeamGroupPlayers(teamId, gameId);
  }

  doGetTeamGroupPlayers(teamId, gameId) {
    this.props.startFetch();
    TeamGroupPlayerService.doGetTeamGroupPlayers(teamId, gameId)
      .then(response => {
        this.setState({ teamGroupPlayers: response.data });
      })
      .catch(error => {
        console.error(error);
        cogoToast.error("ERROR", { position: "bottom-left" });
      })
      .finally(() => {
        this.props.endFetch();
      });
  }

  recalculatePoints = () => {
    const gameId = this.props.game.id;
    const teamId = this.props.team.id;
    GameService.doRecalculateGamePoints(teamId, gameId)
      .then(response => {
        cogoToast.success("Points Recalculated", { position: "bottom-left" });
        this.doGetTeamGroupPlayers(teamId, gameId);
        this.props.history.push(`/teams/${teamId}/games/${gameId}/points`);
      })
      .catch(error => {
        console.error(error);
        cogoToast.error("ERROR", { position: "bottom-left" });
      })
      .finally(() => {
        this.props.endFetch();
      });
  };

  render() {
    const { teamGroupPlayers } = this.state;

    const { game, team, history } = this.props;

    return (
      <div className="player-points">
        <Button variant="ternary mb-3" onClick={() => this.recalculatePoints()}>
          Recalculate Points
        </Button>
        <Table
          teamGroupPlayers={teamGroupPlayers}
          team={team}
          game={game}
          history={history}
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

export default connect(mapStateToProps, mapDispatchToProps)(Points);
