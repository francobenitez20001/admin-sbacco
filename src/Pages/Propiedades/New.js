import React, { useContext, useEffect } from 'react';
import FormDatoTecnico from '../../components/forms/formDatoTecnico';
import FormPropiedad from '../../components/forms/formPropiedad';
import FormServicio from '../../components/forms/formServicio';
import FormHeader from '../../components/forms/formHeader';
import { PropiedadContext } from "../../context/propiedades/propiedadesContext";
import { DatoTecnicoContext } from "../../context/datoTecnico/datoContext";
import { ServiciosContext } from "../../context/servicios/serviciosContext";
import { ImagenesContext } from "../../context/imagenes/imagenesContext";

const NewPropiedad = (props) => {
    const {mostrarFormulario:mostrarFormPropiedad} = useContext(PropiedadContext);
    const {mostrarFormulario:mostrarFormDatosTecnicos,switchForm:habilitarDatosTecnicos} = useContext(DatoTecnicoContext);
    const {mostrarFormulario:mostrarFormServicios,switchForm:habilitarServicios} = useContext(ServiciosContext);
    const {mostrarFormulario:mostrarFormImagenes,switchForm:habilitarImagenes} = useContext(ImagenesContext);

    useEffect(() => {
        if(!mostrarFormPropiedad){
            habilitarDatosTecnicos();
        }
    }, [mostrarFormPropiedad])

    useEffect(() => {
        if(!mostrarFormPropiedad && !mostrarFormDatosTecnicos){
            habilitarServicios();
        }
    }, [mostrarFormDatosTecnicos])

    useEffect(() => {
        if(!mostrarFormPropiedad && !mostrarFormDatosTecnicos && !mostrarFormServicios){
            habilitarImagenes();
        }
    }, [mostrarFormServicios])

    const renderForms = ()=>{
        if(mostrarFormPropiedad) return <FormPropiedad/>
        if(mostrarFormDatosTecnicos) return <FormDatoTecnico/> 
        if(mostrarFormServicios) return <FormServicio/>
        if(mostrarFormImagenes) return <FormHeader/>
    }

    return (
        <div className="container pt-5">
            <h4>Formulario de alta de propiedad</h4>
            {renderForms()}
        </div>
    );
}
 
export default NewPropiedad;