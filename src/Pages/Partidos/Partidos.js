import React,{useState,useEffect} from 'react';
import TablaPartidos from '../../components/tables/Partidos';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {API} from '../../config'
import Loader from '../../components/Loader/Loader';
const MySwal = withReactContent(Swal);


const Partidos = () => {
    const [partidos, setPartidos] = useState(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getPartidos();
    }, [])
    
    const getPartidos = async()=>{
        fetch(`${API}/partidos`).then(res=>res.json()).then(data=>{
            setPartidos(data.data);
            setLoading(false);
        }).catch(err=>console.error(err))
    }

    const eliminarPartido = id=>{
        MySwal.fire({
            title: '¿Desea eliminar el partido?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!',
          }).then((result) => {
            if (result.value) {
                fetch(`${API}/partidos/${id}/ZAQ12wsx`,{method:'DELETE'}).then(res=>res.json()).then(res=>{
                    Swal.fire(
                        'Eliminado!',
                        res.info,
                        'success'
                    ).then(()=>{
                        getPartidos();
                    }) 
                })
            }
        })
    }

    return (
        (loading)?<Loader/>:
        <TablaPartidos
            partidos={partidos}
            eliminarPartido={eliminarPartido}/>
    );
}
 
export default Partidos;