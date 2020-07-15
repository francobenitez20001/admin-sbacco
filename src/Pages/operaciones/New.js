import React,{useState} from 'react';
import {API} from '../../config';
import Loader from '../../components/Loader/Loader';
import FormAddOperacion from '../../components/forms/formAddOperacion';
import Swal from 'sweetalert2';

const NewOperacion = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [formValues, setFormValues] = useState({
        operacion:'',
        pass: "ZAQ12wsx"
    });

    const handleChange = event=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    };

    const verificar = state=>{
        if(state.operacion.trim()===''){
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
            fetch(`${API}/insertar_operacion`,{
                method:'POST',
                body:JSON.stringify(formValues),
                headers:{'Content-Type':'application/json'}
            }).then(res=>res.json()).then(res=>{
                setLoading(false);
                Swal.fire(
                    'Operación agregada!',
                    res.info,
                    'success'
                ).then(()=>{
                    props.history.push('/operaciones')
                });
            })
        }
    }

    return (
        (loading)?<Loader/>:
        <FormAddOperacion
            formValues={formValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            />
    );
}
 
export default NewOperacion;