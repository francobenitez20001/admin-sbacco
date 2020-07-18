import React,{useEffect,useState} from 'react';
import FormEditCategoria from '../../components/forms/formEditCategoria';
import Loader from '../../components/Loader/Loader';
import Swal from 'sweetalert2'
import {API} from '../../config';
import {useUser} from 'reactfire';

const EditCategoria = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categoria, setCategoria] = useState(undefined);
    const [formValues, setFormValues] = useState(undefined);

    useEffect(() => {
        getDatos();
    }, []);
    let user = useUser();
    if (!user) return window.location.assign('/auth');

    const getDatos=async()=>{
        try {
            fetch(`${API}/buscar_categoria_id/${props.match.params.id}`).then(res=>res.json()).then(data=>{
                setCategoria(data.data[0]);
                setFormValues({
                    pass:'ZAQ12wsx',
                    categoria:data.data[0].categoria,
                    id:data.data[0].id
                });
                setLoading(false);
            })
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

    const verificar = state=>{
        if(state.categoria.trim()===''){
            setError(true);
            return false;
        }
        setError(false);
        return true;
    }

    const handleSubmit = event=>{
        event.preventDefault();
        if(verificar(formValues)){
            setLoading(true);
            fetch(`${API}/modificar_categoria`,{
                method:'PUT',
                body:JSON.stringify(formValues),
                headers:{'Content-Type':'application/json'}
            }).then(res=>res.json()).then(res=>{
                setLoading(false);
                Swal.fire(
                    'Categoria modificada!',
                    res.info,
                    'success'
                ).then(()=>{
                    props.history.push('/categorias')
                });
            })
        }
    }

    return (
        (loading)?<Loader/>:
        <FormEditCategoria
            error={error}
            formValues={formValues}
            categoria={categoria}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            />
    );
}
 
export default EditCategoria;