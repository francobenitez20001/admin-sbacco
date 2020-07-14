import React from 'react';
import {Link} from 'react-router-dom';
const Home = () => {
    return (
        <div className="container mt-3">
            <div className="list-group">
                <Link to="/productos" className="list-group-item list-group-item-action">Administra Tus productos</Link>
                <Link to="/" className="list-group-item list-group-item-action">Administrá categorías</Link>
                <Link to="/" className="list-group-item list-group-item-action">Administrá operaciones</Link>
                <Link to="/" className="list-group-item list-group-item-action">Administrá tus ubicaciones</Link>
                <Link to="/" className="list-group-item list-group-item-action">Quiénes Sómos</Link>
            </div>
        </div>
    );
}
 
export default Home;