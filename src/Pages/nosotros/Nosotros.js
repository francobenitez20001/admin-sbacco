import React,{useEffect,useState} from 'react';
import TablaProductos from '../../components/tables/Productos';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)

const Productos = () => {
    const [productos, setProductos] = useState(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, [])

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
                Swal.fire(
                    'Eliminado!',
                    'ssss',
                    'success'
                ) 
            }
        })
    }

    return (
        (loading)?null:
        <TablaProductos
            productos={productos}
            eliminarPropiedad={eliminarPropiedad}/>
    );
}
 
export default Productos;