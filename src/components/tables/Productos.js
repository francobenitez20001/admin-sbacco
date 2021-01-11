import React from 'react';
import {Link} from 'react-router-dom';

const TablaProductos = (props) => {

    return (
        <>
            <h3 className="my-4 ml-2">Tabla de administración de propiedades</h3>
            <table className="table text-center">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Imágen</th>
                    <th scope="col">Ubicacion</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Operación</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Estado</th>
                    <th scope="col" className="text-center">
                        <Link to="/propiedad/add" className="btn btn-outline-info">Agregar</Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {(!props.productos)?null:
                    props.productos.map(propiedad=>(
                        <tr key={propiedad.id} style={{border:`solid 2px ${(propiedad.activo)?`green`:`yellow`}`}}>
                            <th><img style={{width:'30px',maxHeight:'30px',cursor:'pointer'}} src={propiedad.header} alt={propiedad.localidad}/></th>
                            <th>{propiedad.localidad}</th>
                            <td>{propiedad.categoria}</td>
                            <td>{propiedad.operacion}</td>
                            <td>{propiedad.precio}</td>
                            <td>{propiedad.estado}</td>
                            <td className="text-center">
                                <Link to={{pathname:`/propiedad/edit/${propiedad.idCasa}`}} className="ml-2 btn btn-outline-warning">Modificar</Link>
                                <button type="button" onClick={()=>props.eliminarPropiedad(propiedad.idCasa)} className="ml-2 btn btn-outline-danger">Eliminar</button>
                                <button type="button" onClick={()=>props.switchEstadoPropiedadEnPagina(propiedad.idCasa)} className={`ml-2 btn btn-outline-${(propiedad.activo)?`info`:`success`}`}>{(propiedad.activo)?`Ocultar en web`:`Habilitar en web`}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
 
export default TablaProductos;