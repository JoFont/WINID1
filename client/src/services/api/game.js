import axios from "axios";
import * as ROUTES from "../../constants/api.routes";
import { createOne as createOneLocation } from "./location";
import { createGroupChat, updateGroupChatMeta} from "../chat";

const api = axios.create({
  baseURL: ROUTES.GAME
});

export const getById = async (token, id) => {
  try {
    const res = await api.get(`/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAll = async () => {
  try {
    const res = await api.get("/");
    return res;
  } catch (error) {
    throw error;
  }
};

export const createOne = async (firebase, token, player, data) => {
  try {
    const newChatDoc = await createGroupChat(firebase);

    const location = JSON.parse(data.location);
    const gameCoordinates = {
      coordinates: [location.geometry.location.lng, location.geometry.location.lat]
    };
    const newLocation = await createOneLocation(token, { 
      info: {
        name: location.formatted_address,
      },
      location: gameCoordinates
    });

    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    data.location = newLocation.data;
    data.playerId = player._id;
    data.chatRef = newChatDoc.id;
    const newGame = await api.post('/create', { data });
    await updateGroupChatMeta(firebase, {
      docId: newGame.data.chatRef,
      id: newGame.data._id,
      type: "Game"
    });

    return newGame;
  } catch (error) {
    throw error;
  }
};

export const editOne = async (token, id, data) => {
  try {
    api.defaults.headers.common["authorization"] = `Bearer ${token}`;
    const res = await api.patch(`/${id}/edit`, {
      data
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteOne = async (token, id) => {
  try {
    const res = await api.delete(`/`, {
      headers: {
        authorization: `Bearer ${token}`
      },
      params: {
        id
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const createAndUpdateStatus = async (token, id, data) => {
  try {
    api.defaults.headers.common["authorization"] = `Bearer ${token}`;
    const res = await api.post(`/${id}/status`, {
      data
    });

    return res;
  } catch (error) {
    throw error;
  }
};
