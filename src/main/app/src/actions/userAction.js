import axios from 'axios'
import { app, googleProvider } from '../helpers/base';
//const server = 'http://localhost:8080'
const server = process.env.REACT_APP_BACKEND_URL;
export function googleLogin() {
    return function (dispatch) {
        dispatch({ type: 'LOGIN_PENDING' })
        app.auth().signInWithPopup(googleProvider).then((result, error) => {
            if (error) {
                dispatch({ type: 'LOGIN_REJECTED', payload: error })
            } else {
                console.log("Current " + JSON.stringify(app.auth().currentUser));
                app.auth().currentUser.getIdToken().then(data => {
                    //console.log("DATAAAA "+data)
                    localStorage.setItem('googleToken', data);
                    localStorage.setItem('user',app.auth().currentUser);
                    dispatch({ type: 'LOGIN_FULFILLED', payload: app.auth().currentUser });
                })
            }
        })
    }
}
/*
export function login(userData) {
    return function (dispatch) {
        console.log("USERDATA " + JSON.stringify(userData));
        const newData = { username: "mariano", token: "token" }
        localStorage.setItem('jwtToken', "token");

        app.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("Token resul: " + user.getIdTokenResult());
                console.log("ID TOKEN_: " + user.getIdToken());
                user.getIdToken().then(token => { console.log("TOKEN  promise " + token) })
                localStorage.setItem('googleUser', user.getIdToken());
            }
        })
        dispatch({ type: 'LOGIN_FULFILLED', payload: newData })
    }
}

export function signup(userData) {
    return function (dispatch) {
        dispatch({ type: 'SIGNUP_PENDING' });
        axios.post(`${server}/api/auth/signup`, { name: userData.name, username: userData.username, password: userData.password }).then((response) => {
            dispatch({ type: 'SIGNUP_FULFILLED', payload: response.data })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_REJECTED', payload: err.response })
        })
    }
}*/
export function logout() {
    return function (dispatch) {
        console.log("Logginout")

        dispatch({ type: 'LOGOUT_PENDING' })
        app.auth().signOut().then((user) => {
            localStorage.removeItem('googleToken');
            localStorage.removeItem('user');
            console.log("Logout")
            dispatch({ type: 'LOGOUT_FULFILLED' });
        })
    }
}