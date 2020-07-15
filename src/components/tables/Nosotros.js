import React from 'react';
import {Link} from 'react-router-dom';
const TablaNosotros = (props) => {
    return (
        (!props.nosotros)?<div className="alert alert-warning text-center">No hay registros cargados</div>:
        <>
            <h3 className="my-4 ml-2">Tabla de administración de nosotros</h3>
            <table className="table ">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Descripción</th>
                    <th scope="col" className="text-center">
                        <Link to={{pathname:`/nosotros/modificar/${1}`}} className="btn btn-outline-info">Modificar</Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.nosotros.contenido}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
 
export default TablaNosotros;