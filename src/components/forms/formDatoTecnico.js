import React, { useContext, useEffect, useState } from 'react';
import { DatoTecnicoContext } from "../../context/datoTecnico/datoContext";
import { PropiedadContext } from "../../context/propiedades/propiedadesContext";
import Swal from 'sweetalert2';

const FormDatoTecnico = (props) => {

    const [formValues, setFormValues] = useState({
        s_cubierta:'',
        s_semicubierta:'',
        s_terreno:'',
        s_total:'',
        pileta:'Si',
        cochera:'Si',
        dormitorios:'',
        u_medida:'metros cuadrados',
        idCasa:null,
        baños:'0'
    });
    const [errorForm, setErrorForm] = useState(false);
    const {data,error,traerInfo,switchForm,agregar,modificar} = useContext(DatoTecnicoContext);
    const {propiedad,idCasa} = useContext(PropiedadContext);

    useEffect(() => {
        if(props.id){
            traerInfo({
                cochera:propiedad.cochera,
                dormitorios:propiedad.dormitorios,
                idCasa:propiedad.idCasa,
                pileta:propiedad.pileta,
                s_cubierta:propiedad.s_cubierta,
                s_semicubierta:propiedad.s_semicubierta,
                s_terreno:propiedad.s_terreno,
                s_total:propiedad.s_total || '0',
                u_medida:propiedad.u_medida,
                baños:propiedad.baños
            })
        }
    }, []);

    useEffect(() => {
        if(data && props.id){
            setFormValues({
                s_cubierta:`${data.s_cubierta}`,
                s_semicubierta:`${data.s_semicubierta}`,
                s_terreno:`${data.s_terreno}`,
                s_total:`${data.s_total}`,
                pileta:`${data.pileta}`,
                cochera:`${data.cochera}`,
                dormitorios:`${data.dormitorios}`,
                u_medida:`${data.u_medida}`,
                idCasa:`${data.idCasa}`,
                baños:`${data.baños}`
            })
        }else{
            setFormValues({
                ...formValues,
                idCasa:idCasa
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
        const erroresDeForm = validarErrores();
        if(erroresDeForm){
            setErrorForm(`Te falta completar el campo ${erroresDeForm}`);
            return;
        }
        if(props.id){
            await modificar(formValues);
        }else{
            await agregar(formValues);
        }
        Swal.fire('Listo','Se han agregado los datos técnicos','success').then(()=>switchForm());
    }

    const omitirDatos = (e)=>{
        if(!props.id){
            setFormValues({
                ...formValues,
                cochera:"-",
                dormitorios:"0",
                pileta:"-",
                s_cubierta:"-",
                s_semicubierta:"-",
                s_terreno:"-",
                s_total:"0",
                baños:'0'
            });
            handleSubmit(e);
        }else{
            switchForm();
        }
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
        false || (props.id && !formValues.idCasa) ? null :
        <form className="form-group" id="form-tecnico" onSubmit={handleSubmit}>
            <h6>Datos técnicos</h6>
            <div className="row">
                <div className="col-12 col-md-3">
                    <div className="input-group mt-3 mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Superf. Cubierta</div>
                        </div>
                        <input type="text" name="s_cubierta" value={formValues.s_cubierta} onChange={handleChange} placeholder="Superficie cubierta en m2" className="form-control"/>
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="input-group mt-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Super. Semicubierta</div>
                        </div>
                        <input type="text" onChange={handleChange} value={formValues.s_semicubierta} name="s_semicubierta" placeholder="Superficie semicubierta en m2" className="form-control"/>
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="input-group mt-3 mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Super. Terreno</div>
                        </div>
                        <input type="text" onChange={handleChange} value={formValues.s_terreno} name="s_terreno" placeholder="Superficie del terreno" className="form-control"/>
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="input-group mt-3 mb-2">
                        <div className="input-group-text">Sup. Total</div>
                        <input type="text" className="form-control" name="s_total" onChange={handleChange} value={formValues.s_total}/>
                        <div className="input-group-text">
                            <select onChange={handleChange} defaultValue={formValues.u_medida} name="u_medida">
                                <option value="metros cuadrados">M2</option>
                                <option value="hectareas">Hec.</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="input-group mt-3 mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Pileta</div>
                        </div>
                        <select name="pileta" onChange={handleChange} defaultValue={formValues.pileta} className="form-control" id="">
                            <option value="-">Omitir dato</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="input-group mt-3 mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Cochera</div>
                        </div>
                        <select name="cochera" onChange={handleChange} defaultValue={formValues.cochera} className="form-control" id="">
                            <option value="-">Omitir dato</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <input type="hidden" name="idCasa"/>
                    <input type="hidden" name="pass"/>
                    <div className="input-group mt-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Dormitorios</div>
                        </div>
                        <input type="text" name="dormitorios" onChange={handleChange} value={formValues.dormitorios} placeholder="Ingrese cantidad de dormitorios" className="form-control"/>
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="input-group mt-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Baños</div>
                        </div>
                        <input type="text" name="baños" onChange={handleChange} value={formValues.baños} placeholder="Ingrese cantidad de baños" className="form-control"/>
                    </div>
                </div>
            </div>
            <br/>
            <input type="button" onClick={omitirDatos} className="btn btn-info mt-3" style={{float:"right"}} value="Omitir datos"/>
            <input type="submit" className="btn btn-info mt-3 mr-2" style={{float:"right"}} value="Guardar y Continuar"/>
            <br/><br/>
        </form>
    );
}
 
export default FormDatoTecnico;