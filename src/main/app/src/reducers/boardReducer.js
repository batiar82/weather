import * as actionTypes from '../actions/actionTypes'
const initialState = {
    boards: [],
    errors: null,
    fetchingCity: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BOARDS_FULFILLED: {
            return { ...state, boards: action.payload }
        }
        case actionTypes.ADD_BOARD_FULFILLED: {

            let newBoards = [...state.boards];
            newBoards.push(action.payload);
            return { ...state, boards: newBoards, errors: null }
        }
        case actionTypes.DELETE_BOARD_FULFILLED: {
            let newBoards = [...state.boards];
            newBoards = newBoards.filter(board => board.id !== action.payload);
            return { ...state, boards: newBoards }
        }
        case actionTypes.ADD_LOCATION_PENDING:{
            let newBoards = [...state.boards];
            const newBoard = newBoards.find(board => board.id === action.payload.boardId)
            newBoard.error=null;
            newBoard.fetchingCity=true
            if (newBoard.locations === null)
                newBoard.locations = [];
            action.payload.location.loading=true;
            action.payload.location.id="Temp";
            newBoard.locations.push(action.payload.location)
            return { ...state, boards: newBoards }
            }
        case actionTypes.ADD_LOCATION_FULFILLED: {
            let newBoards = [...state.boards];
            const newBoard = newBoards.find(board => board.id === action.payload.boardId)
            if (newBoard.locations === null)
                newBoard.locations = [];
                newBoard.fetchingCity=false;
                newBoard.error=false;
                newBoard.resetForm=true;
            newBoard.locations[newBoard.locations.length-1]=action.payload.location;
            return { ...state, boards: newBoards}
        }
        case actionTypes.ADD_LOCATION_REJECTED: {
            let newBoards = [...state.boards];
            const boardIndex = newBoards.findIndex(board => board.id === action.payload.boardId)
            let newBoard=newBoards[boardIndex];
            let locations=[...newBoard.locations]
            locations.pop();
            newBoard.locations=locations;
            newBoard.error=action.payload.error;
            newBoard.fetchingCity=false;
            newBoards[boardIndex]=newBoard;
            return { ...state, boards: newBoards}
        }
        case actionTypes.DELETE_LOCATION_FULFILLED: {
            let newBoards = [...state.boards];
            const newBoard = newBoards.find(board => board.id === action.payload.boardId)
            
            newBoard.locations=newBoard.locations.filter(location=>location.id!==action.payload.locationId)
            return { ...state, boards: newBoards }
        }
        case actionTypes.WS_LOCATION_RECEIVED:{
            let newBoards = [...state.boards];
            newBoards.some(board =>{
                const index=board.locations.findIndex(location => location.id === action.payload.id)
                if(index!==-1){
                    board.locations[index]=action.payload
                    return true;
                } return false;
            })
            return {...state,boards: newBoards}
        }
        case actionTypes.RESETED_FORM_FULFILLED: {
            let newBoards = [...state.boards];
            const boardIndex = newBoards.findIndex(board => board.id === action.payload)
            let newBoard={...newBoards[boardIndex]}
            console.log(JSON.stringify(newBoard));
            newBoard.resetForm=false;
            newBoards[boardIndex]=newBoard;
            console.log(JSON.stringify(newBoard));
             return {...state,boards:newBoards}
        }
        default: return state;
    }
}