import React, {useEffect,useContext, useState} from 'react';
import Propiedad from '../Propiedad/index'
import { PropiedadContext } from "../../context/propiedades/propiedadesContext";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import FormFiltroPropiedades from '../FormFiltro';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const MySwal = withReactContent(Swal);

const Propiedades = () => {
    const {data,desde,filtrando,loading,filtros,error,traerTodas,traerMas,eliminar,cambiarEstado,filtrarPropiedades,restablecerFiltros} = useContext(PropiedadContext);
    const [showFormFiltrar, setShowFormFiltrar] = useState(false);

    useEffect(() => {
        if(filtrando){
            filtrarPropiedades();
        }else{
            traerTodas();
        }
    }, [filtros])

    useEffect(() => {
        if(desde>0){
            traerMas();
        }
    }, [desde])
    

    if(error){
        Swal.fire(
            'Error',
            error,
            'error'
        ).then(()=>window.location.assign('/'));
    }

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

    return (
        <>
            <h1 className="my-2 col-12 col-md-6" style={{fontSize:'30px'}}>Tus propiedades</h1>
            <div className="col-12 col-md-6 text-right pt-2">
                <button type="button" className="btn btn-info mx-2" onClick={()=>setShowFormFiltrar(!showFormFiltrar)}>
                    Filtrar
                </button>
                <Link to="/propiedad/add" className="btn btn-info mx-2">
                    Nueva Propiedad
                </Link>
            </div>
            <div className="col-12 mt-2 mb-3">
                {showFormFiltrar ? <FormFiltroPropiedades/> : null }
            </div>
            <div className="col-12 mb-2">
                {filtrando ? <span id="btn-restablecerFiltros" onClick={()=>restablecerFiltros()}>
                    Restablecer filtros <FontAwesomeIcon icon={faTimes}/>
                </span> : null}
            </div>
            <hr/>
            {data.map(inmueble=>(
                <div key={inmueble.idCasa} className="col-12 col-md-4 my-2">
                    <Propiedad propiedad={inmueble} eliminarPropiedad={eliminarPropiedad} cambiarEstado={switchEstadoPropiedadEnPagina}/>
                </div>
            ))}
        </>
    );
}
 
export default Propiedades;