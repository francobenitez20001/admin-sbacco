import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import {ContactoContext} from '../../context/contacto/contactoContext';
import Loader from '../Loader/Loader';

const TablaContacto = () => {
    const {data,loading,error,traerInfo} = useContext(ContactoContext);

    useEffect(() => {
        traerInfo();
    }, [])

    if(error){
        Swal.fire('Error',error,'error');
    }

    return (
        (!data.length)?<div className="alert alert-warning text-center">No hay registros cargados</div>:
        <>
            <h3 className="my-4 ml-2">Tabla de administración de contacto</h3>
            {loading ? <Loader/> : 
            <table className="table text-center">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Tel. Principal</th>
                    <th scope="col">Whatsapp</th>
                    <th scope="col">Facebook</th>
                    <th scope="col">Instagram</th>
                    <th scope="col">Twitter</th>
                    <th scope="col">Dirección</th>
                    <th scope="col" className="text-center">
                        <Link to={{pathname:`/contacto/edit/1`}} className="btn btn-outline-info">Modificar</Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {data.map((item,key)=>(
                        <tr key={key}>
                            <td>{item.telefonoPrincipal}</td>
                            <td>{item.whatsapp}</td>
                            <td>{item.facebook.substr(0,27)}...</td>
                            <td>{item.instagram.substr(0,27)}...</td>
                            <td>{item.twitter}...</td>
                            <td>{item.direccion.substr(0,27)}...</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
        </>
    );
}
 
export default TablaContacto;