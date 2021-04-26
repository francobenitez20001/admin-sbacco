import React,{useReducer} from 'react';
import {BarriosContext} from './barriosContext';
import barriosReducer from './barriosReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { BARRIOS_ERROR, BARRIOS_LOADING, BARRIOS_TRAER_TODOS, BARRIOS_TRAER_UNO } from '../../types';

const BarriosState = (props)=>{

    const INITIAL_STATE = {
        data:[],
        barrio:null,
        loading:false,
        error:null
    }

    const [state, dispatch] = useReducer(barriosReducer, INITIAL_STATE);

    const traerTodos = async()=>{
        dispatch({
            type:BARRIOS_LOADING
        })
        try {
            const reqBarrios = await clienteAxios.get('/barrios');
            const {data:{barrios}} = reqBarrios;
            dispatch({
                type:BARRIOS_TRAER_TODOS,
                payload:barrios
            })
        } catch (error) {
            dispatch({
                type:BARRIOS_ERROR,
                payload:error.response.data
            })
        }
    }

    const traerUno = async(id)=>{
        dispatch({
            type:BARRIOS_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            const reqBarrio = await clienteAxios.get(`/barrios/${id}`);
            const {data:{barrio}} = reqBarrio;
            dispatch({
                type:BARRIOS_TRAER_UNO,
                payload:barrio[0]
            })
        } catch (error) {
            dispatch({
                type:BARRIOS_ERROR,
                payload:error.response.data
            })
        }
    }

    return(
        <BarriosContext.Provider
            value={{
                data:state.data,
                loading:state.loading,
                error:state.error,
                barrio:state.barrio,
                traerTodos,
                traerUno
            }}
        >
            {props.children}
        </BarriosContext.Provider>
    )
}

export default BarriosState;