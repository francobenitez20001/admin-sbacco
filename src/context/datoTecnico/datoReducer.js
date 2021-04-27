import { DATOS_TECNICOS_AGREGAR, DATOS_TECNICOS_ERROR, DATOS_TECNICOS_LOADING, DATOS_TECNICOS_MODIFICAR, DATOS_TECNICOS_MOSTRAR_OCULTAR_FORMULARIO, DATOS_TECNICOS_TRAER_INFO } from "../../types";

const datosTecnicosReducer = (state,action)=>{
    switch (action.type) {
        case DATOS_TECNICOS_LOADING:
            return {...state,loading:true}
        case DATOS_TECNICOS_ERROR:
            return {...state,loading:false,error:action.payload}
        case DATOS_TECNICOS_TRAER_INFO:
            return {...state,data:action.payload,loading:false,error:null}
        case DATOS_TECNICOS_AGREGAR:
        case DATOS_TECNICOS_MODIFICAR:
            return {...state,loading:false,error:null}
        case DATOS_TECNICOS_MOSTRAR_OCULTAR_FORMULARIO:
            return {...state,mostrarFormulario:!state.mostrarFormulario}
        default:
            return state;
    }
}

export default datosTecnicosReducer;