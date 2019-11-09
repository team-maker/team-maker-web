import React, { Component } from 'react';
import './styles.scss';

class Table extends Component {

  totalPoints(points) {
    return points.reduce(function(total, point){ return total + point.points_amount }, 0);
  }

  render() {
    const {
      points
    } = this.props;

    return (
      <table className="table points-table mt-3">
        <thead>
          <tr>
            <th scope="col">Rule</th>
            <th scope="col">Points</th>
          </tr>
        </thead>
        <tbody>
          {
            points.map(point => (
              <tr key={point.id}>
                <td>{point.description}</td>
                <td>{point.points_amount}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default (Table)

