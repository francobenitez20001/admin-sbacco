import React,{useState,useEffect} from 'react';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config';
import Swal from 'sweetalert2';
import FormEditUbicacion from '../../components/forms/formEditUbicacion';

const EditUbicacion = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [partidos, setPartidos] = useState(undefined);
    const [formValues, setFormValues] = useState(undefined);

    useEffect(() => {
        getDatos();
    }, [])

    const getDatos = async ()=>{
        try {
            await getLocalidad();
            await getPartidos();
        } catch (error) {
            
        }
    }

    const getLocalidad = async()=>{
        return fetch(`${API}/buscar_ubicacion/${props.match.params.id}`).then(res=>res.json()).then(data=>{
            return setFormValues({
                idPartido:data.data[0].idPartido,
                localidad:data.data[0].localidad,
                pass:'ZAQ12wsx',
                id:props.match.params.id
            });
        })
    }

    const getPartidos = async()=>{
        fetch(`${API}/partidos`).then(res=>res.json()).then(async data=>{
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
        if(state.localidad.trim()==='' || state.idPartido === ''){
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
            fetch(`${API}/modificar_ubicacion`,{
                method:'PUT',
                body:JSON.stringify(formValues),
                headers:{'Content-Type':'application/json'}
            }).then(res=>res.json()).then(res=>{
                console.log(res);
                setLoading(false);
                if(!res.status){
                    Swal.fire(
                        'Ops',
                        'Problemas al modificar la ubicación',
                        'error'
                    );
                    return;
                };
                Swal.fire(
                    'Ubicación modificada!',
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
        <FormEditUbicacion
            formValues={formValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            partidos={partidos}/>
    );
}
 
export default EditUbicacion;