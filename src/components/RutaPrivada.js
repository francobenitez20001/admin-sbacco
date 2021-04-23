import React,{useContext,useEffect} from 'react';
import { Route,Redirect } from "react-router-dom";
import {AuthContext} from '../context/auth/authContext';

const RutaPrivada = ({component:Component,...props}) => {
    const {autenticado,loading,obtenerUsuario} = useContext(AuthContext);
    useEffect(() => {
        obtenerUsuario();
    }, [])
    return (
        <Route
            {...props}
            render={props=>!autenticado && !loading?(
                <Redirect to="/login"/>
            ):(
                <Component {...props}/>
            )}
        />
    );
}
 
export default RutaPrivada;
