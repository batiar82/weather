const getLoggedState = () => {
    const token = localStorage.getItem('jwtToken');
    if (token)
        return true;
    else return false;
}
const getUsername = () =>{
    const username = localStorage.getItem('username');
    if(username)
    return username
    else
    return '';
}

const initialState = {
    userData: {username: getUsername()},
    loggedIn: getLoggedState(),
    error: null,
    signupSuccess: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_FULFILLED': {
            return { ...state, loggedIn: true, userData: action.payload, signupSuccess: false,error:false }
        }
        case 'SIGNUP_FULFILLED': {
            return { ...state, userData: action.payload, signupSuccess: true }
        }
        case 'LOGOUT_FULFILLED': {
            return { ...state, loggedIn: false, userData: {}, signupSuccess: false }
        }
        case 'LOGIN_REJECTED': {
            return { ...state, initialState, error: "Error Login", signupSuccess: false }
        }
        case 'RESET_ERROR': {
            return { ...state, error: false }
        }
        case 'SIGNUP_REJECTED': {
            return { ...state, error: action.payload, signupSuccess: false }
        }
        case 'LOGOUT_REJECTED': {
            return { ...state, signupSuccess: false }
        }
        case 'SIGNUP_PENDING': {
            return { ...state, error: null, signupSuccess: false }
        }


        default: return state;
    }
}