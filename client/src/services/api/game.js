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
      }});
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
      location: gameCoordinates,
      locationPhotoUrl: `https://api.mapbox.com/styles/v1/jofont/ck48k2a7l0hci1co0xskrj9xl/static/${gameCoordinates[0]},${gameCoordinates[1]},15,0,60/300x300?access_token=pk.eyJ1Ijoiam9mb250IiwiYSI6ImNrNDBiOWtxaTAwNzUzbW44NmpiajZ5cXEifQ.pyznAM2ns-_4WLz-DuZEAg`
    });

    data.location = newLocation.data;
    data.playerId = player._id;
    data.chatRef = newChatDoc.id;

    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    const res = await api.post('/create', { data });
    await updateGroupChatMeta(firebase, {
      docId: res.data.newGame.chatRef,
      id: res.data.newGame._id,
      type: "Game"
    });

    return res;
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
