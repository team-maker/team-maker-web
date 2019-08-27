import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Player from './player';
import { GameService } from '../../../../../services';
import { startFetch, endFetch } from '../../../../../actions/generalActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

const POSITIONS = [
  {
    z: '410px',
    x: '0px'
  },
  {
    z: '300px',
    x: '-100px'
  },
  {
    z: '300px',
    x: '100px'
  },
  {
    z: '50px',
    x: '-150px'
  },
  {
    z: '50px',
    x: '150px'
  },
  {
    z: '100px',
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

export default class TeamLineup extends Component {

  render() {
    const {
      homeTeam,
      awayTeam
    } = this.props;

    return (
      <div className="js-stage stage texture">
        <div className="js-world world">
          <div className="team js-team">
            {
              homeTeam.team_group_players.map((player, index) => (
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
    )
  }
}


