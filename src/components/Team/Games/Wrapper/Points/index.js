import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GameService } from '../../../../../services';
import { startFetch, endFetch } from '../../../../../actions/generalActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class Points extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerPoints: []
    }
   }

  componentDidMount() {
    const gameId = this.props.game.id;
    const teamId = this.props.team.id;
    this.doGetGamePoints(teamId, gameId);
  }

  doGetGamePoints(teamId, gameId) {
    this.props.startFetch();
    GameService.doGetGamePoints(teamId, gameId)
      .then((response) => {
        this.setState({playerPoints: response.data});
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
      playerPoints
    } = this.state;

    const {
      team,
      game
    } = this.props;
    
    return (
      <div class="summary">
        <h1>Points</h1>
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

export default connect(null, mapDispatchToProps)(Points)

