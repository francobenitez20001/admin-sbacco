import React,{useReducer} from 'react';
import {ImagenesContext} from './imagenesContext';
import imagenesReducer from './imagenesReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { IMAGENES_AGREGAR, IMAGENES_ELIMINAR, IMAGENES_ERROR, IMAGENES_LOADING, IMAGENES_MODIFICAR, IMAGENES_MOSTRAR_OCULTAR_FORMULARIO_HEADER, IMAGENES_MOSTRAR_OCULTAR_FORMULARIO_VARIAS, IMAGENES_TRAER_TODAS } from '../../types';

const ImagenesState = (props)=>{

    const INITIAL_STATE = {
        data:[],
        loading:false,
        error:null,
        mostrarFormularioHeader:false,
        mostrarFormularioVarias:false
    }

    const [state, dispatch] = useReducer(imagenesReducer, INITIAL_STATE);

    const traerImagenes = async(idCasa)=>{
        dispatch({
            type:IMAGENES_LOADING
        })
        try {
            if(!localStorage.getItem('token')) return;
            tokenAuth(localStorage.getItem('token'));
            const reqImagenes = await clienteAxios.get(`/imagenes/${idCasa}`);
            const {data:{imagenes}} = reqImagenes;
            dispatch({
                type:IMAGENES_TRAER_TODAS,
                payload:imagenes
            })
        } catch (error) {
            dispatch({
                type:IMAGENES_ERROR,
                payload:error.response.data
            })
        }
    }

    const modificar = async (data)=>{
        dispatch({
            type:IMAGENES_LOADING
        })
        try {
            if(!localStorage.getItem('token')) return;
            tokenAuth(localStorage.getItem('token'));
            await clienteAxios.put(`/imagenes`,data);
            dispatch({
                type:IMAGENES_MODIFICAR
            })
            return;
        } catch (error) {
            dispatch({
                type:IMAGENES_ERROR,
                payload:error.response.data
            })
        }
    }


    const agregar = async (data,isHeader)=>{
        dispatch({
            type:IMAGENES_LOADING
        })
        try {
            if(!localStorage.getItem('token')) return;
            tokenAuth(localStorage.getItem('token'));
            if(isHeader){
                await clienteAxios.post('/imagenes',data);
            }else{
                await clienteAxios.post(`/imagenes/varios`,data);
            }
            dispatch({
                type:IMAGENES_AGREGAR
            });
            return;
        } catch (error) {
            dispatch({
                type:IMAGENES_ERROR,
                payload:error.response.data
            })
        }
    }

    const eliminar = async (id,name)=>{
        dispatch({
            type:IMAGENES_LOADING
        })
        try {
            if(!localStorage.getItem('token')) return;
            tokenAuth(localStorage.getItem('token'));
            await clienteAxios.delete(`/imagenes/${id}?name=${name}`);
            dispatch({
                type:IMAGENES_ELIMINAR
            });
            return;
        } catch (error) {
            dispatch({
                type:IMAGENES_ERROR,
                payload:error.response.data
            })
        }
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
                traerImagenes,
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