import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { ImagenesContext } from "../../context/imagenes/imagenesContext";
import { PropiedadContext } from "../../context/propiedades/propiedadesContext";

const FormHeader = () => {

    const {habilitarFormHeader} = useContext(ImagenesContext);
    const {idCasa} = useContext(PropiedadContext);

    const handleSubmit = e=>{
        e.preventDefault();
        let data = new FormData(e.target);
        console.log(data.get('idCasa'));
        if(data.get('header').size === 0){
            Swal.fire('Atención','Es obligatorio que cargues una imagen','warning');
            return;
        }
        Swal.fire('Listo','Imagen principal agregada','success').then(()=>{
            habilitarFormHeader();
        })
    }

    return (
        <form className="form-group" id="form-header" encType="multipart/form-data" onSubmit={handleSubmit}>
            <label>Selecciona la imágen principal de la propiedad</label>
            <br/>
            <input type="file" name="header"/>
            <input type="hidden" name="idCasa" id="input-header-idcasa" value={idCasa}/>
            <input type="submit" style={{float:"right"}} className="btn btn-info" value="Cargar"/>
        </form>
    );
}
 
export default FormHeader;