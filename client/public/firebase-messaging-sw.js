
//FIXME: The website breakes on iPhone because this service is not avaliable

//! PLEASE UPDATE VERSIONS AS FIREBASE UPDATES THEIR SERVICES.
importScripts("https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js");


const firebaseConfig = {
  apiKey: "AIzaSyCMxulxTYaRCv8folZDthFk9pmbj_aPWZw",
  authDomain: "winid1.firebaseapp.com",
  databaseURL: "https://winid1.firebaseio.com",
  projectId: "winid1",
  storageBucket: "winid1.appspot.com",
  messagingSenderId: "984064815412",
  appId: "1:984064815412:web:05a71f8a008113a32f3561",
  measurementId: "G-S2T00DWY13"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      const title = payload.data.title;
      const options = {
        body: payload.data.message,
        icon: payload.data.icon
      };
      return self.registration.showNotification(title, options);
    });
  return promiseChain;
});

self.addEventListener('notificationclick', function(event) {
  // do what you want
  // ...
});