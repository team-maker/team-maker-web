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
      team,
      game
    } = this.props;
    
    return (
      <div class="summary">
        <h1>Summary</h1>
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

export default connect(null, mapDispatchToProps)(Summary)

