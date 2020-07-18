import React,{useState,useEffect} from 'react';
import FormEditPropiedad from '../../components/forms/formEditPropiedad';
import Loader from '../../components/Loader/Loader';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {API} from '../../config';
import  { Redirect } from 'react-router-dom'
const MySwal = withReactContent(Swal)

const EditPropiedad = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categorias, setCategorias] = useState(undefined);
    const [localidades, setLocalidades] = useState(undefined);
    const [localidadesFiltradas, setLocalidadesFiltradas] = useState(undefined);
    const [partidos, setpartidos] = useState(undefined);
    const [operaciones, setOperaciones] = useState(undefined);
    const [propiedad, setPropiedad] = useState(undefined);
    const [formDatosPrincipalesValues, setFormDatosPrincipalesValues] = useState({});
    const [formDatosTecnicosValues, setFormDatosTecnicosValues] = useState({})
    const [formServiciosValues, setFormServiciosValues] = useState({});

    const [modalIsOpen, setModalIsOpen] = useState(false);


    useEffect(() => {
        getDatos();
    }, [])

    const getDatos=async()=>{
        try {
            await getPropiedad();
            await getCategorias();
            await getLocalidades();
            await getPartidos();
            await getOperaciones();
        } catch (error) {
            console.log(error);
        }
    }

    const getPropiedad = async()=>{
        try {
            fetch(`${API}/detallar_inmueble_id/${props.match.params.id}`).then(res=>res.json()).then(data=>{
                setPropiedad(data);
                setFormDatosPrincipalesValues({
                    idCategoria:data.data[0].idCategoria,
                    idOperacion:data.data[0].idOperacion,
                    idLocalidad:data.data[0].idLocalidad,
                    idPartido:data.data[0].idPartido,
                    direccion:data.data[0].direccion,
                    descripcion:data.data[0].descripcion,
                    precio:data.data[0].precio,
                    estado:data.data[0].estado,
                    mostrarEstado:data.data[0].mostrarEstado,
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
            setLocalidadesFiltradas(data.data);
        }).catch(err=>console.error(err))
    }

    const getPartidos = async()=>{
        return fetch(`${API}/partidos`).then(res=>res.json()).then(data=>{
            setpartidos(data.data);
        }).catch(console.error)
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
                ).then(()=>{
                    props.history.push('/propiedades')
                });
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

    const eliminarImagen = (id,nombre)=>{
        MySwal.fire({
            title: '¿Desea eliminar la imágen?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!',
          }).then((result) => {
            if (result.value) {
                setLoading(true);
                let nombreImagen = nombre.split('/')[4];
                fetch(`${API}/borrar_imagen/${id}?name=${nombreImagen}&pass=ZAQ12wsx`,{
                    method:'DELETE'
                }).then(res=>res.json()).then(response=>{
                    setLoading(false);
                    Swal.fire(
                        'Eliminado',
                        response.info,
                        'warning'
                    ).then(()=>{
                        getDatos();
                    });
                })
            }
        })
    }

    const modificarImagen = id=>{
        Swal.fire({
            title: 'Editar Imagen',
            html:
              `
                <form id="editarImagen">
                    <input id="swal-input2" className="swal2-input" type="file" name="header"/>
                    <input type="hidden" name="id" value="${id}"/>
                    <input type="hidden" name="pass" value="ZAQ12wsx"/>  
                </form>
              `,
            focusConfirm: false,
            preConfirm: () => {
                setLoading(true);
                let data = new FormData(document.getElementById('editarImagen'));
                fetch(`${API}/modificar_imagen`,{
                    method:'PUT',
                    body:data
                }).then(res=>res.json()).then(response=>{
                    setLoading(false);
                    Swal.fire(
                        'Listo!',
                        response.info,
                        'success'
                    ).then(()=>window.location.assign('/propiedades'));
                })
            }
        })
    }

    const cargarMasImagenes = (id)=>{
        Swal.fire({
            title: 'Agregar Imagenes',
            html:
              `
                <form id="form-imagenes-add">
                    <input id="swal-input2" className="swal2-input" type="file" multiple name="imagenes"/>
                    <input type="hidden" name="idCasa" value="${id}"/>
                    <input type="hidden" name="pass" value="ZAQ12wsx"/>  
                </form>
              `,
            focusConfirm: false,
            preConfirm: () => {
                setLoading(true);
                let files = new FormData(document.getElementById('form-imagenes-add'));
                fetch(`${API}/imagenes-varios`,{
                    method:'POST',
                    body:files
                }).then(res=>res.json()).then(response=>{
                    setLoading(false);
                    Swal.fire(
                        'Listo!',
                        'Propiedad registrada satisfactoriamente',
                        'success'
                    ).then(()=>{
                        getDatos();
                    });
                })
            }
        })
    }

    return (
        (loading)?<Loader/>:
        <FormEditPropiedad
            propiedad={propiedad}
            error={error}
            categorias={categorias}
            localidades={localidades}
            localidadesFiltradas={localidadesFiltradas}
            partidos={partidos}
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
            eliminarImagen={eliminarImagen}
            modificarImagen={modificarImagen}
            cargarMasImagenes={cargarMasImagenes}/>
    );
}
 
export default EditPropiedad;   