import { CATEGORIAS_AGREGAR, CATEGORIAS_ELIMINAR, CATEGORIAS_ERROR, CATEGORIAS_LOADING, CATEGORIAS_MODIFICAR, CATEGORIAS_TRAER_TODAS, CATEGORIAS_TRAER_UNA } from "../../types";

const categoriasReducer = (state,action)=>{
    switch (action.type) {
        case CATEGORIAS_LOADING:
            return {...state,loading:true}
        case CATEGORIAS_ERROR:
            return {...state,loading:false,error:action.payload}
        case CATEGORIAS_TRAER_TODAS:
            return {...state,data:action.payload,loading:false,error:null,categoria:null}
        case CATEGORIAS_TRAER_UNA:
            return {...state,categoria:action.payload,loading:false,error:null}
        case CATEGORIAS_AGREGAR:
        case CATEGORIAS_MODIFICAR:
        case CATEGORIAS_ELIMINAR:
            return {...state,loading:false,error:null}
        default:
            return state;
    }
}

export default categoriasReducer;