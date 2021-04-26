import { BARRIOS_ERROR, BARRIOS_LOADING, BARRIOS_TRAER_TODOS, BARRIOS_TRAER_UNO } from "../../types";

const barriosReducer = (state,action)=>{
    switch (action.type) {
        case BARRIOS_LOADING:
            return {...state,loading:true}
        case BARRIOS_ERROR:
            return {...state,loading:false,error:action.payload}
        case BARRIOS_TRAER_TODOS:
            return {...state,data:action.payload,loading:false,error:null}
        case BARRIOS_TRAER_UNO:
            return {...state,barrio:action.payload,loading:false,error:null}
        default:
            return state;
    }
}

export default barriosReducer;