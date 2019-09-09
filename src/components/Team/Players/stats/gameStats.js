import React, { Component } from 'react';
import './styles.scss';
import { getGravatarImage, getPlayerBadgeColor } from '../../../../utils';
import { ReactComponent as Badge } from '../../../../assets/images/ranking_badge.svg'

class GameStats extends Component {

  render() {
    const {
      teamPlayer
    } = this.props;

    const photo = getGravatarImage(teamPlayer.player.email)
    const badgeColor = getPlayerBadgeColor(teamPlayer.position)
    return (
      <div className="content player-stats">
        <div className="player-stats__profile-wrapper border-bottom">
          <div className="text-center">
            <img className="img-responsive rounded-circle mb-1" src={photo} alt="Current User"/>
            <h3 className="font-weight-bold">{`${teamPlayer.player.first_name} ${teamPlayer.player.last_name}`}</h3>
            <Badge className={`ranking-badge ranking-badge--${badgeColor} mb-4`} width={50} height={50} />
          </div>
        </div>
        <div className="player-stats__points-wrapper border-bottom mt-4">
          <div className="text-center">
            <h3 className="font-weight-bold mb-4">Points</h3>
            <h3 className="font-weight-bold pb-3">{teamPlayer.points_total}</h3>
          </div>
        </div>
        <div className="player-stats__games-wrapper mt-4">
          <div className="player-stats__games-wrapper__stat">
            <h4 className="font-weight-bold mb-4">Games Played</h4>
            <h4 className="font-weight-bold">{teamPlayer.games_played}</h4>
          </div>
          <div className="player-stats__games-wrapper__stat">
            <h4 className="font-weight-bold mb-4">Goals Scored</h4>
            <h4 className="font-weight-bold">{teamPlayer.goals_scored}</h4>
          </div>
          <div className="player-stats__games-wrapper__stat">
            <h4 className="font-weight-bold mb-4">Own Goals</h4>
            <h4 className="font-weight-bold">{teamPlayer.own_goals}</h4>
          </div>
        </div>
      </div>
    )
  }
}

export default GameStats

