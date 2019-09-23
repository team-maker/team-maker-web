import React, { Component } from 'react'
import { Container }  from 'react-bootstrap';
import { Link } from "react-router-dom";
import './styles.scss';

export default class PageNotFound extends Component {

  render() {
    return (
      <div className='not-found'>
        <Container className='content mt-5'>
          <h1 className="title mb-3 text-uppercase font-weight-bold">
            The Page you're looking for doesn't exists
          </h1>
          <Link className="btn btn-secondary p-3 mt-3" to={'/'}>
            Back to the Homepage
          </Link>
        </Container>
      </div>
    )
  }
}
