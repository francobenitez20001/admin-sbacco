import React,{useEffect,useState} from 'react';
import TablaNosotros from '../../components/tables/Nosotros';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config';
import Swal from 'sweetalert2';

const Nosotros = () => {
    const [Nosotros, setNosotros] = useState(undefined);
    const [formValues, setFormValues] = useState(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getNosotros();
    }, [])

    const getNosotros = async()=>{
        try {
            fetch(`${API}/quienes_somos`).then(res=>res.json().then(data=>{
                setNosotros(data.data[0]);
                setFormValues(data.data[0]);
                setLoading(false);
            }))
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = event=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    };

    const handleSubmit = event=>{
        event.preventDefault();
        fetch(`${API}/quienes_somos_modificar`,{
            method:'PUT',
            body:JSON.stringify(formValues),
            headers:{'Content-Type':'application/json'}
        }).then(res=>res.json()).then(res=>{
            Swal.fire(
                'Modificado!',
                res.info,
                'success'
            ).then(()=>{
                getNosotros();
            })
        })
    }

    return (
        (loading)?<Loader/>:
        <TablaNosotros
            nosotros={Nosotros}
            handleChange={handleChange}
            handleSubmit={handleSubmit}/>
    );
}
 
export default Nosotros;