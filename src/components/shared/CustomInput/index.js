import React, { Component } from 'react';
import './styles.scss';

export default class CustomInput extends Component {
  render() {
    const {
      name,
      value,
      type,
      required,
      label
    } = this.props
    return (
      <div className="input-wrapper">      
        <input className="custom-input" defaultValue={value} name={name} type={type} required={required} />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label className="input-label">{label}</label>
      </div>
    )
  }
}
