import React,{useEffect,useState} from 'react';
import FormEditContacto from '../../components/forms/formEditContacto';
import Loader from '../../components/Loader/Loader';
import Swal from 'sweetalert2'
import {API} from '../../config';
import {useUser} from 'reactfire';

const EditContacto = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [formValues, setFormValues] = useState(undefined);

    useEffect(() => {
        getDatos();
    }, []);
    let user = useUser();
    if (!user) return window.location.assign('/login');

    const getDatos=async()=>{
        try {
            fetch(`${API}/contacto`).then(res=>res.json()).then(data=>{
                setFormValues(data.data[0]);
                setLoading(false);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const handleChange = event=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    };

    const verificar = state=>{
        if(state.telefonoPrincipal.trim()==='' || state.whatsapp.trim() === '' || state.facebook.trim() === ''
        || state.instagram.trim() === '' || state.direccion.trim() === ''){
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
            fetch(`${API}/contacto/1`,{
                method:'PUT',
                body:JSON.stringify(formValues),
                headers:{'Content-Type':'application/json'}
            }).then(res=>res.json()).then(res=>{
                setLoading(false);
                Swal.fire(
                    'Sección modificada!',
                    'Datos de contacto fueron actualizados',
                    'success'
                ).then(()=>{
                    props.history.push('/contacto')
                });
            })
        }
    }

    return (
        (loading)?<Loader/>:
        <FormEditContacto
            error={error}
            formValues={formValues}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            />
    );
}
 
export default EditContacto;