import { PROPIEDAD_AGREGAR, PROPIEDAD_APLICAR_FILTRO, PROPIEDAD_CAMBIAR_ESTADO, PROPIEDAD_ELIMINAR, PROPIEDAD_ERROR, PROPIEDAD_LOADING, PROPIEDAD_MODIFICAR, PROPIEDAD_MOSTRAR_OCULTAR_FORMULARIO, PROPIEDAD_RESTABLECER_FILTRO, PROPIEDAD_TRAER_MAS, PROPIEDAD_TRAER_TODAS, PROPIEDAD_TRAER_UNO, PROPIEDAD_UPDATE_PAGINACION } from "../../types/index";

const propiedadesReducer = (state,action)=>{
    switch (action.type) {
        case PROPIEDAD_LOADING:
            return {...state,loading:true,error:null}
        case PROPIEDAD_ERROR:
            return {...state,loading:false,error:action.payload}
        case PROPIEDAD_TRAER_TODAS:
            return {...state,loading:false,error:null,data:action.payload,propiedad:null,desde:0,mostrarFormulario:true,propiedad:null}
        case PROPIEDAD_TRAER_MAS:
            return {...state,loading:false,error:null,data:[...state.data,...action.payload],propiedad:null}
        case PROPIEDAD_TRAER_UNO:
            return {...state,loading:false,error:null,propiedad:action.payload}
        case PROPIEDAD_UPDATE_PAGINACION:
            return {...state,desde:action.payload}
        case PROPIEDAD_AGREGAR:
            return {...state,loading:false,error:null,idCasa:action.payload}
        case PROPIEDAD_MODIFICAR:
        case PROPIEDAD_ELIMINAR:
        case PROPIEDAD_CAMBIAR_ESTADO:
            return {...state,loading:false,error:null}
        case PROPIEDAD_MOSTRAR_OCULTAR_FORMULARIO:
            return {...state,mostrarFormulario:!state.mostrarFormulario}
        case PROPIEDAD_APLICAR_FILTRO:
            return {
                ...state,
                filtrando:true,
                filtros:{
                    idCategoria:action.payload.idCategoria !== '' ? action.payload.idCategoria : null,
                    idLocalidad:action.payload.idLocalidad !== '' ? action.payload.idLocalidad : null,
                    idBarrio:action.payload.idBarrio !== '' ? action.payload.idBarrio : null,
                    minPrecio:action.payload.minPrecio !== '' ? action.payload.minPrecio : null,
                    maxPrecio:action.payload.maxPrecio !== '' ? action.payload.maxPrecio : null,
                    moneda:action.payload.moneda !== '' ? action.payload.moneda : null
                }
            }
        case PROPIEDAD_RESTABLECER_FILTRO:
            return {
                ...state,
                filtrando:false,
                filtros:{
                    idCategoria:null,
                    idLocalidad:null,
                    idBarrio:null,
                    minPrecio:null,
                    maxPrecio:null,
                    moneda:null
                }
            }
        default:
            return state
    }
}

export default propiedadesReducer;