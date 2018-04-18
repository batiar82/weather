import axios from 'axios'
//const server = 'http://localhost:8080'
const server = ''
export function login(userData) {
    console.log("Data " + JSON.stringify(userData));
    return function (dispatch) {
        localStorage.removeItem('jwtToken');
        dispatch({type: 'LOGOUT_FULFILLED'})
        console.log("voy a post de login");
        axios.post(`${server}/login`,{username:userData.username,password:userData.password}).then((response) => {
            const newData = { username: userData.username, token: response.headers.authorization }
            localStorage.setItem('jwtToken', response.headers.authorization);
            dispatch({ type: 'LOGIN_FULFILLED', payload: newData })
        }).catch(err => {
            dispatch({ type: 'LOGIN_REJECTED', payload: err })
        })
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
        localStorage.removeItem('jwtToken');
        dispatch({type: 'LOGOUT_FULFILLED'});
        dispatch({type: 'SOCKET_DISCONNECT'});
    }
}