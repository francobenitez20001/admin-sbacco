import React,{useEffect,useState} from 'react';
import TablaProductos from '../../components/tables/Productos';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config';
import {useUser} from 'reactfire';
const MySwal = withReactContent(Swal)

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [desde, setDesde] = useState(0);
    
    useEffect(() => {
        getPropiedades();
    }, []);

    useEffect(() => {
        const obtenerMas = async()=>{
            return getPropiedadesAnteriores();
        }
        if(desde>0){obtenerMas()};
    }, [desde])

    let user = useUser();
    if (!user) return window.location.assign('/login');

    const getPropiedades = async()=>{
        try {
            let headers = new Headers();
            headers.append('admin',true);
            fetch(`${API}/listar_inmuebles/10/normal?desde=${desde}`,{
                method:'GET',
                headers
            }).then(res=>res.json()).then(data=>{
                setProductos(data.data);
                setLoading(false);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getPropiedadesAnteriores = async()=>{
        try {
            let headers = new Headers();
            headers.append('admin',true);
            fetch(`${API}/listar_inmuebles/10/normal?desde=${desde}`,{
                method:'GET',
                headers
            }).then(res=>res.json()).then(data=>{
                const updatedPropiedades = [...productos,...data.data];
                setProductos(updatedPropiedades);
                setLoading(false);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarPropiedad = id=>{
        MySwal.fire({
            title: '¿Desea eliminar la propiedad?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!',
          }).then((result) => {
            if (result.value) {
                fetch(`${API}/borrar_inmueble/${id}/ZAQ12wsx`,{method:'DELETE'}).then(res=>res.json()).then(data=>{
                    Swal.fire(
                        'Eliminado!',
                        data.info,
                        'success'
                    ).then(()=>{
                        getPropiedades();
                    })
                }) 
            }
        })
    }

    const switchEstadoPropiedadEnPagina = id=>{
        if(!id) return;
        MySwal.fire({
            title: '¿Seguro que desea activar esta propiedad?',
            text: "Esta acción se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cambiar!',
          }).then((result) => {
            if (result.value) {
                fetch(`${API}/habilitar_inmueble/${id}/ZAQ12wsx`,{method:'PUT'}).then(res=>res.json()).then(data=>{
                    if(data.status){
                        Swal.fire(
                            'Listo!',
                            data.info,
                            'success'
                        ).then(()=>{
                            getPropiedades();
                        })
                    }else{
                        Swal.fire(
                            'Ups..',
                            data.info,
                            'error'
                        )
                    }
                }) 
            }
        })
    }

    const traerMas = ()=>{
        if(desde==0) return setDesde(10);
        return setDesde(desde+10);
    };

    return (
        (loading)?<Loader/>:
        <>
            <TablaProductos
                productos={productos}
                eliminarPropiedad={eliminarPropiedad}
                switchEstadoPropiedadEnPagina={switchEstadoPropiedadEnPagina}/>
            <div className="col-12 text-center my-2"><button onClick={traerMas} className="btn btn-info">Ver Mas</button></div>
        </>
    );
}
 
export default Productos;