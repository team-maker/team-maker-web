import React, { Component } from 'react';
import { getGravatarImage } from '../../../../../utils';
import './styles.scss';

export default class Player extends Component {

  render() {
    const {
      teamGroupPlayer,
      positions
    } = this.props;

    const teamPlayer = teamGroupPlayer.team_player;
    const player = teamPlayer.player;
    const photo = getGravatarImage(player.email)
    return (
      <div className="js-player player" style={{transform: `translateX(${positions.x}) translateZ(${positions.z}) translateY(0px)`}}data-name={player.name} data-side={player.side} data-x={positions.x} data-y={positions.z}>
        <div className="player__card"> </div>
        <div className="player__placeholder"></div>
        <div className="player__label"><span>{`${player.first_name} ${player.last_name}`}</span></div>
        <div className="player__img"><img src={photo} alt="player"/></div>
      </div>
    )
  }
}


