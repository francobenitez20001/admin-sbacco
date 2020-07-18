import React,{useEffect,useState} from 'react';
import FormEditOperacion from '../../components/forms/formEditOperacion';
import Loader from '../../components/Loader/Loader';
import Swal from 'sweetalert2'
import {API} from '../../config';
import {useUser} from 'reactfire';

const EditOperacion = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [operacion, setOperacion] = useState(undefined);
    const [formValues, setFormValues] = useState(undefined);
    
    useEffect(() => {
        getDatos();
    }, [])
    let user = useUser();
    if (!user) return window.location.assign('/login');
    
    const getDatos=async()=>{
        try {
            fetch(`${API}/buscar_operacion/${props.match.params.id}`).then(res=>res.json()).then(data=>{
                setOperacion(data.data[0]);
                setFormValues({
                    pass:'ZAQ12wsx',
                    operacion:data.data[0].operacion,
                    id:data.data[0].id
                });
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
            fetch(`${API}/modificar_operacion`,{
                method:'PUT',
                body:JSON.stringify(formValues),
                headers:{'Content-Type':'application/json'}
            }).then(res=>res.json()).then(res=>{
                setLoading(false);
                Swal.fire(
                    'Operación modificada!',
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
        <FormEditOperacion
            error={error}
            formValues={formValues}
            operacion={operacion}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            />
    );
}
 
export default EditOperacion;