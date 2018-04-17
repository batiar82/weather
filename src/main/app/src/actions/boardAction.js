import axios from 'axios'
const server = 'http://localhost:8080'
const jwtToken = localStorage.getItem('jwtToken');
export function fetchBoards(username) {
    return function (dispatch) {
        console.log("Mandar Token " + jwtToken);
        axios.get(`${server}/boards/${username}`, { headers: { 'Authorization': jwtToken } })
            .then(response => {
                dispatch({ type: "FETCH_BOARDS_FULFILLED", payload: response.data })
            }).catch(err => {
                dispatch({ type: "FETCH_BOARDS_REJECTED", payload: err })

            })
    }
}
export function deleteBoard(boardId, username) {
    return function (dispatch) {
        axios.delete(`${server}/boards/${username}/${boardId}`, { headers: { 'Authorization': jwtToken } })
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
        axios.post(`${server}/boards/${username}`, { name: name }, { headers: { 'Authorization': jwtToken } })
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
        axios.post(`${server}/boards/${username}/${boardId}/locations`, { city: city }, { headers: { 'Authorization': jwtToken } })
            .then(response => {
                dispatch({ type: "ADD_LOCATION_FULFILLED", payload: { location: response.data, boardId: boardId } })
            })
            .catch(err => {
                dispatch({ type: "ADD_LOCATION_REJECTED", payload: err })
            })
    }
}
export function deleteLocation(locationId, boardId, username) {
    return function (dispatch) {
        axios.delete(`${server}/boards/${username}/${boardId}/locations/${locationId}`, { headers: { 'Authorization': jwtToken } })
            .then(response => {
                dispatch({ type: "DELETE_LOCATION_FULFILLED", payload: { locationId: locationId, boardId: boardId } })
            })
            .catch(err => {
                dispatch({ type: "DELETE_LOCATION_REJECTED", payload: err });
            })
    }
}
