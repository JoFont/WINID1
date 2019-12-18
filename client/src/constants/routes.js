import * as TRIMMED_ROUTES from "./trimmed.routes";

export const HOME = "/";
export const PLAYER = TRIMMED_ROUTES.PLAYER + "/:username";
export const GAME = TRIMMED_ROUTES.GAME + "/:id";
export const GAMES = TRIMMED_ROUTES.GAMES;
export const TEAM = TRIMMED_ROUTES.TEAM + "/:id";
export const LEAGUE = TRIMMED_ROUTES.LEAGUE + "/:id";
export const REQUEST = TRIMMED_ROUTES.REQUEST + "/:id";
export const LOGIN = TRIMMED_ROUTES.LOGIN;
