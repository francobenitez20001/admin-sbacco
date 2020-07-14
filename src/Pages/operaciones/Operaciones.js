import React,{useEffect,useState} from 'react';
import TablaOperaciones from '../../components/tables/Operaciones';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)

const Operaciones = () => {
    const [operaciones, setOperaciones] = useState(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, [])

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
        (loading)?null:
        <TablaOperaciones
            operaciones={operaciones}
            eliminarOperacion={eliminarOperacion}/>
    );
}
 
export default Operaciones;