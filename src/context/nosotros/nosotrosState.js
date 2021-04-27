import React,{useReducer} from 'react';
import {NosotrosContext} from './nosotrosContext';
import nosotrosReducer from './nosotrosReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { NOSOTROS_ERROR, NOSOTROS_LOADING, NOSOTROS_MODIFICAR, NOSOTROS_TRAER_INFO } from '../../types';

const PartidosState = (props)=>{

    const INITIAL_STATE = {
        data:[],
        info:null,
        loading:false,
        error:null
    }

    const [state, dispatch] = useReducer(nosotrosReducer, INITIAL_STATE);

    const traerTodas= async()=>{
        dispatch({
            type:NOSOTROS_LOADING
        })
        try {
            const reqNosotros = await clienteAxios.get('/nosotros');
            const {data:{data}} = reqNosotros;
            dispatch({
                type:NOSOTROS_TRAER_INFO,
                payload:data
            })
        } catch (error) {
            dispatch({
                type:NOSOTROS_ERROR,
                payload:error.response.data
            })
        }
    }

    const modificar = async (data)=>{
        dispatch({
            type:NOSOTROS_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.put(`/nosotros`,data);
            dispatch({
                type:NOSOTROS_MODIFICAR
            })
            return;
        } catch (error) {
            dispatch({
                type:NOSOTROS_ERROR,
                payload:error.response.data
            })
        }
    }

    return(
        <NosotrosContext.Provider
            value={{
                data:state.data,
                loading:state.loading,
                info:state.info,
                error:state.error,
                traerTodas,
                modificar
            }}
        >
            {props.children}
        </NosotrosContext.Provider>
    )
}

export default PartidosState;