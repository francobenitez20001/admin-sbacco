import React,{useState,useEffect} from 'react';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config';
import Swal from 'sweetalert2';
import FormEditBarrio from '../../components/forms/formEditBarrio';
import {useUser} from 'reactfire';

const EditBarrio = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [formValues, setFormValues] = useState(undefined);
    const [localidades, setlocalidades] = useState([]);
    const [localidadesFiltradas, setlocalidadesFiltradas] = useState([]);
    const [partidos, setPartidos] = useState([]);
    
    useEffect(() => {
        getData();
    }, [])
    let user = useUser();
    if (!user) return window.location.assign('/login');

    const getData = async()=>{
        await getBarrio();
        await getLocalidades();
        await getPartidos();
        return setLoading(false);
    }
    
    const getBarrio = async()=>{
        try {
            const reqBarrio = await fetch(`${API}/barrios/${props.match.params.id}`);
            const dataBarrio = await reqBarrio.json();
            return setFormValues({
                pass:'ZAQ12wsx',
                barrio: dataBarrio.data[0].barrio,
                idLocalidad: dataBarrio.data[0].idLocalidad,
                localidad: dataBarrio.data[0].localidad
            })
        } catch (error) {
            alert(error);
        }
    }

    const getLocalidades = async()=>{
        try {
            const reqLocalidades = await fetch(`${API}/ubicaciones`);
            const dataLocalidades = await reqLocalidades.json();
            setlocalidadesFiltradas(dataLocalidades.data);
            return setlocalidades(dataLocalidades.data);
        } catch (error) {
            alert(error);
        }
    }

    const handleChange = event=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    };

    const verificar = state=>{
        if(state.barrio.trim()==='' || state.idLocalidad==''){
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
            fetch(`${API}/barrios/modificar_barrio/${props.match.params.id}`,{
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
                    'Barrio modificado!',
                    'Se ha modificado el barrio con éxito',
                    'success'
                ).then(()=>{
                    props.history.push('/barrios')
                });
            }).catch(err=>{
                console.log(err);
            })
        }
    }

    const getPartidos = async()=>{
        try {
            const reqPartidos = await fetch(`${API}/partidos`);
            const dataPartidos = await reqPartidos.json();
            return setPartidos(dataPartidos.data);
        } catch (error) {
            alert(error);
        }
    }

    const filtrarLocalidadPorPartido = idPartido=>{
        if(typeof idPartido == 'object'){
            idPartido = idPartido.target.value;
        }
        let localidadesFiltradas = localidades.filter(res=>res.idPartido == idPartido);
        return setlocalidadesFiltradas(localidadesFiltradas);
    }

    return (
        (loading)?<Loader/>:
        <FormEditBarrio
            formValues={formValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            localidades={localidadesFiltradas}
            partidos={partidos}
            filtrarLocalidadPorPartido={filtrarLocalidadPorPartido}
            error={error}/>
    );
}
 
export default EditBarrio;