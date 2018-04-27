import axios from 'axios'
import { app } from '../helpers/base'
//const server = 'http://localhost:8080'
const server = process.env.REACT_APP_BACKEND_URL;

export function fetchBoards() {
    return function (dispatch) {
        const jwtToken = localStorage.getItem('googleToken');
        const username = localStorage.getItem('username');

        console.log("Mandar Token " + JSON.stringify(username));
        if (jwtToken !== null) {
            axios.get(`${server}/boards/${username}`, { headers: { 'X-Authorization-Firebase': jwtToken } })
                .then(response => {
                    dispatch({ type: "FETCH_BOARDS_FULFILLED", payload: response.data })
                    dispatch({ type: 'SOCKET_CONNECT', payload: username })
                }).catch(err => {
                    dispatch({ type: "FETCH_BOARDS_REJECTED", payload: err })

                })
        } else dispatch({ type: "FETCH_BOARDS_REJECTED" });
    }
}
export function deleteBoard(boardId, username) {
    return function (dispatch) {
        const jwtToken = localStorage.getItem('googleToken');
        const username = localStorage.getItem('username');
        axios.delete(`${server}/boards/${username}/${boardId}`, { headers: { 'X-Authorization-Firebase': jwtToken } })
            .then(response => {
                dispatch({ type: "DELETE_BOARD_FULFILLED", payload: boardId })
            })

            .catch(err => {
                dispatch({ type: "DELETE_BOARD_REJECTED", payload: err });
            })
    }
}
export function addBoard(name, username) {
    return function (dispatch) {
        const jwtToken = localStorage.getItem('googleToken');
        const username = localStorage.getItem('username');
        axios.post(`${server}/boards/${username}`, { name: name }, { headers: { 'X-Authorization-Firebase': jwtToken } })
            .then(response => {
                dispatch({ type: "ADD_BOARD_FULFILLED", payload: response.data })
            })
            .catch(err => {
                dispatch({ type: "ADD_BOARD_REJECTED", payload: err })
            })
    }
}

export function addLocation(city, boardId, username) {
    return function (dispatch) {
        dispatch({ type: "ADD_LOCATION_PENDING", payload: { location: { city: city }, boardId: boardId } })
        const jwtToken = localStorage.getItem('googleToken');
        const username = localStorage.getItem('username');
        axios.post(`${server}/boards/${username}/${boardId}/locations`, { city: city }, { headers: { 'X-Authorization-Firebase': jwtToken } })
            .then(response => {
                dispatch({ type: "ADD_LOCATION_FULFILLED", payload: { location: response.data, boardId: boardId } })
            })
            .catch(err => {
                dispatch({ type: "ADD_LOCATION_REJECTED", payload: { error: err.response, boardId: boardId } })
            })
    }
}
export function deleteLocation(locationId, boardId, username) {
    return function (dispatch) {
        const jwtToken = localStorage.getItem('googleToken');
        const username = localStorage.getItem('username');
        axios.delete(`${server}/boards/${username}/${boardId}/locations/${locationId}`, { headers: { 'X-Authorization-Firebase': jwtToken } })
            .then(response => {
                dispatch({ type: "DELETE_LOCATION_FULFILLED", payload: { locationId: locationId, boardId: boardId } })
            })
            .catch(err => {
                dispatch({ type: "DELETE_LOCATION_REJECTED", payload: err });
            })
    }
}
