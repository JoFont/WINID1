import axios from 'axios';
import * as ROUTES from '../../constants/api.routes';


const api = axios.create({
  baseURL: ROUTES.PLAYER
});

export const findOrCreate = async (token, user) => {
  try {
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    const res = await api.post('/findOrCreate', { user });
    return res;
  } catch (error) {
    throw error;
  }
};

export const searchByUsername = async (token, query) => {
  try {
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    const res = await api.post('/searchByUsername', { query });
    return res;
  } catch (error) {
    throw error;
  }
};


export const editOne = async (token, playerId, data) => {
  try {
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    const res = await api.patch(`/${playerId}/edit`, {
        data
      });
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteOne = async (token, id) => {
  try {
    const res = await api.delete(`/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }});

    return res;
  } catch (error) {
    throw error;
  }
};

export const postReview = async (token, playerId, data) => {
  try {
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    const res = await api.post(`/${playerId}/review`, {
      data
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export const editReview = async (token, playerId, reviewId, data) => {
  try {
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    const res = await api.patch(`/${playerId}/review/${reviewId}`, {
      data
    });

    return res;
  } catch (error) {
    throw error;
  }
};
