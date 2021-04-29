import React,{useContext, useEffect} from 'react';
import TablaProductos from '../../components/tables/Propiedad';
import {PropiedadContext} from '../../context/propiedades/propiedadesContext';
import { DatoTecnicoContext } from "../../context/datoTecnico/datoContext";
import { ServiciosContext } from "../../context/servicios/serviciosContext";
import { ImagenesContext } from "../../context/imagenes/imagenesContext";
import Spinner from '../../components/Loader/Spinner';

const Productos = () => {

    const {loading,updatePaginacion} = useContext(PropiedadContext);
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
            <TablaProductos/>
            <div className="col-12 text-center my-2"><button onClick={()=>updatePaginacion()} className="btn btn-info">{loading ? <Spinner/> : 'Ver Mas'}</button></div>
        </>
    );
}
 
export default Productos;