import axios from 'axios'
const server = 'http://localhost:8080'
export function login(userData) {
    console.log("Data " + JSON.stringify(userData));
    return function (dispatch) {
        axios.post(`${server}/login`,{username:userData.username,password:userData.password}).then((response) => {
            const newData = { username: userData.username, token: response.headers.authorization }
            localStorage.setItem('jwtToken', response.headers.authorization);
            dispatch({ type: 'LOGIN_FULFILLED', payload: newData })
            dispatch({type: 'SOCKET_CONNECT', payload:userData.username})
        }).catch(err => {
            dispatch({ type: 'LOGIN_REJECTED', payload: err })
        })
    }
}

export function signup(userData) {
    return function (dispatch) {
        console.log("userDataSignup "+JSON.stringify(userData))
        axios.post(`${server}/api/auth/signup`, { name: userData.name, username: userData.username, password: userData.password }).then((response) => {
            dispatch({ type: 'SIGNUP_FULFILLED', payload: response.data })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_REJECTED', payload: err })
        })
    }
}
export function logout(){
    return function(dispatch){
        localStorage.removeItem('jwtToken');
        dispatch({type: 'LOGOUT_FULLFILLED'});
        dispatch({type: 'SOCKET_DISCONNECT'});
    }
}