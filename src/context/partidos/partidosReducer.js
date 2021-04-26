import { PARTIDOS_AGREGAR, PARTIDOS_ELIMINAR, PARTIDOS_ERROR, PARTIDOS_LOADING, PARTIDOS_MODIFICAR, PARTIDOS_TRAER_TODOS, PARTIDOS_TRAER_UNO } from "../../types";

const localidadesReducer = (state,action)=>{
    switch (action.type) {
        case PARTIDOS_LOADING:
            return {...state,loading:true}
        case PARTIDOS_ERROR:
            return {...state,loading:false,error:action.payload}
        case PARTIDOS_TRAER_TODOS:
            return {...state,data:action.payload,loading:false,error:null}
        case PARTIDOS_TRAER_UNO:
            return {...state,partido:action.payload,loading:false,error:null}
        case PARTIDOS_MODIFICAR,PARTIDOS_AGREGAR,PARTIDOS_ELIMINAR:
            return {...state,loading:false,error:null};
        default:
            return state;
    }
}

export default localidadesReducer;