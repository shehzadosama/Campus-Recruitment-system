import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom';
import App from './App';
// import Login from './Login';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';


var config = {
    apiKey: "AIzaSyBhAXnfzgQ43qa_wa_nOYRKQBgEPwOmqKQ",
    authDomain: "https://firstjsassignment.firebaseapp.com/",
    databaseURL: "https://firstjsassignment.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();