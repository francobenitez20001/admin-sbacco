import React from 'react';

const FormHeader = () => {

    const handleSubmit = e=>{
        e.preventDefault();
    }

    return (
        <form className="form-group" id="form-header" encType="multipart/form-data" onSubmit={handleSubmit}>
            <label>Selecciona la imágen principal de la propiedad</label>
            <br/>
            <input type="file" required name="header"/>
            <input type="hidden" name="idCasa" id="input-header-idcasa" value=""/>
            <input type="hidden" name="pass" value="ZAQ12wsx"/>
            <input type="submit" style={{float:"right"}} className="btn btn-info" value="Cargar"/>
        </form>
    );
}
 
export default FormHeader;