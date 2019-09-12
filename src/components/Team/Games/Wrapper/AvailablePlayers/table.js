import React, { Component } from 'react';
import { getPlayerBadgeColor } from '../../../../../utils';
import { OverlayTrigger, Tooltip }  from 'react-bootstrap';
import { ReactComponent as Badge } from '../../../../../assets/images/ranking_badge.svg'
import './styles.scss';

class Table extends Component {

  rowClick = (teamGroupPlayerId) => {
    // this.props.history.push(`/teams/${teamId}/players/${teamPlayerId}/stats`);
  }

  getAvailabilityColor(availability) {
    switch (availability) {
      case 'unknown':
        return (<i className="fas fa-question-circle text-secondary"></i>)
      case 'going':
        return (<i className="fas fa-thumbs-up text-success"></i>)
      case 'not_going':
        return (<i className="fas fa-thumbs-down text-danger"></i>)
      default:
        console.log('Sorry, we are out of ' + availability + '.');
    }
  }

  getBadgeColor(teamPlayer) {
    return getPlayerBadgeColor(teamPlayer.position)
  }

  render() {
    const {
      teamAvailablePlayers,
      markPresence,
      markCantGo,
      markUnknownPresence
    } = this.props;

    return (
      <table className="table availability-table">
        <thead>
          <tr>
            <th scope="col">Player</th>
            <th className="text-center" scope="col">Availability</th>
            <th className="text-center" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            teamAvailablePlayers.map(availablePlayer => (
              <tr key={availablePlayer.id} onClick={() => this.rowClick(availablePlayer.id)}>
                <td>
                  <Badge className={`ranking-badge ranking-badge--${this.getBadgeColor(availablePlayer.team_player)} mr-3`} width={30} height={30} />
                  {availablePlayer.team_player.player.first_name + ' ' + availablePlayer.team_player.player.last_name}
                </td>
                <td className="text-center">{this.getAvailabilityColor(availablePlayer.availability)}</td>
                <td className="text-center">
                  {
                    availablePlayer.availability !== 'going' &&
                    <OverlayTrigger
                        placement='top'
                        overlay={
                          <Tooltip>
                            I'm In
                          </Tooltip>
                        }
                      >
                      <i onClick={() => markPresence(availablePlayer)} className="availability-table--icon fas fa-check fa-lg text-success px-2"></i>
                    </OverlayTrigger>
                  }
                  {
                    availablePlayer.availability !== 'unknown' &&
                    <OverlayTrigger
                        placement='top'
                        overlay={
                          <Tooltip>
                            Didn't know yet
                          </Tooltip>
                        }
                      >
                      <i onClick={() => markUnknownPresence(availablePlayer)} className="availability-table--icon fas fa-question-circle fa-lg text-secondary px-2"></i>
                    </OverlayTrigger>
                  }
                  {
                    availablePlayer.availability !== 'not_going' &&
                    <OverlayTrigger
                        placement='top'
                        overlay={
                          <Tooltip>
                            Can't go
                          </Tooltip>
                        }
                      >
                      <i onClick={() => markCantGo(availablePlayer)} className="availability-table--icon fas fa-times fa-lg text-danger px-2"></i>
                    </OverlayTrigger>
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default (Table)

