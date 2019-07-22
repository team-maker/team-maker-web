import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from './components/NotFound'
import Homepage from './components/Homepage'
import HomeNav from './components/HomeNav'

function App() {

  return (
    <>
      <Router>
        <HomeNav/>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
