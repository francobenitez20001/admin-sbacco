import {OPERACIONES_AGREGAR, OPERACIONES_ELIMINAR, OPERACIONES_ERROR, OPERACIONES_LOADING, OPERACIONES_MODIFICAR, OPERACIONES_TRAER_TODAS, OPERACIONES_TRAER_UNA} from '../../types/index';

const operacionesReducer = (state,action)=>{
    switch (action.type) {
        case OPERACIONES_AGREGAR:
        case OPERACIONES_MODIFICAR:
        case OPERACIONES_ELIMINAR:
            return {...state,loading:false,error:null}
        case OPERACIONES_TRAER_TODAS:
            return {...state,data:action.payload,operacion:null,loading:false,error:null}
        case OPERACIONES_TRAER_UNA:
            return {...state,operacion:action.payload,loading:false,error:null}
        case OPERACIONES_LOADING:
            return {...state,loading:true,error:null}
        case OPERACIONES_ERROR:
            return {...state,loading:false,error:action.payload}
        default:
            return state;
    }
}

export default operacionesReducer;