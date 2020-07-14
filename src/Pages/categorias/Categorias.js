import React,{useEffect,useState} from 'react';
import TablaCategorias from '../../components/tables/Categorias';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)

const Categorias = () => {
    const [categorias, setCategorias] = useState(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, [])

    const eliminarCategoria = id=>{
        MySwal.fire({
            title: '¿Desea eliminar la categoria?',
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
        <TablaCategorias
            categorias={categorias}
            eliminarCategoria={eliminarCategoria}/>
    );
}
 
export default Categorias;