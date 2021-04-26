import React,{useReducer} from 'react';
import {LocalidadesContext} from './localidadesContext';
import localidadesReducer from './localidadesReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { LOCALIDADES_ERROR, LOCALIDADES_FILTRAR, LOCALIDADES_LOADING, LOCALIDADES_TRAER_TODAS, LOCALIDADES_TRAER_UNO } from '../../types';

const LocalidadesState = (props)=>{

    const INITIAL_STATE = {
        data:[],
        localidad:null,
        filtradas:[],
        loading:false,
        error:null
    }

    const [state, dispatch] = useReducer(localidadesReducer, INITIAL_STATE);

    const traerTodas = async()=>{
        dispatch({
            type:LOCALIDADES_LOADING
        })
        try {
            const reqLocalidades = await clienteAxios.get('/localidades');
            const {data:{localidades}} = reqLocalidades;
            dispatch({
                type:LOCALIDADES_TRAER_TODAS,
                payload:localidades
            })
        } catch (error) {
            dispatch({
                type:LOCALIDADES_ERROR,
                payload:error.response.data
            })
        }
    }

    const traerUno = async(id)=>{
        dispatch({
            type:LOCALIDADES_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            const reqLocalidad = await clienteAxios.get(`/localidades/${id}`);
            const {data:{localidades}} = reqLocalidad;
            dispatch({
                type:LOCALIDADES_TRAER_UNO,
                payload:localidades
            })
        } catch (error) {
            dispatch({
                type:LOCALIDADES_ERROR,
                payload:error.response.data
            })
        }
    }

    const filtrarPorIdPartido = id=>{
        try {
            const filtrados = state.data.filter(localidad=>localidad.idPartido == id);
            dispatch({
                type:LOCALIDADES_FILTRAR,
                payload:filtrados
            })
        } catch (error) {
            dispatch({
                type:LOCALIDADES_ERROR,
                payload:error.message
            })
        }
    }



    return(
        <LocalidadesContext.Provider
            value={{
                data:state.data,
                loading:state.loading,
                localidad:state.localidad,
                error:state.error,
                filtradas:state.filtradas,
                traerTodas,
                traerUno,
                filtrarPorIdPartido
            }}
        >
            {props.children}
        </LocalidadesContext.Provider>
    )
}

export default LocalidadesState;