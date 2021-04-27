import React from 'react';
const FormImagenes = () => {

    const handleSubmit = e=>{
        e.preventDefault();
    }

    return (
        <form className="form-group" id="form-imagenes" onSubmit={handleSubmit}>
            <label>Selecciona el resto de las imagenes</label>
            <br/>
            <input type="file" required multiple name="imagenes"/>
            <input type="hidden" name="idCasa" id="input-imagenes-idcasa" value=""/>
            <input type="hidden" name="pass" value="ZAQ12wsx"/>
            <input type="submit" style={{float:"right"}} className="btn btn-info" value="Cargar"/>
        </form>
    );
}
 
export default FormImagenes;