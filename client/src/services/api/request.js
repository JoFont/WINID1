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

export const editOne = async (token, id, data) => {
  try {
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
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