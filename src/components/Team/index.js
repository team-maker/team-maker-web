import React, { Component } from 'react';
import { Container }  from 'react-bootstrap';
import './styles.scss';

export default class Team extends Component {

  render() {
    return (
      <div className='homepage'>
        <Container className='content mt-5'>
          <h1 className="title mb-3">Team Page</h1>
        </Container>
      </div>
    )
  }
}
