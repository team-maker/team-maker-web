import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import logo from '../../assets/images/logo.png';

export default class Navbar extends Component {
  
  constructor(props){
    super(props);
  }

  linkActiveStyle() {
    return {
      fontWeight: "bold"
    }
  }


  render() {
    return (
     <nav id="navbar">
       <div className="cont navWide">
         <div className="wideDiv">
          <NavLink 
            exact='/'
            to='/'
            >
            Hey
          </NavLink>
          <NavLink 
            exact='/not-found'
            to='/not-found'
            >
            Not Found
          </NavLink>
         </div>
       </div>
      </nav>
    )
  }
}

