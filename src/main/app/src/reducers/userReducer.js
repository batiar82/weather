const initialState = {
    userData:{},
    loggedIn:false,
    error : null,
    signupSuccess: false,
}

export default (state=initialState, action)=>{
    switch(action.type){
        case 'LOGIN_FULFILLED':{
            return {...state,loggedIn: true, userData:action.payload,signupSuccess:false}
        }
        case 'SIGNUP_FULFILLED':{
            return {...state,userData:action.payload, signupSuccess: true}
        }
        case 'LOGOUT_FULFILLED':{
            return {...state,loggedIn: false,userData:{},signupSuccess:false}
        }
        case 'LOGIN_REJECTED':{
            return {...state,initialState,error: "Error Login",signupSuccess:false}
        }
        case 'SIGNUP_REJECTED':{
            return {...state,error:action.payload, signupSuccess:false}
        }
        case 'LOGOUT_REJECTED':{
            return {...state,signupSuccess:false}
        }
        case 'SIGNUP_PENDING':{
            return {...state,error:null,signupSuccess:false}
        }


        default: return state;
    }
}