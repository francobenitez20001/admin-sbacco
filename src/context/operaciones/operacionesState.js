import React,{useReducer} from 'react';
import {OperacionesContext} from './operacionesContext';
import operacionesReducer from './operacionesReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import {OPERACIONES_AGREGAR, OPERACIONES_ELIMINAR, OPERACIONES_ERROR, OPERACIONES_LOADING, OPERACIONES_MODIFICAR, OPERACIONES_TRAER_TODAS, OPERACIONES_TRAER_UNA} from '../../types/index';

const OperacionesState = props=>{
    const INITIAL_STATE = {
        data:[],
        operacion:null,
        loading:false,
        error:null
    }

    const [state, dispatch] = useReducer(operacionesReducer, INITIAL_STATE);

    const traerTodas = async()=>{
        dispatch({
            type:OPERACIONES_LOADING
        })
        try {
            const reqOperaciones = await clienteAxios.get('/operaciones');
            const {data:{operaciones}} = reqOperaciones;
            dispatch({
                type:OPERACIONES_TRAER_TODAS,
                payload:operaciones
            })
        } catch (error) {
            dispatch({
                type:OPERACIONES_ERROR,
                payload:error.response.data
            })
        }
    }

    const traerUna = async(id)=>{
        dispatch({
            type:OPERACIONES_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            const reqOperaciones = await clienteAxios.get(`/operaciones/${id}`);
            const {data:{operacion}} = reqOperaciones;
            dispatch({
                type:OPERACIONES_TRAER_UNA,
                payload:operacion[0]
            })
        } catch (error) {
            dispatch({
                type:OPERACIONES_ERROR,
                payload:error.response.data
            })
        }
    }

    const modificar = async (data,id)=>{
        dispatch({
            type:OPERACIONES_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.put(`/operaciones/${id}`,data);
            dispatch({
                type:OPERACIONES_MODIFICAR
            })
            return;
        } catch (error) {
            dispatch({
                type:OPERACIONES_ERROR,
                payload:error.response.data
            })
        }
    }

    const agregar = async data=>{
        dispatch({
            type:OPERACIONES_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.post('/operaciones',data);
            dispatch({type:OPERACIONES_AGREGAR});
            return;
        } catch (error) {
            dispatch({
                type:OPERACIONES_ERROR,
                payload:error.response.data
            })
        }
    }

    const eliminar = async id=>{
        dispatch({
            type:OPERACIONES_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.delete(`/operaciones/${id}`);
            dispatch({type:OPERACIONES_ELIMINAR});
            return;
        } catch (error) {
            dispatch({
                type:OPERACIONES_ERROR,
                payload:error.response.data
            })
        }
    }


    return(
        <OperacionesContext.Provider 
            value={{
                data:state.data,
                operacion:state.operacion,
                loading:state.loading,
                error:state.error,
                traerTodas,
                traerUna,
                agregar,
                modificar,
                eliminar
            }}>
            {props.children}
        </OperacionesContext.Provider>
    )
}

export default OperacionesState;