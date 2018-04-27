import SockJS from 'sockjs-client'
import Stomp from '@stomp/stompjs'

let socket = null;
let stompClient = null;
const server = process.env.REACT_APP_BACKEND_URL;

export const wsMiddleware = store => next => action => {
    const error = () =>{
        console.log("Error connecting")
        store.dispatch({type: 'SOCKET_CONNECTION_ERROR'})
    }
    const close = () =>{
        console.log("Closing socket")
        store.dispatch({type: 'SOCKET_CONNECTION_CLOSE'})
    }

    switch (action.type) {

        case 'SOCKET_CONNECT':
            console.log("socket connect");
            if(socket!== null){
                socket.close();
            }
            let token=localStorage.getItem('googleToken');
            socket= new SockJS(`${server}/weather?X-Authorization-Firebase=${token}`)
            stompClient=Stomp.over(socket);
            stompClient.connect({},()=>{
                stompClient.subscribe(`/topic/${action.payload}/boards`,(frame)=>{
                    store.dispatch({type: 'WS_LOCATION_RECEIVED',payload: JSON.parse(frame.body)});
                })
                store.dispatch({type: 'SOCKET_CONNECTED'})
            },error,close
            )
            break;                                                          
        case 'SOCKET_DISCONNECT':               
            console.log('socket_disconnect');
            if(socket!==null)
                socket.close()
            break;
        default: return next(action);
    }


}