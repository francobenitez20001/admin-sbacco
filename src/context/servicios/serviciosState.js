import React,{useReducer} from 'react';
import {ServiciosContext} from './serviciosContext';
import serviciosReducer from './serviciosReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { SERVICIOS_AGREGAR, SERVICIOS_ERROR, SERVICIOS_LOADING, SERVICIOS_MODIFICAR, SERVICIOS_TRAER_INFO, SERVICIOS_MOSTRAR_OCULTAR_FORMULARIO } from '../../types';

const ServiciosState = (props)=>{

    const INITIAL_STATE = {
        data:null,
        loading:false,
        error:null,
        mostrarFormulario:false
    }

    const [state, dispatch] = useReducer(serviciosReducer, INITIAL_STATE);

    const traerInfo = data=>{
        dispatch({
            type:SERVICIOS_LOADING
        })
        try {
            dispatch({
                type:SERVICIOS_TRAER_INFO,
                payload:data
            })
        } catch (error) {
            dispatch({
                type:SERVICIOS_ERROR,
                payload:error.response.data
            })
        }
    }

    const modificar = async (data)=>{
        dispatch({
            type:SERVICIOS_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.put(`/servicios`,data);
            dispatch({
                type:SERVICIOS_MODIFICAR
            })
            return;
        } catch (error) {
            dispatch({
                type:SERVICIOS_ERROR,
                payload:error.response.data
            })
        }
    }

    const agregar = async data=>{
        dispatch({
            type:SERVICIOS_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.post('/servicios',data);
            dispatch({type:SERVICIOS_AGREGAR});
            return;
        } catch (error) {
            dispatch({
                type:SERVICIOS_ERROR,
                payload:error.response.data
            })
        }
    }

    const switchForm = ()=>{
        dispatch({
            type:SERVICIOS_MOSTRAR_OCULTAR_FORMULARIO
        })
    }


    return(
        <ServiciosContext.Provider
            value={{
                data:state.data,
                loading:state.loading,
                error:state.error,
                mostrarFormulario:state.mostrarFormulario,
                traerInfo,
                agregar,
                modificar,
                switchForm
            }}
        >
            {props.children}
        </ServiciosContext.Provider>
    )
}

export default ServiciosState;