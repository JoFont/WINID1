import axios from "axios";
import * as ROUTES from "./api.routes";



const api = axios.create({
  baseURL: ROUTES.PLAYER,
});


export const findOrCreate = async (token, user) => {
  try {
    const res = await api.post('/findOrCreate', {
        headers: {
          authorization: `Bearer ${token}`
        },

        data: {
          user
        }
      }
    );

    return res;
  } catch (error) {
    throw (error);
  }
}

