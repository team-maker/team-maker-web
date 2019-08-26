import React, { Component } from 'react';
import { connect } from 'react-redux'
import { GameService } from '../../../../services';
import GamesTable from './table';
import { startFetch, endFetch } from '../../../../actions/generalActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class Game extends Component {

  constructor(props){
    super(props);
    this.state = {
      games: [],
    }
  }

  componentDidMount() {
    this.getGetGames();
  }

  getGetGames() {
    const { team } = this.props; 
    this.props.startFetch();
    GameService.doGetTeamGames(team.id)
      .then((response) => {
        this.setState({games: response.data })
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
      team
    } = this.props;
    const {
      games
    } = this.state;
    return (
      <div className="games">
        <h2 className="font-weight-bold mb-4">{`${team.name} Games`}</h2>
        <GamesTable games={games} team={team} history={this.props.history}/>
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

export default connect(null, mapDispatchToProps)(Game)


