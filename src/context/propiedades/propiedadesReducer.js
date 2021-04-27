import { PROPIEDAD_AGREGAR, PROPIEDAD_CAMBIAR_ESTADO, PROPIEDAD_ELIMINAR, PROPIEDAD_ERROR, PROPIEDAD_LOADING, PROPIEDAD_MODIFICAR, PROPIEDAD_MOSTRAR_OCULTAR_FORMULARIO, PROPIEDAD_TRAER_MAS, PROPIEDAD_TRAER_TODAS, PROPIEDAD_TRAER_UNO, PROPIEDAD_UPDATE_PAGINACION } from "../../types/index";

const propiedadesReducer = (state,action)=>{
    switch (action.type) {
        case PROPIEDAD_LOADING:
            return {...state,loading:true,error:null}
        case PROPIEDAD_ERROR:
            return {...state,loading:false,error:action.payload}
        case PROPIEDAD_TRAER_TODAS:
            return {...state,loading:false,error:null,data:action.payload,propiedad:null,desde:0}
        case PROPIEDAD_TRAER_MAS:
            return {...state,loading:false,error:null,data:[...state.data,...action.payload],propiedad:null}
        case PROPIEDAD_TRAER_UNO:
            return {...state,loading:false,error:null,propiedad:action.payload}
        case PROPIEDAD_UPDATE_PAGINACION:
            return {...state,desde:action.payload}
        case PROPIEDAD_AGREGAR:
        case PROPIEDAD_MODIFICAR:
        case PROPIEDAD_ELIMINAR:
        case PROPIEDAD_CAMBIAR_ESTADO:
            return {...state,loading:false,error:null}
        case PROPIEDAD_MOSTRAR_OCULTAR_FORMULARIO:
            return {...state,mostrarFormulario:!state.mostrarFormulario}
        default:
            return state
    }
}

export default propiedadesReducer;