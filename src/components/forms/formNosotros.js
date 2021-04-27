import React,{useState,useContext, useEffect} from 'react';
import Loader from '../../components/Loader/Loader';
import Swal from 'sweetalert2';
import {NosotrosContext} from '../../context/nosotros/nosotrosContext';
import { useHistory } from 'react-router';

const FormEditNosotros = () => {

    const [formValues, setFormValues] = useState({
        contenido:''
    })
    const [errorForm, setErrorForm] = useState(false);
    const {info,loading,error,modificar} = useContext(NosotrosContext);
    const history = useHistory();

    useEffect(() => {
        if(info){
            setFormValues({
                contenido:info.contenido
            })
        }
    }, [])

    const handleChange = event=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    };

    const verificar = ()=>{
        if(formValues.contenido.trim()===''){
            setErrorForm('Completa todos los campos');
            return false;
        }
        setErrorForm(false);
        return true;
    }

    const handleSubmit = async event=>{
        event.preventDefault();
        if(!verificar()){
            return false;
        }
        await modificar(formValues);
        Swal.fire('Listo','','success').then(()=>history.push('nosotros'));
    }

    if(error || errorForm){
        let err = error ? error : errorForm;
        Swal.fire('Error',err,'error');
    }

    return (
        loading ? <Loader/> :
        <div className="container mt-5">
            <h3>Formulario de modificación de sección 'quiénes somos'</h3>
            <br/>
            <form className="form-group" onSubmit={handleSubmit}>
                <textarea className="form-control" name="contenido" defaultValue={formValues.contenido} onChange={handleChange} rows="20">

                </textarea>
                <input type="submit" style={{float:"right"}} className="btn btn-info mt-4" value="Modificar"/>
            </form>
        </div>
    );
}
 
export default FormEditNosotros;