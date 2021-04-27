import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { OperacionesContext } from "../../context/operaciones/operacionesContext";
import Loader from '../Loader/Loader';

const FormOperacion = (props) => {
    const [errorForm, setErrorForm] = useState(false);
    const [formValues, setFormValues] = useState({
        operacion:''
    });
    const {operacion,loading,error,traerUna,agregar,modificar} = useContext(OperacionesContext);
    const history = useHistory();

    useEffect(() => {
        if(props.id){
            traerUna(props.id);
        }
    }, [])

    useEffect(() => {
        if(operacion && props.id){
            setFormValues({
                operacion:operacion.operacion
            })
        }
    }, [operacion])

    const handleChange = event=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    };

    const verificar = ()=>{
        if(formValues.operacion.trim()===''){
            setErrorForm('Completa todos los campos');
            return false;
        }
        setErrorForm(false);
        return true;
    }

    const handleSubmit = async event=>{
        event.preventDefault();
        if(!verificar()){return false;}

        if(props.id){
            await modificar(formValues,props.id);
        }else{
            await agregar(formValues);
        }
        Swal.fire(
            'Listo',
            '',
            'success'
        ).then(()=>history.push('/operaciones'));
    }

    if(error || errorForm){
        let err = error ? error : errorForm;
        Swal.fire('Error',err,'error').then(()=>setErrorForm(false));
    }

    return (
        loading ? <Loader/> :
        <div className="container mt-5">
            <h3>Formulario de nueva operación</h3>
            <br/>
            <form className="form-group" onSubmit={handleSubmit}>
                <input type="text" className="form-control" value={formValues.operacion} placeholder="Operacion" onChange={handleChange} name="operacion"/>
                <input type="submit" style={{float:"right"}} className="btn btn-info mt-4" value="Agregar"/>
            </form>
        </div>
    );
}
 
export default FormOperacion;