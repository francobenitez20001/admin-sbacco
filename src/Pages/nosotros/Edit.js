import React,{useEffect,useState} from 'react';
import FormEditNosotros from '../../components/forms/formEditNosotros';
import Loader from '../../components/Loader/Loader';
import Swal from 'sweetalert2'
import {API} from '../../config';

const EditNosotros = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [nosotros, setNosotros] = useState(undefined);
    const [formValues, setFormValues] = useState(undefined);

    useEffect(() => {
        getDatos();
    }, [])

    const getDatos=async()=>{
        try {
            fetch(`${API}/nosotros`).then(res=>res.json()).then(data=>{
                setNosotros(data.data[0]);
                setFormValues({
                    pass:'ZAQ12wsx',
                    contenido:data.data[0].contenido,
                    id:1
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
        if(state.contenido.trim()===''){
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
            fetch(`${API}/nosotros/quienes_somos_modificar`,{
                method:'PUT',
                body:JSON.stringify(formValues),
                headers:{'Content-Type':'application/json'}
            }).then(res=>res.json()).then(res=>{
                setLoading(false);
                Swal.fire(
                    'Sección modificada!',
                    res.info,
                    'success'
                ).then(()=>{
                    props.history.push('/nosotros')
                });
            })
        }
    }

    return (
        (loading)?<Loader/>:
        <FormEditNosotros
            error={error}
            formValues={formValues}
            nosotros={nosotros}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            />
    );
}
 
export default EditNosotros;