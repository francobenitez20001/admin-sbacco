import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import {PartidosContext} from '../../context/partidos/partidosContext';
import Loader from '../Loader/Loader';

const FormPartido = (props) => {

    const [errorForm, setErrorForm] = useState(false);
    const [formValues, setFormValues] = useState({
        partido:''
    });
    const {partido,loading,error,traerUno,modificar,agregar} = useContext(PartidosContext);
    const history = useHistory();

    useEffect(() => {
        if(props.id){
            traerUno(props.id);
        }
    }, []);

    useEffect(() => {
        if(props.id && partido){
            setFormValues({
                partido:partido.partido
            })
        }
    }, [partido])

    const handleChange = event=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    };

    const verificar = ()=>{
        if(formValues.partido.trim()===''){
            setErrorForm('Completa todos los campos');
            return false;
        }
        setErrorForm(false);
        return true;
    }

    const handleSubmit = async event=>{
        event.preventDefault();
        if(verificar(formValues)){
            if(props.id){
                await modificar(formValues,props.id);
            }else{
                await agregar(formValues);
            }
            Swal.fire('Listo','','success').then(()=>{
                history.push('/partidos');
            })
        }
    }

    if(error || errorForm){
        let err = error ? error : errorForm;
        Swal.fire(
            'Error',
            err,
            'error'
        );
    }

    return (
        <div className="container mt-5">
            <h3>Formulario de {props.id ? 'modificación' : 'alta'} de partido</h3>
            <br/>
            <form className="form-group" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12">
                        <input type="text" className="form-control" value={formValues.partido} onChange={handleChange} name="partido" placeholder="Ingrese nombre del partido"/>
                    </div>
                </div>
                {loading ? <Loader/> : <input type="submit" style={{float:"right"}} className="btn btn-info mt-4" value="Cargar"/>}
            </form>
        </div>
    );
}
 
export default FormPartido;