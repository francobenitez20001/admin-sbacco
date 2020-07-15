import React from 'react';
import {Link} from 'react-router-dom';
const TablaCategorias = (props) => {
    return (
        (!props.categorias)?<div className="alert alert-warning text-center">No hay registros cargados</div>:
        <>
            <h3 className="my-4 ml-2">Tabla de administración de categorias</h3>
            <table className="table text-center">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Categoria</th>
                    <th scope="col" className="text-center">
                        <Link to="/categoria/add" className="btn btn-outline-info">Agregar</Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {props.categorias.map(cat=>(
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.categoria}</td>
                            <td className="text-center">
                                <Link to={{pathname:`/categoria/edit/${cat.id}`}} className=" ml-2 btn btn-outline-warning">Modificar</Link>
                                <button type="button" onClick={()=>props.eliminarCategoria(cat.id)} className=" ml-2 btn btn-outline-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
 
export default TablaCategorias;