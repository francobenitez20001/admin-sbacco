import React,{useState,useEffect} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {API} from '../../config'
import Loader from '../../components/Loader/Loader';
import {useUser} from 'reactfire';
import TablaBarrios from '../../components/tables/Barrios';
const MySwal = withReactContent(Swal);


const Barrios = () => {
    const [barrios, setBarrios] = useState(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getBarrios();
    }, [])
    let user = useUser();
    if (!user) return window.location.assign('/login');
     
    const getBarrios = async()=>{
        fetch(`${API}/barrios`).then(res=>res.json()).then(data=>{
            setBarrios(data.data);
            setLoading(false);
        }).catch(err=>console.error(err))
    }

    const eliminarBarrio = id=>{
        MySwal.fire({
            title: '¿Desea eliminar el barrio?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!',
          }).then((result) => {
            if (result.value) {
                fetch(`${API}/barrios/borrar_barrio/${id}/ZAQ12wsx`,{method:'DELETE'}).then(res=>res.json()).then(res=>{
                    Swal.fire(
                        'Eliminado!',
                        res.info,
                        'success'
                    ).then(()=>{
                        getBarrios();
                    }) 
                })
            }
        })
    }

    return (
        (loading)?<Loader/>:
        <TablaBarrios
            barrios={barrios}
            eliminarBarrio={eliminarBarrio}/>
    );
}
 
export default Barrios;