import axios from "axios";
import * as ROUTES from "./api.routes";



const api = axios.create({
  baseURL: ROUTES.PLAYER,
});


export const createPlayer = async (token, user, method) => {
  try {
    const res = await api.post('/create', {
        headers: {
          authorization: `Bearer ${token}`
        },
        data: {
          user,
          method
        }
      }
    );

    return res;
  } catch (error) {
    throw (error);
  }
}

