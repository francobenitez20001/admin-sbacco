import React,{useEffect,useState} from 'react';
import TablaCategorias from '../../components/tables/Categorias';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config';
import {useUser} from 'reactfire';
const MySwal = withReactContent(Swal)

const Categorias = () => {
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState(undefined);
    useEffect(() => {
        getCategorias();
    }, []);
    let user = useUser();
    if (!user) return window.location.assign('/login');
    
    const getCategorias = async()=>{
        fetch(`${API}/categorias`).then(res=>res.json()).then(data=>{
            setCategorias(data.data);
            setLoading(false);
        }).catch(err=>console.error(err))
    }
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
                fetch(`${API}/borrar_categoria/${id}/ZAQ12wsx`,{method:'DELETE'}).then(res=>res.json()).then(data=>{
                    Swal.fire(
                        'Eliminado!',
                        data.info,
                        'success'
                    ).then(()=>{
                        getCategorias();
                    })
                }) 
            }
        })
    }

    return (
        (loading)?<Loader/>:
        <TablaCategorias
            categorias={categorias}
            eliminarCategoria={eliminarCategoria}/>
    );
}
 
export default Categorias;