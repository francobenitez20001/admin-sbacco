import React,{useState} from 'react';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config';
import Swal from 'sweetalert2';
import FormAddPartido from '../../components/forms/formAddPartido'

const NewPartido = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [formValues, setFormValues] = useState({
        partido:'',
        pass: "ZAQ12wsx"
    });

    const handleChange = event=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    };

    const verificar = state=>{
        if(state.partido.trim()===''){
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
            fetch(`${API}/partidos`,{
                method:'POST',
                body:JSON.stringify(formValues),
                headers:{'Content-Type':'application/json'}
            }).then(res=>res.json()).then(res=>{
                console.log(res);
                setLoading(false);
                Swal.fire(
                    'Partido agregado!',
                    res.info,
                    'success'
                ).then(()=>{
                    props.history.push('/partidos');
                });
            })
        }
    }
    return (
        (loading)?<Loader/>:
        <FormAddPartido
            formValues={formValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}/>
    );
}
 
export default NewPartido;