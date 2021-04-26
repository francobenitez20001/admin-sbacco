import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import {LocalidadesContext} from '../../context/localidades/localidadesContext';
import Loader from '../Loader/Loader';


const TablaLocalidades = (props) => {
    const {data,loading,error,traerTodas} = useContext(LocalidadesContext);

    useEffect(() => {
        traerTodas();
    }, []);

    if(error){
        Swal.fire('Error',error,'error');
    }

    return (
        <>
            <h3 className="my-4 ml-2">Tabla de administración de localidades</h3>
            {loading ? <Loader/> : 
                <table className="table text-center">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Partido</th>
                        <th scope="col">Localidad</th>
                        <th scope="col" className="text-center">
                            <Link to="/localidades/add" className="btn btn-outline-info">Agregar</Link>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map(localidad=>(
                            <tr key={localidad.id}>
                                <th>{localidad.id}</th>
                                <td>{localidad.partido}</td>
                                <td>{localidad.localidad}</td>
                                <td className="text-center">
                                    <Link to={{pathname:`/localidades/edit/${localidad.id}`}} className=" ml-2 btn btn-outline-warning">Modificar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    );
}
 
export default TablaLocalidades;