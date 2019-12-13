import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import 'antd/dist/antd.css';
import './styles/tailwind.css';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_firebase_apiKey,
  authDomain: process.env.REACT_APP_firebase_authDomain,
  databaseURL: process.env.REACT_APP_firebase_databaseURL,
  projectId: process.env.REACT_APP_firebase_projectId,
  storageBucket: process.env.REACT_APP_firebase_storageBucket,
  messagingSenderId: process.env.REACT_APP_firebase_messagingSenderId,
  appId: process.env.REACT_APP_firebase_appId,
  measurementId: process.env.REACT_APP_firebase_measurementId
};

firebase.initializeApp(firebaseConfig);

setGlobal({
  fire: firebase,
  player: null,
  userToken: null,
});


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
