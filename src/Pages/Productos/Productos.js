import React,{useEffect,useState} from 'react';
import TablaProductos from '../../components/tables/Productos';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config';

const MySwal = withReactContent(Swal)

const Productos = () => {
    const [productos, setProductos] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPropiedades();
    }, [])

    const getPropiedades = async()=>{
        try {
            fetch(`${API}/listar_inmuebles/1000/normal`).then(res=>res.json()).then(data=>{
                setProductos(data.data);
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

    return (
        (loading)?<Loader/>:
        <TablaProductos
            productos={productos}
            eliminarPropiedad={eliminarPropiedad}/>
    );
}
 
export default Productos;