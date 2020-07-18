import React,{useEffect,useState} from 'react';
import TablaOperaciones from '../../components/tables/Operaciones';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {API} from '../../config'
import Loader from '../../components/Loader/Loader';
import {useUser} from 'reactfire';

const MySwal = withReactContent(Swal)

const Operaciones = () => {
    const [operaciones, setOperaciones] = useState(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getOperaciones();
    }, [])
    let user = useUser();
    if (!user) return window.location.assign('/login');
    
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
                fetch(`${API}/borrar_operacion/${id}/ZAQ12wsx`,{method:'DELETE'}).then(res=>res.json()).then(res=>{
                    Swal.fire(
                        'Eliminado!',
                        res.info,
                        'success'
                    ).then(()=>{
                        getOperaciones();
                    }) 
                })
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