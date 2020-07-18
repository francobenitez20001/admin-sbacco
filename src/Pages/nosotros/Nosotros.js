import React,{useEffect,useState} from 'react';
import TablaNosotros from '../../components/tables/Nosotros';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config';
import Swal from 'sweetalert2';

const Nosotros = () => {
    const [Nosotros, setNosotros] = useState(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getNosotros();
    }, [])

    const getNosotros = async()=>{
        try {
            fetch(`${API}/nosotros`).then(res=>res.json().then(data=>{
                setNosotros(data.data[0]);
                setLoading(false);
            }))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        (loading)?<Loader/>:
        <TablaNosotros
            nosotros={Nosotros}/>
    );
}
 
export default Nosotros;