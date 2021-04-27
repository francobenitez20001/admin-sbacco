import React, { useContext, useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import Swal from 'sweetalert2';
import { CategoriasContext } from "../../context/categorias/categoriasContext";
import { useHistory } from 'react-router';

const FormCategoria = (props) => {
    const [errorForm, setErrorForm] = useState(false);
    const [formValues, setFormValues] = useState({
        categoria:''
    });
    const {categoria,loading,error,agregar,modificar,traerUna} = useContext(CategoriasContext);
    const history = useHistory();

    useEffect(() => {
        if(props.id){
            traerUna(props.id);
        }
    }, [])

    useEffect(() => {
        if(categoria && props.id){
            setFormValues({
                categoria:categoria.categoria
            })
        }
    }, [categoria])

    const handleChange = event=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    };

    const verificar = ()=>{
        if(formValues.categoria.trim()===''){
            setErrorForm('Completa todo los campos');
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
        if(props.id){
            await modificar(formValues,props.id);
        }else{
            await agregar(formValues);
        }
        Swal.fire('Listo','','success').then(()=>history.push('/categorias'))
    }

    if(error || errorForm){
        let err = error ? error : errorForm;
        Swal.fire('Error',err,'error').then(()=>setErrorForm(false));
    }

    return (
        loading ? <Loader/> :
        <div className="container mt-5">
            <h3>Formulario de nueva categoria</h3>
            <br/>
            <form className="form-group" onSubmit={handleSubmit}>
                <input type="text" className="form-control" value={formValues.categoria} placeholder="Categoria" onChange={handleChange} name="categoria"/>
                <input type="submit" style={{float:"right"}} className="btn btn-info mt-4" value="Enviar"/>
            </form>
        </div>
    );
}
 
export default FormCategoria;