import React,{useState,useEffect} from 'react';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config';
import Swal from 'sweetalert2';
import FormAddUbicacion from '../../components/forms/formAddUbicacion'

const NewUbicacion = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [partidos, setPartidos] = useState(undefined);
    const [formValues, setFormValues] = useState({
        partido:'',
        localidad:'',
        pass: "ZAQ12wsx"
    });

    useEffect(() => {
        getUbicaciones();
    }, [])

    const getUbicaciones = async()=>{
        fetch(`${API}/ubicaciones`).then(res=>res.json()).then(data=>{
            setPartidos(data.data);
            setLoading(false);
        }).catch(err=>console.error(err))
    }

    const handleChange = event=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    };

    const verificar = state=>{
        if(state.localidad.trim()==='' || state.partido === ''){
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
            fetch(`${API}/insertar_ubicacion`,{
                method:'POST',
                body:JSON.stringify(formValues),
                headers:{'Content-Type':'application/json'}
            }).then(res=>res.json()).then(res=>{
                setLoading(false);
                Swal.fire(
                    'Ubicación agregada!',
                    res.info,
                    'success'
                ).then(()=>{
                    props.history.push('/ubicaciones')
                });
            })
        }
    }
    return (
        (loading)?<Loader/>:
        <FormAddUbicacion
            formValues={formValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            partidos={partidos}/>
    );
}
 
export default NewUbicacion;