import React,{useState} from 'react';
import {API} from '../../config';
import Loader from '../../components/Loader/Loader';
import FormAddCategoria from '../../components/forms/formAddCategoria';
import Swal from 'sweetalert2';

const NewCategoria = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [formValues, setFormValues] = useState({
        categoria:'',
        pass: "ZAQ12wsx"
    });

    const handleChange = event=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    };

    const verificar = state=>{
        if(state.categoria.trim()===''){
            setError(true);
            return false;
        }
        setError(false);
        return true;
    }

    const handleSubmit = event=>{
        event.preventDefault();
        if(verificar(formValues)){
            setLoading(true);
            fetch(`${API}/insertar_categoria`,{
                method:'POST',
                body:JSON.stringify(formValues),
                headers:{'Content-Type':'application/json'}
            }).then(res=>res.json()).then(res=>{
                setLoading(false);
                Swal.fire(
                    'Categoria agregada!',
                    res.info,
                    'success'
                ).then(()=>{
                    props.history.push('/categorias')
                });
            })
        }
    }

    return (
        (loading)?<Loader/>:
        <FormAddCategoria
            formValues={formValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            />
    );
}
 
export default NewCategoria;