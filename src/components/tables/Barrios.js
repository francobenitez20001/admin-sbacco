import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {BarriosContext} from '../../context/barrios/barriosContext';
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const TablaBarrios = () => {
    const {data,loading,error,traerTodos} = useContext(BarriosContext);
    useEffect(() => {
        traerTodos();
    }, []);

    const eliminarBarrio = id=>{
        MySwal.fire({
            title: '¿Desea eliminar el barrio?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!',
          }).then((result) => {
            if (result.value) {
                
            }
        })
    }

    return (
        <>
            <h3 className="my-4 ml-2">Tabla de administración de Barrios</h3>
            <table className="table text-center">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Barrio</th>
                    <th scope="col">Localidad</th>
                    <th scope="col" className="text-center">
                        <Link to="/barrios/add" className="btn btn-outline-info">Agregar</Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {loading ? <Loader/> : 
                    data.map(b=>(
                        <tr key={b.idBarrio}>
                            <th>{b.idBarrio}</th>
                            <td>{b.barrio}</td>
                            <td>{b.localidad}</td>
                            <td className="text-center">
                                <Link to={{pathname:`/barrios/edit/${b.idBarrio}`}} className="ml-2 btn btn-outline-warning">Modificar</Link>
                                <button type="button" onClick={()=>eliminarBarrio(b.idBarrio)} className=" ml-2 btn btn-outline-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </>
    );
}
 
export default TablaBarrios;