import axios from 'axios';
import * as ROUTES from '../../constants/api.routes';
import { createOne as createOneLocation } from "./location";

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
    const location = JSON.parse(data.location)
    const newLocation = await createOneLocation({"location.coordinates": [location.geometry.lng,location.geometry.lat]});
    // api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    // const res = await api.post('/create', {
    //   data
    // });

    // return res;
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