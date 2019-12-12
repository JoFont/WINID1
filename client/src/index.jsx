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

setGlobal({
  fire: firebase,
  player: null,
  user: null,
});



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
