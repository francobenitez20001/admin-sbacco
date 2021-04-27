import React,{useReducer} from 'react';
import {CategoriasContext} from './categoriasContext';
import categoriasReducer from './categoriasReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { CATEGORIAS_AGREGAR, CATEGORIAS_ELIMINAR, CATEGORIAS_ERROR, CATEGORIAS_LOADING, CATEGORIAS_MODIFICAR, CATEGORIAS_TRAER_TODAS, CATEGORIAS_TRAER_UNA } from '../../types';

const CategoriasState = (props)=>{

    const INITIAL_STATE = {
        data:[],
        categoria:null,
        loading:false,
        error:null
    }

    const [state, dispatch] = useReducer(categoriasReducer, INITIAL_STATE);

    const traerTodas = async()=>{
        dispatch({
            type:CATEGORIAS_LOADING
        })
        try {
            const reqCategorias = await clienteAxios.get('/categorias');
            const {data:{categorias}} = reqCategorias;
            dispatch({
                type:CATEGORIAS_TRAER_TODAS,
                payload:categorias
            })
        } catch (error) {
            dispatch({
                type:CATEGORIAS_ERROR,
                payload:error.response.data
            })
        }
    }

    const traerUna = async(id)=>{
        dispatch({
            type:CATEGORIAS_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            const reqCategoria = await clienteAxios.get(`/categorias/${id}`);
            const {data:{categoria}} = reqCategoria;
            dispatch({
                type:CATEGORIAS_TRAER_UNA,
                payload:categoria[0]
            })
        } catch (error) {
            dispatch({
                type:CATEGORIAS_ERROR,
                payload:error.response.data
            })
        }
    }

    const modificar = async (data,id)=>{
        dispatch({
            type:CATEGORIAS_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.put(`/categorias/${id}`,data);
            dispatch({
                type:CATEGORIAS_MODIFICAR
            })
            return;
        } catch (error) {
            dispatch({
                type:CATEGORIAS_ERROR,
                payload:error.response.data
            })
        }
    }

    const agregar = async data=>{
        dispatch({
            type:CATEGORIAS_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.post('/categorias',data);
            dispatch({type:CATEGORIAS_AGREGAR});
            return;
        } catch (error) {
            dispatch({
                type:CATEGORIAS_ERROR,
                payload:error.response.data
            })
        }
    }

    const eliminar = async id=>{
        dispatch({
            type:CATEGORIAS_LOADING
        })
        try {
            if(localStorage.getItem('token')){
                tokenAuth(localStorage.getItem('token'));
            }
            await clienteAxios.delete(`/categorias/${id}`);
            dispatch({type:CATEGORIAS_ELIMINAR});
            return;
        } catch (error) {
            dispatch({
                type:CATEGORIAS_ERROR,
                payload:error.response.data
            })
        }
    }



    return(
        <CategoriasContext.Provider
            value={{
                data:state.data,
                loading:state.loading,
                categoria:state.categoria,
                error:state.error,
                traerTodas,
                traerUna,
                agregar,
                modificar,
                eliminar
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasState;