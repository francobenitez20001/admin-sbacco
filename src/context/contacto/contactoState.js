import React,{useReducer} from 'react';
import {ContactoContext} from './contactoContext';
import contactoReducer from './contactoReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { CONTACTO_LOADING, CONTACTO_TRAER_INFO, CONTACTO_ERROR, CONTACTO_MODIFICAR } from '../../types';

const ContactoState = (props)=>{

    const INITIAL_STATE = {
        data:[],
        info:null,
        loading:false,
        error:null
    }

    const [state, dispatch] = useReducer(contactoReducer, INITIAL_STATE);

    const traerInfo= async()=>{
        dispatch({
            type:CONTACTO_LOADING
        })
        try {
            const reqNosotros = await clienteAxios.get('/contacto');
            const {data:{data}} = reqNosotros;
            dispatch({
                type:CONTACTO_TRAER_INFO,
                payload:data
            })
        } catch (error) {
            dispatch({
                type:CONTACTO_ERROR,
                payload:error.response.data
            })
        }
    }

    const modificar = async (data,id)=>{
        dispatch({
            type:CONTACTO_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.put(`/contacto/${id}`,data);
            dispatch({
                type:CONTACTO_MODIFICAR
            })
            return;
        } catch (error) {
            dispatch({
                type:CONTACTO_ERROR,
                payload:error.response.data
            })
        }
    }

    return(
        <ContactoContext.Provider
            value={{
                data:state.data,
                info:state.info,
                loading:state.loading,
                error:state.error,
                traerInfo,
                modificar
            }}
        >
            {props.children}
        </ContactoContext.Provider>
    )
}

export default ContactoState;