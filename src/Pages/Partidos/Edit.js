import React,{useState,useEffect} from 'react';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config';
import Swal from 'sweetalert2';
import FormEditPartido from '../../components/forms/formEditPartido';
import {useUser} from 'reactfire';

const EditPartido = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [formValues, setFormValues] = useState(undefined);
    
    useEffect(() => {
        getPartido();
    }, [])
    let user = useUser();
    if (!user) return window.location.assign('/login');
    
    const getPartido = async()=>{
        fetch(`${API}/partidos/${props.match.params.id}`).then(res=>res.json()).then(async data=>{
            setFormValues({
                pass:'ZAQ12wsx',
                partido: data.data[0].partido,
            })
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
            fetch(`${API}/partidos/${props.match.params.id}`,{
                method:'PUT',
                body:JSON.stringify(formValues),
                headers:{'Content-Type':'application/json'}
            }).then(res=>res.json()).then(res=>{
                setLoading(false);
                if(res.info === 'Contraseña incorrecta'){
                    Swal.fire(
                        'Upss!',
                        res.info,
                        'error'
                    );
                    return;
                }
                Swal.fire(
                    'Partido modificado!',
                    'Se ha modificado el partido con éxito',
                    'success'
                ).then(()=>{
                    props.history.push('/partidos')
                });
            }).catch(err=>{
                console.log(err);
            })
        }
    }

    return (
        (loading)?<Loader/>:
        <FormEditPartido
            formValues={formValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}/>
    );
}
 
export default EditPartido;