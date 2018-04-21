import Rebase from 're-base'
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyD_Gq7RI73vaA9VjbfiBPKqgP3pb-JxAL0",
    authDomain: "weatherapp-c1bea.firebaseapp.com",
    databaseURL: "https://weatherapp-c1bea.firebaseio.com",
    projectId: "weatherapp-c1bea",
    storageBucket: "weatherapp-c1bea.appspot.com",
    messagingSenderId: "1050544176357"
  };
  const app = firebase.initializeApp(config);
  const base = Rebase.createClass(app.database());
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  export {app, base, googleProvider}