import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ServiciosContext } from "../../context/servicios/serviciosContext";
import { PropiedadContext } from "../../context/propiedades/propiedadesContext";

const FormServicio = (props) => {

    const [formValues, setFormValues] = useState({
        luz:'',
        agua:'',
        calefaccion:'',
        telefono:'',
        gas:'',
        internet:'',
        idCasa:null
    });
    const [errorForm, setErrorForm] = useState(false);
    const {data,error,traerInfo,switchForm,agregar,modificar} = useContext(ServiciosContext);
    const {propiedad,idCasa} = useContext(PropiedadContext);

    useEffect(() => {
        if(propiedad){
            traerInfo({
                agua:propiedad.agua,
                calefaccion:propiedad.calefaccion,
                gas:propiedad.gas,
                idCasa:propiedad.idCasa,
                internet:propiedad.internet,
                luz:propiedad.luz,
                telefono:propiedad.telefono,
            });
        }
    }, []);

    useEffect(() => {
        if(data){
            setFormValues({
                luz:`${data.luz}`,
                agua:`${data.agua}`,
                calefaccion:`${data.calefaccion}`,
                telefono:`${data.telefono}`,
                gas:`${data.gas}`,
                internet:`${data.internet}`,
                idCasa:`${data.idCasa}`
            })
        }else{
            setFormValues({
                ...formValues,
                idCasa
            })
        }
    }, [data])

    const handleChange = e=>{
        setFormValues({
            ...formValues,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async e=>{
        e.preventDefault();
        console.log(formValues);
        const erroresDeForm = validarErrores();
        if(erroresDeForm){
            setErrorForm(`Te falta completar el campo ${erroresDeForm}`);
            return;
        };
        if(props.id){
            await modificar(formValues);
        }else{
            await agregar(formValues);
        }
        Swal.fire('Listo','Servicios agregados','success').then(()=>switchForm());
    }

    const validarErrores = ()=>{
        for (const key in formValues) {
            if(formValues[key] == '') return key;
        }
    }

    if(errorForm || error){
        let err = error ? error : errorForm;
        Swal.fire('Atención',err,'error').then(()=>setErrorForm(false));
    }
    return (
        false && !formValues.idCasa || (props.id && !formValues.idCasa) ? null :
        <form className="form-group" id="form-servicio" onSubmit={handleSubmit}>
            <h6>Servicios</h6>
            <div className="row text-center">
                <div className="input-group col-12 col-md-4">
                    <div className="input-group-prepend">
                    <div className="input-group-text">Electricidad</div>
                    </div>
                    <select className="form-control" name="luz" defaultValue={formValues.luz} onChange={handleChange}>
                        <option value="">Seleccione una opción</option>
                        <option value="no">No</option>
                        <option value="si">Si</option>
                    </select>
                </div>
                <div className="input-group col-12 col-md-4">
                    <div className="input-group-prepend">
                    <div className="input-group-text">Agua</div>
                    </div>
                    <select className="form-control" defaultValue={formValues.agua} onChange={handleChange} name="agua">
                        <option value="">Seleccione una opción</option>
                        <option value="corriente">Corriente</option>
                        <option value="pozo">Pozo</option>
                    </select>
                </div>
                <div className="input-group col-12 col-md-4">
                    <div className="input-group-prepend">
                    <div className="input-group-text">Calefacción</div>
                    </div>
                    <select className="form-control" defaultValue={formValues.calefaccion} name="calefaccion" onChange={handleChange}>
                        <option value="">Seleccione una opción</option>
                        <option value="no">No</option>
                        <option value="si">Si</option>
                    </select>
                </div>
            </div>
            <div className="row mt-4">
                <div className="input-group col-12 col-md-4">
                    <div className="input-group-prepend">
                        <div className="input-group-text">Telefono</div>
                        </div>
                        <select className="form-control" defaultValue={formValues.telefono} name="telefono" onChange={handleChange}>
                            <option value="">Seleccione una opción</option>
                            <option value="no">No</option>
                            <option value="si">Si</option>
                        </select>
                    </div>
                    <div className="input-group col-12 col-md-4">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Gas</div>
                        </div>
                        <select className="form-control" defaultValue={formValues.gas} name="gas" onChange={handleChange}>
                            <option value="">Seleccione una opción</option>
                            <option value="envasado">Envasado</option>
                            <option value="natural">Natural</option>
                        </select>
                    </div>
                    <div className="input-group col-12 col-md-4">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Internet</div>
                        </div>
                        <select className="form-control" defaultValue={formValues.internet} name="internet" onChange={handleChange}>
                            <option value="">Seleccione una opción</option>
                            <option value="no">No</option>
                            <option value="si">Si</option>
                        </select>
                    </div>
            </div>
            <br/>
            {props.id ? <input type="button" onClick={()=>switchForm()} className="btn btn-info" style={{float:"right"}} value="Omitir datos"/> : null}
            <input type="submit" className="btn btn-info mr-2" name="" style={{float: "right"}} value="Guardar y Continuar"/>
            <br/><br/>
        </form>
    );
}
 
export default FormServicio;