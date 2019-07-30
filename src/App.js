import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from './components/NotFound'
import Homepage from './components/Homepage'
import HomeNav from './components/HomeNav'
import Team from './components/Team'
import PlayerProfile from './components/PlayerProfile'
import PrivateRoute from './components/routes/PrivateRoute'

function App() {

  return (
    <>
      <Router>
        <HomeNav/>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <PrivateRoute exact path="/teams" component={Team} />
          <PrivateRoute exact path="/player-profile" component={PlayerProfile} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
