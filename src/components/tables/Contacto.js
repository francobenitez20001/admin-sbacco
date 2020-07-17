import React from 'react';
import {Link} from 'react-router-dom';

const TablaContacto = (props) => {
    return (
        (!props.contacto)?<div className="alert alert-warning text-center">No hay registros cargados</div>:
        <>
            <h3 className="my-4 ml-2">Tabla de administración de contacto</h3>
            <table className="table text-center">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Tel. Principal</th>
                    <th scope="col">Whatsapp</th>
                    <th scope="col">Facebook</th>
                    <th scope="col">Instagram</th>
                    <th scope="col">Dirección</th>
                    <th scope="col" className="text-center">
                        <Link to={{pathname:`/contacto/edit/1`}} className="btn btn-outline-info">Modificar</Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.contacto.telefonoPrincipal}</td>
                        <td>{props.contacto.whatsapp}</td>
                        <td>{props.contacto.facebook.substr(0,30)}</td>
                        <td>{props.contacto.instagram.substr(0,30)}</td>
                        <td>{props.contacto.direccion.substr(0,30)}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
 
export default TablaContacto;