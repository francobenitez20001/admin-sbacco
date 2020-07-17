import React from 'react';
import {Link} from 'react-router-dom'
const TablaUbicaciones = (props) => {
    return (
        <>
            <h3 className="my-4 ml-2">Tabla de administración de ubicaciones</h3>
            <table className="table text-center">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Partido</th>
                    <th scope="col">Localidad</th>
                    <th scope="col" className="text-center">
                        <Link to="/ubicacion/add" className="btn btn-outline-info">Agregar</Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {props.ubicaciones.map(ubicacion=>(
                        <tr key={ubicacion.id}>
                            <th>{ubicacion.id}</th>
                            <td>{ubicacion.partido}</td>
                            <td>{ubicacion.localidad}</td>
                            <td className="text-center">
                                <Link to={{pathname:`/ubicacion/edit/${ubicacion.id}`}} className=" ml-2 btn btn-outline-warning">Modificar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
 
export default TablaUbicaciones;