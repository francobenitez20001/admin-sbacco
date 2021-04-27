import React,{useReducer} from 'react';
import {DatoTecnicoContext} from './datoContext';
import datosTecnicosReducer from './datoReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { DATOS_TECNICOS_AGREGAR, DATOS_TECNICOS_ERROR, DATOS_TECNICOS_LOADING, DATOS_TECNICOS_MODIFICAR, DATOS_TECNICOS_TRAER_INFO, DATOS_TECNICOS_MOSTRAR_OCULTAR_FORMULARIO } from '../../types';

const DatoTecnicoState = (props)=>{

    const INITIAL_STATE = {
        data:null,
        loading:false,
        error:null,
        mostrarFormulario:false
    }

    const [state, dispatch] = useReducer(datosTecnicosReducer, INITIAL_STATE);

    const traerInfo = async()=>{
        dispatch({
            type:DATOS_TECNICOS_LOADING
        })
        try {
            const reqDato = await clienteAxios.get('/datos-tecnicos');
            const {data:{datos}} = reqDato;
            dispatch({
                type:DATOS_TECNICOS_TRAER_INFO,
                payload:datos[0]
            })
        } catch (error) {
            dispatch({
                type:DATOS_TECNICOS_ERROR,
                payload:error.response.data
            })
        }
    }

    const modificar = async (data,id)=>{
        dispatch({
            type:DATOS_TECNICOS_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.put(`/datos-tecnicos/${id}`,data);
            dispatch({
                type:DATOS_TECNICOS_MODIFICAR
            })
            return;
        } catch (error) {
            dispatch({
                type:DATOS_TECNICOS_ERROR,
                payload:error.response.data
            })
        }
    }

    const agregar = async data=>{
        dispatch({
            type:DATOS_TECNICOS_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.post('/datos-tecnicos',data);
            dispatch({type:DATOS_TECNICOS_AGREGAR});
            return;
        } catch (error) {
            dispatch({
                type:DATOS_TECNICOS_ERROR,
                payload:error.response.data
            })
        }
    }

    const switchForm = ()=>{
        dispatch({
            type:DATOS_TECNICOS_MOSTRAR_OCULTAR_FORMULARIO
        })
    }


    return(
        <DatoTecnicoContext.Provider
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
        </DatoTecnicoContext.Provider>
    )
}

export default DatoTecnicoState;