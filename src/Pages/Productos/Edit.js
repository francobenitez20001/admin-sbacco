import React,{useState,useEffect} from 'react';
import FormEditPropiedad from '../../components/forms/formEditPropiedad';
import Loader from '../../components/Loader/Loader';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {API} from '../../config';
const MySwal = withReactContent(Swal)

const EditPropiedad = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categorias, setCategorias] = useState(undefined);
    const [localidades, setLocalidades] = useState(undefined);
    const [operaciones, setOperaciones] = useState(undefined);
    const [formDatosPrincipalesValues, setFormDatosPrincipalesValues] = useState({});
    const [formDatosTecnicosValues, setFormDatosTecnicosValues] = useState({})
    const [formServiciosValues, setFormServiciosValues] = useState({});

    useEffect(() => {
        getDatos();
    }, [])

    const getDatos=async()=>{
        try {
            await getPropiedad();
            await getCategorias();
            await getLocalidades();
            await getOperaciones();
        } catch (error) {
            console.log(error);
        }
    }

    const getPropiedad = async()=>{
        try {
            fetch(`${API}/detallar_inmueble_id/${props.match.params.id}`).then(res=>res.json()).then(data=>{
                setFormDatosPrincipalesValues({
                    idCategoria:data.data[0].idCategoria,
                    idOperacion:data.data[0].idOperacion,
                    idLocalidad:data.data[0].idLocalidad,
                    direccion:data.data[0].direccion,
                    descripcion:data.data[0].descripcion,
                    precio:data.data[0].precio,
                    estado:data.data[0].estado,
                    moneda:data.data[0].moneda,
                    id:data.data[0].idCasa,
                    pass:"ZAQ12wsx"  
                });
                setFormDatosTecnicosValues({
                    cochera:data.data[0].cochera,
                    dormitorios:data.data[0].dormitorios,
                    idCasa:data.data[0].idCasa,
                    pass:"ZAQ12wsx",
                    pileta:data.data[0].pileta,
                    s_cubierta:data.data[0].s_cubierta,
                    s_semicubierta:data.data[0].s_semicubierta,
                    s_terreno:data.data[0].s_terreno
                });
                setFormServiciosValues({
                    agua:data.data[0].agua,
                    calefaccion:data.data[0].calefaccion,
                    gas:data.data[0].gas,
                    idCasa:data.data[0].idCasa,
                    internet:data.data[0].internet,
                    luz:data.data[0].luz,
                    telefono:data.data[0].telefono,
                    pass:"ZAQ12wsx"
                });
            })
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
            setLoading(true);
            fetch(`${API}/modificar_inmueble`,{
                method:'PUT',
                body:JSON.stringify(formDatosPrincipalesValues),
                headers:{ 'Content-Type': 'application/json' }
            }).then(res=>res.json()).then(res=>{
                console.log(res);
                setLoading(false);
                document.getElementById('form-principal').classList.add('d-none');
                document.getElementById('form-tecnico').classList.remove('d-none');
            })
        };
    }

    const handleSubmitTecnico = event=>{
        event.preventDefault();
        if(validar(formDatosTecnicosValues,'tecnico')){
            setLoading(true);
            fetch(`${API}/modificar_dato_tecnico`,{
                method:'PUT',
                body:JSON.stringify(formDatosTecnicosValues),
                headers:{'Content-Type':'application/json'}
            }).then(res=>res.json()).then(res=>{
                setLoading(false);
                document.getElementById('form-principal').classList.add('d-none');
                document.getElementById('form-tecnico').classList.add('d-none');
                document.getElementById('form-servicio').classList.remove('d-none');
            })
        };
    }

    const handleSubmitServicio = event=>{
        event.preventDefault();
        if(validar(formServiciosValues,'servicio')){
            setLoading(true);
            fetch(`${API}/modificar_servicio`,{
                method:'PUT',
                body:JSON.stringify(formServiciosValues),
                headers:{'Content-Type':'application/json'}
            }).then(res=>res.json()).then(res=>{
                setLoading(false);
                Swal.fire(
                    'Datos modificados!',
                    res.info,
                    'success'
                );
            })
        };
    }

    const validar = (state,form)=>{
        let validation = false;
        switch (form) {
            case 'principal':
                if(state.idCategoria !== '' && state.idOperacion !== '' && state.idLocalidad !== '' &&
                state.direccion !== '' && state.descripcion !== '' && state.precio !== '' && 
                state.estado !== '' && state.moneda !== '' && state.moneda !== ''){
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
        <FormEditPropiedad
            error={error}
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
 
export default EditPropiedad;   