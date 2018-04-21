import axios from 'axios'
import {app} from '../helpers/base';
//const server = 'http://localhost:8080'
const server = process.env.REACT_APP_BACKEND_URL;
export function login(userData) {
    return function(dispatch){
    console.log("USERDATA "+JSON.stringify(userData));
    const newData = { username: "mariano", token: "token" }
            localStorage.setItem('jwtToken', "token");
            dispatch({ type: 'LOGIN_FULFILLED', payload: newData })
    }
    }

export function signup(userData) {
    return function (dispatch) {
        dispatch({type: 'SIGNUP_PENDING'});
        axios.post(`${server}/api/auth/signup`, { name: userData.name, username: userData.username, password: userData.password }).then((response) => {
            dispatch({ type: 'SIGNUP_FULFILLED', payload: response.data })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_REJECTED', payload: err.response })
        })
    }
}
export function logout(){
    return function(dispatch){
        console.log("Logginout")
        localStorage.removeItem('jwtToken');
        dispatch({type: 'LOGOUT_PENDING'})
        app.auth().signOut().then((user)=>{
            console.log("Logout")
            dispatch({type: 'LOGOUT_FULFILLED'});    
        })
    }
}