import React,{ useReducer } from 'react';
import { AUTH_ERROR, AUTH_LOADING, AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER, AUTH_OBTENER_USUARIO } from "../../types/index";
import authReducer from './authReducer';
import {AuthContext} from './authContext';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

const AuthState = props=>{

    const INITIAL_STATE = {
        token:localStorage.getItem('token'),
        autenticado:false,
        usuario:null,
        error:null,
        loading:true
    }

    const [state,dispatch] = useReducer(authReducer,INITIAL_STATE);

    const register = async data=>{
        dispatch({
            type:AUTH_LOADING
        })
        try {
            const respuesta = await clienteAxios.post('/usuarios',data);
            //console.log(respuesta);
            dispatch({
                type:AUTH_REGISTER,
                payload:respuesta.data
            });
        } catch (error) {
            dispatch({
                type:AUTH_ERROR,
                payload:error.response.data
            })
        }
    }

    const obtenerUsuario = async ()=>{
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/auth');
            const {data:{usuario:dataUser}} = respuesta;
            dispatch({
                type:AUTH_OBTENER_USUARIO,
                payload:dataUser
            })
        } catch (error) {
            dispatch({
                type:AUTH_ERROR,
                payload:error.response.data
            })
        }
    }

    const login = async data=>{
        dispatch({
            type:AUTH_LOADING
        })
        try {
            const respuesta = await clienteAxios.post('/auth/login',data);
            console.log(respuesta.data);
            dispatch({
                type:AUTH_LOGIN,
                payload:respuesta.data
            });
        } catch (error) {
            dispatch({
                type:AUTH_ERROR,
                payload:error.response.data
            })
        }
    }

    const logout = async()=>{
        dispatch({type:AUTH_LOGOUT});
    }
    

    return(
        <AuthContext.Provider 
            value={{
                token:state.token,
                autenticado:state.autenticado,
                usuario:state.usuario,
                error:state.error,
                loading:state.loading,
                register,
                login,
                obtenerUsuario,
                logout
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState;