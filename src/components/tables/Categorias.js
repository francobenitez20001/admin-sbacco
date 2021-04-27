import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CategoriasContext } from "../../context/categorias/categoriasContext";
import Loader from '../Loader/Loader';

const MySwal = withReactContent(Swal);

const TablaCategorias = () => {
    const {data:categorias,loading,error,traerTodas,eliminar} = useContext(CategoriasContext);

    useEffect(() => {
        traerTodas();
    }, [])

    const eliminarCategoria = id=>{
        MySwal.fire({
            title: '¿Desea eliminar la categoria?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!',
          }).then(async(result) => {
            if (result.value) {
                await eliminar(id);
                Swal.fire('Listo','La categoria ha sido eliminada','success').then(()=>traerTodas());
            }
        })
    }

    if(error){
        Swal.fire('Error',error,'error');
    }

    return (
        loading?<Loader/>:
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
                    {categorias.map(cat=>(
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.categoria}</td>
                            <td className="text-center">
                                <Link to={{pathname:`/categoria/edit/${cat.id}`}} className=" ml-2 btn btn-outline-warning">Modificar</Link>
                                <button type="button" onClick={()=>eliminarCategoria(cat.id)} className=" ml-2 btn btn-outline-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
 
export default TablaCategorias;