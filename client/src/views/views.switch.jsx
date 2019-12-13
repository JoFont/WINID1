import React from 'react';
import { Switch, Route } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import homeView from "./homeView";
import playerView from "./playerView";
import gameView from "./gameView";
import teamView from "./teamView";
import leagueView from "./leagueView";
import requestView from "./requestView";

const MainViews = () => {
  return (
    <Switch>
      <Route to={ROUTES.HOME} component={homeView}/>
      <Route to={ROUTES.PLAYER} component={playerView}/>
      <Route to={ROUTES.GAME} component={gameView}/>
      <Route to={ROUTES.TEAM} component={teamView}/>
      <Route to={ROUTES.LEAGUE} component={leagueView}/>
      <Route to={ROUTES.REQUEST} component={requestView}/>
    </Switch>
  )
}

export default MainViews;


