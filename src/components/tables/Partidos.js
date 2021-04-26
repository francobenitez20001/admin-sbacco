import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {PartidosContext} from '../../context/partidos/partidosContext';
import Loader from '../Loader/Loader';
const MySwal = withReactContent(Swal);

const TablaPartidos = (props) => {
    const {data,loading,error,traerTodos,eliminar} = useContext(PartidosContext);

    useEffect(() => {
        traerTodos();
    }, [])

    const eliminarPartido = id=>{
        MySwal.fire({
            title: '¿Desea eliminar el partido?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!',
          }).then(async(result) => {
            if (result.value) {
                await eliminar(id);
                Swal.fire('Listo','Se ha eliminado el partido','success').then(traerTodos());
            }
        })
    }
    if(error){
        Swal.fire(
            'Error',
            error,
            'error'
        )
    }

    return (
        <>
            <h3 className="my-4 ml-2">Tabla de administración de Partidos</h3>
            {loading ? <Loader/> :
            <table className="table text-center">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Partido</th>
                    <th scope="col" className="text-center">
                        <Link to="/partido/add" className="btn btn-outline-info">Agregar</Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {
                        data.map(p=>(
                            <tr key={p.id}>
                                <th>{p.id}</th>
                                <td>{p.partido}</td>
                                <td className="text-center">
                                    <Link to={{pathname:`/partido/edit/${p.id}`}} className=" ml-2 btn btn-outline-warning">Modificar</Link>
                                    <button type="button" onClick={()=>eliminarPartido(p.id)} className=" ml-2 btn btn-outline-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            }
        </>
    );
}
 
export default TablaPartidos;