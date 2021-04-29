import { IMAGENES_AGREGAR, IMAGENES_ELIMINAR, IMAGENES_ERROR, IMAGENES_LOADING, IMAGENES_MODIFICAR, IMAGENES_MOSTRAR_OCULTAR_FORMULARIO_HEADER, IMAGENES_MOSTRAR_OCULTAR_FORMULARIO_VARIAS, IMAGENES_TRAER_TODAS } from "../../types";

const imagenesReducer = (state,action)=>{
    switch (action.type) {
        case IMAGENES_LOADING:
            return {...state,loading:true}
        case IMAGENES_ERROR:
            return {...state,loading:false,error:action.payload}
        case IMAGENES_TRAER_TODAS:
            return {...state,data:action.payload,loading:false,error:null}
        case IMAGENES_MOSTRAR_OCULTAR_FORMULARIO_HEADER:
            return {...state,mostrarFormularioHeader:!state.mostrarFormularioHeader}
        case IMAGENES_MOSTRAR_OCULTAR_FORMULARIO_VARIAS:
            return {...state,mostrarFormularioVarias:!state.mostrarFormularioVarias}
        case IMAGENES_AGREGAR:
        case IMAGENES_MODIFICAR:
        case IMAGENES_ELIMINAR:
            return {...state,loading:false,error:null}
        default:
            return state;
    }
}

export default imagenesReducer;