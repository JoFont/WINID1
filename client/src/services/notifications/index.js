
export const requestNotificationPerm = async (firebase) => {
  try {
    const messaging = firebase.messaging();
  
    const permission = await messaging.requestPermission();
    const token = await messaging.getToken();
    return token;
  } catch(error) {
    throw error;
  }
};