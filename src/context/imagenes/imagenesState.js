import React,{useReducer} from 'react';
import {ImagenesContext} from './imagenesContext';
import imagenesReducer from './imagenesReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { IMAGENES_MOSTRAR_OCULTAR_FORMULARIO } from '../../types';

const ImagenesState = (props)=>{

    const INITIAL_STATE = {
        data:[],
        loading:false,
        error:null,
        mostrarFormulario:false
    }

    const [state, dispatch] = useReducer(imagenesReducer, INITIAL_STATE);

    const traerTodas = async()=>{
        
    }

    const modificar = async (data,id)=>{
        
    }

    const agregar = async data=>{
        
    }

    const eliminar = async id=>{
        
    }

    const switchForm = ()=>{
        dispatch({
            type:IMAGENES_MOSTRAR_OCULTAR_FORMULARIO
        })
    }

    return(
        <ImagenesContext.Provider
            value={{
                data:state.data,
                loading:state.loading,
                error:state.error,
                mostrarFormulario:state.mostrarFormulario,
                traerTodas,
                agregar,
                modificar,
                eliminar,
                switchForm
            }}
        >
            {props.children}
        </ImagenesContext.Provider>
    )
}

export default ImagenesState;