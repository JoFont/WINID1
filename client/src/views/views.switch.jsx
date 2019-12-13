import React from 'react';
import { Switch, Route } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import homeView from "./homeView";
import playerView from "./playerView";
import homeView from "./homeView";
import homeView from "./homeView";

const mainViews = () => {
  return (
    <Switch>
      <Route to={ROUTES.HOME} component={homeView}/>
      <Route to=  } component={playerView}/>
      <Route to={ROUTES.GAME} component={}/>
      <Route to={ROUTES.TEAM} component={}/>
      <Route to={ROUTES.LEAGUE} component={}/>
      <Route to={ROUTES.REQUEST} component={}/>
    </Switch>
  )
}

export default mainViews;


