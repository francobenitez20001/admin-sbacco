import React,{useReducer} from 'react';
import {ImagenesContext} from './imagenesContext';
import imagenesReducer from './imagenesReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { IMAGENES_MOSTRAR_OCULTAR_FORMULARIO_HEADER, IMAGENES_MOSTRAR_OCULTAR_FORMULARIO_VARIAS } from '../../types';

const ImagenesState = (props)=>{

    const INITIAL_STATE = {
        data:[],
        loading:false,
        error:null,
        mostrarFormularioHeader:false,
        mostrarFormularioVarias:false
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

    const habilitarFormHeader = ()=>{
        dispatch({
            type:IMAGENES_MOSTRAR_OCULTAR_FORMULARIO_HEADER
        })
    }

    const habilitarFormVarias = ()=>{
        dispatch({
            type:IMAGENES_MOSTRAR_OCULTAR_FORMULARIO_VARIAS
        })
    }

    return(
        <ImagenesContext.Provider
            value={{
                data:state.data,
                loading:state.loading,
                error:state.error,
                mostrarFormularioHeader:state.mostrarFormularioHeader,
                mostrarFormularioVarias:state.mostrarFormularioVarias,
                traerTodas,
                agregar,
                modificar,
                eliminar,
                habilitarFormHeader,
                habilitarFormVarias
            }}
        >
            {props.children}
        </ImagenesContext.Provider>
    )
}

export default ImagenesState;