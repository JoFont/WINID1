import axios from "axios";

const URL = "https://fcm.googleapis.com/fcm/send";

module.exports.sendPushToPlayer = async (playerToken, data) => {
  try {
    const response = await axios.post(URL, { data, to: playerToken }, {
      headers: {
        Authorization: process.env.FIREBASE_PUSH_SERVER_KEY
      }
    });
    
    return response;
  } catch (error) {
    next(error);
  }
}