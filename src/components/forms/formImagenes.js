import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { ImagenesContext } from "../../context/imagenes/imagenesContext";
import { PropiedadContext } from "../../context/propiedades/propiedadesContext";
import Loader from "../Loader/Loader";

const FormImagenes = () => {
    const {loading,error,agregar,habilitarFormVarias} = useContext(ImagenesContext);
    const {idCasa} = useContext(PropiedadContext);

    const handleSubmit = async e=>{
        e.preventDefault();
        let data = new FormData(e.target);
        console.log(data.get('idCasa'));
        if(data.getAll('imagenes')[0].size == 0){
            Swal.fire('Atención','Es obligatorio que cargues una imagen','warning');
            return;
        }
        await agregar(data,false);
        Swal.fire('Listo','Imagenes agregadas','success').then(()=>{
            habilitarFormVarias();
        })
    }

    if(error){
        Swal.fire('Error',error,'error');
    }

    return (
        loading ? <Loader/> :
        <form className="form-group" id="form-imagenes" onSubmit={handleSubmit}>
            <label>Selecciona el resto de las imagenes</label>
            <br/>
            <input type="file" multiple name="imagenes"/>
            <input type="hidden" name="idCasa" id="input-imagenes-idcasa" value={idCasa}/>
            <input type="submit" style={{float:"right"}} className="btn btn-info" value="Cargar"/>
        </form>
    );
}
 
export default FormImagenes;