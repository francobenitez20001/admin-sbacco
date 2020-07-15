import React,{useEffect,useState} from 'react';
import TablaUbicaciones from '../../components/tables/Ubicaciones';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config'

const MySwal = withReactContent(Swal)

const Ubicaciones = () => {
    const [ubicaciones, setUbicaciones] = useState(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getLocalidades();
    }, [])

    const getLocalidades = async()=>{
        fetch(`${API}/ubicaciones`).then(res=>res.json()).then(data=>{
            setUbicaciones(data.data);
            setLoading(false);
        }).catch(err=>console.error(err))
    }

    const eliminarUbicacion = id=>{
        MySwal.fire({
            title: '¿Desea eliminar la ubicacion?',
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
        (loading)?<Loader/>:
        <TablaUbicaciones
            ubicaciones={ubicaciones}
            eliminarUbicacion={eliminarUbicacion}/>
    );
}
 
export default Ubicaciones;