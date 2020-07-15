import React,{useEffect,useState} from 'react';
import TablaOperaciones from '../../components/tables/Operaciones';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {API} from '../../config'
import Loader from '../../components/Loader/Loader';

const MySwal = withReactContent(Swal)

const Operaciones = () => {
    const [operaciones, setOperaciones] = useState(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getOperaciones();
    }, [])
    
    const getOperaciones = async()=>{
        fetch(`${API}/operaciones`).then(res=>res.json()).then(data=>{
            setOperaciones(data.data);
            setLoading(false);
        }).catch(err=>console.error(err))
    }

    const eliminarOperacion = id=>{
        MySwal.fire({
            title: '¿Desea eliminar la operación?',
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
        <TablaOperaciones
            operaciones={operaciones}
            eliminarOperacion={eliminarOperacion}/>
    );
}
 
export default Operaciones;