import React from 'react';

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
                        <button type="button" className="btn btn-outline-info">Agregar</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>1</th>
                    <td>asd</td>
                    <td>asd</td>
                    <td className="text-center">
                        <button type="button" className=" ml-2 btn btn-outline-warning">Modificar</button>
                        <button type="button" onClick={()=>props.eliminarUbicacion(1)} className=" ml-2 btn btn-outline-danger">Eliminar</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    );
}
 
export default TablaUbicaciones;