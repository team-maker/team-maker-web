import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from './components/NotFound'
import Homepage from './components/Homepage'
import HomeNav from './components/HomeNav'
import { Profile, Teams, TeamDashboard } from './components/Player'
import PrivateRoute from './components/routes/PrivateRoute'

function App() {

  return (
    <>
      <Router>
        <HomeNav/>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <PrivateRoute exact path="/teams" component={Teams} />
          <PrivateRoute exact path="/teams/:teamId" component={TeamDashboard} />
          <PrivateRoute exact path="/player-profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
