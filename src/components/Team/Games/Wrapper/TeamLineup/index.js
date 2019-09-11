import React, { Component } from 'react';
import { connect } from 'react-redux';
import Player from './player';
import './styles.scss';

const POSITIONS = [
  {
    z: '280px',
    x: '0px'
  },
  {
    z: '160px',
    x: '-100px'
  },
  {
    z: '160px',
    x: '100px'
  },
  {
    z: '0px',
    x: '-150px'
  },
  {
    z: '0px',
    x: '150px'
  },
  {
    z: '50px',
    x: '0px'
  },
  {
    z: '-190px',
    x: '0px'
  },
  {
    z: '110px',
    x: '190px'
  },
]

class TeamLineup extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      selectedTeam: this.props.game.home_team
    }
  }

  selectedTeam = (team) => {
    this.setState({selectedTeam: team})
  }

  render() {
    const {
      game,
    } = this.props;
    const selectedTeam = this.state.selectedTeam;

    const homeTeam = game.home_team
    const awayTeam = game.away_team
    return (
      <div className="lineup">
        <div className="js-switcher switcher">
          <button onClick={() => this.selectedTeam(homeTeam)} className={'js-switch switch-btn ' + (homeTeam === selectedTeam ? 'disabled' : '')}>HOME</button>
          <button onClick={() => this.selectedTeam(awayTeam)} className={'js-switch switch-btn ' + (awayTeam === selectedTeam ? 'disabled' : '')}>AWAY</button>
        </div>
        <div className="js-stage stage texture">
          <div className="js-world world">
            <div className="team js-team">
              {
                selectedTeam.team_group_players.map((player, index) => (
                    <Player key={player.id} teamGroupPlayer={player} positions={POSITIONS[index]}/>
                  )
                )
              }
            </div>
            <div ref="terrain" className="terrain js-terrain">
              <div className="field field--alt"></div>
              <div className="field ground">
                <div className="field__texture field__texture--gradient"></div>
                <div className="field__texture field__texture--gradient-b"></div>
                <div className="field__texture field__texture--grass"></div>
                <div className="field__line field__line--goal"></div>
                <div className="field__line field__line--goal field__line--goal--far"></div>
                <div className="field__line field__line--outline"></div>
                <div className="field__line field__line--penalty"></div>
                <div className="field__line field__line--penalty-arc"></div>
                <div className="field__line field__line--penalty-arc field__line--penalty-arc--far"></div>
                <div className="field__line field__line--mid"></div>
                <div className="field__line field__line--circle"></div>
                <div className="field__line field__line--penalty field__line--penalty--far"></div>
              </div>
              <div className="field__side field__side--front"></div>
              <div className="field__side field__side--left"></div>
              <div className="field__side field__side--right"></div>
              <div className="field__side field__side--back"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.gameReducer.currentGame,
  }
}

export default connect(mapStateToProps, null)(TeamLineup)


