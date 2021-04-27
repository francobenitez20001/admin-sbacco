import { NOSOTROS_ERROR, NOSOTROS_LOADING, NOSOTROS_MODIFICAR, NOSOTROS_TRAER_INFO } from '../../types';

const nosotrosReducer = (state,action)=>{
    switch (action.type) {
        case NOSOTROS_LOADING:
            return {...state,loading:true}
        case NOSOTROS_ERROR:
            return {...state,loading:false,error:action.payload}
        case NOSOTROS_TRAER_INFO:
            return {...state,data:action.payload,info:action.payload[0],loading:false,error:null}
        case NOSOTROS_MODIFICAR:
            return {...state,loading:false,error:null};
        default:
            return state;
    }
}

export default nosotrosReducer;