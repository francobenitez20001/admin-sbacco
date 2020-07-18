import React,{useEffect,useState} from 'react';
import TablaUbicaciones from '../../components/tables/Ubicaciones';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config'
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

    return (
        (loading)?<Loader/>:
        <TablaUbicaciones
            ubicaciones={ubicaciones}/>
    );
}
 
export default Ubicaciones;