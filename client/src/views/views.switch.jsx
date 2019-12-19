import React from "react";
import { Switch, Route } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import IndexView from "./IndexView";
import PlayerView from "./PlayerView";
import GameView from "./GameView";
import GamesView from "./GamesView";
import TeamView from "./TeamView";
import LeagueView from "./LeagueView";
import RequestView from "./RequestView";
import LoginView from "./LoginView";
import RegisterView from "./RegisterView";

const MainViews = () => {
  return (
    <Switch>
      <Route path={ROUTES.LOGIN} exact component={LoginView} />
      <Route path={ROUTES.REGISTER} exact component={RegisterView} />
      <Route path={ROUTES.PLAYER} component={PlayerView} />
      <Route path={ROUTES.GAME} component={GameView} />
      <Route path={ROUTES.GAMES} component={GamesView} />
      <Route path={ROUTES.TEAM} component={TeamView} />
      <Route path={ROUTES.LEAGUE} component={LeagueView} />
      <Route path={ROUTES.REQUEST} component={RequestView} />
      <Route path={ROUTES.HOME} exact component={IndexView} />
    </Switch>
  );
};

export default MainViews;
