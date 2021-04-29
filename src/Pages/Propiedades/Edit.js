import React, { useContext, useEffect } from 'react';
import FormDatoTecnico from '../../components/forms/formDatoTecnico';
import FormPropiedad from '../../components/forms/formPropiedad';
import FormServicio from '../../components/forms/formServicio';
import FormHeader from '../../components/forms/formHeader';
import FormImagenes from '../../components/forms/formImagenes';
import { PropiedadContext } from "../../context/propiedades/propiedadesContext";
import { DatoTecnicoContext } from "../../context/datoTecnico/datoContext";
import { ServiciosContext } from "../../context/servicios/serviciosContext";
import { ImagenesContext } from "../../context/imagenes/imagenesContext";
import { useHistory } from 'react-router';

const EditPropiedad = (props) => {
    const {mostrarFormulario:mostrarFormPropiedad} = useContext(PropiedadContext);
    const {mostrarFormulario:mostrarFormDatosTecnicos,switchForm:habilitarDatosTecnicos} = useContext(DatoTecnicoContext);
    const {mostrarFormulario:mostrarFormServicios,switchForm:habilitarServicios} = useContext(ServiciosContext);
    const {mostrarFormularioHeader,mostrarFormularioVarias,habilitarFormHeader,habilitarFormVarias} = useContext(ImagenesContext);
    const history = useHistory();

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
            habilitarFormHeader();
        }
    }, [mostrarFormServicios]);

    useEffect(() => {
        if(!mostrarFormPropiedad && !mostrarFormDatosTecnicos && !mostrarFormServicios && !mostrarFormularioHeader){
            habilitarFormVarias();
        }
    }, [mostrarFormularioHeader])

    const renderForms = ()=>{
        if(mostrarFormPropiedad) return <FormPropiedad id={props.match.params.id}/>
        if(mostrarFormDatosTecnicos) return <FormDatoTecnico id={props.match.params.id}/> 
        if(mostrarFormServicios) return <FormServicio id={props.match.params.id}/>
        if(mostrarFormularioHeader) return <FormHeader id={props.match.params.id}/>
        if(mostrarFormularioVarias) return <FormImagenes id={props.match.params.id}/>
        return (
            <>
                <div className="alert alert-success text-center">Se ha modificado la propiedad de manera exitosa</div>
                <div className="text-center"><button type="button" onClick={()=>history.push('/propiedades')} className="btn btn-success">Volver al listado</button></div>
            </>
        )
    }

    return (
        <div className="container pt-5">
            <h4>Formulario de modificación de propiedad</h4>
            {renderForms()}
        </div>
    );
}
 
export default EditPropiedad;