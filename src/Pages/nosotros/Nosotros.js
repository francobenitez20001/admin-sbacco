import React,{useEffect,useState} from 'react';
import TablaNosotros from '../../components/tables/Nosotros';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config';
import {useUser} from 'reactfire';

const Nosotros = () => {
    const [Nosotros, setNosotros] = useState(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getNosotros();
    }, []);
    let user = useUser();
    if (!user) return window.location.assign('/login');

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