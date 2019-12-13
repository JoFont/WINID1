import axios from 'axios';
import * as ROUTES from './api.routes';

const api = axios.create({
  baseURL: ROUTES.PLAYER
});


export const getById = async (token, id) => {
  try {
    const res = await api.get('/', {
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


export const createOne = async (token, data) => {
  try {
    const res = await api.post('/create', {
        headers: {
          authorization: `Bearer ${token}`
        },
        data: {
          data
        }
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const editOne = async (token, id, data) => {
  try {
    const res = await api.patch(`/${id}/edit`, {
        headers: {
          authorization: `Bearer ${token}`
        },
        data: {
          data
        }
      }
    );
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