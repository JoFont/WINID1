import axios from 'axios';
import * as ROUTES from '../../constants/api.routes';
import { createGroupChat, updateGroupChatMeta, sendChatStatus } from "../chat";


const api = axios.create({
  baseURL: ROUTES.REQUEST
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

export const createOne = async (firebase, token, data) => {
  try {

    const newChatDoc = await createGroupChat(firebase);

    data.chatRef = newChatDoc.id;
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    const res = await api.post('/create', { data });
    await updateGroupChatMeta(firebase, {
      docId: res.data.newRequest.chatRef,
      id: res.data.newRequest._id,
      type: "Request"
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export const joinPlusOnes = async (firebase, token, id, player) => {
  try {
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    const res = await api.post(`/${id}/addPlusOne`, { playerId: player._id });
    await sendChatStatus(firebase, res.data.chatRef, {
      type: "player-join-plusOnes",
      text: `${player.displayName} accepted this request.`
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const acceptPlusOne = async (firebase, token, id, plusOne, admin) => {
  try {
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    const res = await api.post(`/${id}/acceptPlusOne`, { playerId: plusOne._id });
    await sendChatStatus(firebase, res.data.chatRef, {
      type: "player-accept-plusOne",
      text: `${admin.displayName} accepted ${plusOne.displayName} for this game.`,
      render: true
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
    }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const createAndUpdateStatus = async (token, id, data) => {
  try {
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    const res = await api.post(`/${id}/status`, {
      data
    });

    return res;
  } catch (error) {
    throw error;
  }
};