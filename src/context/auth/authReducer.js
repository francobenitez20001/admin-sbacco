import { AUTH_ERROR, AUTH_LOADING, AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER, AUTH_OBTENER_USUARIO } from "../../types/index";

const authReducer = (state,action)=>{
    switch (action.type) {
        case AUTH_LOADING:
            return {...state,loading:true,error:false}
        case AUTH_ERROR:
            return {...state,loading:false,error:action.payload}
        case AUTH_LOGIN:
            localStorage.setItem('token',action.payload.token);
            return {...state,loading:false,error:null,autenticado:true}
        case AUTH_REGISTER:
            localStorage.setItem('token',action.payload.token);
            return {...state,loading:false,error:null,autenticado:true}
        case AUTH_OBTENER_USUARIO:
            return {...state,usuario:action.payload,autenticado:true,loading:false}
        case AUTH_LOGOUT:
            localStorage.removeItem('token');
            return {...state,autenticado:false,usuario:null,token:null}
        default:
            return state;
    }
}

export default authReducer;