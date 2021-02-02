import React from 'react';
import {Link} from 'react-router-dom';
const TablaBarrios = (props) => {
    return (
        <>
            <h3 className="my-4 ml-2">Tabla de administración de Barrios</h3>
            <table className="table text-center">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Barrio</th>
                    <th scope="col">Localidad</th>
                    <th scope="col" className="text-center">
                        <Link to="/barrios/add" className="btn btn-outline-info">Agregar</Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {props.barrios.map(b=>(
                        <tr key={b.idBarrio}>
                            <th>{b.idBarrio}</th>
                            <td>{b.barrio}</td>
                            <td>{b.localidad}</td>
                            <td className="text-center">
                                <Link to={{pathname:`/barrios/edit/${b.idBarrio}`}} className="ml-2 btn btn-outline-warning">Modificar</Link>
                                <button type="button" onClick={()=>props.eliminarBarrio(b.idBarrio)} className=" ml-2 btn btn-outline-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
 
export default TablaBarrios;