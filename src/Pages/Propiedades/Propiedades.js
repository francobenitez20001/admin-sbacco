import React,{useContext, useEffect} from 'react';
import {PropiedadContext} from '../../context/propiedades/propiedadesContext';
import { DatoTecnicoContext } from "../../context/datoTecnico/datoContext";
import { ServiciosContext } from "../../context/servicios/serviciosContext";
import { ImagenesContext } from "../../context/imagenes/imagenesContext";
import Spinner from '../../components/Loader/Spinner';
import Propiedades from '../../components/Propiedades';

const Productos = () => {

    const {data:inmuebles,cantidad,loading,updatePaginacion} = useContext(PropiedadContext);
    const {mostrarFormulario:mostrarFormDatosTecnicos,switchForm:habilitarDatosTecnicos} = useContext(DatoTecnicoContext);
    const {mostrarFormulario:mostrarFormServicios,switchForm:habilitarServicios} = useContext(ServiciosContext);
    const {mostrarFormularioHeader,mostrarFormularioVarias,habilitarFormHeader,habilitarFormVarias} = useContext(ImagenesContext);

    useEffect(() => {
        if(mostrarFormDatosTecnicos){
            habilitarDatosTecnicos();
        }
        if(mostrarFormServicios){
            habilitarServicios();
        }
        if(mostrarFormularioHeader){
            habilitarFormHeader();
        }
        if(mostrarFormularioVarias){
            habilitarFormVarias();
        }
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    <Propiedades/>
                </div>
                {inmuebles.length < cantidad ? null : <div className="col-12 text-center my-2"><button onClick={()=>updatePaginacion()} className="btn btn-info">{loading ? <Spinner/> : 'Ver Mas'}</button></div>}
            </div>
        </>
    );
}
 
export default Productos;