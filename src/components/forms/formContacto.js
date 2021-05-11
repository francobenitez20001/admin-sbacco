import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import {ContactoContext} from '../../context/contacto/contactoContext';
import Loader from '../Loader/Loader';

const FormEditContacto = (props) => {

    const [formValues, setFormValues] = useState({
        telefonoPrincipal:'',
        whatsapp:'',
        facebook:'',
        instagram:'',
        twitter:'',
        direccion:''
    });
    const [errorForm, setErrorForm] = useState(false);
    const {info,loading,error,modificar} = useContext(ContactoContext);
    const history = useHistory();

    useEffect(() => {
        if(props.id && info){
            setFormValues({
                telefonoPrincipal:info.telefonoPrincipal,
                whatsapp:info.whatsapp,
                facebook:info.facebook,
                instagram:info.instagram,
                twitter:`${info.twitter}`,
                direccion:info.direccion
            });
        }
    }, [])

    const handleChange = event=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    };

    const verificar = ()=>{
        if(formValues.telefonoPrincipal.trim()==='' || formValues.whatsapp.trim() === '' || formValues.facebook.trim() === ''
        || formValues.instagram.trim() === '' || formValues.direccion.trim() === ''){
            setErrorForm('Completa todos los campos');
            return false;
        }
        setErrorForm(false);
        return true;
    }

    const handleSubmit = async event=>{
        event.preventDefault();
        if(!verificar()){
            return false;
        }
        if(props.id){
            await modificar(formValues,props.id)
        }else{
            return;
        }
        Swal.fire('Listo','','success').then(()=>history.push('/contacto'));
    }

    if(error || errorForm){
        let err = error ? error : errorForm;
        Swal.fire('Error',err,'error').then(()=>setErrorForm(false));
    }

    return (
        <div className="container mt-5">
            <h3>Formulario de modificación de datos de contacto</h3>
            <br/>
            {loading ? <Loader/> : 
                <form className="form-group" onSubmit={handleSubmit}>
                    <div className="my-4 col-12 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                Telefono Principal
                            </div>
                        </div>
                        <input type="text" name="telefonoPrincipal" onChange={handleChange} value={formValues.telefonoPrincipal} className="form-control"/>
                    </div>
                    <div className="my-4 col-12 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                Whatsapp
                            </div>
                        </div>
                        <input type="text" name="whatsapp" onChange={handleChange} value={formValues.whatsapp} className="form-control"/>
                    </div>
                    <div className="my-4 col-12 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                Facebook
                            </div>
                        </div>
                        <input type="text" name="facebook" onChange={handleChange} value={formValues.facebook} className="form-control"/>
                    </div>
                    <div className="my-4 col-12 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                Instagram
                            </div>
                        </div>
                        <input type="text" name="instagram" onChange={handleChange} value={formValues.instagram} className="form-control"/>
                    </div>
                    <div className="my-4 col-12 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                Twitter
                            </div>
                        </div>
                        <input type="text" name="twitter" onChange={handleChange} value={formValues.twitter} className="form-control"/>
                    </div>
                    <div className="my-4 col-12 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                Dirección
                            </div>
                        </div>
                        <input type="text" name="direccion" onChange={handleChange} value={formValues.direccion} className=" form-control"/> 
                    </div>
                    <input type="submit" style={{float:"right"}} className="btn btn-info mt-4" value="Modificar"/>
                </form>
            }
        </div>
    );
}
 
export default FormEditContacto;