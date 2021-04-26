import { LOCALIDADES_AGREGAR, LOCALIDADES_ELIMINAR, LOCALIDADES_ERROR, LOCALIDADES_FILTRAR, LOCALIDADES_LOADING, LOCALIDADES_MODIFICAR, LOCALIDADES_TRAER_TODAS, LOCALIDADES_TRAER_UNO } from "../../types";

const localidadesReducer = (state,action)=>{
    switch (action.type) {
        case LOCALIDADES_LOADING:
            return {...state,loading:true}
        case LOCALIDADES_ERROR:
            return {...state,loading:false,error:action.payload}
        case LOCALIDADES_TRAER_TODAS:
            return {...state,data:action.payload,filtradas:action.payload,loading:false,error:null,localidad:null}
        case LOCALIDADES_TRAER_UNO:
            return {...state,localidad:action.payload,loading:false,error:null}
        case LOCALIDADES_FILTRAR:
            return {...state,filtradas:action.payload}
        case LOCALIDADES_AGREGAR:
        case LOCALIDADES_MODIFICAR:
        case LOCALIDADES_ELIMINAR:
            return {...state,loading:false,error:null}
        default:
            return state;
    }
}

export default localidadesReducer;