import React,{useContext} from 'react';
import TablaProductos from '../../components/tables/Propiedad';
import {PropiedadContext} from '../../context/propiedades/propiedadesContext';

const Productos = () => {

    const {updatePaginacion} = useContext(PropiedadContext);

    return (
        <>
            <TablaProductos/>
            <div className="col-12 text-center my-2"><button onClick={()=>updatePaginacion()} className="btn btn-info">Ver Mas</button></div>
        </>
    );
}
 
export default Productos;