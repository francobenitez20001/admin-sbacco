import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import {NosotrosContext} from '../../context/nosotros/nosotrosContext';
import Loader from '../Loader/Loader';

const TablaNosotros = () => {
    const {data,loading,error,traerTodas} = useContext(NosotrosContext);

    useEffect(() => {
        traerTodas();
    }, [])

    if(error){
        Swal.fire('Error',error,'error');
    }

    return (
        loading ? <Loader/> :
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
                    {data.map((info,key)=>(
                        <tr key={key}>
                            <td>{info.contenido}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
 
export default TablaNosotros;