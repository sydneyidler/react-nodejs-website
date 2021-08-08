import React from "react";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import UserStats from "./pages/UserStats";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/stats">
          <Stats />
        </Route>
        <Route path="/user-stats/:id">
          <UserStats />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
