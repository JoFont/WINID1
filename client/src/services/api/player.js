import axios from 'axios';
import * as ROUTES from './api.routes';

const api = axios.create({
  baseURL: ROUTES.PLAYER
});

export const findOrCreate = async (token, user) => {
  try {
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    const res = await api.post('/findOrCreate', {
        user
      });
    return res;
  } catch (error) {
    throw error;
  }
};
