import React, { Component } from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from './components/NotFound'
import Homepage from './components/Homepage'
import HomeNav from './components/HomeNav'
import Teams from './components/Teams'
import CreateTeam from './components/Teams/Create'
import JoinTeam from './components/Teams/Join'
import Wrapper from './components/Teams/Wrapper'
import Profile from './components/Player/Profile'
import Spinner from './components/shared/Spinner'
import PrivateRoute from './components/routes/PrivateRoute'
import './app.scss';

class App extends Component {

  render() {
    return (
      <>
        <Router>
          <HomeNav/>
          {
            this.props.loading  > 0 &&
            <Spinner/>
          }
          <div className="content-wrapper">
            <Switch>
              <Route exact path="/" component={Homepage} />
              <PrivateRoute exact path="/teams/create" component={CreateTeam} />
              <PrivateRoute exact path="/teams/join" component={JoinTeam} />
              <PrivateRoute exact path="/teams" component={Teams} />
              <PrivateRoute path="/teams/:id" component={Wrapper} />
              <PrivateRoute exact path="/player-profile" component={Profile} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.generalReducer.loading
  }
}

export default connect(mapStateToProps, null)(App)

