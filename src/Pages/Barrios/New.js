import React,{useState,useEffect} from 'react';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config';
import Swal from 'sweetalert2';
import FormAddBarrio from '../../components/forms/formAddBarrio';
import {useUser} from 'reactfire';

const NewBarrio = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [formValues, setFormValues] = useState({
        barrio:'',
        idLocalidad:'',
        pass: "ZAQ12wsx"
    });
    const [localidades, setLocalidades] = useState([]);
    const [localidadesFiltradas, setlocalidadesFiltradas] = useState([]);
    const [partidos, setPartidos] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async()=>{
        await getLocalidades();
        await getPartidos();
        return setLoading(false);
    }

    let user = useUser();
    if (!user) return window.location.assign('/login');
    
    const getLocalidades = async()=>{
        try {
            const reqLocalidades = await fetch(`${API}/ubicaciones`);
            const dataLocalidades = await reqLocalidades.json();
            setLocalidades(dataLocalidades.data);
            setlocalidadesFiltradas(dataLocalidades.data);
            return;
        } catch (error) {
            alert(error);
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
            fetch(`${API}/barrios/insertar_barrio`,{
                method:'POST',
                body:JSON.stringify(formValues),
                headers:{'Content-Type':'application/json'}
            }).then(res=>res.json()).then(res=>{
                console.log(res);
                setLoading(false);
                Swal.fire(
                    'Barrio agregado!',
                    res.info,
                    'success'
                ).then(()=>{
                    props.history.push('/barrios');
                });
            })
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
        <FormAddBarrio
            formValues={formValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            localidadesFiltradas={localidadesFiltradas}
            filtrarLocalidadPorPartido={filtrarLocalidadPorPartido}
            partidos={partidos}
            error={error}/>
    );
}
 
export default NewBarrio;