import React from "react";
import { Switch, Route } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import HomeView from "./HomeView";
import PlayerView from "./PlayerView";
import GameView from "./GameView";
import TeamView from "./TeamView";
import LeagueView from "./LeagueView";
import RequestView from "./RequestView";

const MainViews = () => {
  return (
    <Switch>
      <Route to={ROUTES.HOME} component={HomeView} />
      <Route to={ROUTES.PLAYER} component={PlayerView} />
      <Route to={ROUTES.GAME} component={GameView} />
      <Route to={ROUTES.TEAM} component={TeamView} />
      <Route to={ROUTES.LEAGUE} component={LeagueView} />
      <Route to={ROUTES.REQUEST} component={RequestView} />
    </Switch>
  );
};

export default MainViews;
