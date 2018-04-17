import { combineReducers } from 'redux';
import board from "./boardReducer"
import user from "./userReducer"
const rootReducer = combineReducers({
    user, board});
export default rootReducer;