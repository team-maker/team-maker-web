import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GamesTable from "./table";
import ContentNavbar from "../../shared/ContentNavbar";
import { GameService } from "../../../services";
import { startFetch, endFetch } from "../../../actions/generalActions";
import cogoToast from "cogo-toast";
import "./styles.scss";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }

  componentDidMount() {
    this.getGetGames();
  }

  getGetGames() {
    const { team } = this.props;
    this.props.startFetch();
    GameService.doGetTeamGames(team.id)
      .then(response => {
        this.setState({ games: response.data });
      })
      .catch(error => {
        cogoToast.error("ERROR");
      })
      .finally(() => {
        this.props.endFetch();
      });
  }

  render() {
    const { team } = this.props;
    const { games } = this.state;

    return (
      <>
        <ContentNavbar title={`${team.name} Games`} backLink={`player/teams`} />
        <div className="content games">
          <div className="btn-wrapper">
            <Link
              className="btn btn-ternary mb-3"
              to={`/teams/${team.id}/games/new`}
            >
              + New Game
            </Link>
          </div>
          <GamesTable games={games} team={team} history={this.props.history} />
        </div>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startFetch: () => dispatch(startFetch()),
    endFetch: () => dispatch(endFetch())
  };
}

export default connect(null, mapDispatchToProps)(Game);
