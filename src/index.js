import React from 'react';
import ReactDOM from 'react-dom';
//import FirebaseApp from './Firebase.js';
import {App} from './App.js';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import firebase from 'firebase/app';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

  // Initialize Firebase
  /*var config = {
    apiKey: "AIzaSyCWZvZjwVRVWruqYsThTkn5u6HRA97pP2U",
    authDomain: "smart-card-340.firebaseapp.com",
    databaseURL: "https://smart-card-340.firebaseio.com",
    projectId: "smart-card-340",
    storageBucket: "smart-card-340.appspot.com",
    messagingSenderId: "265233874128"
  };
  firebase.initializeApp(config);*/

  //ReactDOM.render(<FirebaseApp />, document.getElementById('root'));
  ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
