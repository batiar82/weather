const initialState = {
    userData:{},
    loggedIn:false
}

export default (state=initialState, action)=>{
    switch(action.type){
        case 'LOGIN_FULFILLED':{
            console.log("Fullfiled")
            return {...state,loggedIn:true, userData:action.payload}
        }
        case 'SIGNUP_FULFILLED':{
            return {...state,userData:action.payload}
        }
        case 'LOGOUT_FULFILLED':{
            return {...state,loggedIn:false,userData:{}}
        }
        default: return state;
    }
}