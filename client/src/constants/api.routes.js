import { REACT_DEV_MODE } from "./env.mode";

// Constant Routes

const BASE_URL = REACT_DEV_MODE ? "http://localhost:3000" : "https://winid1.herokuapp.com";

export const PLAYER = BASE_URL + "/api/player";
export const GAME = BASE_URL + "/api/game";
export const SPORT = BASE_URL + "/api/sport";
export const REQUEST = BASE_URL + "/api/request";
export const LOCATION = BASE_URL + "/api/location";
export const TEAM = BASE_URL + "/api/team";