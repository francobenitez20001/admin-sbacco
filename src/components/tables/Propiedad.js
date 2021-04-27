import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {PropiedadContext} from '../../context/propiedades/propiedadesContext';
import withReactContent from 'sweetalert2-react-content';
import Loader from '../Loader/Loader';
const Swal = require('sweetalert2');
const MySwal = withReactContent(Swal);

const TablaProductos = () => {

    const {data,loading,error,desde,eliminar,traerTodas,traerMas,cambiarEstado} = useContext(PropiedadContext);

    useEffect(() => {
        traerTodas();
    }, []);

    useEffect(() => {
        if(desde>0){
            traerMas();
        }
    }, [desde])

    const eliminarPropiedad = id=>{
        MySwal.fire({
            title: '¿Desea eliminar la propiedad?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!',
          }).then(async(result) => {
            if (result.value) {
                await eliminar(id);
                Swal.fire('Listo','Se eliminó la propiedad','success').then(()=>traerTodas())
            }
        })
    }

    const switchEstadoPropiedadEnPagina = id=>{
        if(!id) return;
        MySwal.fire({
            title: '¿Seguro que desea activar esta propiedad?',
            text: "Esta acción se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cambiar!',
          }).then(async(result) => {
            if (result.value) {
                await cambiarEstado(id);
                Swal.fire('Listo','Se actualizo el estado de la propiedad','success').then(()=>traerTodas())
            }
        })
    }

    if(error){
        Swal.fire('Error',error,'error');
    }

    return (
        loading ? <Loader/> :
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
                    {
                    data.map(propiedad=>(
                        <tr key={propiedad.id} style={{border:`solid 2px ${(propiedad.activo)?`green`:`yellow`}`}}>
                            <th><img style={{width:'30px',maxHeight:'30px',cursor:'pointer'}} src={propiedad.header} alt={propiedad.localidad}/></th>
                            <th>{propiedad.barrio}</th>
                            <td>{propiedad.categoria}</td>
                            <td>{propiedad.operacion}</td>
                            <td>{propiedad.precio}</td>
                            <td>{propiedad.estado}</td>
                            <td className="text-center">
                                <Link to={{pathname:`/propiedad/edit/${propiedad.id}`}} className="ml-2 btn btn-outline-warning">Modificar</Link>
                                <button type="button" onClick={()=>eliminarPropiedad(propiedad.id)} className="ml-2 btn btn-outline-danger">Eliminar</button>
                                <button type="button" onClick={()=>switchEstadoPropiedadEnPagina(propiedad.idCasa)} className={`ml-2 btn btn-outline-${(propiedad.activo)?`info`:`success`}`}>{(propiedad.activo)?`Ocultar en web`:`Habilitar en web`}</button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </>
    );
}
 
export default TablaProductos;
