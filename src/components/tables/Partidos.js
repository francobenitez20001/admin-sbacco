import React from 'react';
import {Link} from 'react-router-dom';
const TablaPartidos = (props) => {
    return (
        <>
            <h3 className="my-4 ml-2">Tabla de administración de Partidos</h3>
            <table className="table text-center">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Partido</th>
                    <th scope="col" className="text-center">
                        <Link to="/partido/add" className="btn btn-outline-info">Agregar</Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {props.partidos.map(p=>(
                        <tr key={p.id}>
                            <th>{p.id}</th>
                            <td>{p.partido}</td>
                            <td className="text-center">
                                <Link to={{pathname:`/partido/edit/${p.id}`}} className=" ml-2 btn btn-outline-warning">Modificar</Link>
                                <button type="button" onClick={()=>props.eliminarPartido(p.id)} className=" ml-2 btn btn-outline-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
 
export default TablaPartidos;