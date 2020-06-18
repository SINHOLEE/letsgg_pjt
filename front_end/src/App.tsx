import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import 'app.scss';

import IntroPage from "pages/intropage/IntroPage";
import MapPage from "pages/mappage/MapPage";


interface Props{
}


export default function App({} : Props) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={IntroPage} />
          <Route exact path="/map" component={MapPage} />
        </Switch>
      </Router>
    </div>
  );
}


