import React,{useReducer} from 'react';
import propiedadesReducer from './propiedadesReducer';
import {PropiedadContext} from './propiedadesContext';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { PROPIEDAD_AGREGAR, PROPIEDAD_ELIMINAR, PROPIEDAD_ERROR, PROPIEDAD_LOADING, PROPIEDAD_MODIFICAR, PROPIEDAD_TRAER_MAS, PROPIEDAD_TRAER_TODAS, PROPIEDAD_TRAER_UNO, PROPIEDAD_UPDATE_PAGINACION, PROPIEDAD_CAMBIAR_ESTADO, PROPIEDAD_MOSTRAR_OCULTAR_FORMULARIO } from "../../types/index";

const PropiedadesState = (props) => {
    const INITIAL_STATE = {
        data:[],
        propiedad:null,
        loading:false,
        error:null,
        desde:0,
        cantidad:9,
        mostrarFormulario:true,
        idCasa:null
    };

    const [state, dispatch] = useReducer(propiedadesReducer, INITIAL_STATE);   

    const traerTodas = async()=>{
        dispatch({
            type:PROPIEDAD_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            let url = `/inmuebles?desde=${state.desde}&cantidad=${state.cantidad}&order=normal`;
            const reqPropiedades = await clienteAxios.get(url);
            const {data:{inmuebles}} = reqPropiedades;
            dispatch({
                type:PROPIEDAD_TRAER_TODAS,
                payload:inmuebles
            })
        } catch (error) {
            dispatch({
                type:PROPIEDAD_ERROR,
                payload:error.response.data
            })
        }
    }

    const traerMas = async ()=>{
        dispatch({type:PROPIEDAD_LOADING});
        try {
            let url = `/inmuebles?desde=${state.desde}&cantidad=${state.cantidad}&order=normal`;
            const reqPropiedades = await clienteAxios.get(url);
            const {data:{inmuebles}} = reqPropiedades;
            dispatch({
                type:PROPIEDAD_TRAER_MAS,
                payload:inmuebles
            })
        } catch (error) {
            dispatch({
                type:PROPIEDAD_ERROR,
                payload:error.response.data
            })
        }
    }

    const traerUna = async id=>{
        dispatch({type:PROPIEDAD_LOADING})
        try {
            const reqPropiedades = await clienteAxios.get(`/inmuebles/${id}`);
            const {data:{inmueble}} = reqPropiedades;
            dispatch({
                type:PROPIEDAD_TRAER_UNO,
                payload:inmueble[0]
            })
        } catch (error) {
            dispatch({
                type:PROPIEDAD_ERROR,
                payload:error.response.data
            })
        }
    }

    const updatePaginacion = ()=>{
        let nuevoDesde = state.desde + state.cantidad;
        dispatch({
            type:PROPIEDAD_UPDATE_PAGINACION,
            payload:nuevoDesde
        })
    }

    const modificar = async (data,id)=>{
        dispatch({
            type:PROPIEDAD_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.put(`/inmuebles/${id}`,data);
            dispatch({
                type:PROPIEDAD_MODIFICAR
            })
            return;
        } catch (error) {
            dispatch({
                type:PROPIEDAD_ERROR,
                payload:error.response.data
            })
        }
    }

    const agregar = async data=>{
        dispatch({
            type:PROPIEDAD_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            const agregarPropiedad = await clienteAxios.post('/inmuebles',data);
            const {data:{info}} = agregarPropiedad;
            dispatch({type:PROPIEDAD_AGREGAR,payload:info[0].id});
            return;
        } catch (error) {
            dispatch({
                type:PROPIEDAD_ERROR,
                payload:error.response.data
            })
        }
    }

    const eliminar = async id=>{
        dispatch({
            type:PROPIEDAD_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.delete(`/inmuebles/${id}`);
            dispatch({type:PROPIEDAD_ELIMINAR});
            return;
        } catch (error) {
            dispatch({
                type:PROPIEDAD_ERROR,
                payload:error.response.data
            })
        }
    }

    const cambiarEstado = async id=>{
        dispatch({
            type:PROPIEDAD_LOADING
        });
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.put(`/inmuebles/habilitar_inmueble/${id}`);
            dispatch({type:PROPIEDAD_CAMBIAR_ESTADO});
            return;
        } catch (error) {
            dispatch({
                type:PROPIEDAD_ERROR,
                payload:error.response.data
            })
        }
    }

    const switchForm = ()=>{
        dispatch({
            type:PROPIEDAD_MOSTRAR_OCULTAR_FORMULARIO
        })
    }


    return (
        <PropiedadContext.Provider
            value={{
                data:state.data,
                propiedad:state.propiedad,
                loading:state.loading,
                error:state.error,
                desde:state.desde,
                cantidad:state.cantidad,
                mostrarFormulario:state.mostrarFormulario,
                idCasa:state.idCasa,
                traerTodas,
                traerMas,
                traerUna,
                updatePaginacion,
                modificar,
                agregar,
                eliminar,
                cambiarEstado,
                switchForm
            }}>
            {props.children}
        </PropiedadContext.Provider>
    );
}
 
export default PropiedadesState;