import axios from 'axios'
import * as actionTypes from './actionTypes'
const server = process.env.REACT_APP_BACKEND_URL;
export function login(userData) {
    return function (dispatch) {
        localStorage.removeItem('jwtToken');
        dispatch({type: actionTypes.LOGIN_PENDING})
        console.log("voy a post de login");
        axios.post(`${server}/login`,{username:userData.username,password:userData.password}).then((response) => {
            const newData = { username: userData.username, token: response.headers.authorization }
            localStorage.setItem('jwtToken', response.headers.authorization);
            localStorage.setItem('username', userData.username);
            dispatch({ type: actionTypes.LOGIN_FULFILLED, payload: newData })
        }).catch(err => {
            dispatch({ type: actionTypes.LOGIN_REJECTED, payload: err })
        })
    }
}
export function resetError(){
    return function (dispatch){
        dispatch({type:actionTypes.RESET_ERROR})
    }
}
export function signup(userData) {
    return function (dispatch) {
        dispatch({type: actionTypes.SIGNUP_PENDING});
        axios.post(`${server}/api/auth/signup`, { name: userData.name, username: userData.username, password: userData.password }).then((response) => {
            dispatch({ type: actionTypes.SIGNUP_FULFILLED, payload: response.data })
        }).catch(err => {
            dispatch({ type: actionTypes.SIGNUP_REJECTED, payload: err.response })
        })
    }
}
export function logout(){
    return function(dispatch){
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
        dispatch({type: actionTypes.LOGOUT_FULFILLED});
        dispatch({type: actionTypes.SOCKET_DISCONNECT});
    }
}