import { SERVICIOS_AGREGAR, SERVICIOS_ERROR, SERVICIOS_LOADING, SERVICIOS_MODIFICAR, SERVICIOS_MOSTRAR_OCULTAR_FORMULARIO, SERVICIOS_TRAER_INFO } from "../../types";

const serviciosReducer = (state,action)=>{
    switch (action.type) {
        case SERVICIOS_LOADING:
            return {...state,loading:true}
        case SERVICIOS_ERROR:
            return {...state,loading:false,error:action.payload}
        case SERVICIOS_TRAER_INFO:
            return {...state,data:action.payload,loading:false,error:null}
        case SERVICIOS_AGREGAR:
        case SERVICIOS_MODIFICAR:
            return {...state,loading:false,error:null}
        case SERVICIOS_MOSTRAR_OCULTAR_FORMULARIO:
            return {...state,mostrarFormulario:!state.mostrarFormulario}
        default:
            return state;
    }
}

export default serviciosReducer;