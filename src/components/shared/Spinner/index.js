import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import './styles.scss';

export default class CustomInput extends Component {
  
  render() {
    return (
      <div className="spinner-wrapper">
        <Loader
          className="spinner"
          type="Oval"
          height={140}
          width={140}
        />
      </div>
    )
  }
}
