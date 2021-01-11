import React,{useEffect,useState} from 'react';
import FormAddPropiedad from '../../components/forms/formAddPropiedad';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config';
import Swal from 'sweetalert2';
import {useUser} from 'reactfire';

const NewPropiedad = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categorias, setCategorias] = useState(undefined);
    const [localidades, setLocalidades] = useState(undefined);
    const [localidadesFiltradas, setLocalidadesFiltradas] = useState(undefined);
    const [operaciones, setOperaciones] = useState(undefined);
    const [partidos, setPartidos] = useState(undefined);
    const [formDatosPrincipalesValues, setFormDatosPrincipalesValues] = useState({
        idCategoria:"1",
        idOperacion:"1",
        idPartido:"1",
        idLocalidad:"1",
        direccion:"",
        descripcion:"",
        precio:"",
        estado:"Disponible",
        mostrarEstado:"si",
        moneda:"dolar",
        pass:"ZAQ12wsx",
        lat:'',
        lon:''    
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
    }, []);
    let user = useUser();
    if (!user) return window.location.assign('/login');

    const getDatos=async()=>{
        try {
            await getCategorias();
            await getLocalidades();
            await getPartidos();
            await getOperaciones();
        } catch (error) {
            console.log(error);
        }
    }

    const getCategorias = async()=>{
        await fetch(`${API}/categorias`).then(res=>res.json()).then(data=>{
            setCategorias(data.data);
        }).catch(err=>console.error(err))
    }

    const getLocalidades = async()=>{
        await fetch(`${API}/ubicaciones`).then(res=>res.json()).then(data=>{
            setLocalidades(data.data);
            setLocalidadesFiltradas(data.data.filter(res=>res.idPartido == formDatosPrincipalesValues.idPartido));
        }).catch(err=>console.error(err))
    }

    const getPartidos = async()=>{
        await fetch(`${API}/partidos`).then(res=>res.json()).then(data=>{
            setPartidos(data.data);
        })
    }

    const getOperaciones = async()=>{
        await fetch(`${API}/operaciones`).then(res=>res.json()).then(data=>{
            setOperaciones(data.data);
            setLoading(false);
        }).catch(err=>console.error(err))
    }

    const handleChangePrincipal = event=>{
        if(event.target.name === 'idPartido'){
            //traigo las localidades de ese partido
            filtrarLocalidadPorPartido(event.target.value);
        }
        setFormDatosPrincipalesValues({
            ...formDatosPrincipalesValues,
            [event.target.name]:event.target.value
        })
    }

    const filtrarLocalidadPorPartido = idPartido=>{
        let localidadesFiltradas = localidades.filter(res=>res.idPartido == idPartido);
        return setLocalidadesFiltradas(localidadesFiltradas);
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
            fetch(`${API}/insertar_inmueble`,{
                method:'POST',
                body:JSON.stringify(formDatosPrincipalesValues),
                headers:{'Content-Type':'application/json'}
            }).then(res=>res.json()).then(response=>{
                setLoading(false);
                if(!response.status){
                    Swal.fire(
                        'Ups!',
                        'Error al insertar la propiedad',
                        'error'
                    );
                    return;
                }
                setFormDatosTecnicosValues({...formDatosTecnicosValues,idCasa:response.data[0].id});
                setFormServiciosValues({...formServiciosValues,idCasa:response.data[0].id});
                Swal.fire(
                    'Agregado!',
                    'Ahora ingresa los datos técnicos',
                    'success'
                );
                document.getElementById('form-principal').classList.add('d-none');
                document.getElementById('form-tecnico').classList.remove('d-none');
            })
        };
    }

    const handleSubmitTecnico = (event,omite=false)=>{
        event.preventDefault();
        let datosTecnicos = formDatosTecnicosValues;
        if(omite){
            datosTecnicos = {
                idCasa:formDatosTecnicosValues.idCasa,
                cochera:"-",
                dormitorios:0,
                pass:"ZAQ12wsx",
                pileta:"-",
                s_cubierta:"",
                s_semicubierta:"",
                s_terreno:""
            };
        }
        if(validar(formDatosTecnicosValues,'tecnico') || omite){
            setLoading(true);
            fetch(`${API}/insertar_dato_tecnico`,{
                method:'POST',
                body:JSON.stringify(datosTecnicos),
                headers:{'Content-Type':'application/json'}
            }).then(res=>res.json()).then(response=>{
                setLoading(false);
                if(!response.status){
                    Swal.fire(
                        'Ups!',
                        'Error al insertar el dato técnico',
                        'error'
                    );
                    return;
                }
                Swal.fire(
                    'Agregado!',
                    'Ahora sigue con los servicios',
                    'success'
                );
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
            fetch(`${API}/insertar_servicio`,{
                method:'POST',
                body:JSON.stringify(formServiciosValues),
                headers:{'Content-Type':'application/json'}
            }).then(res=>res.json()).then(response=>{
                setLoading(false);
                if(!response.status){
                    console.log(response);
                    Swal.fire(
                        'Ups!',
                        'Error al insertar el servcio',
                        'error'
                    );
                    return;
                }
                Swal.fire(
                    'Agregado!',
                    'Ahora sigue con la imagen principal!',
                    'success'
                );
                document.getElementById('form-principal').classList.add('d-none');
                document.getElementById('form-tecnico').classList.add('d-none');
                document.getElementById('form-servicio').classList.add('d-none');
                document.getElementById('form-header').classList.remove('d-none');
            })
        };
    }

    const handleSubmitHeader = event=>{
        event.preventDefault();
        setLoading(true);
        document.getElementById('input-header-idcasa').value = formServiciosValues.idCasa;
        let file = new FormData(document.getElementById('form-header'));
        console.log(file.get('idCasa'));
        fetch(`${API}/insertar_imagen`,{
            method:'POST',
            body:file
        }).then(res=>res.json()).then(response=>{
            setLoading(false);
            if(!response.status){
                Swal.fire(
                    'Ups..',
                    'Problemas al subir la imagen',
                    'error'
                );
                return;
            };
            Swal.fire(
                'Listo!',
                'Imagen Subida al servidor',
                'success'
            );
            document.getElementById('form-principal').classList.add('d-none');
            document.getElementById('form-tecnico').classList.add('d-none');
            document.getElementById('form-servicio').classList.add('d-none');
            document.getElementById('form-header').classList.add('d-none');
            document.getElementById('form-imagenes').classList.remove('d-none');
        })
    };

    const handleSubmitImagenes = event=>{
        event.preventDefault();
        document.getElementById('input-imagenes-idcasa').value = formServiciosValues.idCasa;
        setLoading(true);
        let files = new FormData(document.getElementById('form-imagenes'));
        fetch(`${API}/imagenes-varios`,{
            method:'POST',
            body:files
        }).then(res=>res.json()).then(response=>{
            console.log(response);
            setLoading(false);
            Swal.fire(
                'Listo!',
                'Propiedad registrada satisfactoriamente',
                'success'
            ).then(()=>{
                props.hisory.push('/propiedades');
            });
        })
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
            partidos={partidos}
            localidades={localidades}
            localidadesFiltradas={localidadesFiltradas}
            operaciones={operaciones}
            formDatosPrincipalesValues={formDatosPrincipalesValues}
            formDatosTecnicosValues={formDatosTecnicosValues}
            formServiciosValues={formServiciosValues}
            handleChangePrincipal={handleChangePrincipal}
            handleChangeTecnico={handleChangeTecnico}
            handleChangeServicios={handleChangeServicios}
            handleSubmitPrincipal={handleSubmitPrincipal}
            handleSubmitTecnico={handleSubmitTecnico}
            handleSubmitServicio={handleSubmitServicio}
            handleSubmitHeader={handleSubmitHeader}
            handleSubmitImagenes={handleSubmitImagenes}/>
    );
}
 
export default NewPropiedad;