import React, {useContext, useEffect, useState} from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader/Loader';
import {AuthContext} from '../../context/auth/authContext';
const Swal = require('sweetalert2');

const Auth = (props) => {

    const [formValues, setFormValues] = useState({
        email:'',
        pw:''
    });
    const [errorForm, setErrorForm] = useState(false);
    const {loading,error,autenticado,login,obtenerUsuario} = useContext(AuthContext)

    useEffect(() => {
        obtenerUsuario();
    }, [])

    useEffect(() => {
        if(autenticado){
            if(formValues.email.trim() !== ""){
                Swal.fire('Bienvenido/a','','success').then(()=>props.history.push('/'));
            }else{
                props.history.push('/')
            }
        }
    }, [autenticado])


    const handleSubmit = e=>{
        e.preventDefault();
        const {email,pw} = formValues;
        if(email.trim()==='' || pw.trim()===''){
            setErrorForm('Complete todos los campos');
            return;
        }
        if(pw.length<6){
            setErrorForm('La contraseña es demasiado corta');
            return;
        }
        setErrorForm(false);
        login(formValues);
    }

    const handleChange = e=>{
        setFormValues({
            ...formValues,
            [e.target.name]:e.target.value
        })
    }

    return (
        <div className="container mt-5">
            <h2 className="my-4">Ingrese su cuenta para continuar</h2>
            <form className="form-group" onSubmit={handleSubmit}>
                {(errorForm)?<Error message={errorForm}/>:null}
                {(error)?<Error message={error.msg}/>:null}
                {(loading)?<Loader/>:null}
                <input type="email" placeholder="Email" className="form-control my-3" name="email" onChange={handleChange}/>
                <input type="password" placeholder="Contraseña" className="form-control my-3" name="pw" onChange={handleChange}/>
                <input type="submit" value="Ingresar" className="btn btn-secondary"/>
            </form>
        </div>
    );
}
 
export default Auth;