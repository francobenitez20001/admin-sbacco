import React, {useState} from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader/Loader';
import 'firebase/auth';
import {useFirebaseApp,useUser} from 'reactfire';

const Auth = () => {
    const firebase = useFirebaseApp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loader, setloader] = useState(false);

    const handleSubmit = e=>{
        e.preventDefault();
        setloader(true);
        if(email.trim()==='' || password.trim()===''){
            setloader(false);
            setError(true);
            return;
        }
        setError(false);
        firebase.auth().signInWithEmailAndPassword(email,password).then(res=>{
            setloader(false);
            window.location.assign('/');
        }).catch(err=>{
            setloader(false);
            if(err.code === 'auth/wrong-password'){
                setError(true)
            };
        })
    }

    const user = useUser();
    if(user) return window.location.assign('/');

    const logout = async()=>{
        await firebase.auth().signOut();
    }

    return (
        <div className="container mt-5">
            <h2 className="my-4">Ingrese su cuenta para continuar</h2>
            <form className="form-group" onSubmit={handleSubmit}>
                {(error)?<Error message="Email o contraseña incorrectos"/>:null}
                {(loader)?<Loader/>:null}
                <input type="email" placeholder="Email" className="form-control my-3" name="email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Contraseña" className="form-control my-3" name="password" onChange={(e)=>setPassword(e.target.value)}/>
                <input type="submit" value="Ingresar" className="btn btn-secondary"/>
            </form>
            {(user)?<button onClick={logout}>Cerrar sesión</button>:null}
        </div>
    );
}
 
export default Auth;