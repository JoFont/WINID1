
// Requests the user permission to recieve notifications
export const requestNotificationPerm = async firebase => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    return token;
  } catch(error) {
    throw error;
  }
};