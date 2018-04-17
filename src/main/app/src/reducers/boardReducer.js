const initialState = {
    boards: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_BOARDS_FULFILLED': {
            return { ...state, boards: action.payload }
        }
        case 'ADD_BOARD_FULFILLED': {
            let newBoards = [...state.boards];
            newBoards.push(action.payload);
            return { ...state, boards: newBoards }
        }
        case 'DELETE_BOARD_FULFILLED': {
            let newBoards = [...state.boards];
            newBoards = newBoards.filter(board => board.id !== action.payload);
            return { ...state, boards: newBoards }
        }
        case 'ADD_LOCATION_FULFILLED': {
            let newBoards = [...state.boards];
            const newBoard = newBoards.find(board => board.id === action.payload.boardId)
            if (newBoard.locations === null)
                newBoard.locations = [];
            newBoard.locations.push(action.payload.location)
            return { ...state, boards: newBoards }
        }
        case 'DELETE_LOCATION_FULFILLED': {
            let newBoards = [...state.boards];
            const newBoard = newBoards.find(board => board.id === action.payload.boardId)
            
            newBoard.locations=newBoard.locations.filter(location=>location.id!==action.payload.locationId)
            return { ...state, boards: newBoards }
        }
        default: return state;
    }
}