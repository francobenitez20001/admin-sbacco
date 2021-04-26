import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import {LocalidadesContext} from '../../context/localidades/localidadesContext';
import { PartidosContext } from "../../context/partidos/partidosContext";
import Loader from '../Loader/Loader';

const FormLocalidades = (props) => {
    const [formValues, setFormValues] = useState({
        idPartido:'',
        localidad:''
    });
    const [errorForm, setErrorForm] = useState(null);
    const {localidad,loading,error,modificar,agregar,traerUno:traerLocalidad} = useContext(LocalidadesContext);
    const {data:partidos,loading:loadingPartido,error:errorPartido,traerTodos:traerPartidos} = useContext(PartidosContext);
    const history = useHistory();

    useEffect(() => {
        traerPartidos();
        if(props.id){
            traerLocalidad(props.id);
        }
    }, []);

    useEffect(() => {
        if(props.id && localidad){
            setFormValues({
                idPartido:`${localidad.idPartido}`,
                localidad:localidad.localidad
            })
        }
    }, [localidad]);

    const handleChange = e=>{
        setFormValues({
            ...formValues,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit = async e=>{
        e.preventDefault();
        if(formValues.idPartido.trim() === '' || formValues.localidad.trim() === ''){
            setErrorForm('Completa todos los campos');
            return;
        }
        setErrorForm(null);
        if(props.id){
            await modificar(formValues,props.id);
        }else{
            await agregar(formValues);
        }

        Swal.fire('Listo','','success').then(()=>history.push('/localidades'));
    }

    const renderSelect = ()=>{
        if(props.id){
            if(formValues.idPartido !== ''){
                return <select className="form-control" defaultValue={formValues.idPartido} name="idPartido" onChange={handleChange}>
                    <option value="">Seleccione un partido</option>
                    {partidos.map(partido=>(
                        <option key={partido.id} value={partido.id}>{partido.partido}</option>
                    ))}
                </select>
            }
        }else{
            return <select className="form-control" defaultValue={formValues.idPartido} name="idPartido" onChange={handleChange}>
                <option value="">Seleccione un partido</option>
                {partidos.map(partido=>(
                    <option key={partido.id} value={partido.id}>{partido.partido}</option>
                ))}
            </select>
        }
    }

    if(error || errorForm){
        let err = error ? error : errorForm;
        Swal.fire('Error',err,'error').then(setErrorForm(null));
    }


    return (
        !partidos.length || loading || loadingPartido ? <Loader/> :
        <div className="container mt-5">
            <h3>Formulario de {props.id ? 'modificacion' : 'alta'} de una ubicación</h3>
            <br/>
            <form className="form-group" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12 col-md-6">
                        {renderSelect()}
                    </div>
                    <div className="col-12 col-md-6">
                        <input type="text" className="form-control" value={formValues.localidad} placeholder="Localidad" onChange={handleChange} name="localidad"/>
                    </div>
                </div>
                <input type="submit" style={{float:"right"}} className="btn btn-info mt-4" value="Enviar"/>
            </form>
        </div>
    );
}
 
export default FormLocalidades;