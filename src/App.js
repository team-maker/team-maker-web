import React, { Component } from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from './components/NotFound'
import Homepage from './components/Homepage'
import PrivacyPolicy from './components/PrivacyPolicy'
import Team from './components/Team'
import Player from './components/Player'
import Spinner from './components/shared/Spinner'
import PrivateRoute from './components/routes/PrivateRoute'
import './app.scss';

class App extends Component {

  render() {
    return (
      <>
        <Router>
          {
            this.props.loading  > 0 &&
            <Spinner/>
          }
          <div className="content-wrapper">
            <Switch>
              <PrivateRoute path="/player" component={Player} />
              <PrivateRoute path="/teams/:team_id" component={Team} />
              <Route exact path="/privacy-policy" component={PrivacyPolicy} />
              <Route exact path="/" component={Homepage} />
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

