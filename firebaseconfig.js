import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyA1wG3YDcNXa5_dQGqVHU53TfiimWqtqpM",
    authDomain: "amps-app.firebaseapp.com",
    databaseURL: "https://amps-app.firebaseio.com",
    projectId: "amps-app",
    storageBucket: "amps-app.appspot.com",
    messagingSenderId: "739140978292",
    appId: "1:739140978292:web:de32bded9f027cb0a47321"
    };

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();


        
    