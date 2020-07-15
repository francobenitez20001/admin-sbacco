import React from 'react';
const FormEditNosotros = (props) => {
    return (
        <div className="container mt-5">
            <h3>Formulario de modificación de sección 'quiénes somos'</h3>
            <br/>
            <form className="form-group" onSubmit={props.handleSubmit}>
                <textarea className="form-control" name="contenido" defaultValue={props.nosotros.contenido} onChange={props.handleChange} rows="20">

                </textarea>
                <input type="submit" style={{float:"right"}} className="btn btn-info mt-4" value="Modificar"/>
            </form>
        </div>
    );
}
 
export default FormEditNosotros;