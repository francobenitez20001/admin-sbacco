import { CONTACTO_ERROR, CONTACTO_LOADING, CONTACTO_MODIFICAR, CONTACTO_TRAER_INFO } from '../../types';

const ContactoReducer = (state,action)=>{
    switch (action.type) {
        case CONTACTO_LOADING:
            return {...state,loading:true}
        case CONTACTO_ERROR:
            return {...state,loading:false,error:action.payload}
        case CONTACTO_TRAER_INFO:
            return {...state,data:action.payload,info:action.payload[0],loading:false,error:null}
        case CONTACTO_MODIFICAR:
            return {...state,loading:false,error:null};
        default:
            return state;
    }
}

export default ContactoReducer;