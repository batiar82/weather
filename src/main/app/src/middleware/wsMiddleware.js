import SockJS from 'sockjs-client'
import Stomp from '@stomp/stompjs'

let socket = null;
let stompClient = null;
const server = process.env.REACT_APP_BACKEND_URL;
let reconnect = true;
export const wsMiddleware = store => next => action => {


    const subscribe = () => {
        stompClient.subscribe(`/topic/${action.payload}/boards`, (frame) => {
            store.dispatch({ type: 'WS_LOCATION_RECEIVED', payload: JSON.parse(frame.body) });
        })
    }
    const connectAndReconnect = (successCallback) => {
        if (socket !== null) {
            socket.close();
        }
        let token = localStorage.getItem('jwtToken');
        socket = new SockJS(`${server}/weather?authorization=${token}`)
        stompClient = Stomp.over(socket);
        //stompClient.reconnect_delay=5000;
        stompClient.connect({}, () => {
            successCallback();
        }, () => {
            if (reconnect)
                setTimeout(() => {
                    connectAndReconnect(successCallback)
                }, 5000);
        })
    }
    switch (action.type) {

        case 'SOCKET_CONNECT':
            reconnect=true;
            connectAndReconnect(subscribe);
            store.dispatch({ type: 'SOCKET_CONNECTED' });
            break;
        case 'SOCKET_DISCONNECT':
            console.log('socket_disconnect');
            reconnect = false;
            if (socket !== null)
                socket.close()
            break;
        default: return next(action);
    }


}