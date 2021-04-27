import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { ServiciosContext } from "../../context/servicios/serviciosContext";

const FormServicio = () => {

    const [formValues, setFormValues] = useState({
        luz:'si',
        agua:'pozo',
        calefaccion:'si',
        telefono:'si',
        gas:'envasado',
        internet:'si'
    })
    const {switchForm} = useContext(ServiciosContext);

    const handleChange = e=>{
        setFormValues({
            ...formValues,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e=>{
        e.preventDefault();
        Swal.fire('Listo','Servicios agregados','success').then(()=>switchForm());
    }

    return (
        <form className="form-group" id="form-servicio" onSubmit={handleSubmit}>
            <h6>Servicios</h6>
            <div className="row text-center">
                <div className="input-group col-12 col-md-4">
                    <div className="input-group-prepend">
                    <div className="input-group-text">Electricidad</div>
                    </div>
                    <select className="form-control" name="luz" defaultValue={formValues.luz} onChange={handleChange}>
                        <option value="no">No</option>
                        <option value="si">Si</option>
                    </select>
                </div>
                <div className="input-group col-12 col-md-4">
                    <div className="input-group-prepend">
                    <div className="input-group-text">Agua</div>
                    </div>
                    <select className="form-control" defaultValue={formValues.agua} onChange={handleChange} name="agua">
                        <option value="corriente">Corriente</option>
                        <option value="pozo">Pozo</option>
                    </select>
                </div>
                <div className="input-group col-12 col-md-4">
                    <div className="input-group-prepend">
                    <div className="input-group-text">Calefacción</div>
                    </div>
                    <select className="form-control" defaultValue={formValues.calefaccion} name="calefaccion" onChange={handleChange}>
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
                            <option value="no">No</option>
                            <option value="si">Si</option>
                        </select>
                    </div>
                    <div className="input-group col-12 col-md-4">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Gas</div>
                        </div>
                        <select className="form-control" defaultValue={formValues.gas} name="gas" onChange={handleChange}>
                            <option value="envasado">Envasado</option>
                            <option value="natural">Natural</option>
                        </select>
                    </div>
                    <div className="input-group col-12 col-md-4">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Internet</div>
                        </div>
                        <select className="form-control" defaultValue={formValues.internet} name="internet" onChange={handleChange}>
                            <option value="no">No</option>
                            <option value="si">Si</option>
                        </select>
                    </div>
            </div>
            <br/>
            <input type="submit" className="btn btn-info" name="" style={{float: "right"}} value="Guardar y Continuar"/>
            <br/><br/>
        </form>
    );
}
 
export default FormServicio;