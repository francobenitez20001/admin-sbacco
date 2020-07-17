import React,{useEffect,useState} from 'react';
import TablaContacto from '../../components/tables/Contacto';
import Loader from '../../components/Loader/Loader';
import {API} from '../../config';
import Swal from 'sweetalert2';

const Contacto = () => {
    const [contacto, setContacto] = useState(undefined);
    const [formValues, setFormValues] = useState(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getData();
    }, [])

    const getData = async()=>{
        try {
            fetch(`${API}/contacto`).then(res=>res.json().then(data=>{
                setContacto(data.data[0]);
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
        fetch(`${API}/contacto/1`,{
            method:'PUT',
            body:JSON.stringify(formValues),
            headers:{'Content-Type':'application/json'}
        }).then(res=>res.json()).then(res=>{
            Swal.fire(
                'Modificado!',
                'Datos de contacto actualizados',
                'success'
            ).then(()=>{
                getData();
            })
        })
    }

    return (
        (loading)?<Loader/>:
        <TablaContacto
            contacto={contacto}
            formValues={formValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}/>
    );
}
 
export default Contacto;