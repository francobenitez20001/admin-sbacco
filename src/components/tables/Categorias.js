import React from 'react';

const TablaCategorias = (props) => {
    return (
        <>
            <h3 className="my-4 ml-2">Tabla de administración de categorias</h3>
            <table className="table text-center">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Categoria</th>
                    <th scope="col" className="text-center">
                        <button type="button" className="btn btn-outline-info">Agregar</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>d</td>
                    <td>d</td>
                    <td classname="text-center">
                        <button type="button" className=" ml-2 btn btn-outline-warning">Modificar</button>
                        <button type="button" className=" ml-2 btn btn-outline-danger">Eliminar</button>
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="alert alert-warning text-center">No hay registros cargados</div>
        </>
    );
}
 
export default TablaCategorias;