import React from 'react';
import {Link} from 'react-router-dom';
const Home = () => {
    return (
        <div className="container mt-3">
            <div className="list-group">
                <Link to="/propiedades" className="list-group-item list-group-item-action">Administra Tus propiedades</Link>
                <Link to="/categorias" className="list-group-item list-group-item-action">Administrá categorías</Link>
                <Link to="/operaciones" className="list-group-item list-group-item-action">Administrá operaciones</Link>
                <Link to="/localidades" className="list-group-item list-group-item-action">Administrá tus ubicaciones</Link>
                <Link to="/barrios" className="list-group-item list-group-item-action">Administrar barrios</Link>
                <Link to="/partidos" className="list-group-item list-group-item-action">Administrá partidos</Link>
                <Link to="/nosotros" className="list-group-item list-group-item-action">Quiénes Sómos</Link>
                <Link to="/contacto" className="list-group-item list-group-item-action">Datos de contacto</Link>
            </div>
        </div>
    );
}
 
export default Home;