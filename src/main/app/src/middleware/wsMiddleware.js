import SockJS from 'sockjs-client'
import Stomp from '@stomp/stompjs'

let socket = null;
let stompClient = null;
const server = 'http://localhost:8080';

export const wsMiddleware = store => next => action => {

    switch (action.type) {

        case 'SOCKET_CONNECT':
            console.log("socket connect");
            if(socket!== null){
                socket.close();
            }
            let token=localStorage.getItem('jwtToken');
            socket= new SockJS(`${server}/weather?authorization=${token}`)
            stompClient=Stomp.over(socket);
            stompClient.connect({},()=>{
                stompClient.subscribe(`/topic/${action.payload}/boards`,(frame)=>{
                    store.dispatch({type: 'WS_LOCATION_RECEIVED',payload: JSON.parse(frame.body)});
                })
                store.dispatch({type: 'SOCKET_CONNECTED'})
            })
            break;                                                          
        case 'SOCKET_DISCONNECT':               
            console.log('socket_disconnect');
            if(socket!==null)
                socket.disconnect()
            break;
        default: return next(action);
    }


}