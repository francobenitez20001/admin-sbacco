import { BARRIOS_AGREGAR, BARRIOS_ELIMINAR, BARRIOS_ERROR, BARRIOS_FILTRAR, BARRIOS_LOADING, BARRIOS_MODIFICAR, BARRIOS_TRAER_TODOS, BARRIOS_TRAER_UNO } from "../../types";

const barriosReducer = (state,action)=>{
    switch (action.type) {
        case BARRIOS_LOADING:
            return {...state,loading:true}
        case BARRIOS_ERROR:
            return {...state,loading:false,error:action.payload}
        case BARRIOS_TRAER_TODOS:
            return {...state,data:action.payload,loading:false,error:null,barrio:null}
        case BARRIOS_TRAER_UNO:
            return {...state,barrio:action.payload,loading:false,error:null}
        case BARRIOS_AGREGAR:
            return {...state,loading:false,error:null}
        case BARRIOS_ELIMINAR:
            return {...state,loading:false,error:null}
        case BARRIOS_MODIFICAR:
            return {...state,loading:false,error:null}
        case BARRIOS_FILTRAR:
            return {...state,filtrados:action.payload}
        default:
            return state;
    }
}

export default barriosReducer;