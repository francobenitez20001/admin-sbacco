import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/auth/authContext';
const Navbar = () => {

    const {autenticado} = useContext(AuthContext);
    const logout = ()=>{
        
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Angela Sbacco</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/propiedades">Propiedades <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/categorias">Categorias</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/ubicaciones">Ubicaciones</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/operaciones">Operaciones</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contacto">Contacto</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/nosotros">Quiénes somos</Link>
                    </li>
                    {(!autenticado)?null:
                        <li className="nav-item">
                            <button onClick={logout} type="button" className="btn btn-danger">Salir</button>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    );
}
 
export default Navbar;