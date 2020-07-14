import React,{useEffect,useState} from 'react';
import FormAddPropiedad from '../../components/forms/formAddPropiedad';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config';

const NewPropiedad = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categorias, setCategorias] = useState(undefined);
    const [localidades, setLocalidades] = useState(undefined);
    const [operaciones, setOperaciones] = useState(undefined);
    const [formDatosPrincipalesValues, setFormDatosPrincipalesValues] = useState({
        idCategoria:"1",
        idOperacion:"1",
        idLocalidad:"1",
        direccion:"",
        descripcion:"",
        precio:"",
        estado:"Disponible",
        moneda:"dolar",
        pass:"ZAQ12wsx"    
    });
    const [formDatosTecnicosValues, setFormDatosTecnicosValues] = useState({
        cochera:"Si",
        dormitorios:"",
        idCasa:null,
        pass:"ZAQ12wsx",
        pileta:"Si",
        s_cubierta:"",
        s_semicubierta:"",
        s_terreno:""
    })
    const [formServiciosValues, setFormServiciosValues] = useState({
        agua:"corriente",
        calefaccion:"si",
        gas:"natural",
        idCasa:null,
        internet:"si",
        luz:"si",
        telefono:"si",
        pass:"ZAQ12wsx"
    });

    useEffect(() => {
        getDatos();
    }, [])

    const getDatos=async()=>{
        try {
            await getCategorias();
            await getLocalidades();
            await getOperaciones();
        } catch (error) {
            console.log(error);
        }
    }

    const getCategorias = async()=>{
        fetch(`${API}/categorias`).then(res=>res.json()).then(data=>{
            setCategorias(data.data);
        }).catch(err=>console.error(err))
    }

    const getLocalidades = async()=>{
        fetch(`${API}/ubicaciones`).then(res=>res.json()).then(data=>{
            setLocalidades(data.data);
        }).catch(err=>console.error(err))
    }

    const getOperaciones = async()=>{
        fetch(`${API}/operaciones`).then(res=>res.json()).then(data=>{
            setOperaciones(data.data);
            setLoading(false);
        }).catch(err=>console.error(err))
    }

    const handleChangePrincipal = event=>{
        setFormDatosPrincipalesValues({
            ...formDatosPrincipalesValues,
            [event.target.name]:event.target.value
        })
    }

    const handleChangeTecnico = event=>{
        setFormDatosTecnicosValues({
            ...formDatosTecnicosValues,
            [event.target.name]:event.target.value
        })
    }

    const handleChangeServicios = event=>{
        setFormServiciosValues({
            ...formServiciosValues,
            [event.target.name]:event.target.value
        })
    }

    const handleSubmitPrincipal = (event)=>{
        event.preventDefault();
        if(validar(formDatosPrincipalesValues,'principal')){
            document.getElementById('form-principal').classList.add('d-none');
            document.getElementById('form-tecnico').classList.remove('d-none');
        };
    }

    const handleSubmitTecnico = event=>{
        event.preventDefault();
        if(validar(formDatosTecnicosValues,'tecnico')){
            document.getElementById('form-tecnico').classList.add('d-none');
            document.getElementById('form-servicio').classList.remove('d-none');
        };
    }

    const handleSubmitServicio = event=>{
        event.preventDefault();
        if(validar(formServiciosValues,'servicio')){
            console.log(formServiciosValues);
        };
    }

    const validar = (state,form)=>{
        let validation = false;
        switch (form) {
            case 'principal':
                if(state.idCategoria !== '' && state.idOperacion !== '' && state.idLocalidad !== '' &&
                state.direccion.trim() !== '' && state.descripcion.trim() !== '' && state.precio.trim() !== '' && 
                state.estado.trim() !== '' && state.moneda.trim() !== '' && state.moneda.trim() !== ''){
                    setError(false);
                    validation = true;
                }
                setError(true);
                break;
            case 'tecnico':
                if(state.cochera !== '' && state.dormitorios !== '' && state.idCasa !== '' &&
                state.pass.trim() !== '' && state.pileta.trim() !== '' && state.s_cubierta.trim() !== '' && 
                state.s_semicubierta.trim() !== '' && state.s_terreno.trim() !== ''){
                    setError(false);
                    validation = true;
                }
                setError(true);
                break;
            case 'servicio':
                if(state.agua.trim() !== '' && state.calefaccion.trim() !== '' && state.gas.trim() !== '' &&
                state.idCasa !== '' && state.internet.trim() !== '' && state.luz.trim() !== '' && 
                state.telefono.trim() !== '' && state.pass.trim() !== ''){
                    setError(false);
                    validation = true;
                }
                setError(true);
                break;
            default:
                break;
        };
        return validation;
    }

    return (
        (loading)?<Loader/>:
        <FormAddPropiedad
            categorias={categorias}
            localidades={localidades}
            operaciones={operaciones}
            formDatosPrincipalesValues={formDatosPrincipalesValues}
            formDatosTecnicosValues={formDatosTecnicosValues}
            formServiciosValues={formServiciosValues}
            handleChangePrincipal={handleChangePrincipal}
            handleChangeTecnico={handleChangeTecnico}
            handleChangeServicios={handleChangeServicios}
            handleSubmitPrincipal={handleSubmitPrincipal}
            handleSubmitTecnico={handleSubmitTecnico}
            handleSubmitServicio={handleSubmitServicio}/>
    );
}
 
export default NewPropiedad;