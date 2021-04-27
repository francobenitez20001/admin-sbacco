import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {OperacionesContext} from '../../context/operaciones/operacionesContext';
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const TablaOperaciones = () => {

    const {data,loading,error,traerTodas,eliminar} = useContext(OperacionesContext);

    useEffect(() => {
        traerTodas();
    }, [])

    const eliminarOperacion = id=>{
        MySwal.fire({
            title: '¿Desea eliminar la operación?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!',
          }).then(async (result) => {
            if (result.value) {
                await eliminar(id);
                Swal.fire('Eliminado','Se ha eliminado la operacion','success').then(()=>traerTodas());
            }
        })
    }

    if(error){
        Swal.fire('Error',error,'error');
    }

    return (
        <>
            <h3 className="my-4 ml-2">Tabla de administración de Operaciones</h3>
            {loading ? <Loader/> : 
                <table className="table text-center">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tipo</th>
                        <th scope="col" className="text-center">
                            <Link to="/operacion/add" className="btn btn-outline-info">Agregar</Link>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map(op=>(
                            <tr key={op.id}>
                                <th>{op.id}</th>
                                <td>{op.operacion}</td>
                                <td className="text-center">
                                    <Link to={{pathname:`/operacion/edit/${op.id}`}} className=" ml-2 btn btn-outline-warning">Modificar</Link>
                                    <button type="button" onClick={()=>eliminarOperacion(op.id)} className=" ml-2 btn btn-outline-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    );
}
 
export default TablaOperaciones;