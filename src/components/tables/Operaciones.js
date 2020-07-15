import React from 'react';
const TablaOperaciones = (props) => {
    return (
        <>
            <h3 className="my-4 ml-2">Tabla de administración de Operaciones</h3>
            <table className="table text-center">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tipo</th>
                    <th scope="col" className="text-center">
                        <button type="button" className="btn btn-outline-info">Agregar</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {props.operaciones.map(op=>(
                        <tr key={op.id}>
                            <th>{op.id}</th>
                            <td>{op.operacion}</td>
                            <td className="text-center">
                                <button type="button" className=" ml-2 btn btn-outline-warning">Modificar</button>
                                <button type="button" onClick={()=>props.eliminarOperacion(op.id)} className=" ml-2 btn btn-outline-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
 
export default TablaOperaciones;