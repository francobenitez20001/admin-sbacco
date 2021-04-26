import React,{useReducer} from 'react';
import {PartidosContext} from './partidosContext';
import partidosReducer from './partidosReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { PARTIDOS_AGREGAR, PARTIDOS_ELIMINAR, PARTIDOS_ERROR, PARTIDOS_LOADING, PARTIDOS_MODIFICAR, PARTIDOS_TRAER_TODOS, PARTIDOS_TRAER_UNO } from '../../types';

const PartidosState = (props)=>{

    const INITIAL_STATE = {
        data:[],
        partido:null,
        loading:false,
        error:null
    }

    const [state, dispatch] = useReducer(partidosReducer, INITIAL_STATE);

    const traerTodos = async()=>{
        dispatch({
            type:PARTIDOS_LOADING
        })
        try {
            const reqpartidos = await clienteAxios.get('/partidos');
            const {data:{partidos}} = reqpartidos;
            dispatch({
                type:PARTIDOS_TRAER_TODOS,
                payload:partidos
            })
        } catch (error) {
            dispatch({
                type:PARTIDOS_ERROR,
                payload:error.response.data
            })
        }
    }

    const traerUno = async(id)=>{
        dispatch({
            type:PARTIDOS_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            const reqpartido = await clienteAxios.get(`/partidos/${id}`);
            const {data:{partido}} = reqpartido;
            dispatch({
                type:PARTIDOS_TRAER_UNO,
                payload:partido[0]
            })
        } catch (error) {
            dispatch({
                type:PARTIDOS_ERROR,
                payload:error.response.data
            })
        }
    }

    const modificar = async (data,id)=>{
        dispatch({
            type:PARTIDOS_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.put(`/partidos/${id}`,data);
            dispatch({
                type:PARTIDOS_MODIFICAR
            })
            return;
        } catch (error) {
            dispatch({
                type:PARTIDOS_ERROR,
                payload:error.response.data
            })
        }
    }

    const agregar = async data=>{
        dispatch({
            type:PARTIDOS_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.post('/partidos',data);
            dispatch({type:PARTIDOS_AGREGAR});
            return;
        } catch (error) {
            dispatch({
                type:PARTIDOS_ERROR,
                payload:error.response.data
            })
        }
    }

    const eliminar = async id=>{
        dispatch({
            type:PARTIDOS_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.delete(`/partidos/${id}`);
            dispatch({type:PARTIDOS_ELIMINAR});
            return;
        } catch (error) {
            dispatch({
                type:PARTIDOS_ERROR,
                payload:error.response.data
            })
        }
    }



    return(
        <PartidosContext.Provider
            value={{
                data:state.data,
                loading:state.loading,
                partido:state.partido,
                error:state.error,
                traerTodos,
                traerUno,
                agregar,
                modificar,
                eliminar
            }}
        >
            {props.children}
        </PartidosContext.Provider>
    )
}

export default PartidosState;